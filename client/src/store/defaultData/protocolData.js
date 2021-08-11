import { getDefaultDeckData } from "./deckData";
import { getDefaultStepsCount, getDefaultStepsData } from "./stepsData";
import { getDefaultSequencesCount, getDefaultSequencesData } from "./sequencesData";
import { getDefaultLiquidClassesCount, getDefaultLiquidClassesData } from "./liquidClassesData";


/**
 * A function that returns an object representation of a newly created protocol
 * @param {String} authorName - The name of the user attempting to create the protocol
 * @param {String} authorEmail - The email address of the user attempting to create the protocol
 * @param {String} protocolName - The name of the protocol to be created
 * @param {String} protocolDescription - The description of the protocol to be created
 * @returns {object} - An object representation of a newly created protocol
 */
export function getDefaultProtocol(authorName, authorEmail, protocolName, protocolDescription) {
    return {
        protocol: {
          metadata: {
            name: protocolName,
            description: protocolDescription,
            author: {
              name: authorName,
              email: authorEmail,
            },
            is_verified: false,
            is_retired: false,
            is_shared: false,
            created: Date.now(),
          },
          deck: getDefaultDeckData(),
          sequences: getDefaultSequencesData(),
          steps: getDefaultStepsData(),
          liquid_classes: getDefaultLiquidClassesData(),
          stepCounter: getDefaultStepsCount(),
          liquidClassCounter: getDefaultLiquidClassesCount(),
          sequenceCounter: getDefaultSequencesCount(),
        }
    }
}