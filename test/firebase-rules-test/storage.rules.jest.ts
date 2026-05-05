import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
  RulesTestEnvironment
} from "@firebase/rules-unit-testing";
import { readFile } from "fs/promises";
import { ref, uploadBytes } from "firebase/storage";

let testEnv: RulesTestEnvironment;

describe("Storage Security Rules", () => {
  beforeAll(async () => {
    // 1. Initialise the test environment with your local rules file
    testEnv = await initializeTestEnvironment({
      projectId: "demo-firebase-rules",
      storage: {
        rules: await readFile(__dirname + "/../../storage.rules", "utf8"),
        host: '127.0.0.1',
        port: 8092
      },
    });
  });
  afterAll(async () => {
    await testEnv.cleanup();
  });

  beforeEach(async () => {
    await testEnv.clearStorage();
  });

  it("allows a user to write to their own path", async () => {
    // Create an authenticated context for Alice
    const aliceContext = testEnv.authenticatedContext("alice_123");
    const storage = aliceContext.storage();
    const aliceRef = ref(storage, `uploads/alice_123/video.mp4`);

    const dummyData = Buffer.from("fake-image-binary", "utf-8");

    await assertSucceeds(uploadBytes(aliceRef, dummyData));
  });

  it("blocks a user from writing to another user's path", async () => {
    const bobContext = testEnv.authenticatedContext("bob_456");
    const storage = bobContext.storage();

    // Bob tries to write to Alice's folder
    const aliceRef = ref(storage, "uploads/alice_123/video.mp4");
    const dummyData = Buffer.from("malicious-upload", "utf-8");

    await assertFails(uploadBytes(aliceRef, dummyData));
  });
});
