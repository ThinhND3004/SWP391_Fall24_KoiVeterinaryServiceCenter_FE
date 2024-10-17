import api from "~/config/axios";

function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getMonth() + 1).padStart(2, '0');
    const month = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
}

function setAccountData(data) {
    return {
        name: data.lastName,
        dob: formatDate(data.dob),
        fullName: data.firstName + ' ' + data.lastName,
        createdAt: formatDate(data.createAt),
        email: data.email,
        phoneNumber: data.phone,
        status: data.status ? 'Suspended' : 'Active'
    }
}

export default class ManagementApi {
    static async getAccounts(role, page, unitPerPage) {
        const response = await api.get('/accounts', {
            params: { page, unitPerPage, role }
        });

        const customerData = response.data.data.map((data) => {
            return setAccountData(data);
        })

        return customerData;
    }

    static async searchAccountsByFullName(role, searchValue, page, unitPerPage) {
        const response = await api.get('/accounts/search-by-name/' + searchValue, {
            params: { page, unitPerPage, role }
        });

        const customerData = response.data.data.map((data) => {
            return setAccountData(data);
        })

        return customerData;
    }

    // BOOKING
    static async getBookings(status,page, unitPerPage){
        const response = await api.get('/accounts/search-by-name/' + searchValue, {
            params: { page, unitPerPage, role }
        });
    } 
}