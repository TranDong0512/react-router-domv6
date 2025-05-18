
// nơi định nghĩa cac action cho product
// Post pull patch delete

export const getAll = async (patch) => {
    try {
        const response = await fetch(`http://localhost:3000/${patch}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}