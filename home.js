document.addEventListener("DOMContentLoaded", function() {
    let greetingElement = document.getElementById("greeting");
    let currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
        greetingElement.innerHTML = "Good Morning Readers!";
    }
     else if (currentHour >= 12 && currentHour < 18) {
        greetingElement.innerHTML = "Good Afternoon Readers!";
    }
    else {
        greetingElement.innerHTML = "Good Evening Readers!";
    }
});

// ============ top link =============

function topLogin(){
    window.location = "login.html"
}