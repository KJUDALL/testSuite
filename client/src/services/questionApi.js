export const getQuestions = async () => {
    try {
        const response = await fetch('/api/questions/random');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('Failed to fetch questions:', error);
        throw error;
    }
};
