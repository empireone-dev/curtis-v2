export async function create_product_registration_service(data) {
    try {
        const response = await fetch(`/api/product_registration`, {
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

export async function verify_serial_number_service(serial_number) {
    try {
        const response = await fetch(
            `/api/verify_serial_number/${serial_number}`,
            {
                method: "GET", // GET is the default, but it's good practice to be explicit
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );
        return (await response.json());
    } catch (error) {
        return error;
    }
}

export async function get_product_registration_by_id_service(id) {
    try {
        const response = await fetch(`/api/product_registration/${id}`, {
            method: "GET", // GET is the default, but it's good practice to be explicit
            headers: {
                "Content-Type": "application/json",
            },
        });
        return (await response.json());
    } catch (error) {
        return {};
    }
}
