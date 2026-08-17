export async function get_analytics_service() {
    try {
        const response = await fetch(`/api/get_analytics${window.location.search}`, {
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
