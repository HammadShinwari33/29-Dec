const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCrLne6MGD3QA2ahHO2MsSGH0q0c8f8y3o",
    authDomain: "my-blogging-app-42a70.firebaseapp.com",
    projectId: "my-blogging-app-42a70",
    storageBucket: "my-blogging-app-42a70.appspot.com",
    messagingSenderId: "480046748081",
    appId: "1:480046748081:web:feed8399ce8138d037ad90"
  });

  // Initialize Firebase
    const authentication = firebaseApp.auth();
    const db = firebaseApp.firestore();


// =============== top-link ================

function topSignup(){
  window.location = "signup.html";
}

// ========================= login ===========================

    function loginCall(){
        let email = document.getElementById('email').value
        let password = document.getElementById('password').value
        console.log('email' , email)
        console.log('password' , password)
    
        authentication.signInWithEmailAndPassword(email , password)
        .then((res) => {
            alert('login is success');
            let token = res.user.multiFactor.user.accessToken;
            if(token){
              localStorage.setItem("token" , token)
            }
            console.log(localStorage.getItem("token"))
            window.location = "dashboard.html";
            console.log(res);
        })
        .catch((error) => {
            alert(error);
            console.log(error);
        });

      }