document.addEventListener('DOMContentLoaded', () => {
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    const chatWindow = document.querySelector('.chat-window');
    const suggestionChips = document.querySelectorAll('.chip');

    // --- 在这里定制你的机器人回复 ---
    const botResponses = {
        "what is your background?": "I'm a Machine Learning Engineer with a passion for building intelligent systems. I graduated from [Your University] with a degree in [Your Degree]. My professional journey includes working at [Your Previous Company], where I specialized in [Your Specialization].",
        "tell me about your projects": "Sure! One of my key projects is [Project Name], where I developed [Brief Description]. I used technologies like Python, TensorFlow, and Scikit-learn. You can find more details on my GitHub!",
        "what are your technical skills?": "My technical skills include: \n- Languages: Python, Java, C++ \n- ML/DL Frameworks: TensorFlow, PyTorch, Scikit-learn \n- Tools: Docker, Git, Kubernetes \n- Cloud: AWS, Google Cloud Platform.",
        "where did you study?": "I studied at [Your University] and earned a Bachelor of Science in Computer Science.",
        "why are you a fit for [role]?": "I believe my experience in [mention a key skill from your resume] and my proven ability to [mention an achievement] make me a strong candidate for this role. I am passionate about [mention something relevant to the company/role] and eager to contribute to the team.",
        "default": "That's a great question! I'm not programmed to answer that specifically yet. Try asking about my background, projects, or skills. You can also contact me through LinkedIn for more detailed inquiries."
    };
    // ------------------------------------

    const sendMessage = () => {
        const userText = userInput.value.trim();
        if (userText === "") return;

        // Display user message
        appendMessage(userText, 'user');
        userInput.value = '';

        // Trigger bot response
        setTimeout(() => {
            getBotResponse(userText);
        }, 1000);
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
            botLabel.innerText = 'FIONA (BOT):';
            messageDiv.prepend(botLabel);
        }

        chatWindow.appendChild(messageDiv);
        chatWindow.scrollTop = chatWindow.scrollHeight; // Auto-scroll to bottom
    };

    const getBotResponse = (userText) => {
        const lowerCaseText = userText.toLowerCase().replace(/[?]/g, '');
        let response = botResponses[lowerCaseText] || botResponses["default"];
        
        appendMessage(response, 'bot');
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
