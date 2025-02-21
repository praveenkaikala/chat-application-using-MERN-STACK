export const getUserId=()=>{
    try {
        const storedData = localStorage.getItem('userdata');
        if (!storedData) return null; // Handle missing data safely

        const parsedData = JSON.parse(storedData);
        const id = parsedData?.data?.id;

        console.log(id);
        return id || null; // Ensure function returns null if id is undefined
    } catch (error) {
        console.error("Error parsing userdata:", error);
        return null;
    }
}