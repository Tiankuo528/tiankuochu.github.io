document.addEventListener('DOMContentLoaded', () => {
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    const chatWindow = document.querySelector('.chat-window');
    const suggestionChips = document.querySelectorAll('.chip');
    const botLabelName = "TIANKUO (BOT):";

    // --- Customize Bot Responses Here ---
    const botResponses = {
        "what is your background?": "I am a Software Engineer with a Master's degree in Computer Science from Stevens Institute of Technology. I have experience in full-stack development and cloud technologies.",
        "tell me about your projects": "One of my key projects involved developing a machine learning application to predict stock prices. I've also worked on a full-stack e-commerce website. You can find more details on my GitHub profile!",
        "what are your technical skills?": "My skills include JavaScript, Python, React, Node.js, and cloud platforms like AWS and Google Cloud.",
        "where did you study?": "I completed my Master's in Computer Science at Stevens Institute of Technology and my Bachelor's at Beijing University of Technology.",
        "default": "That's a great question! For more specific details, feel free to check out my LinkedIn or GitHub profiles, or ask me something else about my background, projects, or skills."
    };
    // ------------------------------------

    const getBotResponse = (userText) => {
        const lowerCaseText = userText.toLowerCase().replace(/[?]/g, '');
        return botResponses[lowerCaseText] || botResponses["default"];
    };

    const sendMessage = (question) => {
        const userText = question || userInput.value.trim();
        if (userText === "") return;

        appendMessage(userText, 'user');
        if (!question) {
            userInput.value = '';
        }

        // Simulate bot thinking
        setTimeout(() => {
            const botReply = getBotResponse(userText);
            appendMessage(botReply, 'bot');
        }, 1000);
    };

    const appendMessage = (text, type) => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chat-message', type);

        if (type === 'bot') {
            const botLabel = document.createElement('span');
            botLabel.className = 'bot-label';
            botLabel.innerText = botLabelName;
            messageDiv.appendChild(botLabel);
        }

        const p = document.createElement('p');
        p.innerText = text;
        messageDiv.appendChild(p);

        chatWindow.appendChild(messageDiv);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    };

    // --- Event Listeners ---
    sendButton.addEventListener('click', () => sendMessage());

    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    suggestionChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const question = chip.getAttribute('data-question');
            sendMessage(question);
        });
    });
});
