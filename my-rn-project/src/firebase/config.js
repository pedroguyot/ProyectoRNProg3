import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDqNyXfOj4wWeG0W4NsxFlYE8Y8o-6PpVI",
    authDomain: "proyectornprog3-gtr.firebaseapp.com",
    projectId: "proyectornprog3-gtr",
    storageBucket: "proyectornprog3-gtr.firebasestorage.app",
    messagingSenderId: "899381089634",
    appId: "1:899381089634:web:5526929b714d0e8065483b"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();