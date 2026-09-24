export async function get_users_service() {
    try {
        const response = await fetch(`/api/users${window.location.search}`, {
            method: "GET",
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Failed to create ticket:", error);
        throw error;
    }
}
