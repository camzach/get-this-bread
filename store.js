module.exports = {
    createUser ({ nickname, phone }) {
        console.log(`Add user ${nickname} with phone ${phone}`);
        return Promise.resolve()
    }
};