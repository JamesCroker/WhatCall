export interface Scenario {
  /** ID for the scenario (populated from document ID by converter) */
  id: string;

  /** Title */
  title: string;

  /** URL for video playback */
  url: string;

  /** User ID of owner */
  uid: string;

  /** Type of scenario (for filtering) */
  scenarioType: string;

  /** Array of valid responses to scenario */
  options: string[];
}

export interface ScenarioWithResponses extends Scenario {
  /** Array of all user responses to a scenario. */
  responses: ScenarioResponse[];

  /** Statistics of user responses for the scenario. How many users have responded with which option. */
  stats: ScenarioStats;

  /** Current User’s response to the scenario. */
  myResponse?: ScenarioResponse;
}

export interface ScenarioResponse {
  /** ID for the response (populated from document ID by converter) */
  id: string;

  /** The user id (uid) for the user who submitted this response.
   *
   * Note – this is duplicated from the document id and is stored in the response document
   * to allow querying across scenario-responses collection.
   **/
  uid: string;

  /**
   * The scenario which this is a response to.
   *
   * Note – this is duplicated from the document path /scenarios/{scenarioId}/responses/{uid} and
   * is stored in the response document to allow querying across scenario-responses collection.
   **/
  scenarioId: string;

  /** The user’s most recent response to the scenario. */
  latestResponse: string;

  /** The user’s initial response to the scenario. Once created this is never updated. */
  firstResponse: string;
}

export interface ScenarioStats {
  /** A count of all responses for this scenario */
  totalResponses: number;

  /** The count of user responses to each of the options, as an object.
   *
   * property key - the option being counted
   * property value - the count of responses selecting that value
   *
   * example:
   *   optionCounts: {
   *     "Play On": 4,
   *     "Pen White": 3,
   *     "Pen Green": 0
   *  .}
  **/
  optionCounts: { [option: string]: number };
}


