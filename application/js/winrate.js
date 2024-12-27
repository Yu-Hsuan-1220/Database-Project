document.getElementById('fetchWinRates').addEventListener('click', function () {
    const username = document.getElementById('username').value;
    if (!username) {
        alert("請輸入使用者名稱");
        return;
    }

    fetch(`/winrate/userWinRate?username=${username}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(data => {
            const winRatesDiv = document.getElementById('winRates');
            winRatesDiv.innerHTML = `
            <h3>總勝率: ${data.total}%</h3>
            <ul>
                <li>上路: ${data.top}%</li>
                <li>打野: ${data.jungle}%</li>
                <li>中路: ${data.mid}%</li>
                <li>下路: ${data.ad}%</li>
                <li>輔助: ${data.sup}%</li>
            </ul>
        `;

            document.getElementById('fetchHeroes').style.display = 'block';
        })
        .catch(error => console.error('Error:', error));
});

document.getElementById('fetchHeroes').addEventListener('click', function () {
    const username = document.getElementById('username').value;
    if (!username) {
        alert("請輸入使用者名稱");
        return;
    }

    fetch(`/winrate/HeroWinRates?username=${username}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },

    })
        .then(response => response.json())
        .then(data => {
            const heroWinRatesDiv = document.getElementById('heroWinRates');
            let heroList = '<h3>英雄勝率</h3><ul>';
            data.result.forEach(hero => {
                const [name, winRate] = Object.entries(hero)[0];
                heroList += `<li>${name}: ${winRate}%</li>`;
            });
            heroList += '</ul>';
            heroWinRatesDiv.innerHTML = heroList;
        })
        .catch(error => console.error('Error:', error));
});

document.getElementById('addGameResult').addEventListener('click', function () {
    const username = document.getElementById('newUsername').value;
    const password = document.getElementById('password').value;
    const hero = document.getElementById('hero').value;
    const lane = document.getElementById('lane').value;
    const result = document.getElementById('gameResult').value;

    if (!username || !password || !hero || !lane || !result) {
        alert("請填寫所有欄位");
        return;
    }

    fetch('/winrate/addGameResult', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, passwd: password, hero, lane, result }),
    })
        .then(response => response.json())
        .then(data => {
            const resultMessageDiv = document.getElementById('addResultMessage');
            if (data.result === 'incorrectpw') {
                resultMessageDiv.innerHTML = `<p style="color: red;">使用者名稱或密碼錯誤，請再試一次。</p>`;
            } else if (data.result === 'success') {
                resultMessageDiv.innerHTML = `<p style="color: green;">成功新增遊戲結果！</p>`;
            } else {
                resultMessageDiv.innerHTML = `<p style="color: red;">發生未知錯誤。</p>`;
            }
        })
        .catch(error => console.error('Error:', error));
});
