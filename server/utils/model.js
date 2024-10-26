require('dotenv').config();
async function createChatSession() {
    const response = await fetch('https://api.on-demand.io/chat/v1/sessions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'apikey': process.env.OD_API_KEY
        },
        body: JSON.stringify({
            "pluginIds": [],
            "externalUserId": process.env.OD_AGENT_ID
        })
    });

    const data = await response.json();
    return data.data.id;
}

// Function to submit a query using the session ID
async function submitQuery(query) {
    const sessionId = await createChatSession();
    const response = await fetch(`https://api.on-demand.io/chat/v1/sessions/${sessionId}/query`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'apikey': process.env.OD_API_KEY
        },
        body: JSON.stringify({
            "endpointId": "predefined-openai-gpt4o",
            "query": query,
            "pluginIds": ["plugin-1712327325", "plugin-1713962163", "plugin-1729892940"],
            "responseMode": "sync"
        })
    });

    const data = await response.json();
    return data.data.answer;
}

module.exports = { submitQuery };
