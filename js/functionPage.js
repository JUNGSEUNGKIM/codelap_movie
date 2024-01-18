function testSort(){
    movieArray[0][7];
    var indexMovie;
    for(var i=0; i < movieArray.length ; i++){
       if(indexMovie.length === 0){
           indexMovie.push(i,movieArray[i][0]);
       }else{

       }

    }
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


function sortCategoryView(){
    var arrayWithIndices = movieArray.map(
        function (row, index) {
        return {data: row, index: index};
    });
    arrayWithIndices.sort(function (a, b) {
        return b.data[7] - a.data[7];
    });

    var sortedIndices = arrayWithIndices.map(function (item) {
        return item.index;
    });

    return sortedIndices;
}



function sortUp(logFile){

    // alert(logFile)
    var logfile = logFile.split(",");
    var category;
    for(var i=0; i < movieArray.length; i++){
        // alert(logfile[logfile.length-1]);
        if(movieArray[i][1].toLowerCase().includes(logfile[logfile.length-1])){
            // alert("hello")
            category = movieArray[i][6];
            break;
        }
    }

    var arrayWithIndices = movieArray.map(function (row, index){
        return {data:row, index:index};
    });
    arrayWithIndices.sort(function (a,b){
        return b.data[7] - a.data[7];
    });
    $("#gallerySort").empty();
    $("#gallerySort").bxSlider().destroySlider();

    sortArea(textSortArea(category,arrayWithIndices));
    // textSort();
    $('#gallerySort').bxSlider({
        minSlides: 4,
        maxSlides: 5,
        slideWidth: 300,
        slideMargin: 20,
    });
    $(function (){
        $(".bx-wrapper").css('max-width', '100%');
    });

    $(function () {
        var indexAr = 0;
        $(".gallery-item").hover(function () {
            // img_src = $(this).find('img').attr('src');
            // alert($(this).find('img').attr('id'));
            for (var i = 0; i < movieArray.length; i++) {
                if (parseInt($(this).find('img').attr('id')) === parseInt(movieArray[i][0])) {
                    indexAr = i;
                    // alert("if문: "+i);
                    break;
                }
            }
            $(this).find('img').hide();
            $(this).find('iframe').attr('src', movieArray[parseInt(indexAr)][5]);
            $(this).find('iframe').show();

        }, function () {
            // alert(indexAr);
            $(this).find('iframe').hide();
            // $(this).find('iframe').attr('src', "#");
            $(this).find('img').attr('href', movieArray[parseInt(indexAr)][1]);
            $(this).find('img').show();
        });
    });

    var sortedIndices = arrayWithIndices.map(function (item){
        return item.index;
    });
}


function sortArea(sortedIndices){
    // alert(tagidName);
    for (var i = 0; i < sortedIndices.length; i++) {
        // for(var j = 0; j < movieArray[i].length; j++) {
        $("#gallerySort").append(

            "<div class='gallery-item'>" +
            "<img src='" + movieArray[sortedIndices[i]][1] + "' alt='ab' id='" + movieArray[sortedIndices[i]][0] + "'>" +
            "<iframe style='display:none' width='100%' height='100%' src='loading.html' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;' allowfullscreen='1'></iframe>" +


            "<div style='width: 100%; height: 20%; '><h4>" + " 제목 :" + movieArray[sortedIndices[i]][2] + "</h4>" +
            "<h5>" + "출연진 :" + movieArray[sortedIndices[i]][3] + "</h5><div><button onclick='recentAction("+movieArray[sortedIndices[i]][0]+")' </div>");
     }

}
function textSort(tagId,sortedIndices){
    // alert(tagidName);
    for (var i = 0; i < sortedIndices.length; i++) {
        // console.log(sortedIndices);
        // for(var j = 0; j < movieArray[i].length; j++) {
        $("#"+tagId+"").append(
            "<div class='gallery-item'>" +
            "<img src='" + movieArray[sortedIndices[i]][1] + "' alt='ab' id='" + movieArray[sortedIndices[i]][0] + "'>" +

            "<iframe style='display:none' width='100%' height='100%' src='loading.html' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;' allowfullscreen='1'></iframe>" +
            "<h4>" + " 제목 :" + movieArray[sortedIndices[i]][2] + "</h4>" +
            "<h5>" + "출연진 :" + movieArray[sortedIndices[i]][3] + "</h5></div>");
    }
}

function textSort1(sortedIndices){
    // alert(tagidName);
    for (var i = 0; i < sortedIndices.length; i++) {
        // console.log(sortedIndices);
        // for(var j = 0; j < movieArray[i].length; j++) {
        $("#gallerySortMovie1").append(
            "<div class='gallery-item'>" +
            "<img src='" + movieArray[sortedIndices[i]][1] + "' alt='ab' id='" + movieArray[sortedIndices[i]][0] + "'>" +

            "<iframe style='display:none' width='100%' height='100%' src='#' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;' allowfullscreen='1'></iframe>" +
            // "<iframe style='display:none' width='100' height='100%' src='https://www.youtube.com/embed/64aNeYsa6Iw?autoplay=1&mute=1' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' allowfullscreen='0'></iframe>" +
            "<h4>" + " 제목 :" + movieArray[sortedIndices[i]][2] + "</h4>" +
            "<h5>" + "출연진 :" + movieArray[sortedIndices[i]][3] + "</h5></div>");
    }
}

function textSort2(sortedIndices){
    // alert(tagidName);
    for (var i = 0; i < sortedIndices.length; i++) {
        // console.log(sortedIndices);
        // for(var j = 0; j < movieArray[i].length; j++) {
        $("#gallerySortMovie2").append(
            "<div class='gallery-item'>" +
            "<img src='" + movieArray[sortedIndices[i]][1] + "' alt='ab' id='" + movieArray[sortedIndices[i]][0] + "'>" +

            "<iframe style='display:none' width='100%' height='100%' src='#' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;' allowfullscreen='1'></iframe>" +
            // "<iframe style='display:none' width='100' height='100%' src='https://www.youtube.com/embed/64aNeYsa6Iw?autoplay=1&mute=1' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' allowfullscreen='0'></iframe>" +
            "<h4>" + " 제목 :" + movieArray[sortedIndices[i]][2] + "</h4>" +
            "<h5>" + "출연진 :" + movieArray[sortedIndices[i]][3] + "</h5></div>");
    }
}

function textSortArea(sort,arrayWithIndices){
    var filteredIndices = arrayWithIndices.filter(function (item) {
        return item.data[6] === sort;
    }).map(function (item) {
        return item.index;
    });
    return filteredIndices;
}
