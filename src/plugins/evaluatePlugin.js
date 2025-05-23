import { simulateAssistantResponse } from "../utls/chatUtils";
import { evaluate } from "mathjs"; // or any safe math evaluator you want

export async function calcPlugin(input, setChatHistory, timeoutRef) {
  const expression = input.replace("/calc", "").trim();
  if (!expression) {
    simulateAssistantResponse({
      responseContent: "Please provide an expression to calculate.",
      setChatHistory,
      timeoutRef,
      pluginName: "calcPlugin",
      pluginData: { error: "no expression provided" },
    });
    return;
  }
  try {
    const result = evaluate(expression);
    simulateAssistantResponse({
      responseContent: `Result: ${result}`,
      setChatHistory,
      timeoutRef,
      pluginName: "calcPlugin",
      pluginData: { expression: expression, result: result },
    });
  } catch (error) {
    simulateAssistantResponse({
      responseContent: `Error evaluating expression: ${error.message}`,
      setChatHistory,
      timeoutRef,
      pluginName: "calcPlugin",
      pluginData: { error: `Error evaluating expression: ${error.message}` },
    });
  }
}
