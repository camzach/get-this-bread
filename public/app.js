const CreateUser = document.querySelector('.CreateUser');
CreateUser.addEventListener('submit', (e) => {
    e.preventDefault();
    const nickname = CreateUser.querySelector('.nickname').value;
    const phone = CreateUser.querySelector('.phone').value;
    if (nickname && phone) {
        post('/user', {nickname, phone}).then((response) => {
            if (response.ok) {
                CreateUser.querySelector('.nickname').value = "";
                CreateUser.querySelector('.phone').value = "";
                alert("User added successfully!");
            } else {
                alert("Could not add user.")
            }
        });
    }
});

const DeleteUser = document.querySelector('.DeleteUser');
DeleteUser.addEventListener('submit', (e) => {
    e.preventDefault();
    const phone = DeleteUser.querySelector('.phone').value;
    if (phone) {
        del(`/user/${phone}`).then((response) => {
            if (response.ok) {
                DeleteUser.querySelector('.phone').value = "";
                alert("User deleted successfully!");
            } else {
                alert("Could not delete user.")
            }
        })
    }
});

function post(path, data) {
    return window.fetch(path, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

function del(path) {
    return window.fetch(path, {
        method: 'DELETE'
    })
}