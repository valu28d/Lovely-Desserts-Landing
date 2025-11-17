import './style.css'

// Array para almacenar los mensajes enviados
let mensajesEnviados = [];

// === MANEJO DEL FORMULARIO DE CONTACTO ===
// Obtener el formulario del DOM
const form = document.getElementById('contacto-form');

// Agregar evento de envío al formulario
form.addEventListener('submit', async (e) => {
  // Prevenir el envío tradicional del formulario (recarga de página)
  e.preventDefault();

  // Recolectar todos los datos del formulario
  const formData = {
    nombre: document.getElementById('nombre').value,
    email: document.getElementById('email').value,
    asunto: document.getElementById('asunto').value,
    mensaje: document.getElementById('mensaje').value
  };

  try {
    // Enviar petición POST a la API
    // JSONPlaceholder es una API de prueba que simula respuestas
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // Indicamos que enviamos JSON
      },
      body: JSON.stringify(formData) // Convertir objeto a JSON
    });

    // Convertir la respuesta a JSON
    const data = await response.json();

    // Si la respuesta es exitosa (status 200-299)
    if (response.ok) {
      alert('✓ ¡Mensaje enviado exitosamente! Nos pondremos en contacto contigo pronto.');
      console.log('Respuesta del servidor:', data);

      // Agregar el mensaje al array de mensajes enviados
      mensajesEnviados.unshift(formData); // unshift agrega al inicio del array

      // Actualizar la visualización de mensajes recientes
      mostrarMensajesRecientes();

      form.reset(); // Limpiar el formulario
    }
  } catch (error) {
    // Manejo de errores (problemas de red, servidor caído, etc.)
    alert('✗ Error al enviar el mensaje. Por favor, intenta nuevamente.');
    console.error('Error:', error);
  }
});

// === OBTENER Y MOSTRAR MENSAJES RECIENTES (fetch GET) ===
// Esta función se ejecuta cuando la página carga
async function cargarMensajesRecientes() {
  // Obtener el contenedor donde se mostrarán los mensajes
  const container = document.getElementById('mensajes-container');

  try {
    // Limpiar el mensaje de "Cargando..."
    container.innerHTML = '';

    // Si no hay mensajes del usuario, mostrar mensaje inicial
    if (mensajesEnviados.length === 0) {
      container.innerHTML = `
        <div class="col-span-full text-center py-8">
          <p class="text-gray-500">Aún no has enviado ningún mensaje. ¡Usa el formulario de contacto arriba!</p>
        </div>
      `;
      return;
    }

    // Mostrar los mensajes enviados por el usuario
    mensajesEnviados.forEach((mensaje, index) => {
      const card = `
        <div class="bg-rose-50 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-2 border-rose-300">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 bg-rose-600 rounded-full flex items-center justify-center text-white font-bold">
              ✓
            </div>
            <h3 class="text-lg font-bold text-rose-900">Tu Mensaje</h3>
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
    // Si hay error, mostrar mensaje
    container.innerHTML = `
      <div class="col-span-full text-center py-8">
        <p class="text-red-600">Error al cargar los mensajes. Por favor, recarga la página.</p>
      </div>
    `;
    console.error('Error al cargar mensajes:', error);
  }
}

// Función para mostrar solo los mensajes enviados por el usuario
function mostrarMensajesRecientes() {
  const container = document.getElementById('mensajes-container');

  // Limpiar contenedor
  container.innerHTML = '';

  // Mostrar los mensajes del usuario
  mensajesEnviados.forEach((mensaje, index) => {
    const card = `
      <div class="bg-rose-50 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-2 border-rose-300">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 bg-rose-600 rounded-full flex items-center justify-center text-white font-bold">
            ✓
          </div>
          <h3 class="text-lg font-bold text-rose-900">Tu Mensaje</h3>
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

  // Si no hay mensajes del usuario, mostrar mensaje
  if (mensajesEnviados.length === 0) {
    container.innerHTML = `
      <div class="col-span-full text-center py-8">
        <p class="text-gray-500">Aún no has enviado ningún mensaje. ¡Usa el formulario de contacto arriba!</p>
      </div>
    `;
  }
}

// Ejecutar la función cuando la página termine de cargar
window.addEventListener('DOMContentLoaded', cargarMensajesRecientes);
