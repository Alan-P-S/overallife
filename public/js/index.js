document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let errorMessage = document.getElementById("errorMessage");

    if (username === "admin" && password === "1234") {
        errorMessage.style.color = "lime";
        errorMessage.textContent = "Login Successful!";
        setTimeout(() => window.location.href = "dashboard.html", 1000);
    } else {
        errorMessage.textContent = "Invalid Username or Password!";
    }
});
