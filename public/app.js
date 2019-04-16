const CreateUser = document.querySelector('.CreateUser');
CreateUser.addEventListener('submit', (e) => {
    e.preventDefault();
    const nickname = CreateUser.querySelector('.nickname').value;
    const phoneNumber = CreateUser.querySelector('.phone').value;
    post('/createUser', {nickname, phoneNumber})
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