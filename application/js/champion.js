// 英雄數據
const champions = [
    { value: '1', name: 'Annie' },
    { value: '2', name: 'Olaf' },
    { value: '3', name: 'Galio' },
    { value: '4', name: 'Twisted Fate' },
    { value: '5', name: 'Xin Zhao' },
    { value: '6', name: 'Urgot' },
    { value: '7', name: 'LeBlanc' },
    { value: '8', name: 'Vladimir' },
    { value: '9', name: 'Fiddlesticks' },
    { value: '10', name: 'Kayle' },
    { value: '11', name: 'Master Yi' },
    { value: '12', name: 'Alistar' },
    { value: '13', name: 'Ryze' },
    { value: '14', name: 'Sion' },
    { value: '15', name: 'Sivir' },
    { value: '16', name: 'Soraka' },
    { value: '17', name: 'Teemo' },
    { value: '18', name: 'Tristana' },
    { value: '19', name: 'Warwick' },
    { value: '20', name: 'Nunu' },
    { value: '21', name: 'Miss Fortune' },
    { value: '22', name: 'Ashe' },
    { value: '23', name: 'Tryndamere' },
    { value: '24', name: 'Jax' },
    { value: '25', name: 'Morgana' },
    { value: '26', name: 'Zilean' },
    { value: '27', name: 'Singed' },
    { value: '28', name: 'Evelynn' },
    { value: '29', name: 'Twitch' },
    { value: '30', name: 'Karthus' },
    { value: '31', name: 'ChoGath' },
    { value: '32', name: 'Amumu' },
    { value: '33', name: 'Rammus' },
    { value: '34', name: 'Anivia' },
    { value: '35', name: 'Shaco' },
    { value: '36', name: 'DrMundo' },
    { value: '37', name: 'Sona' },
    { value: '38', name: 'Kassadin' },
    { value: '39', name: 'Irelia' },
    { value: '40', name: 'Janna' },
    { value: '41', name: 'Gangplank' },
    { value: '42', name: 'Corki' },
    { value: '43', name: 'Karma' },
    { value: '44', name: 'Taric' },
    { value: '45', name: 'Veigar' },
    { value: '48', name: 'Trundle' },
    { value: '50', name: 'Swain' },
    { value: '51', name: 'Caitlyn' },
    { value: '53', name: 'Blitzcrank' },
    { value: '54', name: 'Malphite' },
    { value: '55', name: 'Katarina' },
    { value: '56', name: 'Nocturne' },
    { value: '57', name: 'Maokai' },
    { value: '58', name: 'Renekton' },
    { value: '59', name: 'Jarvan IV' },
    { value: '60', name: 'Elise' },
    { value: '61', name: 'Orianna' },
    { value: '62', name: 'Wukong' },
    { value: '63', name: 'Brand' },
    { value: '64', name: 'Lee Sin' },
    { value: '67', name: 'Vayne' },
    { value: '68', name: 'Rumble' },
    { value: '69', name: 'Cassiopeia' },
    { value: '72', name: 'Skarner' },
    { value: '74', name: 'Heimerdinger' },
    { value: '75', name: 'Nasus' },
    { value: '76', name: 'Nidalee' },
    { value: '77', name: 'Udyr' },
    { value: '78', name: 'Poppy' },
    { value: '79', name: 'Gragas' },
    { value: '80', name: 'Pantheon' },
    { value: '81', name: 'Ezreal' },
    { value: '82', name: 'Mordekaiser' },
    { value: '83', name: 'Yorick' },
    { value: '84', name: 'Akali' },
    { value: '85', name: 'Kennen' },
    { value: '86', name: 'Garen' },
    { value: '89', name: 'Leona' },
    { value: '90', name: 'Malzahar' },
    { value: '91', name: 'Talon' },
    { value: '92', name: 'Riven' },
    { value: '96', name: 'KogMaw' },
    { value: '98', name: 'Shen' },
    { value: '99', name: 'Lux' },
    { value: '101', name: 'Xerath' },
    { value: '102', name: 'Shyvana' },
    { value: '103', name: 'Ahri' },
    { value: '104', name: 'Graves' },
    { value: '105', name: 'Fizz' },
    { value: '106', name: 'Volibear' },
    { value: '107', name: 'Rengar' },
    { value: '110', name: 'Varus' },
    { value: '111', name: 'Nautilus' },
    { value: '112', name: 'Viktor' },
    { value: '113', name: 'Sejuani' },
    { value: '114', name: 'Fiora' },
    { value: '115', name: 'Ziggs' },
    { value: '117', name: 'Lulu' },
    { value: '119', name: 'Draven' },
    { value: '120', name: 'Hecarim' },
    { value: '121', name: 'KhaZix' },
    { value: '122', name: 'Darius' },
    { value: '126', name: 'Jayce' },
    { value: '127', name: 'Lissandra' },
    { value: '131', name: 'Diana' },
    { value: '133', name: 'Quinn' },
    { value: '134', name: 'Syndra' },
    { value: '136', name: 'Aurelion Sol' },
    { value: '141', name: 'Kayn' },
    { value: '143', name: 'Zyra' },
    { value: '150', name: 'Gnar' },
    { value: '154', name: 'Zac' },
    { value: '157', name: 'Yasuo' },
    { value: '161', name: 'VelKoz' },
    { value: '163', name: 'Taliyah' },
    { value: '164', name: 'Camille' },
    { value: '201', name: 'Braum' },
    { value: '202', name: 'Jhin' },
    { value: '203', name: 'Kindred' },
    { value: '222', name: 'Jinx' },
    { value: '223', name: 'Tahm Kench' },
    { value: '236', name: 'Lucian' },
    { value: '238', name: 'Zed' },
    { value: '240', name: 'Kled' },
    { value: '245', name: 'Ekko' },
    { value: '254', name: 'Vi' },
    { value: '266', name: 'Aatrox' },
    { value: '267', name: 'Nami' },
    { value: '268', name: 'Azir' },
    { value: '412', name: 'Thresh' },
    { value: '420', name: 'Illaoi' },
    { value: '421', name: 'RekSai' },
    { value: '427', name: 'Ivern' },
    { value: '429', name: 'Kalista' },
    { value: '432', name: 'Bard' },
    { value: '497', name: 'Rakan' },
    { value: '498', name: 'Xayah' },
    { value: '516', name: 'Ornn' }
];

// 切換對戰模式
function switchMode(mode) {
    document.querySelectorAll('.battle-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(`${mode}-battle`).classList.add('active');
}

// 單人對戰勝率計算
async function calculateWinRate() {
    const champion1 = document.getElementById('champion1').value;
    const champion2 = document.getElementById('champion2').value;
    const resultDiv = document.getElementById('result');

    if (!champion1 || !champion2) {
        alert('請選擇兩個英雄！');
        return;
    }

    if (champion1 === champion2) {
        alert('請選擇兩個不同的英雄！');
        return;
    }

    try {
        // 準備要發送的數據，只發送英雄名稱
        const data = {
            hero1: document.getElementById('champion1').options[document.getElementById('champion1').selectedIndex].text,
            hero2: document.getElementById('champion2').options[document.getElementById('champion2').selectedIndex].text
        };

        // 發送 POST 請求到後端
        const response = await fetch('/match/calculate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('網絡請求失敗');
        }

        const result = await response.json();

        // 顯示結果
        resultDiv.style.display = 'block';
        resultDiv.innerHTML = `
            <h3>對戰勝率結果</h3>
            <p>${data.hero1} 對陣 ${data.hero2} 的勝率為: ${result.winRate}%</p>
        `;
    } catch (error) {
        console.error('Error:', error);
        alert('獲取勝率數據失敗，請稍後再試');
    }
}

// 團隊對戰勝率計算
function calculateTeamWinRate() {
    const bluePicks = Array.from(document.querySelectorAll('.blue-pick')).map(select => select.value);
    const redPicks = Array.from(document.querySelectorAll('.red-pick')).map(select => select.value);
    const resultDiv = document.getElementById('team-result');

    if (bluePicks.includes('') || redPicks.includes('')) {
        alert('請為雙方選擇完整的五名英雄！');
        return;
    }

    const allPicks = [...bluePicks, ...redPicks];
    const uniquePicks = new Set(allPicks.filter(pick => pick !== ''));
    if (uniquePicks.size !== allPicks.length) {
        alert('不能選擇重複的英雄！');
        return;
    }

    const teamSynergy = Math.random() * 0.2;
    const baseWinRate = 0.5;
    const finalWinRate = Math.min(Math.max((baseWinRate + teamSynergy) * 100, 35), 65);

    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `
        <h3>團隊對戰勝率分析</h3>
        <p>我方陣容勝率：${finalWinRate.toFixed(1)}%</p>
        <p>敵方陣容勝率：${(100 - finalWinRate).toFixed(1)}%</p>
        <div class="analysis">
            <h4>分析建議：</h4>
            <ul>
                ${generateTeamAnalysis(finalWinRate)}
            </ul>
        </div>
    `;
}

function generateTeamAnalysis(winRate) {
    let analysis = [];

    if (winRate > 55) {
        analysis.push('<li>我方陣容較為優勢，建議積極開團</li>');
        analysis.push('<li>保持優勢，注意防止失誤</li>');
    } else if (winRate < 45) {
        analysis.push('<li>我方陣容較為劣勢，建議發育至後期</li>');
        analysis.push('<li>避免早期團戰，專注補兵發育</li>');
    } else {
        analysis.push('<li>雙方陣容勢均力敵，關鍵在於執行力</li>');
        analysis.push('<li>把握關鍵資源點的爭奪</li>');
    }

    return analysis.join('');
}

// 分析英雄
async function analyzeChampion() {
    const champion = document.getElementById('analysis-champion');
    const position = document.getElementById('analysis-position');
    const resultDiv = document.getElementById('analysis-result');

    if (!champion.value || !position.value) {
        alert('請選擇英雄和位置！');
        return;
    }

    try {
        // 準備要發送的數據
        const data = {
            champion: champion.options[champion.selectedIndex].text,
            position: position.value
        };

        // 發送 POST 請求到後端
        const response = await fetch('/match/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('網絡請求失敗');
        }

        const result = await response.json();

        // 顯示結果
        resultDiv.style.display = 'block';

        // 从 result 对象中获取数组
        const matchupData = result.result;

        // 更新最佳對手列表（前5名）
        const bestList = document.getElementById('best-matchups-list');
        bestList.innerHTML = matchupData.slice(0, 5).map(matchup => `
            <li class="matchup-item">
                <span>${matchup.opponent_name}</span>
                <span class="matchup-details">
                    <span class="total-matches">對戰場數: ${matchup.total_matches}</span>
                    <span class="winrate">${(matchup.win_rate * 100).toFixed(2)}% 勝率</span>
                </span>
            </li>
        `).join('');

        // 更新最差對手列表（後5名）
        const worstList = document.getElementById('worst-matchups-list');
        worstList.innerHTML = matchupData.slice(-5).map(matchup => `
            <li class="matchup-item">
                <span>${matchup.opponent_name}</span>
                <span class="matchup-details">
                    <span class="total-matches">對戰場數: ${matchup.total_matches}</span>
                    <span class="winrate">${(matchup.win_rate * 100).toFixed(2)}% 勝率</span>
                </span>
            </li>
        `).join('');

    } catch (error) {
        console.error('Error:', error);
        alert('分析失敗，請稍後再試');
    }
}

// 生成模擬的對戰數據
function generateMatchupData(championId) {
    const matchups = [];
    const selectedChampion = champions.find(c => c.value === championId);

    champions.forEach(opponent => {
        if (opponent.value !== championId) {
            // 生成一個35%到65%之間的隨機勝率
            const baseWinRate = 50;
            const variation = 15;
            const winrate = baseWinRate + (Math.random() * variation * 2 - variation);

            matchups.push({
                opponentId: opponent.value,
                opponent: opponent.name,
                winrate: winrate
            });
        }
    });

    return matchups;
}

// 初始化頁面
function initializePage() {
    const allSelects = document.querySelectorAll('select');
    allSelects.forEach(select => {
        if (select.options.length <= 1) {
            champions.forEach(champion => {
                const option = document.createElement('option');
                option.value = champion.value;
                option.textContent = champion.name;
                select.appendChild(option);
            });
        }
    });
}

// 當頁面加載完成時初始化
document.addEventListener('DOMContentLoaded', initializePage);

// 更新統計數據
async function updateStats() {
    const selectedStat = document.getElementById('stat-select').value;

    if (!selectedStat) {
        return;
    }

    // 生成50-70之間的隨機勝率
    const randomWinRate = (Math.random() * 20 + 50).toFixed(1);

    // 顯示結果
    const resultDiv = document.getElementById('stats-result');
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `<h3>統計結果</h3><p>勝率: ${randomWinRate}%</p>`;
}

// 計算目標勝率
async function calculateObjectiveWinRate() {
    const selectedObjective = document.getElementById('objective-select').value;
    const resultDiv = document.getElementById('objective-result');
    const loadingScreen = document.getElementById('loading-screen');

    if (!selectedObjective) {
        alert('請選擇一個目標！');
        return;
    }

    try {
        // 显示加载画面
        loadingScreen.style.display = 'flex';

        const response = await fetch(`/match/calculate?type=${selectedObjective}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('網絡請求失敗');
        }

        const result = await response.json();

        // 隐藏加载画面
        loadingScreen.style.display = 'none';

        // 显示结果
        resultDiv.style.display = 'block';

        // 獲取目標的中文名稱
        const objectiveNames = {
            'dragon': '拿到第一條小龍',
            'baron': '拿到第一條巴龍',
            'tower': '拿到首塔',
            'inhib': '拿到第一座兵營',
            'blue': '藍方',
            'nexus': '拿到第一座主堡'
        };

        resultDiv.innerHTML = `
            <h3>統計結果</h3>
            <p>${objectiveNames[selectedObjective]}的勝率：${result.result}%</p>
        `;
    } catch (error) {
        console.error('Error:', error);
        alert('獲取勝率數據失敗，請稍後再試');
        // 发生错误时也要隐藏加载画面
        loadingScreen.style.display = 'none';
    }
}

