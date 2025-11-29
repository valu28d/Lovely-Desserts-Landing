import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { getFirestore, collection, addDoc, getDocs, serverTimestamp, query, orderBy } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAglFo7fr2v9OveEWfD5ESjCwDFeJKCuNo",
  authDomain: "lovely-desserts.firebaseapp.com",
  projectId: "lovely-desserts",
  storageBucket: "lovely-desserts.firebasestorage.app",
  messagingSenderId: "533661551214",
  appId: "1:533661551214:web:c08ae999bfd7e39691347f"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Exportar funciones para usar en otros archivos
export { db, collection, addDoc, getDocs, serverTimestamp, query, orderBy };
