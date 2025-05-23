import { simulateAssistantResponse } from "../utls/chatUtils";
import { DEFINE_API } from "../utls/constants";

export async function definePlugin(input, setChatHistory, timeoutRef) {
  const word = input.split(" ")[1];
  if (!word) {
    simulateAssistantResponse({
      responseContent: "Please provide a word to define.",
      setChatHistory,
      timeoutRef,
      pluginName: "definePlugin",
      pluginData: { error: "no word provided" },
    });
    return;
  }
  try {
    const response = await fetch(DEFINE_API + word);
    if (!response.ok) throw new Error("Definition not found.");
    const data = await response.json();
    const definition = data[0].meanings[0].definitions[0].definition;
    simulateAssistantResponse({
      responseContent: `Definition of ${word}: ${definition}`,
      setChatHistory,
      timeoutRef,
      pluginName: "definePlugin",
      pluginData: { word: word, definition: definition },
    });
  } catch (error) {
    simulateAssistantResponse({
      responseContent: `Error fetching definition: ${error.message}`,
      setChatHistory,
      timeoutRef,
      pluginName: "definePlugin",
      pluginData: { error: `Error fetching definition: ${error.message}` },
    });
  }
}
