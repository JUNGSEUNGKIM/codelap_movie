var img_src;


$(function () {
    var arrayWithIndices = movieArray.map(function (row, index) {
        return {data: row, index: index};
    });
    arrayWithIndices.sort(function (a, b) {
        return b.data[7] - a.data[7];
    });

    var sortedIndices = arrayWithIndices.map(function (item) {
        return item.index;
    });


    // alert("액션영화 인덱스 : " + filteredIndices);

    sortArea(sortedIndices);
    textSort("gallerySortMovie",textSortArea("act", arrayWithIndices));
    textSort("gallerySortMovie1",textSortArea("rom", arrayWithIndices));
    textSort("gallerySortMovie2",textSortArea("hor", arrayWithIndices));


    // alert(sortedIndices);

    // for (var i = 0; i < movieArray.length; i++) {
    //     // for(var j = 0; j < movieArray[i].length; j++) {
    //     $(".gallery").append("<div class='gallery-item'>" +
    //         "<img src='" + movieArray[sortedIndices[i]][1] + "' alt='ab' id='" + movieArray[sortedIndices[i]][0] + "'>" +
    //
    //         "<iframe style='display:none' width='100%' height='100%' src='#' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;' allowfullscreen='1'></iframe>" +
    //         // "<iframe style='display:none' width='100' height='100%' src='https://www.youtube.com/embed/64aNeYsa6Iw?autoplay=1&mute=1' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' allowfullscreen='0'></iframe>" +
    //         "<h4>" + " 제목 :" + movieArray[sortedIndices[i]][2] + "</h4>" +
    //         "<h5>" + "출연진 :" + movieArray[sortedIndices[i]][3] + "</h5></div>");
    // }
})

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


$(document).ready(function () {
    $('.gallery').bxSlider({
        minSlides: 4,
        maxSlides: 5,
        slideWidth: 300,
        slideMargin: 20,
    });
});

