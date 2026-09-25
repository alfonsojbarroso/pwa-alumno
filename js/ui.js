// js/ui.js
export function renderCustomers(customers) {
    const container = document.getElementById('customer-list');
    if (!container) return;

    container.innerHTML = '';
    
    customers.forEach(customer => {
        const item = document.createElement('div');
        item.className = 'customer-card';
        item.innerHTML = `
            <h3>${customer.name}</h3>
            <p>ID: ${customer.id}</p>
            <p>Teléfono: ${customer.phone}</p>
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