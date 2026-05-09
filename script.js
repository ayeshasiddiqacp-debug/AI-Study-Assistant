const API_KEY = "AIzaSyDa6DpaZrJ7xkeeMfQEo4qpwRzfZwIVD1U";

async function callGemini(promptText) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

    const requestData = {
        contents: [
            {
                parts: [{ text: promptText }]
            }
        ]
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestData)
        });

        const data = await response.json();

        if (data.candidates && data.candidates.length > 0) {
            return data.candidates[0].content.parts[0].text;
        }

        if (data.error) {
            return "Error: " + data.error.message;
        }

        return "No response from AI.";

    } catch (error) {
        return "Fetch Error: " + error.message;
    }
}
async function askAI() {
    let userText = document.getElementById("userInput").value;

    if (userText.trim() === "") {
        alert("Please enter a question!");
        return;
    }

    let outputDiv = document.getElementById("output");

    // Show user question
    outputDiv.innerHTML += `<div class="msg user"><b>You:</b><br>${userText}</div>`;

    // Show loading message
    outputDiv.innerHTML += `<div class="msg ai" id="loading"><b>AI:</b><br>Loading...</div>`;

    document.getElementById("userInput").value = "";

    let result = await callGemini("Answer this question clearly:\n" + userText);

    // Remove loading
    let loadingDiv = document.getElementById("loading");
if(loadingDiv) loadingDiv.remove();

    // Show AI answer
    outputDiv.innerHTML += `<div class="msg ai"><b>AI:</b><br>${result}</div>`;

    // Auto scroll down
    outputDiv.scrollTop = outputDiv.scrollHeight;
}

async function summarizeText() {
    let userText = document.getElementById("userInput").value;

    if (userText.trim() === "") {
        alert("Please paste some text to summarize!");
        return;
    }

    let result = await callGemini("Summarize this text in short bullet points:\n" + userText);
    document.getElementById("output").innerText = result;
}

async function generateQuiz() {
    let userText = document.getElementById("userInput").value;

    if (userText.trim() === "") {
        alert("Please enter a topic to generate quiz!");
        return;
    }

    let result = await callGemini("Generate 5 quiz questions with answers on this topic:\n" + userText);
    document.getElementById("output").innerText = result;
}

function clearOutput(){
    document.getElementById("output").innerHTML = "";
    document.getElementById("userInput").value = "";
}