document.addEventListener('DOMContentLoaded', () => {
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    const chatWindow = document.querySelector('.chat-window');
    const suggestionChips = document.querySelectorAll('.chip');
    // UPDATE THIS: Change the bot name
    const botLabelName = "TIANKUO (BOT):";

    // Function to handle sending a message
    const sendMessage = async (question) => {
        const userText = question || userInput.value.trim();
        if (userText === "") return;

        // Display user's message
        appendMessage(userText, 'user');
        if (!question) {
            userInput.value = '';
        }

        // Show a "thinking..." indicator
        const thinkingMessage = appendMessage('...', 'bot');

        try {
            // Call your backend API endpoint
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: userText })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to get a response.');
            }

            const data = await response.json();
            // Update the "thinking" message with the actual reply
            thinkingMessage.querySelector('p').innerText = data.reply;

        } catch (error) {
            console.error("Error:", error);
            thinkingMessage.querySelector('p').innerText = "Sorry, I'm having trouble connecting right now. Please try again later.";
        }
    };

    // Function to add a message to the chat window
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
        // Auto-scroll to the latest message
        chatWindow.scrollTop = chatWindow.scrollHeight;
        return messageDiv; // Return the element so we can update it
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
