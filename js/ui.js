// js/ui.js
export function renderCustomers(alumnos) {
    const container = document.getElementById('customer-list');
    if (!container) return;

    container.innerHTML = '';

    alumnos.forEach(alumno => {
        const item = document.createElement('div');
        item.className = 'customer-card';
        item.innerHTML = `
            <h3>${alumno.name}</h3>
            <p>ID: ${alumno.id}</p>
            <p>Teléfono: ${alumno.phone}</p>
        `;
        container.appendChild(item);
    });
}

export function renderError(message) {
    const container = document.getElementById('customer-list');
    if (container) {
        container.innerHTML = `<p class="error">${message}</p>`;
    }
}