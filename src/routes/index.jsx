import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import DefaultLayout from '~/layouts/DefaultLayout/default.layout'
import AboutComponent from '~/pages/About/About.component'
import HomePageComponent from '~/pages/HomePage/HomePage.component'
import ContactUs from '~/pages/ContactUs/ContactUs.component'

// Service
import ServicePage from '~/pages/ServicePage/Service.component'
import ServicePageDemo from '~/pages/ServicePageDemo/ServiceDemo.component'
import ServiceChooseConPageComponent from '~/pages/ServicePageDemo/ServiceChooseConPage/ServiceChooseConPage.component'


import KoiHealthComponent from '~/pages/KoiHealthPage/KoiHealth.component'
import Timetable from '~/pages/Management/Verterian/Timetable'
import LoginPage from '~/pages/LoginPage/LoginPage.component'
import RegisterPage from '~/pages/RegisterPage/RegisterPage.component'
import RequestAppointment from '~/pages/RequestAppointment/RequestAppointment.component'
import AdminLayout from '~/layouts/AdminLayout/admin.layout'
import AdminHomePage from '~/pages/AdminPage/AdminPage.component.jsx'
import PasswordPage from '~/pages/AdminPage/PasswordPage/PasswordPage.component'
import CustomerPage from '~/pages/AdminPage/CustomerPage/CustomerPage.component'
import BookingPage from '~/pages/AdminPage/BookingPage/BookingPage.component'
import VeterianPage from '~/pages/AdminPage/VeterianPage/VeterianPage.component'
import PrescriptionPage from '~/pages/AdminPage/PrescriptionPage/PrescriptionPage.component'
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

const RouteComponent = () => {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path='/home' element={<HomePageComponent />} />
        <Route path='/about' element={<AboutComponent />} />
        <Route path='/contact' element={<ContactUs />} />

        {/* Service */}
        <Route path='/service' element={<ServicePage />} />
        <Route path='/serviceDemo' element={<ServicePageDemo />} />
        <Route path='/serviceChooseCon' element={<ServiceChooseConPageComponent />} />

        <Route path='/koihealth' element={<KoiHealthComponent />} />
        <Route path='/veterian' element={<Timetable />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/requestAppointment' element={<RequestAppointment />} />
      </Route>

      <Route element={<AdminLayout />}>
        <Route path='/profile' element={<AdminHomePage />} />
        <Route path='/password' element={<PasswordPage />} />
        <Route path='/customer' element={<CustomerPage />} />
        <Route path='/booking' element={<BookingPage />} />
        <Route path='/veterinarian_management' element={<VeterianPage />} />
        <Route path='/prescription' element={<PrescriptionPage />} />
      </Route>

      <Route element={<StaffLayout />}>
        <Route path='/staff' element={<StaffHomePage />} />
        <Route path='/staff_password' element={<StaffPasswordPage />} />
        <Route path='/staff_customer' element={<StaffCustomerPage />} />
        <Route path='/staff_booking' element={<StaffBookingPage />} />
        <Route path='/staff_veterinarian_management' element={<StaffVeterinarianPage />} />
        <Route path='/staff_prescription' element={<StaffPrescriptionPage />} />
      </Route>

      <Route element={<VeterinarianLayout />}>
        <Route path='/veterinarian' element={<VeterinarianHomePage />} />
        <Route path='/veterinarian_password' element={<VeterinarianPasswordPage />} />
        {/* <Route path='/veterinarian_booking' element={<VeterinarianBookingPage />} /> */}
        {/* <Route path='/veterinarian_medical_report' element={<VeterinarianMedicalReportPage />} /> */}
        {/* <Route path='/veterinarian_medicine' element={<VeterinarianMedicinePage />} /> */}
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
    </Routes >
  )
}

export default RouteComponent
