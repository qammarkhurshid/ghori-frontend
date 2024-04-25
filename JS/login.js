const users = [
    { username: 'admin', password: 'admin' },
];

document.getElementById("formsubmit").onclick = function () {
    const pusername = document.getElementById("yourUsername");
    const ppassword = document.getElementById("yourPassword");
    const username = pusername.value;
    const password = ppassword.value;
    const foundUser = users.find(user => user.username === username && user.password === password);
    if (!foundUser) {
        console.log('Invalid user!');
    } else {
        console.log('Success');

        var url = 'http://127.0.0.1:5501/index.html';

        window.open(url);

    }
}