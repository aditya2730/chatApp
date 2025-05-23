# 🔌 AI Chatbot with Plugin-Based Architecture

This project is a smart assistant chat interface that supports command-style plugins like `/weather`, `/define`, and `/calc`. It is built with React and allows easy extension through a plugin-based architecture.

---

## 📦 Features

- Plugin support via slash commands (e.g., `/weather Mumbai`)
- Plugin output handled with contextual UI rendering
- Graceful fallback for unsupported commands
- Asynchronous assistant responses with loading indicator

---

## 🛠️ Setup & Running Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name





Install Dependencies
npm install


Start the Development Server
npm run dev


🔍 Plugin Architecture

🧠 How It Works
Command Parsing is done using a dispatcher function that analyzes user input and routes it to the appropriate plugin.

Each plugin is a standalone function that:

Extracts arguments (e.g., city for /weather)

Calls the respective API

Returns a response string and optional plugin metadata

📁 File Structure
/src
  /plugins
    weather.js
    define.js
    calc.js
  /utils
    dispatcher.js
    chatUtils.js
 /components
    ChatInput.jsx
    ChatContainer.jsx



🔌 Plugins Implemented
1. /weather [city]
API: OpenWeatherMap

Description: Returns current weather conditions and temperature.

2. /define [word]
API: Free Dictionary API

Description: Provides the primary definition of a word.

3. /calc [expression]
Library: Uses mathjs internally

Description: Evaluates basic mathematical expressions.



🧠 Parsing & Dispatch Logic
All input is passed to handleInput(input, setChatHistory, timeoutRef), which:

Matches against known plugin prefixes (/weather, /define, etc.)

Validates arguments (e.g., presence of a city or word)

Invokes the appropriate plugin logic

Returns structured assistant response via simulateAssistantResponse




💬 Message Structure
Each chat message conforms to the following schema:
{
  id: string; // UUID
  sender: "user" | "assistant";
  content: string; // Raw text or markdown
  type: "text" | "plugin"; // Distinguishes normal vs plugin messages
  pluginName?: string; // e.g., "weather"
  pluginData?: any; // Plugin-specific structured data
  timestamp: string; // ISO timestamp
}



🧪 Example Usage
/weather Tokyo
/define serendipity
/calc 5 * (3 + 2)

