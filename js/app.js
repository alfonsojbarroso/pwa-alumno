import { fetchCustomers } from './api.js';
import { renderCustomers, renderError } from './ui.js';

async function initApp() {
    try {
        const customers = await fetchCustomers();
        renderCustomers(customers);
    } catch (error) {
        console.error('Error al inicializar la app:', error);
        renderError('No se pudieron cargar los clientes. Comprueba tu conexión.');
    }
}

// Ejecutar al cargar el DOM
document.addEventListener('DOMContentLoaded', initApp);