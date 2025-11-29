import './style.css'
// Importar Firebase 
import { db, collection, addDoc, getDocs, serverTimestamp, query, orderBy } from './firebase-config.js';

//firebase

const form = document.getElementById('contacto-form');

// evento de envío al formulario
form.addEventListener('submit', async (e) => {
  e.preventDefault(); // para que no se recargue la página

  // datos del formulario
  const formData = {
    nombre: document.getElementById('nombre').value,
    email: document.getElementById('email').value,
    asunto: document.getElementById('asunto').value,
    mensaje: document.getElementById('mensaje').value,
    timestamp: serverTimestamp() // Timestamp del servidor Firebase
  };

  try {
    
    const docRef = await addDoc(collection(db, 'mensajes'), formData);
    alert('¡Mensaje enviado exitosamente! Nos pondremos en contacto contigo pronto.');
    console.log('Mensaje guardado en Firebase con ID:', docRef.id);
    await cargarMensajesRecientes();
    form.reset();

  } catch (error) {
    alert('✗Error al enviar el mensaje. Por favor, intenta nuevamente.');
    console.error('Error al guardar en Firebase:', error);
  }
});

//cargar mensajes

async function cargarMensajesRecientes() {
  const container = document.getElementById('mensajes-container');

  try {

    container.innerHTML = '<div class="col-span-full text-center py-8"><p class="text-gray-500">Cargando mensajes...</p></div>';

    const q = query(collection(db, 'mensajes'), orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(q);

    container.innerHTML = '';

    // Si no hay mensajes
    if (querySnapshot.empty) {
      container.innerHTML = `
        <div class="col-span-full text-center py-8">
          <p class="text-gray-500">Aún no hay mensajes. ¡Sé el primero en contactarnos!</p>
        </div>
      `;
      return;
    }

    // Mostrar cada mensaje
    querySnapshot.forEach((doc) => {
      const mensaje = doc.data();
      const card = `
        <div class="bg-rose-50 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-2 border-rose-300">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 bg-rose-600 rounded-full flex items-center justify-center text-white font-bold">
              ✓
            </div>
            <h3 class="text-lg font-bold text-rose-900">Mensaje</h3>
          </div>
          <p class="text-gray-900 font-semibold mb-2">${mensaje.asunto}</p>
          <p class="text-gray-700 text-sm mb-1"><strong>De:</strong> ${mensaje.nombre}</p>
          <p class="text-gray-700 text-sm mb-1"><strong>Email:</strong> ${mensaje.email}</p>
          <div class="mt-4 pt-4 border-t border-rose-200">
            <p class="text-xs text-gray-600"><strong>Mensaje:</strong> ${mensaje.mensaje}</p>
          </div>
        </div>
      `;
      container.innerHTML += card;
    });

  } catch (error) {
    // Mensaje de error
    container.innerHTML = `
      <div class="col-span-full text-center py-8">
        <p class="text-red-600">Error al cargar los mensajes. Por favor, recarga la página.</p>
      </div>
    `;
    console.error('Error al cargar mensajes desde Firebase:', error);
  }
}

// Ejecutar cuando la página termine de cargar
window.addEventListener('DOMContentLoaded', cargarMensajesRecientes);
