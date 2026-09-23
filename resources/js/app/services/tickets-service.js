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

export const upload_files_service = async (ticketId, category, files) => {
    const formData = new FormData();
    formData.append("id", ticketId);
    formData.append("type", category.replace(/_/g, ' '));

    files.forEach((file) => {
        formData.append(`${category}[]`, file);
    });

    const response = await fetch("/api/files", {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        throw new Error(`Upload failed with status ${response.status}`);
    }

    const data = await response.json();
    return data;
};

export async function get_tickets_service() {
    try {
        const response = await fetch(`/api/tickets${window.location.search}`, {
            method: "GET",
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

export async function validate_email_service(data) {
    try {
        const response = await fetch(`/api/validate_email?email=${data}`, {
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
        const response = await fetch(
            `/api/get_product_registration_by_serial_number/${id}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );
        return await response.json();
    } catch (error) {
        return {};
    }
}
