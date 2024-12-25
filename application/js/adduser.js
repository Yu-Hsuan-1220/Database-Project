document.getElementById('signup').addEventListener('click', function(){
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const data={
        username: username,
        password: password
    }
    fetch('/adduser/addNewUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        const resMessage = document.getElementById('responseMessage');
        if (data.result === 'already_exist')
        {
            resMessage.style.color = 'red';
            resMessage.textContent = '使用者名稱以存在';
        }
        else if(data.result === 'fail')
        {
            resMessage.style.color = 'red';
            resMessage.textContent = '註冊失敗';
        }
        else if(data.result === 'success')
        {
            resMessage.style.color = 'green';
            resMessage.textContent = '註冊成功';
        }
        else
        {  
            resMessage.style.color = 'red';
            resMessage.textContent = '發生未知錯誤';
        }
    })
    .catch(error => {
        console.log('error');
    });
    
});