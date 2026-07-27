import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI();
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');
const chatMessages = document.getElementById('chat-messages');

function appendMessage(text, isUser) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message');
    msgDiv.classList.add(isUser ? 'user-message' : 'bot-message');
    msgDiv.textContent = text;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const message = userInput.value.trim();
    if (!message) return;

    appendMessage(message, true);
    userInput.value = '';

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: message,
            config: {
                systemInstruction: "أنت مساعد ذكي اسمك Grivat AI وتتحدث بالدارجة المغربية بأسلوب لطيف ومفيد."
            }
        });

        appendMessage(response.text, false);
    } catch (error) {
        console.error(error);
        appendMessage('عذراً، وقع خطأ فـ الاتصال. حاول مرة أخرى!', false);
    }
});
