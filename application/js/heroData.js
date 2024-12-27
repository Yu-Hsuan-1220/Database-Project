const Season = document.getElementById("season");
const Season_ver = document.getElementById("season_ver");

const Season_ver_option = {
    S12: [{ value: '12_1', text: '12.1' },
    { value: '12_2', text: '12.2' },
    { value: '12_3', text: '12.3' },
    { value: '12_4', text: '12.4' },
    { value: '12_5', text: '12.5' },
    { value: '12_6', text: '12.6' },
    { value: '12_7', text: '12.7' },
    { value: '12_8', text: '12.8' },
    { value: '12_9', text: '12.9' },
    { value: '12_10', text: '12.10' },
    { value: '12_11', text: '12.11' },
    { value: '12_12', text: '12.12' },
    { value: '12_13', text: '12.13' },
    { value: '12_14', text: '12.14' },
    { value: '12_15', text: '12.15' },
    { value: '12_16', text: '12.16' },
    { value: '12_17', text: '12.17' },
    { value: '12_18', text: '12.18' },
    { value: '12_19', text: '12.19' },
    { value: '12_20', text: '12.20' },
    { value: '12_21', text: '12.21' },
    { value: '12_22', text: '12.22' },
    { value: '12_23', text: '12.23' }],

    S13: [{ value: '13_1', text: '13.1' },
    { value: '13_3', text: '13.3' },
    { value: '13_4', text: '13.4' },
    { value: '13_5', text: '13.5' },
    { value: '13_6', text: '13.6' },
    { value: '13_7', text: '13.7' },
    { value: '13_8', text: '13.8' },
    { value: '13_9', text: '13.9' },
    { value: '13_10', text: '13.10' },
    { value: '13_11', text: '13.11' },
    { value: '13_12', text: '13.12' },
    { value: '13_13', text: '13.13' }]
};

Season.addEventListener("change", () => {
    const select_season_value = Season.value;
    Season_ver.innerHTML = "<option value=''>-- 請選擇版本 --</option>";
    Season_ver_option[select_season_value].forEach(option => {
        const new_Option = document.createElement("option");
        new_Option.value = option.value;
        new_Option.textContent = option.text;
        Season_ver.appendChild(new_Option);
    });
});
            
const tierStyles = {
    God: 'golden',
    S: 'rainbow',
    A: 'rateA',
    B: 'rateB',
    C: 'rateC',
    D: 'rateD'
};            
        
document.getElementById('search_heroData').addEventListener('click', function () {
    const heroname = document.getElementById('hero_name').value;
    const seasonver = document.getElementById('season_ver').value;

    if (!heroname) {
        alert("請選擇英雄");
        return;
    }
    if (!seasonver) {
        alert("請選擇賽季版本");
        return;
    }

    fetch(`/heroData/hero?hero=${heroname}&season=${seasonver}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        const hero_Datas_Div = document.getElementById('hero_Datas');

        data.result.forEach(each_data => {

            if (each_data.tier == "G")
                each_data.tier = "God";

            const type = {}


            const win_rate = parseInt(each_data.win_rate); 
            if (win_rate >= 75)
                type["win_rate"] = 'great';
            else if (win_rate >= 50)
                type["win_rate"] = 'soso';
            else if (win_rate >= 25)
                type["win_rate"] = 'bad';
            else 
                type["win_rate"] = 'worse';

            /*
            const pick_rate = parseInt(each_data.pick_rate); 
                if (pick_rate >= 75)
                    type["pick_rate"] = 'great';
                else if (pick_rate >= 50)
                    type["pick_rate"] = "soso";
                else if (pick_rate >= 25)
                    type["pick_rate"] = "bad";
                else 
                    type["pick_rate"] = "worse";

            const ban_rate = parseInt(each_data.ban_rate); 
                if (ban_rate >= 75)
                    type["ban_rate"] = "worse";
                else if (ban_rate >= 50)
                    type["ban_rate"] = "bad";
                else if (ban_rate >= 25)
                    type["ban_rate"] = "soso";
                else 
                    type["ban_rate"] = "great";

            */

            hero_Datas_Div.innerHTML += `
                <h2>S${seasonver}  ${heroname} 數據</h2>
                <div class="hero" id="eachherodata">
                    <h4>Role: ${each_data.role}</h4>

                    <span class=${tierStyles[each_data.tier]}>Tier: ${each_data.tier}</span>
                    <hr>
                    <span>Score: ${each_data.score}</span>
                    <hr>
                    <span class=${type["win_rate"]}>Win Rate: ${each_data.win_rate}</span>
                    <hr>
                    <span>Pick Rate: ${each_data.pick_rate}</span>
                    <hr>
                    <span>Ban Rate: ${each_data.ban_rate}</span>
                    <hr>
                    <span>KDA: ${each_data.kda}</span>
                    <hr>
                    
                </div>
            `;

            //<span class=${type["pick_rate"]}>Pick Rate: ${each_data.pick_rate}</span>
            //<span class=${type["ban_rate"]}>Ban Rate: ${each_data.ban_rate}</span>
        })

    })
    .catch(error => console.error('Error:', error));
});

