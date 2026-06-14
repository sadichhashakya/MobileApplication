import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  update,
  get,
  remove,
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-database.js";

// Firebase configuration
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
console.log(db);

const output = document.getElementById("output");

function getFormData() {
  return {
    firstname: document.getElementById("firstname").value,
    lastname: document.getElementById("lastname").value,
    address: document.getElementById("address").value,
    contact: document.getElementById("contact").value,
    dob: document.getElementById("dob").value,
    age: document.getElementById("age").value,
    email: document.getElementById("email").value,
    field: document.getElementById("field").value,
  };
}

function getUserId() {
  return document.getElementById("userId").value;
}

function show(data) {
  output.innerText = JSON.stringify(data, null, 2);
}

/* ---------------- CREATE / SET ---------------- */
document.getElementById("setBtn").addEventListener("click", () => {
  const id = getUserId();
  const data = getFormData();

  console.log("INPUT DATA:", data);

  set(ref(db, "users/" + id), data)
    .then(() => console.log("Data saved"))
    .catch((err) => console.log(err));
});

/* ---------------- READ SINGLE USER ---------------- */
document.getElementById("getBtn").addEventListener("click", () => {
  const id = getUserId();

  get(ref(db, "users/" + id)).then((snapshot) => {
    if (snapshot.exists()) {
      console.log("USER DATA:", snapshot.val());
      show(snapshot.val());
    } else {
      console.log("No data found");
      show("No data found");
    }
  });
});

/* ---------------- UPDATE ---------------- */
document.getElementById("updateBtn").addEventListener("click", () => {
  const id = getUserId();
  const data = getFormData();

  update(ref(db, "users/" + id), data)
    .then(() => console.log("Updated successfully"))
    .catch((err) => console.log(err));
});

/* ---------------- DELETE ---------------- */
document.getElementById("deleteBtn").addEventListener("click", () => {
  const id = getUserId();

  remove(ref(db, "users/" + id))
    .then(() => console.log("Deleted successfully"))
    .catch((err) => console.log(err));
});

/* ---------------- GET ALL USERS (MANUAL ONLY) ---------------- */
document.getElementById("snapshotBtn").addEventListener("click", () => {
  get(ref(db, "users")).then((snapshot) => {
    if (snapshot.exists()) {
      console.log("ALL USERS:", snapshot.val());
      show(snapshot.val());
    } else {
      show("No data found");
    }
  });
});
