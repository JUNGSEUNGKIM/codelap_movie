$(document).ready(function() {
    // const chatContainer = $('#chat-container');
     const chatContainer = $('#cartContent');
    let CATEGORY_STATUS = 1;

    // 메세지를 화면에 추가
    function appendMessage(sender, message) {
        const messageElement = $('<div></div>').html(`<strong>${sender}:</strong> ${message}`);
        chatContainer.append(messageElement);
        chatContainer.scrollTop(chatContainer.prop('scrollHeight'));
    }

    // 초기 환영 메세지 출력
    function showWelcomeMessage() {
        appendMessage('<br>Chatbot', '<br>코드랩 쇼핑몰에 오신 것을 환영합니다.' +
            '<br>저희 쇼핑몰은 신발, 의류 전문몰입니다.' +
            '<br>아래 주제에 대해서 문의해주세요.' +
            '<p> 1. 신발<br> 2. 의류<br>');
    }

    // 사용자 메시지 처리 및 응답
    function sendMessage(userMessage) {
        appendMessage('User', userMessage);

        if (CATEGORY_STATUS === 1) {
            // 상위 카테고리에 따른 응답 추가
            if (userMessage.toLowerCase().includes('1') || userMessage.toLowerCase().includes('신발')) {
                showSubCategories(['운동화', '구두', '샌들']);
                CATEGORY_STATUS = 2;
            } else if (userMessage.toLowerCase().includes('2') || userMessage.toLowerCase().includes('의류')) {
                showSubCategories(['여성의류', '남성의류', '유아의류']);
                CATEGORY_STATUS = 2;
            } else {
                // 다른 키워드에 대한 기본 응답
                setTimeout(function() {
                    appendMessage('Chatbot', '안녕하세요! 다른 도움이 필요하신가요?<br>');
                }, 500);
            }
        } else if (CATEGORY_STATUS === 2) {
            // 사용자가 하위 카테고리에 대해 물어보는 경우
            const selectedCategory = userMessage.toLowerCase();
            if (selectedCategory.includes('운동화') || selectedCategory.includes('구두') || selectedCategory.includes('샌들')) {
                sendSubCategoryMessage(selectedCategory, ['운동화', '구두', '샌들']);
                showSubCategories(['운동화', '구두', '샌들']);
            } else if (selectedCategory.includes('여성의류') || selectedCategory.includes('남성의류') || selectedCategory.includes('유아의류')) {
                sendSubCategoryMessage(selectedCategory, ['여성의류', '남성의류', '유아의류']);
                showSubCategories(['여성의류', '남성의류', '유아의류']);
            } else if (userMessage === '0') {
                showWelcomeMessage();
                CATEGORY_STATUS = 1;
            } else {
                // 다른 키워드에 대한 기본 응답
                appendMessage('<br>Chatbot', '<br>죄송합니다. 입력하신 정보로는 처리할 수 없습니다.<br>');
            }
        }

        userInput.val('');
    }

    // 하위 카테고리 출력
    function showSubCategories(subCategories) {
        setTimeout(function() {
            appendMessage('<br>Chatbot', '<br>아래에서 주제를 선택해주세요:<p>');
            for (let i = 0; i < subCategories.length; i++) {
                chatContainer.append(`${i + 1}. ${subCategories[i]}<br>`);
            }
            chatContainer.append('0. 상위 메뉴<br>');
            chatContainer.scrollTop(chatContainer.prop('scrollHeight'));
        }, 500);
    }

    // 하위 카테고리에 대한 응답 메세지
    function sendSubCategoryMessage(selectedCategory, subCategories) {
        const selectedSubCategory = subCategories.find(sub => selectedCategory.includes(sub.toLowerCase()));
        if (selectedSubCategory) {
            setTimeout(function() {
                appendMessage('<br>Chatbot', `<br>${selectedSubCategory}에 대한 정보를 제공합니다.`);
            }, 500);
        } else {
            appendMessage('Chatbot', '죄송합니다. 입력하신 정보로는 처리할 수 없습니다.');
        }
    }

    // 초기 환영 메시지 출력
    showWelcomeMessage();

    // 입력창과 전송 버튼 생성
    // let inputContainer = $('<div id="input-container"></div>').appendTo('body');
    let inputContainer = $('<div id="input-container"></div>').appendTo(document.getElementById('cartContent'));
    let userInput = $('<input type="text" id="user-input" placeholder="메시지를 입력하세요">').appendTo(inputContainer);
    let sendBtn = $('<button id="send-btn">전송</button>').appendTo(inputContainer);

    // 전송 버튼 클릭 이벤트
    sendBtn.click(function() {
        const userMessage = userInput.val();
        sendMessage(userMessage);
    });

    // 엔터 키 입력 이벤트
    userInput.keypress(function(event) {
        if (event.which === 13) {
            const userMessage = userInput.val();
            sendMessage(userMessage);
        }
    });
});