import { simulateAssistantResponse } from "../utls/chatUtils";
import { WEATHER_API } from "../utls/constants";

export async function weatherPlugin(input, setChatHistory, timeoutRef) {
  const city = input.split(" ")[1];
  console.log(city);
  if (!city) {
    simulateAssistantResponse({
      responseContent: "Please provide a city name.",
      setChatHistory,
      timeoutRef,
      pluginName: "weatherPlugin",
      pluginData: { error: "no plugin provided" },
    });
    return;
  }
  try {
    const response = await fetch(WEATHER_API + city);
    if (!response.ok) throw new Error("City not found.");
    const data = await response.json();
    const weatherInfo = `Weather in ${data.location.name}: ${data.current.condition.text}, Temperature: ${data.current.temp_c}°C`;
    simulateAssistantResponse({
      responseContent: weatherInfo,
      setChatHistory,
      timeoutRef,
      pluginName: "weatherPlugin",
      pluginData: {
        location: data.location.name,
        condition: data.current.condition.text,
        temperature: data.current.temp_c + "°C",
      },
    });
  } catch (error) {
    console.log(error);
    simulateAssistantResponse({
      responseContent: `Error fetching weather data: ${error.message}`,
      setChatHistory,
      timeoutRef,
      pluginName: "weatherPlugin",
      pluginData: { error: `Error fetching weather data: ${error.message}` },
    });
  }
}
