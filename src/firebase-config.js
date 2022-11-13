import { initializeApp } from 'firebase/app';

// If you're not using Code Sandbox, never hard-code the keys! Add them in your .env file and link them here
var firebaseConfig = {
    // apiKey: "AIzaSyATOElfQsCFUS4YVWcfpPmYD6feuXoCDoo",
    // authDomain: "kolhapuriganpati.firebaseapp.com",
    // projectId: "kolhapuriganpati",
    // storageBucket: "kolhapuriganpati.appspot.com",
    // messagingSenderId: "441102419006",
    // appId: "1:441102419006:web:8d3126aa46964db1c47d6f",
    // measurementId: "G-RCERM4M6Z8",
    // databaseURL: "https://kolhapuriganpati-default-rtdb.asia-southeast1.firebasedatabase.app/"

    apiKey: "AIzaSyDdgl1DAj-4gwRBGCzQeYWGU8xLWLRBy44",
    authDomain: "abdiet-dd01c.firebaseapp.com",
    projectId: "abdiet-dd01c",
    storageBucket: "abdiet-dd01c.appspot.com",
    messagingSenderId: "1665402178",
    appId: "1:1665402178:web:b4feb4bc10436f21f5f4db",
    measurementId: "G-GHJQES78X5"
    
};

// Initialize Firebase
let instance;
let secondary;
export default function getFirebase() {
  if (typeof window !== "undefined") {
    if (instance) return instance;
    instance = initializeApp(firebaseConfig);
    return instance;
  }
  return null;
}

export function getSecondaryFirebase() {
  if (typeof window !== "undefined") {
    if (secondary) return secondary;
    secondary = initializeApp(firebaseConfig);
    return secondary;
  }
  return null;
}
