import './style.css'

// Array para almacenar los pedidos realizados
let pedidosRealizados = [];

// === MANEJO DEL FORMULARIO DE PEDIDOS ===
// Obtener el formulario del DOM
const form = document.getElementById('pedido-form');

// Agregar evento de envío al formulario
form.addEventListener('submit', async (e) => {
  // Prevenir el envío tradicional del formulario (recarga de página)
  e.preventDefault();

  // Recolectar todos los datos del formulario
  const formData = {
    nombre: document.getElementById('nombre').value,
    email: document.getElementById('email').value,
    telefono: document.getElementById('telefono').value,
    cantidad: document.getElementById('cantidad').value,
    postre: document.getElementById('postre').value,
    mensaje: document.getElementById('mensaje').value || 'Sin mensaje'
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
      alert('✓ ¡Pedido enviado exitosamente! Nos pondremos en contacto contigo pronto.');
      console.log('Respuesta del servidor:', data);

      // Agregar el pedido al array de pedidos realizados
      pedidosRealizados.unshift(formData); // unshift agrega al inicio del array

      // Actualizar la visualización de pedidos recientes
      mostrarPedidosRecientes();

      form.reset(); // Limpiar el formulario
    }
  } catch (error) {
    // Manejo de errores (problemas de red, servidor caído, etc.)
    alert('✗ Error al enviar el pedido. Por favor, intenta nuevamente.');
    console.error('Error:', error);
  }
});

// === OBTENER Y MOSTRAR PEDIDOS RECIENTES (fetch GET) ===
// Esta función se ejecuta cuando la página carga
async function cargarPedidosRecientes() {
  // Obtener el contenedor donde se mostrarán los pedidos
  const container = document.getElementById('pedidos-container');

  try {
    // Hacer petición GET a la API para obtener datos
    // JSONPlaceholder devuelve 100 posts, limitamos a 3 para dejar espacio a los pedidos del usuario
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3');

    // Convertir la respuesta a JSON
    const posts = await response.json();

    // Limpiar el mensaje de "Cargando..."
    container.innerHTML = '';

    // Primero mostrar los pedidos realizados por el usuario
    pedidosRealizados.forEach((pedido, index) => {
      const card = `
        <div class="bg-rose-50 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-2 border-rose-300">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 bg-rose-600 rounded-full flex items-center justify-center text-white font-bold">
              ✓
            </div>
            <h3 class="text-lg font-bold text-rose-900">Tu Pedido</h3>
          </div>
          <p class="text-gray-900 font-semibold mb-2">${pedido.postre} x${pedido.cantidad}</p>
          <p class="text-gray-700 text-sm mb-1"><strong>Cliente:</strong> ${pedido.nombre}</p>
          <p class="text-gray-700 text-sm mb-1"><strong>Email:</strong> ${pedido.email}</p>
          <p class="text-gray-700 text-sm mb-1"><strong>Teléfono:</strong> ${pedido.telefono}</p>
          <div class="mt-4 pt-4 border-t border-rose-200">
            <p class="text-xs text-gray-600"><strong>Mensaje:</strong> ${pedido.mensaje}</p>
          </div>
        </div>
      `;
      container.innerHTML += card;
    });

    // Luego mostrar pedidos de ejemplo de la API
    posts.forEach(post => {
      const card = `
        <div class="bg-gray-50 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 bg-rose-600 rounded-full flex items-center justify-center text-white font-bold">
              ${post.id}
            </div>
            <h3 class="text-lg font-bold text-gray-900">Pedido #${post.id}</h3>
          </div>
          <p class="text-gray-700 font-semibold mb-2">${post.title}</p>
          <p class="text-gray-600 text-sm line-clamp-3">${post.body}</p>
          <div class="mt-4 pt-4 border-t border-gray-200">
            <span class="text-xs text-gray-500">Usuario: ${post.userId}</span>
          </div>
        </div>
      `;
      container.innerHTML += card;
    });

  } catch (error) {
    // Si hay error, mostrar mensaje
    container.innerHTML = `
      <div class="col-span-full text-center py-8">
        <p class="text-red-600">Error al cargar los pedidos. Por favor, recarga la página.</p>
      </div>
    `;
    console.error('Error al cargar pedidos:', error);
  }
}

// Función para mostrar solo los pedidos realizados por el usuario
function mostrarPedidosRecientes() {
  const container = document.getElementById('pedidos-container');

  // Limpiar contenedor
  container.innerHTML = '';

  // Mostrar los pedidos del usuario
  pedidosRealizados.forEach((pedido, index) => {
    const card = `
      <div class="bg-rose-50 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-2 border-rose-300">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 bg-rose-600 rounded-full flex items-center justify-center text-white font-bold">
            ✓
          </div>
          <h3 class="text-lg font-bold text-rose-900">Tu Pedido</h3>
        </div>
        <p class="text-gray-900 font-semibold mb-2">${pedido.postre} x${pedido.cantidad}</p>
        <p class="text-gray-700 text-sm mb-1"><strong>Cliente:</strong> ${pedido.nombre}</p>
        <p class="text-gray-700 text-sm mb-1"><strong>Email:</strong> ${pedido.email}</p>
        <p class="text-gray-700 text-sm mb-1"><strong>Teléfono:</strong> ${pedido.telefono}</p>
        <div class="mt-4 pt-4 border-t border-rose-200">
          <p class="text-xs text-gray-600"><strong>Mensaje:</strong> ${pedido.mensaje}</p>
        </div>
      </div>
    `;
    container.innerHTML += card;
  });

  // Si no hay pedidos del usuario, mostrar mensaje
  if (pedidosRealizados.length === 0) {
    container.innerHTML = `
      <div class="col-span-full text-center py-8">
        <p class="text-gray-500">Aún no has realizado ningún pedido. ¡Haz tu primer pedido arriba!</p>
      </div>
    `;
  }
}

// Ejecutar la función cuando la página termine de cargar
window.addEventListener('DOMContentLoaded', cargarPedidosRecientes);
