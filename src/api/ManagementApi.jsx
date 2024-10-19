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
        fullName: data.firstName + ' ' + data.lastName,
        dob: formatDate(data.dob),
        createdAt: formatDate(data.createAt),
        email: data.email,
        phoneNumber: data.phone,
        status: data.status ? 'Suspended' : 'Active'
    }
}

function setBookingData(data){
    return {
        id: data.id,
        customer: data.customerFullName,
        veterian: data.veterinarianFullName,
        service: data.serviceName,
        totalPrice: data.totalPrice,
        createdAt: formatDate(data.createdAt),
        status: data.statusEnum 
    }
}

export default class ManagementApi {
    static async getCurrentAccount() {
        const response = await api.get('/accounts/current');

        const data = response.data.data;
        console.log(data)

        return {
            email: data.email,
            role: data.role,
            firstName: data.firstName,
            lastName: data.lastName,
            phoneNumber: data.phone,
            dob: formatDate(data.dob),
            address: data.address
        };;
    }

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
        const response = await api.get('/bookings', {
            params: { page, unitPerPage, status }
        });

        const bookingData = response.data.data.map((data) => {
            return setBookingData(data);
        })

        return bookingData;
    } 
}