const phone = require('phone');

const CreateUser = document.querySelector('.CreateUser');
CreateUser.addEventListener('submit', (e) => {
    e.preventDefault();
    const nickname = CreateUser.querySelector('.nickname').value;
    const phoneNumber = phone(CreateUser.querySelector('.phone').value, '')[0];
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