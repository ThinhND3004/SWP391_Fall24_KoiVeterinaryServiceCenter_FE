import api from "~/config/axios";

export default class HomeApi {
    static async getServices() {
        try {
            const response = await api.get(`services`);            
            return response.data.data;
        } catch (err) {
            console.log(err.message);
        }
        return [];
    }
}