
function calculateSimilarity(str1, str2) {
    var totalLength = 0;
    var similarityPercentage = 0;
    var minLength = 0;
    var matchCount = 0;
    // alert(str2);
    var strSplit = str2.split(" ");
    if(strSplit === 1) {
        for (var j = 0; j < strSplit[0].length; j++) {
            minLength = Math.min(str1.length, strSplit[0].length);
            if (str1[j] === strSplit[0][j]) {
                matchCount++;
            }
        }
        if(matchCount >= 2) {
            totalLength = (str1.length + strSplit[0].length - matchCount) / 2;
            similarityPercentage = (matchCount / totalLength) * 100;
            matchCount = 0;
        }else{
            matchCount = 0;
        }
    }else{
        for(var j = 0; j < strSplit.length ; j++) {
            minLength = Math.min(str1.length, strSplit[j].length);
            for (var i = 0; i < minLength; i++) {
                if (str1[i] === strSplit[j][i]) {
                    matchCount++;
                }
            }
            if(matchCount >= 2){
                totalLength = (str1.length + strSplit[j].length - matchCount) / 2;
                similarityPercentage = (matchCount / totalLength) * 100;
                matchCount = 0;
                break;
            }
        }
    }
    return similarityPercentage;
}

function sortChatBot(inputItem){
    for(var i = 0; i < inputItem.length ; i++){
       if(inputItem[i].toLowerCase().includes("kor") || inputItem[i].toLowerCase().includes("eng")){
           if (inputItem[i+1].toLowerCase().includes("rom") || inputItem[i+1].toLowerCase().includes("act") || inputItem[i+1].toLowerCase().includes("hor")){
              if(inputItem[i+2].toLowerCase().includes("up")) {

              }
           }

       }else if (inputItem[i].toLowerCase().includes("rom") || inputItem[i].toLowerCase().includes("act") || inputItem[i].toLowerCase().includes("hor")){

       }
    }
    var arrayWithIndices = movieArray.map(function (row, index){
        return {data:row, index:index};
    });
    arrayWithIndices.sort(function (a,b){
        return b.data[7] - a.data[7];
    });

    var sortedIndices = arrayWithIndices.map(function (item){
        return item.index;
    });
}




$(document).ready(function() {
    // const chatContainer = $('#chat-container');
     const chatContainer = $('#cartContent');
    let CATEGORY_STATUS = 1;

    // 메세지를 화면에 추가
    function appendMessage(sender, message) {
        // alert(sender);
         var messageElement="";
        if(sender == "User") {
            messageElement = $('<div style="border:1px solid yellow; background:yellow; width:180px; float:right; text-align: left; color:black;"></div>').html(`<strong>${sender}:</strong> ${message}`);

        }else{
            messageElement = $('<div style="border:1px solid gray; background:lightslategray; width:200px; float:left; text-align: left; color:black"></div>').html(`<strong>${sender}:</strong> ${message}`);
        }
        chatContainer.append(messageElement);
        chatContainer.scrollTop(chatContainer.prop('scrollHeight'));
    }

    // 초기 환영 메세지 출력
    function showWelcomeMessage() {
        appendMessage('Chatbot', '<br>보고싶은 영화가 있으신가요?' +

            '<br>' +
            '<p> 1. 국가별 2. 카테고리별<br>');
    }



    // 사용자 메시지 처리 및 응답
    function sendMessage(userMessage) {
        appendMessage('User', userMessage);
        // CATEGORY_STATUS=parseInt(userMessage);
        var inputItem = [];

        if(userMessage.length !==1) {
            const searchItems = ["한국", "외국", "로멘스", "액션", "호러", "인기"];

            const sortedResults = searchItems
                .map(item => ({item, similarity: calculateSimilarity(item.toLowerCase(), userMessage)}))
                .sort((a, b) => b.similarity - a.similarity);

            // var inputItem;
            for (var i = 0; i < sortedResults.length; i++) {
                if (sortedResults[i].similarity > 0) {
                    if(sortedResults[i] === null || sortedResults[i] === undefined){
                        break;
                    }else if(sortedResults[i].item.toLowerCase().includes("한국")){
                        // alert("들어오나?")
                        inputItem.push("kor");
                    }else if(sortedResults[i].item.toLowerCase().includes("외국")){
                        // alert("들어오나?")
                        inputItem.push("eng");
                    }else if(sortedResults[i].item.toLowerCase().includes("로멘스")){
                        // alert("들어오나?")
                        inputItem.push("rom");
                    }else if(sortedResults[i].item.toLowerCase().includes("호러")){
                        // alert("들어오나?")
                        inputItem.push("hor");
                    }else if(sortedResults[i].item.toLowerCase().includes("액션")){
                        // alert("들어오나?")
                        inputItem.push("act");
                    }else if(sortedResults[i].item.toLowerCase().includes("인기")){
                        // alert("들어오나?")
                        inputItem.push("up");
                    }
                    // alert(sortedResults[i].item);
                }
            }

            sortChatBot(inputItem);


            // alert(inputItem);



        }




        if (CATEGORY_STATUS === 1) {
            // 상위 카테고리에 따른 응답 추가
            // alert(userMessage.toLowerCase().includes('2'));
            if (userMessage.toLowerCase().includes('1') || userMessage.toLowerCase().includes('신발')) {
                showSubCategories(['ㅇ', '구두', '샌들']);
                CATEGORY_STATUS = 2;
            } else if (userMessage.toLowerCase().includes('2') || userMessage.toLowerCase().includes('의류')) {
                showSubCategories(['여성의류', '남성의류', '유아의류']);
                CATEGORY_STATUS = 2;
            } else {
                // 다른 키워드에 대한 기본 응답
                setTimeout(function() {
                    appendMessage('Chatbot', '안녕하세요! 다른 도움이 필요하신가요?<br>');
                    showWelcomeMessage();
                }, 500);
                // showWelcomeMessage();
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
        var chatString ="";
        setTimeout(function() {
            // appendMessage('<br>Chatbot', '<br>아래에서 주제를 선택해주세요:<p>');
            for (let i = 0; i < subCategories.length; i++) {
               // chatContainer.append(`${i + 1}. ${subCategories[i]}<br>`);
                chatString =chatString + `${i + 1}. ${subCategories[i]}<br>`;
            }
            chatString += '0. 상위 메뉴<br>';
            alert(chatString);
            appendMessage('<br>Chatbot', '<br>아래에서 주제를 선택해주세요:<p>'+chatString);
            // chatContainer.append('0. 상위 메뉴<br>');
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
    let userInput = $('<input type="text"  id="user-input" placeholder="메시지를 입력하세요">').appendTo(inputContainer);
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