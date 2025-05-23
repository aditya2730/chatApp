import { v4 as uuidv4 } from "uuid";

export const simulateAssistantResponse = ({
  responseContent,
  setChatHistory,
  timeoutRef,
  pluginName,
  pluginData,
  delay = 600,
}) => {
  if (timeoutRef && timeoutRef.current) {
    clearTimeout(timeoutRef.current);
  }

  const loadingId = uuidv4();
  const timestamp = new Date().toISOString();

  setChatHistory((prev) => [
    ...prev,
    {
      id: loadingId,
      sender: "assistant",
      content: "Assistant is typing...",
      type: "plugin",
      timestamp,
      loading: true,
    },
  ]);

  timeoutRef.current = setTimeout(() => {
    setChatHistory((prev) =>
      prev
        .filter((msg) => msg.id !== loadingId)
        .concat({
          id: uuidv4(),
          sender: "assistant",
          content: responseContent,
          type: "plugin",
          pluginName: pluginName,
          pluginData: pluginData,
          timestamp: new Date().toISOString(),
        })
    );
    timeoutRef.current = null;
  }, delay);
};
