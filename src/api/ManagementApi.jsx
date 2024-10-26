import api from "~/config/axios";
import TimeUtils from "~/utils/TimeUtils";

function setAccountData(data) {
  return {
    fullName: data.firstName + ' ' + data.lastName,
    dob: TimeUtils.formatDate(data.dob),
    createdAt: TimeUtils.formatDateTime(data.createAt),
    email: data.email,
    phoneNumber: data.phone,
    status: data.disable ? 'Suspended' : 'Active',
  }
}

function setBookingData(data) {
  return {
    id: data.id,
    customer: data.customerFullName,
    veterian: data.veterinarianFullName,
    service: data.serviceName,
    totalPrice: data.totalPrice,
    createdAt: TimeUtils.formatDateTime(data.createdAt),
    status: data.statusEnum
  }
}

export default class ManagementApi {
  static async getCurrentAccount() {
    const response = await api.get('/accounts/current');

    const data = response.data.data;

    return {
      email: data.email,
      role: data.role,
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phone,
      dob: TimeUtils.formatDate(data.dob),
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

  static async getIdleAccounts({ serviceId, startDateTime }) {
    try {
      const response = await api.get(`/accounts/idle-veterian-by-time/${serviceId}/${startDateTime}`);
      if (response.data.data) return response.data.data;
    }
    catch (err) {
      console.error('Cannot get idle account: ' + err.message)
    }
    return [];
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

  static async updateAccountStatus(email, status) {
    const response = await api.post('/accounts/update-status', {
      email,
      status
    });
    return response.data.data;
  }

  // BOOKING
  static async getBookings({status, veterianEmail, page, unitPerPage}) {
    try {
      const response = await api.get('/bookings', {
        params: { page, unitPerPage, veterianEmail, status }
      });
      console.log("RESPONSE DATA: ", response.data.data);
      if (response.data.data) return response.data.data;
    }
    catch (err) {
      console.error('Cannot get idle account: ' + err.message)
    }
    return [];
  }

  static async permitFor(roles) {
    const response = await this.getCurrentAccount();
    let result = false;
    console.log("CHECK ACC ROLE: ", response.role);
    if (response) {
      const accRole = response.role;
      if (Array.isArray(roles)) {
        result = roles.includes(accRole);
      }
    }
    return result;

  }

  // KOI SPECIES
  static async getKoiSpecies(page, unitPerPage ) {
    try {
      const response = await api.get('/koi-species', {
        page, unitPerPage
      });
      if (response.data.data) return response.data.data;
    }
    catch (err) {
      console.error('Cannot get Koi species: ' + err.message)
    }
    return [];
  }

  // MEDICINES
  static async getMedicine(page, unitPerPage ) {
    try {
      const response = await api.get('/medicines', {
        page, unitPerPage
      });
      if (response.data.data) return response.data.data;
    }
    catch (err) {
      console.error('Cannot get Medicines: ' + err.message)
    }
    return [];
  }

  // REPORTS
  static async createReport(requestBody ) {
    try {
      const response = await api.post('/reports',requestBody);
      if (response.data) return true;
    }
    catch (err) {
      console.error('Cannot get Medicines: ' + err.message)
    }
    return false;
  }
}