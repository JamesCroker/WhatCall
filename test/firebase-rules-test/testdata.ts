export const aliceId = "alice_123";

const scenarioId = 'scen1';

export const aliceScenarioPath = `scenarios/${scenarioId}`;
export const aliceScenarioDoc = {
  title: "Alice",
  options: ['A', 'B'],
  uid: aliceId,
  scenarioType: '',
  url: ''
};

export const aliceResponsePath = `scenarios/${scenarioId}/responses/${aliceId}`
export const aliceResponseDoc = {
  firstResponse: 'A',
  latestResponse: 'A',
  scenarioId: scenarioId,
  uid: aliceId
};
