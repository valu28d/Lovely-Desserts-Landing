import './style.css'

//POST//

// para almacenar los mensajes enviados
let mensajesEnviados = [];
const form = document.getElementById('contacto-form');

// evento de envio al formulario
form.addEventListener('submit', async (e) => {
  e.preventDefault(); //para que no se recargue la pagina

  //datos del forms
  const formData = {
    nombre: document.getElementById('nombre').value,
    email: document.getElementById('email').value,
    asunto: document.getElementById('asunto').value,
    mensaje: document.getElementById('mensaje').value
  };

  try {
    // enviar petición POST a la APIJSONPlaceholder que es una API de prueba que simula respuestas
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // enviamos JSON
      },
      body: JSON.stringify(formData) // convertir objeto a JSON
    });

   //respuesta a json
    const data = await response.json();

    if (response.ok) {
      alert('¡Mensaje enviado exitosamente! Nos pondremos en contacto contigo pronto.');
      console.log('Respuesta del servidor:', data);

      mensajesEnviados.unshift(formData); // unshift agrega al inicio del array de los mensajes enviados

      mostrarMensajesRecientes(); //actualizar y aqui se ejecuta lo del get

      form.reset(); 
    }
  } catch (error) {
    console.error('Error:', error);
  }
});

// GET // se ejecuta cuando la pag carga
async function cargarMensajesRecientes() {
  const container = document.getElementById('mensajes-container');
  try {
    // Limpiar el mensaje de "Cargando..."
    container.innerHTML = '';

    // si no hay mensajes del usuario, mostrar mensaje inicial
    if (mensajesEnviados.length === 0) {
      container.innerHTML = `
        <div class="col-span-full text-center py-8">
          <p class="text-gray-500">Aún no has enviado ningún mensaje. ¡Usa el formulario de contacto arriba!</p>
        </div>
      `;
      return;
    }

    // mensajes enviados por el usuario
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
    // mensaje de error
    container.innerHTML = `
      <div class="col-span-full text-center py-8">
        <p class="text-red-600">Error al cargar los mensajes. Por favor, recarga la página.</p>
      </div>
    `;
    console.error('Error al cargar mensajes:', error);
  }
}

// para mostrar solo los mensajes enviados por el usuario
function mostrarMensajesRecientes() {
  const container = document.getElementById('mensajes-container');
  container.innerHTML = '';

  // mostrar los mensajes del usuario
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

  // si no hay mensajes del usuario, mostrar mensaje
  if (mensajesEnviados.length === 0) {
    container.innerHTML = `
      <div class="col-span-full text-center py-8">
        <p class="text-gray-500">Aún no has enviado ningún mensaje. ¡Usa el formulario de contacto arriba!</p>
      </div>
    `;
  }
}

// ejecutar la función cuando la página termine de cargar
window.addEventListener('DOMContentLoaded', cargarMensajesRecientes);
