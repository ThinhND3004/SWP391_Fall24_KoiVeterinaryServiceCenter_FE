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
      id: data.id,
      email: data.email,
      role: data.role,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      dob: data.dob,
      address: data.address,
      imageId: data.imageEntityId
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

  // TIMETABLES
  static async getTimetables() {
    try {
      const response = await api.get('/timetables');
      if (response.data.data) return response.data.data;
    }
    catch (err) {
      console.error('Cannot get timetables: ' + err.message)
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

  // BOOKING
  static async getBookings({ status, page, unitPerPage }) {
    try {
      const response = await api.get('/bookings', {
        params: { page, unitPerPage, status }
      });
      if (response.data.data) return response.data.data;
    }
    catch (err) {
      console.error('Cannot get bookings: ' + err.message)
    }
    return [];
  }

  static async getVeterianBookings({ status, page, unitPerPage }) {
    try {
      const response = await api.get('/bookings/by-veterian', {
        params: { page, unitPerPage, status }
      });
      if (response.data.data) return response.data.data;
    }
    catch (err) {
      console.error('Cannot get veterian booking: ' + err.message)
    }
    return [];
  }

  static async assignVeterianToBooking({ bookingId, veterianEmail }) {
    try {
      const response = await api.post(`/bookings/assign-veterian/${bookingId}/${veterianEmail}`);
      if (response.data.data) return response.data.data;
    }
    catch (err) {
      console.error('Cannot assign Veterian. ' + err.message)
    }
    return null;
  }

  // KOI SPECIES
  static async getKoiSpecies(page, unitPerPage) {
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
  static async getMedicine(page, unitPerPage) {
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
  static async createReport(requestBody) {
    let response;
    try {
      response = await api.post('/reports', requestBody);
      if (response.data) return response;
    }
    catch (err) {
      console.error('Cannot create Report: ' + err.message)
    }
    return response;
  }

  static async getReportByBookingId({ bookingId }) {
    try {
      const response = await api.get('/reports/by-booking-id/'+bookingId);
      if (response.data) return response.data.data;
    }
    catch (err) {
      console.error('Cannot find Report by bookingId ' + bookingId + ': ' + err.message)
    }
    return null;
  }

  // NOTIFICATIONS
  static async getCurrentNotifications() {
    try {
      const response = await api.get('/notifications/current');
      if (response.data) return response.data.data;
    }
    catch (err) {
      console.error('Cannot get Notifications: ' + err.message)
    }
    return [];
  }

  static async deleteNotificationById(id) {
    try {
      const response = await api.delete('/notifications/' + id);
      if (response.data) return true;
    }
    catch (err) {
      console.error('Cannot delete Notifications with id' + id + ': ' + err.message)
    }
    return false;
  }

  static async getImage(imageId) {
    let result = null;
    try {
      const response = await api.get(`http://localhost:8089/images/picture/${imageId}`, {
        responseType: 'blob',
      });
      result = URL.createObjectURL(response.data);
    } catch (err) {
      console.log("ERROR GET IMG API MANAGE: ", err)
    }
    return result;
  }


  // EMAIL 
  static async sendInvitationEmail({ to, recipientName, serviceName, serviceMethod, date, time, location, referenceNumber, companyName, companyWebsite }) {
    try {
      const response = await api.post('/api/emails/send-invitation-for-veterinarian', {
        to,
        recipientName,
        serviceName,
        serviceMethod,
        date,
        time,
        location,
        referenceNumber,
        companyName,
        companyWebsite
      });
      if (response.data) return response.data.data;
    }
    catch (err) {
      console.error('Cannot get Notifications: ' + err.message)
    }
    return [];
  }
}