const API_URL = 'http://localhost:9090/api/v1/customer';

export async function fetchCustomers() {
    const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'flow': 'tu_valor_para_el_header' // Reemplaza 'tu_valor_para_el_header' por el valor que exija tu backend
        }
    });
    if (!response.ok) {
        throw new Error(`Error en la petición: ${response.status} ${response.statusText}`);
    }

    return await response.json();
}