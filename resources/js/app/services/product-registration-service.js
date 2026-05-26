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
