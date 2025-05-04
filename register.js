

function addRegister() {
    let username = document.getElementById('uname').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('pswd').value;

    // Create an object to store user data
    let regObject = {
        username: username,
        email: email,
        password: password,
    }

    // Check if the account already exists in localStorage

    if (localStorage.getItem(regObject.username)) {
        alert("Already registered Account");
        window.location = "./login.html";  

    } else {

        // Store the user details in localStorage

        localStorage.setItem(regObject.username, JSON.stringify(regObject));

        alert("Registration Successfull");

        // Store the logged-in user separately
        localStorage.setItem("loggedAccount", username);

        window.location = "./login.html";  
    }
}
