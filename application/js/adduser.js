document.getElementById('signup').addEventListener('click', function () {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const responseMessageElement = document.getElementById('responseMessage');
    const data = {
        username: username,
        password: password
    }
    if (password !== confirmPassword) {
        responseMessageElement.style.color = 'red';
        responseMessageElement.textContent = '密碼與確認密碼不一致，請重新確認！';

        setTimeout(function () {
            location.reload();
        }, 2000);

        return;
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
            if (data.result === 'already_exist') {
                resMessage.style.color = 'red';
                resMessage.textContent = '使用者名稱以存在';
            }
            else if (data.result === 'fail') {
                resMessage.style.color = 'red';
                resMessage.textContent = '註冊失敗';
            }
            else if (data.result === 'success') {
                resMessage.style.color = 'green';
                resMessage.textContent = '註冊成功';
            }
            else {
                resMessage.style.color = 'red';
                resMessage.textContent = '發生未知錯誤';
            }
        })
        .catch(error => {
            console.log('error');
        });
});