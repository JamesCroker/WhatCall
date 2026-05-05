import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
  RulesTestEnvironment
} from "@firebase/rules-unit-testing";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { readFile } from "fs/promises";
import { aliceResponseDoc, aliceId, aliceResponsePath, aliceScenarioPath, aliceScenarioDoc } from "./testdata";

let testEnv: RulesTestEnvironment;

describe("Firestore Security Rules - Response", () => {
  beforeAll(async () => {
    // 1. Initialise the test environment with your local rules file
    testEnv = await initializeTestEnvironment({
      projectId: "demo-firestore-rules",
      firestore: {
        rules: await readFile(__dirname + "/../../firestore.rules", "utf8"),
        host: '127.0.0.1',
        port: 8090
      },
    });
  });

  afterAll(async () => {
    // Cleanup the environment after all tests
    await testEnv.cleanup();
  });

  beforeEach(async () => {
    // 2. Clear Firestore data between tests for isolation
    await testEnv.clearFirestore();
  });

  it("should allow a user to read their own document", async () => {
    const aliceContext = testEnv.authenticatedContext(aliceId);
    const db = aliceContext.firestore();

    // Use withSecurityRulesDisabled to set up initial data without rule interference
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await setDoc(doc(context.firestore(), aliceScenarioPath), aliceScenarioDoc);
      await setDoc(doc(context.firestore(), aliceResponsePath), aliceResponseDoc);
    });

    // 3. Test that the rule allows the read
    const docRef = doc(db, aliceResponsePath);
    await assertSucceeds(getDoc(docRef));
  });

    it("should allow a user to edit their own document", async () => {
      const aliceContext = testEnv.authenticatedContext(aliceId);
      const db = aliceContext.firestore();

      // Use withSecurityRulesDisabled to set up initial data without rule interference
      await testEnv.withSecurityRulesDisabled(async (context) => {
        await setDoc(doc(context.firestore(), aliceResponsePath), aliceResponseDoc);
      });

      // 3. Test that the rule allows the read
      const docRef = doc(db, aliceResponsePath);
      await assertSucceeds(setDoc(docRef, { ...aliceResponseDoc, url: 'changed' }));
    });

    it("should allow a user to read another user's document", async () => {
      const bobContext = testEnv.authenticatedContext("bob_123");
      const db = bobContext.firestore();

      // Use withSecurityRulesDisabled to set up initial data without rule interference
      await testEnv.withSecurityRulesDisabled(async (context) => {
        await setDoc(doc(context.firestore(), aliceResponsePath), aliceResponseDoc);
      });

      const docRef = doc(db, aliceResponsePath);
      await assertSucceeds(getDoc(docRef));
    });

    it("should deny a user from editing another user's document", async () => {
      const bobContext = testEnv.authenticatedContext("bob_123");
      const db = bobContext.firestore();

      // Use withSecurityRulesDisabled to set up initial data without rule interference
      await testEnv.withSecurityRulesDisabled(async (context) => {
        await setDoc(doc(context.firestore(), aliceResponsePath), aliceResponseDoc);
      });

      const docRef = doc(db, aliceResponsePath);
      await assertFails(setDoc(docRef, {}));
    });

    it("should deny a user from creating a document belonging to another user", async () => {
      const bobContext = testEnv.authenticatedContext("bob_123");
      const db = bobContext.firestore();

      const docRef = doc(db, aliceResponsePath);
      await assertFails(setDoc(docRef, aliceResponseDoc));
    });

    it("should deny a user from deleting a document belonging to another user", async () => {
      const bobContext = testEnv.authenticatedContext("bob_123");
      const db = bobContext.firestore();

      // Use withSecurityRulesDisabled to set up initial data without rule interference
      await testEnv.withSecurityRulesDisabled(async (context) => {
        await setDoc(doc(context.firestore(), aliceResponsePath), aliceResponseDoc);
      });

      const docRef = doc(db, aliceResponsePath);
      await assertFails(deleteDoc(docRef));
    });
});
