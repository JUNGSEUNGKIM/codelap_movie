
    const stockPrices = []; // 영화 영화를 저장할 배열
    let stockChart; // 영화 차트 변수를 전역으로 선언

    // 영화 차트 초기화
    const ctx = document.getElementById('stockChart').getContext('2d');
    stockChart = new Chart(ctx, {
    type: 'line',
    data: {
    labels: Array.from({ length: 10 }, (_, i) => ''),
    datasets: [{
    label: '영화 예매률',
    data: stockPrices,
    borderColor: 'rgba(75, 192, 192, 1)',
    borderWidth: 1,
    fill: false,
}],
},
    options: {
    scales: {
    y: {
    beginAtZero: false,
},
},
},
});

    function updateMovie() {
    // 현재 영화 예매률
    const currentPrice = parseFloat($('#stockPrice').text().replace(',', ''));

    // 랜덤한 예매률 생성 (-5%에서 5% 범위 내)
    const randomPercentage = (Math.random() - 0.8) * 10;

    // (소수점 이하 없는 정수로 변경)
    const priceChange = Math.round(currentPrice * (randomPercentage / 100));
    const newPrice = currentPrice + priceChange;


    // 영화 배열에 추가
    stockPrices.push(newPrice);

    // 최대 10개까지만 유지
    if (stockPrices.length > 10) {
    stockPrices.shift(); // 첫 번째 원소 제거
}

    // 영화 차트 업데이트
    updateChart();

    // 변동 및 변동률 업데이트
    $('#priceChange').text(priceChange);
    $('#stockPrice').text(newPrice.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ','));
    $('#percentageChange').text(randomPercentage.toFixed(2) + '%');
}

    // 초기 업데이트
    updateMovie();

    // 랜덤한 시간 주기로 영화 업데이트
    const MIN_INTERVAL = 1000; // 최소 1초
    const MAX_INTERVAL = 3000; // 최대 3초
    function scheduleUpdate() {
    const randomInterval = Math.random() * (MAX_INTERVAL - MIN_INTERVAL + 1) + MIN_INTERVAL;
    setTimeout(function() {
    updateMovie();
    scheduleUpdate();
}, randomInterval);
}

    scheduleUpdate();

    function updateChart() {
    stockChart.data.labels = Array.from({ length: 10 }, (_, i) => ''); // 데이터 레이블 비우기
    stockChart.data.labels.push('');
    stockChart.data.datasets[0].data = stockPrices;
    stockChart.update();
}
