//新增資料
document.getElementById('hero-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const heroName = document.getElementById('hero-name').value;
    const route = document.getElementById('route').value;
    const rating = document.getElementById('rating').value;

    const data = {
        hero: heroName,
        role: route,
        rate: rating
    };

    fetch('/evaluation/data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })

        .then(() => {
            alert('資料新增成功');
            location.reload();
        })
        .catch(error => {
            console.error('錯誤:', error);
            alert('新增資料時發生錯誤');
        });
});

document.getElementById('search-button').addEventListener('click', function () {
    const selectedRoute = document.getElementById('search-route').value;

    if (selectedRoute === "") {
        alert('請選擇要查詢的路線');
        return;
    }

    fetch(`/evaluation/data?role=${encodeURIComponent(selectedRoute)}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.result.length != 0 && Array.isArray(data.result)) {
                const tableBody = document.querySelector('#result-table tbody');
                tableBody.innerHTML = '';

                data.result.forEach(item => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                    <td>${item.ID}</td>
                    <td>${item.hero}</td>
                    <td>${item.role}</td>
                    <td>${item.rate}</td>
                `;
                    tableBody.appendChild(row);
                });
            } else {
                alert('查詢結果為空');
            }
        })
        .catch(error => {
            console.error('錯誤:', error);
            alert('查詢資料時發生錯誤');
        });
});

document.getElementById('delete-button').addEventListener('click', function () {
    const deleteId = document.getElementById('delete-id').value;

    if (deleteId === "") {
        alert('請輸入要刪除的英雄編號');
        return;
    }

    fetch(`/evaluation/data/${deleteId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.result === "fail") {
                alert("找不到此ID");
            }
            else {
                alert('資料刪除成功');
            }
            location.reload();
        })
        .catch(error => {
            console.error('錯誤:', error);
            alert('刪除資料時發生錯誤');
        });
});

document.getElementById('update-button').addEventListener('click', function () {
    const updateId = document.getElementById('update-id').value;
    const newRoute = document.getElementById('update-route').value;
    const newRating = document.getElementById('update-rating').value;

    if (updateId === "") {
        alert('請輸入要修改的英雄編號');
        return;
    }
    if (newRoute === "") {
        alert('請輸入路線');
        return;
    }
    if (newRating === "") {
        alert('請輸入新的評價');
        return
    }
    const updateData = {
        role: newRoute,
        rate: newRating
    };

    fetch(`/evaluation/data/${updateId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData)
    })
        .then(response => response.json())
        .then(data => {
            if (data.result === "fail") {
                alert("找不到此ID");
            }
            else {
                alert('資料修改成功');
            }
            location.reload();
        })
        .catch(error => {
            console.error('錯誤:', error);
            alert('修改資料時發生錯誤');
        });
});