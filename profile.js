
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCrLne6MGD3QA2ahHO2MsSGH0q0c8f8y3o",
    authDomain: "my-blogging-app-42a70.firebaseapp.com",
    projectId: "my-blogging-app-42a70",
    storageBucket: "my-blogging-app-42a70.appspot.com",
    messagingSenderId: "480046748081",
    appId: "1:480046748081:web:feed8399ce8138d037ad90"
  });

  // Initialize Firebase
    const auth = firebaseApp.auth();
    const db = firebaseApp.firestore();

