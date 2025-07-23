// script.js
document.addEventListener('DOMContentLoaded', () => {
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    const chatWindow = document.querySelector('.chat-window');
    const suggestionChips = document.querySelectorAll('.chip');

    const sendMessage = async (text) => {
        const userText = text || userInput.value.trim();
        if (userText === "") return;

        appendMessage(userText, 'user');
        if (!text) userInput.value = ''; // 只有当不是点击chip时才清空

        // 显示"思考中"的提示
        const thinkingDiv = appendMessage('正在思考中...', 'bot');

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: userText }),
            });

            if (!response.ok) throw new Error('Network response was not ok.');
            
            const data = await response.json();
            
            // 移除"思考中"，并显示AI的真实回复
            thinkingDiv.querySelector('p').innerText = data.reply;

        } catch (error) {
            thinkingDiv.querySelector('p').innerText = '抱歉，我的大脑暂时短路了，请稍后再试。';
            console.error('Error:', error);
        }
    };

    const appendMessage = (text, type) => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chat-message', type);
        const p = document.createElement('p');
        p.innerText = text;
        messageDiv.appendChild(p);
        chatWindow.appendChild(messageDiv);
        chatWindow.scrollTop = chatWindow.scrollHeight;
        return messageDiv;
    };

    sendButton.addEventListener('click', () => sendMessage());
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
    suggestionChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const question = chip.getAttribute('data-question');
            sendMessage(question);
        });
    });

    // 初始欢迎语
    setTimeout(() => {
        appendMessage('你好！你可以开始向我提问了。', 'bot');
    }, 500);
});
