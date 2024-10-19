import api from "~/config/axios";

export default class StaffApi {
    static async getCustomers(page, unitPerPage, role) {
        const response = await api.get('/accounts/current', {
            "page": page,
            "unitPerPage": unitPerPage,
            "role": role
        })
        console.log(response)
        return response.data;
    }
}
