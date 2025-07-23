document.addEventListener('DOMContentLoaded', () => {
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    const chatWindow = document.querySelector('.chat-window');
    const suggestionChips = document.querySelectorAll('.chip');
    const thinkingIndicator = document.createElement('div');
    thinkingIndicator.className = 'chat-message bot';
    thinkingIndicator.innerHTML = '<p>Thinking...</p>';

    const sendMessage = async () => {
        const userText = userInput.value.trim();
        if (userText === "") return;

        appendMessage(userText, 'user');
        userInput.value = '';
        chatWindow.appendChild(thinkingIndicator);
        chatWindow.scrollTop = chatWindow.scrollHeight;

        try {
            // Call our backend API
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: userText })
            });

            if (!response.ok) {
                throw new Error('Something went wrong on the server.');
            }

            const data = await response.json();
            const botResponse = data.reply;
            
            chatWindow.removeChild(thinkingIndicator); // Remove "Thinking..."
            appendMessage(botResponse, 'bot');

        } catch (error) {
            console.error("Error:", error);
            chatWindow.removeChild(thinkingIndicator);
            appendMessage("Sorry, I'm having trouble connecting to my brain right now. Please try again later.", 'bot');
        }
    };

    const appendMessage = (text, type) => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chat-message', type);
        
        const p = document.createElement('p');
        p.innerText = text;
        messageDiv.appendChild(p);

        if (type === 'bot') {
            const botLabel = document.createElement('span');
            botLabel.className = 'bot-label';
            botLabel.innerText = 'FIONA (BOT):'; // Change to your name
            messageDiv.prepend(botLabel);
        }

        chatWindow.appendChild(messageDiv);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    };

    // Event Listeners
    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    suggestionChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const question = chip.getAttribute('data-question');
            userInput.value = question;
            sendMessage();
        });
    });
});
