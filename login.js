
function register(){
    window.location="./register.html"
}

// Take the values

function loginButton() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    let logObject = JSON.parse(localStorage.getItem(username));

    if (username && logObject) {
        if (logObject.password === password) {
            localStorage.setItem("loggedAccount", username); 
            window.location = "./dashboard.html";
        } else {
            alert("Incorrect password");
        }
    } else {
        alert("Account not found");
    }
}

