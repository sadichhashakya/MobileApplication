import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";

import {
  getDatabase,
  ref,
  push,
  set,
  get,
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-database.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyC6kaIv-xwt_KUGRazWEHt6iPkTVdEwmfk",
  authDomain: "app-development-a4704.firebaseapp.com",
  projectId: "app-development-a4704",
  storageBucket: "app-development-a4704.firebasestorage.app",
  messagingSenderId: "743378393790",
  appId: "1:743378393790:web:648e3d9982abfa0c9a1cef",
  measurementId: "G-T1TG4CR241",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

console.log("Firebase Connected");

// Emergency contact in console
console.log("===== EMERGENCY CONTACT =====");
console.log("WhatsApp: 9800000000");
console.log("Email: sadichha@gmail.com");
console.log("-----------------------------");

// Save Message
document.getElementById("submitBtn").addEventListener("click", function () {
  const firstname = document.getElementById("firstname").value.trim();
  const lastname = document.getElementById("lastname").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const result = document.getElementById("result");

  // Validation
  if (!firstname || !lastname || !email || !message) {
    result.style.color = "red";
    result.innerHTML = "Please fill all fields!";
    return;
  }

  const messagesRef = ref(db, "contactMessages");
  const newMessageRef = push(messagesRef);

  // Save data
  set(newMessageRef, {
    firstname: firstname,
    lastname: lastname,
    email: email,
    message: message,
    time: new Date().toLocaleString(),
  })
    .then(() => {
      result.style.color = "green";
      result.innerHTML = "Message Sent Successfully!";

      // Clear fields
      document.getElementById("firstname").value = "";
      document.getElementById("lastname").value = "";
      document.getElementById("email").value = "";
      document.getElementById("message").value = "";

      displayMessages();
    })
    .catch((error) => {
      result.style.color = "red";
      result.innerHTML = error.message;
      console.log("Error saving message:", error);
    });
});

// Display Messages
function displayMessages() {
  const messagesRef = ref(db, "contactMessages");

  get(messagesRef)
    .then((snapshot) => {
      const messagesDiv = document.getElementById("messages");

      if (!messagesDiv) {
        console.log("Messages div not found in HTML");
        return;
      }

      messagesDiv.innerHTML = "";

      if (!snapshot.exists()) {
        console.log("No messages found in Firebase");
        messagesDiv.innerHTML = "<p>No messages found.</p>";
        return;
      }

      console.log("===== ALL CONTACT MESSAGES =====");

      snapshot.forEach((childSnapshot) => {
        const key = childSnapshot.key;
        const data = childSnapshot.val();

        // Console Output
        console.log("ID:", key);
        console.log("First Name:", data.firstname);
        console.log("Last Name:", data.lastname);
        console.log("Email:", data.email);
        console.log("Message:", data.message);
        console.log("Time:", data.time);
        console.log("----------------------------");

        // Show on webpage
        messagesDiv.innerHTML += `
          <div class="message-card">
            <h4>${data.firstname} ${data.lastname}</h4>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Message:</strong> ${data.message}</p>
            <small>${data.time}</small>
          </div>
        `;
      });
    })
    .catch((error) => {
      console.log("Error reading messages:", error);
    });
}

// Load on page open
window.onload = function () {
  displayMessages();
};
