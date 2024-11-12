import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import DefaultLayout from '~/layouts/DefaultLayout/default.layout'
import AboutComponent from '~/pages/About/About.component'
import HomePageComponent from '~/pages/HomePage/HomePage.component'
import ContactUs from '~/pages/ContactUs/ContactUs.component'

// Service
import ServicePage from '~/pages/ServicePage/Service.component'
import ServicePageDemo from '~/pages/ServicePageDemo/ServiceDemo.component'


import KoiHealthComponent from '~/pages/KoiHealthPage/KoiHealth.component'
import Timetable from '~/pages/Management/Verterian/Timetable'
import LoginPage from '~/pages/LoginPage/LoginPage.component'
import RegisterPage from '~/pages/RegisterPage/RegisterPage.component'
import RequestAppointment from '~/pages/RequestAppointment/RequestAppointment.component'
import AdminLayout from '~/layouts/AdminLayout/admin.layout'
import AdminHomePage from '~/pages/AdminPage/AdminPage.component.jsx'
import PasswordPage from '~/pages/AdminPage/PasswordPage/PasswordPage.component'
import StaffPage from '~/pages/AdminPage/StaffPage/StaffPage.component'
import StaffServicePage from '~/pages/AdminPage/ServicePage/ServicePage.component'
import VeterianPage from '~/pages/AdminPage/VeterianPage/VeterianPage.component'
import KoiSpeciesPage from '~/pages/AdminPage/KoiSpeciesPage/KoiSpeciesPage.component'
import StaffLayout from '~/layouts/StaffLayout/staff.layout'
import StaffHomePage from '~/pages/StaffPage/Profile/StaffHomePage.component.jsx'
import StaffPasswordPage from '~/pages/StaffPage/StaffPasswordPage/StaffPasswordPage.component'
import StaffCustomerPage from '~/pages/StaffPage/StaffCustomerPage/StaffCustomerPage.component'
import StaffBookingPage from '~/pages/StaffPage/StaffBookingPage/StaffBookingPage.component'
import StaffVeterinarianPage from '~/pages/StaffPage/StaffVeterinarianPage/StaffVeterinarianPage.component'
import StaffPrescriptionPage from '~/pages/StaffPage/StaffPrescriptionPage/StaffPrescriptionPage.component'
import VeterinarianLayout from '~/layouts/VeterinarianLayout/veterinarian.layout'
import VeterinarianHomePage from '~/pages/VeterinarianHomePage/Profile/ProfilePage.component'
import VeterinarianPasswordPage from '~/pages/VeterinarianHomePage/VeterinarianPasswordPage/VeterinarianPasswordPage.component'
import VeterinarianBookingPage from '~/pages/VeterinarianHomePage/VeterinarianBookingPage/VeterinarianBookingPage.component'
import VeterinarianMedicalReportPage from '~/pages/VeterinarianHomePage/VeterinarianMedicalReportPage/VeterinarianMedicalReportPage.component'
import VeterinarianMedicinePage from '~/pages/VeterinarianHomePage/VeterinarianMedicinePage/VeterinarianMedicinePage.component'
import OnlineConsultantComponent from '~/pages/OnlineConsultantPage/OnlineConsultant.component'
import KoiTreatmentAtCenterComponent from '~/pages/KoiTreatmentAtCenterPage/KoiTreatmentAtCenter.component'
import KoiTreatmentAtHomeComponent from '~/pages/KoiTreatmentAtHomePage/KoiTreatmentAtHome.component'
import PondInspectComponent from '~/pages/PondInspectPage/PondInspect.component'
import BookingFlexibleScheduleComponent from '~/pages/BookingFlexibleSchedule/BookingFlexibleSchedule.component'
import ConfirmBookingComponent from '~/pages/ConfirmBookingPage/ConfirmBooking.component'
import DeliveryPage from '~/pages/AdminPage/DeliveryPage/DeliveryPage.component'
import AdminMedicinePage from '~/pages/AdminPage/MedicinePage/AdminMedicinePage.component'
import SelectVeterinarianByAvailableSlotTimeComponent from '~/pages/SelectVeterinarianByAvailableSlotTimePage/SelectVeterinarianByAvailableSlotTimePage.component'

import DashboardBookingPage from '~/pages/AdminPage/DashboardPage/DashboardBookingsPage/DashboardBookingsPage.component'
import DashboardVeterinariansPage from '~/pages/AdminPage/DashboardPage/DashboardVeterinarianPage/DashboardVeterinariansPage.component'
import ServiceChooseConPageComponent from '~/pages/ServicePageDemo/ServiceChooseConPage/ServiceChooseConPage.component'
import VeterianNotificationPage from '~/pages/VeterinarianHomePage/VeterianNotificationPage/VeterianNotificationPage.component'
import ForbiddenPageDetail from '~/pages/AdditionalPages/ForbiddenPageDetail'
import Profile from '~/pages/AdminPage/AdminPageDetails/Profile'
import UserLayout from '~/layouts/UserLayout/user.layout'
import CustomerLayout from '~/layouts/CustomerLayout/customer.layout'
import CustomerPage from '~/pages/CustomerPage/CustomerProfilePage/CustomerProfile.component'
import CustomerBookingPage from '~/pages/CustomerPage/CustomerBookingPage/CustomerBookingPage.component'
import SelectVeterinarianByAnyDateTimeComponent from '~/pages/SelectVeterinarianByAnyDateTimePage/SelectByVeterinarianByAnyDateTime.component'
import AdditionalInfoBookingComponent from '~/pages/AdditionalInfoBookingPage/AdditionalInfoBooking.component'


import BookingListComponent from '~/pages/BookingListPage/BookingList.component'
import LoginPageAdmin from '~/pages/LoginPageAdmin/LoginPageAdmin.component'
import CreateReportPageComponent from '~/pages/VeterinarianHomePage/VeterianCreateReportPage/CreateReportPage.component'
// import VeterinarianInformation from '~/pages/SelectVeterinarianByAvailableSlotTimePage/VeterinarianInfomation/VeterinarianInformation'
import PaymentResult from '~/pages/ConfirmBookingPage/PaymentResult/PaymentResult'
import CustomerPasswordComponent from '~/pages/CustomerPage/CustomerPasswordPage/CustomerPassword.component'
import VeterinarianInformation from '~/pages/VeterinarianInformation/VeterinarianInformation'
import StaffNotificationPage from '~/pages/StaffPage/StaffNotificationPage/StaffNotificationPage.component'

const RouteComponent = () => {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path='/home' element={<HomePageComponent />} />
        <Route path='/about' element={<AboutComponent />} />
        {/* <Route path='/contact' element={<ContactUs />} /> */}

        <Route path='/403' element={<ForbiddenPageDetail />} />

        {/* Service */}
        <Route path='/service' element={<ServicePage />} />
        <Route path='/serviceDemo' element={<ServicePageDemo />} />
        <Route path='/service-choose-consultant' element={<ServiceChooseConPageComponent />} />

        {/* Service Details */}
        <Route path='/online-consultant' element={<OnlineConsultantComponent />} />
        <Route path='/koi-treatment-at-center' element={<KoiTreatmentAtCenterComponent />} />
        <Route path='/koi-treatment-at-home' element={<KoiTreatmentAtHomeComponent />} />
        <Route path='/pond-inspect' element={<PondInspectComponent />} />
        <Route path='/booking-flexible-schedule' element={< BookingFlexibleScheduleComponent />} />
        <Route path='/select-veterian' element={< SelectVeterinarianByAvailableSlotTimeComponent />} />
        <Route path='/confirm-booking' element={< ConfirmBookingComponent />} />
        <Route path='/select-veterian-by-any-time' element={<  SelectVeterinarianByAnyDateTimeComponent />} />
        <Route path='/payment-result' element={<  PaymentResult />} />
        <Route path="/veterinarian-information" element={<VeterinarianInformation />} />



        {/* <Route path='/appointments' element={<  AppointmentComponent />} /> */}

        {/* <Route path="/veterinarian-information" element={<VeterinarianInformation />} /> */}
        <Route path="/additional-info-booking" element={<AdditionalInfoBookingComponent />} />
        <Route path='/veterian/create-report' element={<CreateReportPageComponent />} />

        <Route path='/koihealth' element={<KoiHealthComponent />} />
        <Route path='/veterian' element={<Timetable />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/requestAppointment' element={<RequestAppointment />} />
        <Route path='/booking-list' element={<  BookingListComponent />} />

        <Route element={<CustomerLayout />}>
          <Route path='/customer' element={<CustomerPage />} />
          {/* <Route path='/customer_booking' element={<CustomerBookingPage />} /> */}
          <Route path='/customer_password' element={<CustomerPasswordComponent />} />

        </Route>
        {/* <Route path='/register/admin' element={<RegisterPageAdmin />} /> */}
      </Route>

      {/* Log in for management page */}
      <Route path='/management-login' element={<LoginPageAdmin />} />

      <Route element={<AdminLayout />}>
        {/* <Route path='/dashboard' element={<DashboardPage />} /> */}
        <Route path='/bookings_dashboard' element={<DashboardBookingPage />} />
        <Route path='/veterinarians_dashboard' element={<DashboardVeterinariansPage />} />
        <Route path='/admin_password' element={<PasswordPage />} />
        <Route path='/admin_staff' element={<StaffPage />} />
        <Route path='/admin_service' element={<StaffServicePage />} />
        <Route path='/admin_veterinarian_management' element={<VeterianPage />} />
        <Route path='/admin_koi_species' element={<KoiSpeciesPage />} />
        <Route path='/admin_medicine' element={<AdminMedicinePage />} />
        <Route path='/admin_delivery' element={<DeliveryPage />} />
      </Route>

      {/* profile */}
      <Route element={<UserLayout />}>
        <Route path='/customer' element={<AdminHomePage />} />
      </Route>

      <Route element={<StaffLayout />}>
        <Route path='/staff' element={<StaffHomePage />} />
        <Route path='/staff_password' element={<StaffPasswordPage />} />
        <Route path='/staff_customer' element={<StaffCustomerPage />} />
        <Route path='/staff_booking' element={<StaffBookingPage />} />
        <Route path='/staff_veterinarian_management' element={<StaffVeterinarianPage />} />
        <Route path='/staff_prescription' element={<StaffPrescriptionPage />} />
        <Route path='/staff/notification' element={<StaffNotificationPage />} />
      </Route>

      <Route element={<VeterinarianLayout />}>
        <Route path='/veterinarian' element={<VeterinarianHomePage />} />
        <Route path='/veterinarian_password' element={<VeterinarianPasswordPage />} />
        <Route path='/veterinarian_booking' element={<VeterinarianBookingPage />} />
        <Route path='/veterinarian_medical_report' element={<VeterinarianMedicalReportPage />} />
        <Route path='/veterinarian_medicine' element={<VeterinarianMedicinePage />} />
        <Route path='/veterian/notifications' element={<VeterianNotificationPage />} />
      </Route>



      <Route path='/' element={
        <Navigate to='/home' relative={true} />
      } />

      <Route path='/' element={
        <Navigate to='/admin' relative={true} />
      } />

      <Route path='/' element={
        <Navigate to='/staff' relative={true} />
      } />

      <Route path='/' element={
        <Navigate to='/veterinarian' relative={true} />
      } />

      <Route path='/' element={
        <Navigate to='/customer' relative={true} />
      } />
    </Routes >
  )
}

export default RouteComponent
