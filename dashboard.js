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


// ====================== top nav ========================

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


// ====================== Logout ========================


    

// ====================== Create Blog for firebase ========================

// Reference to the blogs collection in Firestore
let blogRef = db.collection('userblogs');

// Function to create a new blog
function createBlog() {
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;

    // Add the blog to Firestore
    blogRef.add({
        title: title,
        description: description
    })
    .then((docRef) => {
        console.log("Blog created with ID: ", docRef.id);
        alert("Blog created successfully!");

        // Clear input fields after creating the blog
        document.getElementById('title').value = '';
        document.getElementById('description').value = '';
    })
    .catch((error) => {
        console.error("Error adding blog: ", error);
        alert("Error creating the blog. Please try again.");
    })
}


// ========= show blog in page ==========

// Function to create blog elements
function createBlogElement(data, docId) {
    const blogDiv = document.createElement("div");
    blogDiv.className = "blog";

    const imgDiv = document.createElement("div");
    imgDiv.className = "i-u";

    const img = document.createElement("img");
    img.src = data.imageUrl; // Replace with your Firebase storage URL
    img.alt = "Img";
    img.className = "blog-img";

    const title = document.createElement("h2");
    title.className = "blog-title";
    title.textContent = data.title;

    const desc = document.createElement("p");
    desc.className = "blog-disc";
    desc.textContent = data.description;

    const buttonsDiv = document.createElement("div");
    buttonsDiv.className = "buttons";

    const editButton = document.createElement("button");
    editButton.className = "button";
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => editBlog(docId, data));

    const deleteButton = document.createElement("button");
    deleteButton.className = "button";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteBlog(docId));

    // Append elements to their respective parent elements
    imgDiv.appendChild(img);
    blogDiv.appendChild(imgDiv);
    blogDiv.appendChild(title);
    blogDiv.appendChild(desc);
    buttonsDiv.appendChild(editButton);
    buttonsDiv.appendChild(deleteButton);
    blogDiv.appendChild(buttonsDiv);

    // Append the blog to the container
    blogContainer.appendChild(blogDiv);
}

// Function to delete blog
function deleteBlog(blogId) {
    db.collection("userblogs").doc(blogId).delete()
        .then(() => {
            alert("Blog deleted successfully!");
            document.getElementById('blogContainer').removeChild(document.getElementById(blogId));
        })
        .catch((error) => {
            alert(error);
        });
}


// Function to edit a blog
function editBlog(blogId, currentData) {
    const updatedTitle = prompt("Enter updated title:", currentData.title);
    const updatedDescription = prompt("Enter updated description:", currentData.description);

    if (updatedTitle !== null && updatedDescription !== null) {
        const updatedData = {
            title: updatedTitle,
            description: updatedDescription
        };
        db.collection("userblogs").doc(blogId).update(updatedData)
            .then(() => {
                console.log("Blog updated successfully!");
                alert("Blog updated successfully!");
                // You can update the UI with the new data if needed
            })
            .catch((error) => {
                console.error("Error updating blog: ", error);
                alert("Error updating the blog. Please try again.");
            });
    }
}

// Fetch blogs from Firebase
db.collection("userblogs").get().then((querySnapshot) => {
    if (querySnapshot.size > 0) {
        querySnapshot.forEach((doc) => {
            const blogData = doc.data();
            createBlogElement(blogData, doc.id);
        });
    } else {
        console.log("No blogs available.");
    }
});
