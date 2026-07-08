export async function create_ticket_service(data) {
    try {
        const response = await fetch(`/api/tickets`, {
            method: "POST",
            body: data,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Failed to create ticket:", error);
        throw error; // It's usually better to throw the error so the UI can catch it and show a message
    }
}

export async function upload_lacking_information_service(data) {
    try {
        const response = await fetch(`/api/upload_lacking_information`, {
            method: "POST",
            body: data,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Failed to create ticket:", error);
        throw error; // It's usually better to throw the error so the UI can catch it and show a message
    }
}



export async function get_ticket_by_serial_number_service(id) {
    try {
        const response = await fetch(`/api/get_ticket_by_serial_number/${id}`, {
            method: "GET", 
            headers: {
                "Content-Type": "application/json",
            },
        });
        return await response.json();
    } catch (error) {
        return {};
    }
}

export async function get_product_registration_by_serial_number_service(id) {
    try {
        const response = await fetch(`/api/get_product_registration_by_serial_number/${id}`, {
            method: "GET", 
            headers: {
                "Content-Type": "application/json",
            },
        });
        return await response.json();
    } catch (error) {
        return {};
    }
}


