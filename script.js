document.addEventListener('DOMContentLoaded', () => {
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    const suggestionChips = document.querySelectorAll('.chip');
    const chatWindow = document.querySelector('.chat-window');
    
    // This function displays a message in the chat window.
    const displayMessage = (text, type) => {
        const messageHtml = `
            <div class="chat-message ${type}">
                ${type === 'bot' ? '<span class="bot-label">TIANKUO (BOT):</span>' : ''}
                <p>${text}</p>
            </div>
        `;
        // This will clear previous messages and show the new one.
        chatWindow.innerHTML = messageHtml;
    };

    // This function sends the user's question to the backend API.
    const handleQuery = async (query) => {
        const userText = query.trim();
        if (userText === "") return;

        // Display the user's question immediately.
        displayMessage(userText, 'user');
        
        // Show a "thinking" message while waiting for the AI.
        setTimeout(() => displayMessage("...", 'bot'), 200);

        try {
            // Send the question to your backend API endpoint.
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: userText })
            });

            if (!response.ok) {
                throw new Error('The request to the AI server failed.');
            }

            const data = await response.json();
            
            // Display the AI's actual reply.
            displayMessage(data.reply, 'bot');

        } catch (error) {
            console.error("Error:", error);
            displayMessage("Sorry, I'm having trouble connecting to my brain right now. Please try again later.", 'bot');
        }
    };

    // --- Event Listeners ---
    sendButton.addEventListener('click', () => handleQuery(userInput.value));

    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleQuery(userInput.value);
        }
    });

    suggestionChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const question = chip.getAttribute('data-question');
            userInput.value = question;
            handleQuery(question);
        });
    });
});
