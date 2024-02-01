
/* 챗봇 */

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


function findMovieMessage(userMessage){
    var findMessage = "not found";
    // alert("hello");
    for(var i = 0; i < movieArray.length ; i++){
        if(movieArray[i][2].toLowerCase().includes(userMessage)){
            findMessage = movieArray[i][0];
            break;
        }
    }
    return findMessage;
}

function sortArrayUp(){
    var arrayWithIndices = movieArray.map(
        function (row, index) {
            return {data: row, index: index};
        });
    arrayWithIndices.sort(function (a, b) {
        return b.data[7] - a.data[7];
    });

    // var sortedIndices = arrayWithIndices.map(function (item) {
    //     return item.index;
    // });

    return arrayWithIndices;
}

function textSortAreaNational(sort,arrayWithIndices){
    // alert(sort);

    var filteredIndices = arrayWithIndices.filter(function (item) {
        return item.data[1].split("/")[1].split("_")[0] === sort;
    }).map(function (item) {
        return item.index;
    });
    return filteredIndices;
}

function textSortAreaGenre(sort,arrayWithIndices){
    // alert("여긴와?")
    var filteredIndices = arrayWithIndices.filter(function (item) {
        return item.data[6] === sort;
    }).map(function (item) {
        return item.index;
    });
    return filteredIndices;
}

function textSortAreaNaGe(national,gener,arrayWithIndices){
    var filteredIndices = arrayWithIndices.filter(function (item) {
        return item.data[6] === gener;
    }).filter(function (item) {
        return item.data[1].split("/")[1].split("_")[0] === national;
    }).map(function (item) {
            return item.index;
    });

    return filteredIndices;
}

function sortChatBotView(sortedNational) {
    // alert("hello");
    $("#colContainer").children().empty();
    var minNumber = 3 < sortedNational.length ? 3 :sortedNational.length;
    for (var i = 0; i < minNumber; i++) {

        $("#colContainer").children().append("<div class='col'>"+
            "<div class='card shadow-sm'>" +
            "<img src='"+movieArray[sortedNational[i]][1]+"' alt='"+movieArray[sortedNational[i]][1].split("/")[1]+"' style='width:100%; height:225px;'>"+
            "<div class='card-body' style='height: 150px; position:relative;'>" +
            "<p class='card-text'>"+movieArray[sortedNational[i]][2]+"</p>"+
            "<div class='d-flex justify-content-between align-items-center' style='position: absolute; bottom:10px;'>" +
            "<div class='btn-group'>" +
            "<button type='button' onclick='recentAction(" +movieArray[sortedNational[i]][0]+ ")' class='btn btn-primary' style='font-size: 10px;'>구매하기</button>"+
            "</div>" +
            " <small class='text-body-secondary' style='margin:10px;'>" +
            "</small></div>"+
            "</div></div></div>");





    }
    // alert($(this).parent().attr('id'));
   $("#sortChatBot").css("display","block");
    // alert(parseInt($(this).parent().attr('id'));
    // document.getElementById('movieImageTag').src=movieArray[parseInt(indexMA)-1][1];
    // document.getElementById('movieTextArea').querySelector('h2').textContent = "제목  : " + movieArray[parseInt(indexMA)-1][2];
    // document.getElementById('movieTextArea').querySelector('h4').textContent = "출연진  : " + movieArray[parseInt(indexMA)-1][3];
    // document.getElementById('movieTextArea').querySelector('h5').textContent = "줄거리  : " + movieArray[parseInt(indexMA)-1][4];

    // $(".gallery").empty();
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
            '<p> 제목이나 추천받고 싶은 영화를 적어주세요.<br>');
    }


    // 사용자 메시지 처리 및 응답
    function sendMessage(userMessage) {
        appendMessage('User', userMessage);
        // CATEGORY_STATUS=parseInt(userMessage);
        var movieTitle = findMovieMessage(userMessage);
        var inputItem = [];
        var national = "";
        var genre = "";
        if(parseInt(userMessage) >= 0 || parseInt(userMessage) <= 5){
            if (CATEGORY_STATUS === 1) {
                // 상위 카테고리에 따른 응답 추가
                // alert(userMessage.toLowerCase().includes('2'));
                if (userMessage.toLowerCase().includes('1') || userMessage.toLowerCase().includes('국가별')) {
                    showSubCategories(['한국', '외국']);

                    // CATEGORY_STATUS = 2;
                } else if (userMessage.toLowerCase().includes('2') || userMessage.toLowerCase().includes('카테고리별')) {
                    showSubCategories(['액션', '로맨스', '호러']);

                    // CATEGORY_STATUS = 2;
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
                // const selectedCategory = userMessage.toLowerCase();
                // if (selectedCategory.includes('1') || selectedCategory.includes('2') ) {
                //     sendSubCategoryMessage(selectedCategory, ['운동화', '구두', '샌들']);
                //     showSubCategories(['운동화', '구두', '샌들']);
                // } else if (selectedCategory.includes('여성의류') || selectedCategory.includes('남성의류') || selectedCategory.includes('유아의류')) {
                //     sendSubCategoryMessage(selectedCategory, ['여성의류', '남성의류', '유아의류']);
                //     showSubCategories(['여성의류', '남성의류', '유아의류']);
                // } else if (userMessage === '0') {
                //     showWelcomeMessage();
                //     CATEGORY_STATUS = 1;
                // } else {
                //     // 다른 키워드에 대한 기본 응답
                //     appendMessage('<br>Chatbot', '<br>죄송합니다. 입력하신 정보로는 처리할 수 없습니다.<br>');
                // }
            }


       }else if(movieTitle !== "not found"){
            appendMessage('Chatbot', '검색하신 영화를 보여드립니다.<br>');

            setTimeout(function() {
                recentAction(parseInt(movieTitle));
                // appendMessage('Chatbot', '안녕하세요! 다른 도움이 필요하신가요?<br>');
                // showWelcomeMessage();
            }, 1200);
            // recentAction(parseInt(movieTitle));
        }else if(movieTitle === "not found"){
            if(userMessage.length !==1) {
                const searchItems = ["한국", "외국", "로멘스", "액션", "호러", "인기"];

                const sortedResults = searchItems
                    .map(item => ({item, similarity: calculateSimilarity(item.toLowerCase(), userMessage)}))
                    .sort((a, b) => b.similarity - a.similarity);



                for (var i = 0; i < sortedResults.length; i++) {
                    if (sortedResults[i].similarity > 0) {
                        if(sortedResults[i] === null || sortedResults[i] === undefined){
                            break;
                        }else if(sortedResults[i].item.toLowerCase().includes("한국")){
                            // alert("들어오나?")
                            national = "kor";
                            inputItem.push("kor");
                        }else if(sortedResults[i].item.toLowerCase().includes("외국")){
                            // alert("들어오나?")
                            national = "eng";
                            inputItem.push("eng");
                        }else if(sortedResults[i].item.toLowerCase().includes("로멘스")){
                            // alert("들어오나?")
                            genre = "rom";
                            inputItem.push("rom");
                        }else if(sortedResults[i].item.toLowerCase().includes("호러")){
                            // alert("들어오나?")
                            genre = "hor";
                            inputItem.push("hor");
                        }else if(sortedResults[i].item.toLowerCase().includes("액션")){
                            // alert("들어오나?")
                            genre = "act";
                            inputItem.push("act");
                        }                       // alert(sortedResults[i].item);
                    }
                }
                // alert(inputItem);

            }

            // alert(inputItem);
            var sortedIndices1 = sortArrayUp();
            var sortedNational;
            var sortedGenre;
            var sortedNAGE

            if(national === "kor" || national === "eng"){
                // sortedIndices1 = sortArrayUp();
                if(genre !== ""){
                    // alert("장르")
                    sortedNAGE = textSortAreaNaGe(national,genre,sortedIndices1);
                    appendMessage('Chatbot', '검색하신 영화를 보여드립니다.<br>');

                    setTimeout(function() {
                        sortChatBotView(sortedNAGE);
                        // appendMessage('Chatbot', '안녕하세요! 다른 도움이 필요하신가요?<br>');
                        // showWelcomeMessage();
                    }, 1200);

                    // alert("널 아님")
                    var sortArrayGen ;
                }else{
                    // alert("국가별")
                    sortedNational=textSortAreaNational(national, sortedIndices1);
                    appendMessage('Chatbot', '검색하신 영화를 보여드립니다.<br>');

                    setTimeout(function() {

                        sortChatBotView(sortedNational);
                        // appendMessage('Chatbot', '안녕하세요! 다른 도움이 필요하신가요?<br>');
                        // showWelcomeMessage();
                    }, 1200);

                }
            }else if(national === "" ){
                // alert("장르만!!")
                sortedGenre = textSortAreaGenre(genre, sortedIndices1);
                appendMessage('Chatbot', '검색하신 영화를 보여드립니다.<br>');

                setTimeout(function() {
                    alert(sortedGenre);
                    sortChatBotView(sortedGenre);
                    // appendMessage('Chatbot', '안녕하세요! 다른 도움이 필요하신가요?<br>');
                    // showWelcomeMessage();
                }, 1200);

            }


        }else{

        }

        userInput.val('');







        // if (CATEGORY_STATUS === 1) {
        //     // 상위 카테고리에 따른 응답 추가
        //     // alert(userMessage.toLowerCase().includes('2'));
        //     if (userMessage.toLowerCase().includes('1') || userMessage.toLowerCase().includes('국가별')) {
        //         showSubCategories(['한국', '외국']);
        //         CATEGORY_STATUS = 2;
        //     } else if (userMessage.toLowerCase().includes('2') || userMessage.toLowerCase().includes('카테고리별')) {
        //         showSubCategories(['액션', '로맨스', '호러']);
        //         CATEGORY_STATUS = 2;
        //     } else {
        //         // 다른 키워드에 대한 기본 응답
        //         setTimeout(function() {
        //             appendMessage('Chatbot', '안녕하세요! 다른 도움이 필요하신가요?<br>');
        //             showWelcomeMessage();
        //         }, 500);
        //         // showWelcomeMessage();
        //     }
        // } else if (CATEGORY_STATUS === 2) {
        //     // 사용자가 하위 카테고리에 대해 물어보는 경우
        //     const selectedCategory = userMessage.toLowerCase();
        //     if (selectedCategory.includes('운동화') || selectedCategory.includes('구두') || selectedCategory.includes('샌들')) {
        //         sendSubCategoryMessage(selectedCategory, ['운동화', '구두', '샌들']);
        //         showSubCategories(['운동화', '구두', '샌들']);
        //     } else if (selectedCategory.includes('여성의류') || selectedCategory.includes('남성의류') || selectedCategory.includes('유아의류')) {
        //         sendSubCategoryMessage(selectedCategory, ['여성의류', '남성의류', '유아의류']);
        //         showSubCategories(['여성의류', '남성의류', '유아의류']);
        //     } else if (userMessage === '0') {
        //         showWelcomeMessage();
        //         CATEGORY_STATUS = 1;
        //     } else {
        //         // 다른 키워드에 대한 기본 응답
        //         appendMessage('<br>Chatbot', '<br>죄송합니다. 입력하신 정보로는 처리할 수 없습니다.<br>');
        //     }
        // }


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