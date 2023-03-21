export const BASE_URL = "http://contest.elecard.ru/frontend_data";

const ApiService = {
    async getData(url) {
        const response = await fetch(url);
        const data = await response.json();

        return data;
    },
    async getCards() {
        let url = `${BASE_URL}/catalog.json`;
        const data = ApiService.getData(url);

        return data;
    },
};

export default ApiService;
