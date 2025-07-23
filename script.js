document.addEventListener('DOMContentLoaded', () => {
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    const suggestionChips = document.querySelectorAll('.chip');
    const chatWindow = document.querySelector('.chat-window');
    
    // --- Bot Responses Based on Your Resume ---
    const botResponses = {
        "what is your background?": "I am a Machine Learning Engineer and a Ph.D. candidate in Mechanical Engineering at the University of Delaware, expecting to graduate in December 2025. My research is focused on Medical AI, and I have a first-author publication at ICLR 2025.",
        "tell me about your projects": "At Dow, I deployed a production-grade LLM system using GraphRAG and LORA for root-cause analysis. In my research, I led the development of BoneMet, a large-scale medical dataset, and engineered a novel Vision Transformer model for diagnosis, which was accepted at ICLR 2025.",
        "what are your technical skills?": "My skills include programming in Python, SQL, and C++; LLM & Deep Learning with PyTorch, Transformers, RAG, and LoRA; and MLOps using Docker, Kubernetes, CI/CD, and AWS.",
        "where did you study?": "I am completing my Ph.D. at the University of Delaware. I earned my Bachelor of Engineering from Beijing University of Chemical Technology.",
        "default": "That's a great question. My resume covers my experience in deploying production-grade LLM systems and my research in Medical AI. For more specific details, feel free to check out my LinkedIn or GitHub profiles!"
    };

    // --- Chatbot Display and Logic ---
    const displayMessage = (text, type) => {
        const messageHtml = `
            <div class="chat-message ${type}">
                ${type === 'bot' ? '<span class="bot-label">TIANKUO (BOT):</span>' : ''}
                <p>${text}</p>
            </div>
        `;
        // Clear previous messages and add new one
        chatWindow.innerHTML = messageHtml;
    };

    const handleQuery = (query) => {
        const userText = query.trim();
        if (userText === "") return;

        displayMessage(userText, 'user');
        
        setTimeout(() => {
            const responseKey = userText.toLowerCase().replace(/[?]/g, '');
            const botReply = botResponses[responseKey] || botResponses['default'];
            displayMessage(botReply, 'bot');
        }, 1000);
    };

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
