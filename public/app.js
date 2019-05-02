const CreateUser = document.querySelector('.CreateUser');
CreateUser.addEventListener('submit', (e) => {
    e.preventDefault();
    const nickname = CreateUser.querySelector('.nickname').value;
    const phone = CreateUser.querySelector('.phone').value;
    if (nickname && phone) {
        post('/user', {nickname, phone})
    }
});

const DeleteUser = document.querySelector('.DeleteUser');
DeleteUser.addEventListener('submit', (e) => {
    e.preventDefault();
    const phone = DeleteUser.querySelector('.phone').value;
    if (phone) {
        del(`/user/${phone}`)
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