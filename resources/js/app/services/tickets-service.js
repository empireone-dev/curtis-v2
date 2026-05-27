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