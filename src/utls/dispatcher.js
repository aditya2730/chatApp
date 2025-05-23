import { weatherPlugin } from "../plugins/weatherPlugin";
import { definePlugin } from "../plugins/definePlugin";
import { calcPlugin } from "../plugins/evaluatePlugin";
import { simulateAssistantResponse } from "./chatUtils";

export async function handleInput(input, setChatHistory, timeoutRef) {
  if (input.startsWith("/weather")) {
    await weatherPlugin(input, setChatHistory, timeoutRef);
  } else if (input.startsWith("/define")) {
    await definePlugin(input, setChatHistory, timeoutRef);
  } else if (input.startsWith("/calc")) {
    await calcPlugin(input, setChatHistory, timeoutRef);
  } else {
    simulateAssistantResponse({
      responseContent:
        "I'm sorry, I didn't understand that. Please use a valid command like /weather [city], /define [word], or /calc [expression].",
      setChatHistory,
      timeoutRef,
    });
  }
}
