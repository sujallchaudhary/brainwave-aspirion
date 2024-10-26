// Function to create a chat session
async function createChatSession(apiKey, externalUserId) {
    const response = await fetch('https://api.on-demand.io/chat/v1/sessions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'apikey': "zFiOXe4nSsuWMKbdHAJFVZ01nxnglqTC"
        },
        body: JSON.stringify({
            "pluginIds": [],
            "externalUserId": externalUserId
        })
    });

    const data = await response.json();
    return data.data.id; // Extract session ID
}

// Function to submit a query using the session ID
async function submitQuery(apiKey, sessionId, query) {
    const response = await fetch(`https://api.on-demand.io/chat/v1/sessions/${sessionId}/query`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'apikey': apiKey
        },
        body: JSON.stringify({
            "endpointId": "predefined-openai-gpt4o",
            "query": query,
            "pluginIds": ["plugin-1712327325", "plugin-1713962163", "plugin-1729892940"],
            "responseMode": "sync"
        })
    });

    const data = await response.json();
    return data;
}

// Example usage
(async () => {
    const apiKey = 'zFiOXe4nSsuWMKbdHAJFVZ01nxnglqTC';
    const externalUserId = 'plugin-1729892940';
    const query = `Given the individual's profile:
    {'Problem_Solving_Approach': 'Logical, step-by-step', 'Comfort_with_Technical_Tasks': 'Uncomfortable', 'Grasp_of_Technical_Concepts': 'Takes time', 'Work_Process_Preference': 'Trial and error', 'Task_Management_Style': 'Excellent at multitasking', 'Stress_Handling': 'Calm, but slow', 'Team_Role': 'Collaborator', 'Interaction_Preference': 'Collaborating with others', 'Decision_Making_Style': 'Consulting others', 'Adaptability_to_Change': 'Adjusts easily', 'Interest_Activity': 'Designing creative projects', 'Preferred_Projects': 'Event planning', 'Work_Life_Balance': 'Structured 9-to-5', 'Career_Motivation': 'Creative freedom', 'Personality': 'Leadership'}

Recommend a suitable career path and explain why.`;

    try {
        const sessionId = await createChatSession(apiKey, externalUserId);
        const response = await submitQuery(apiKey, sessionId, query);
        console.log(response.data.answer);
    } catch (error) {
        console.error('Error:', error);
    }
})();
