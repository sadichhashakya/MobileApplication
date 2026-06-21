// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  update,
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
// // Function to write user data
// function writeUserData(
//   userId,
//   Firstname,
//   Lastname,
//   Address,
//   Contact,
//   DOB,
//   Age,
//   Email,
//   Field,
// ) {
//   set(ref(db, "users/" + userId), {
//     firstname: Firstname,
//     lastname: Lastname,
//     address: Address,
//     contact: Contact,
//     dob: DOB,
//     age: Age,
//     email: Email,
//     field: Field,
//   });
// }

// // Sample data
// const users = [
//   {
//     firstname: "Ram",
//     lastname: "Sharma",
//     address: "Kathmandu",
//     contact: "9800000001",
//     dob: "2001-01-15",
//     age: 24,
//     email: "ram.sharma@gmail.com",
//     field: "IT",
//   },
//   {
//     firstname: "Sita",
//     lastname: "Karki",
//     address: "Pokhara",
//     contact: "9800000002",
//     dob: "2002-02-20",
//     age: 23,
//     email: "sita.karki@gmail.com",
//     field: "Business",
//   },
//   {
//     firstname: "Hari",
//     lastname: "Thapa",
//     address: "Lalitpur",
//     contact: "9800000003",
//     dob: "2000-03-12",
//     age: 25,
//     email: "hari.thapa@gmail.com",
//     field: "Computer Science",
//   },
//   {
//     firstname: "Gita",
//     lastname: "Shrestha",
//     address: "Bhaktapur",
//     contact: "9800000004",
//     dob: "2001-04-25",
//     age: 24,
//     email: "gita.shrestha@gmail.com",
//     field: "Management",
//   },
//   {
//     firstname: "Nabin",
//     lastname: "Gurung",
//     address: "Chitwan",
//     contact: "9800000005",
//     dob: "1999-05-10",
//     age: 26,
//     email: "nabin.gurung@gmail.com",
//     field: "Engineering",
//   },
//   {
//     firstname: "Asha",
//     lastname: "Bista",
//     address: "Butwal",
//     contact: "9800000006",
//     dob: "2003-06-18",
//     age: 22,
//     email: "asha.bista@gmail.com",
//     field: "Nursing",
//   },
//   {
//     firstname: "Ramesh",
//     lastname: "Adhikari",
//     address: "Dharan",
//     contact: "9800000007",
//     dob: "2000-07-08",
//     age: 25,
//     email: "ramesh.adhikari@gmail.com",
//     field: "Finance",
//   },
//   {
//     firstname: "Sujata",
//     lastname: "Lama",
//     address: "Hetauda",
//     contact: "9800000008",
//     dob: "2001-08-22",
//     age: 24,
//     email: "sujata.lama@gmail.com",
//     field: "Marketing",
//   },
//   {
//     firstname: "Anil",
//     lastname: "Maharjan",
//     address: "Kirtipur",
//     contact: "9800000009",
//     dob: "2002-09-14",
//     age: 23,
//     email: "anil.maharjan@gmail.com",
//     field: "Cyber Security",
//   },
//   {
//     firstname: "Pooja",
//     lastname: "Rai",
//     address: "Biratnagar",
//     contact: "9800000010",
//     dob: "2003-10-30",
//     age: 22,
//     email: "pooja.rai@gmail.com",
//     field: "Data Science",
//   },
// ];

// // Insert 10 users
// users.forEach((user, index) => {
//   writeUserData(
//     index + 1,
//     user.firstname,
//     user.lastname,
//     user.address,
//     user.contact,
//     user.dob,
//     user.age,
//     user.email,
//     user.field,
//   );
// });

// // // Update only Ram (userId = 1)
// // update(ref(db, "users/1"), {
// //   firstname: "Ram",
// //   lastname: "Sharma",
// //   address: "Kathmandu",
// //   contact: "9999999999", // updated value
// //   age: 30, // updated value
// // })
// //   .then(() => {
// //     console.log("Ram updated successfully");
// //   })
// //   .catch((error) => {
// //     console.error("Update failed:", error);
// //   });

// // Remove (users/1)
// // remove(ref(db, "users/1"))
// //   .then(() => {
// //     console.log("Ram deleted successfully");
// //   })
// //   .catch((error) => {
// //     console.error("Delete failed:", error);
// //   });
