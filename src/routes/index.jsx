import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import DefaultLayout from '~/layouts/DefaultLayout/default.layout'
import AboutComponent from '~/pages/About/About.component'
import HomePageComponent from '~/pages/HomePage/HomePage.component'
import ContactUs from '~/pages/ContactUs/ContactUs.component'
import ServicePage from '~/pages/ServicePage/Service.component'
import KoiHealthComponent from '~/pages/KoiHealthPage/KoiHealth.component'
import Timetable from '~/pages/Management/Verterian/Timetable'
import LoginPage from '~/pages/LoginPage/LoginPage.component'
import RegisterPage from '~/pages/RegisterPage/RegisterPage.component'
import RequestAppointment from '~/pages/RequestAppointment/RequestAppointment.component'
import AdminLayout from '~/layouts/AdminLayout/admin.layout'
import AdminHomePage from '~/pages/AdminPage/AdminPage.component.jsx'
import PasswordPage from '~/pages/AdminPage/PasswordPage/PasswordPage.component'
import CustomerPage from '~/pages/AdminPage/CustomerPage/CustomerPage.component'

const RouteComponent = () => {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path='/home' element={<HomePageComponent />} />
        <Route path='/about' element={<AboutComponent />} />
        <Route path='/contact' element={<ContactUs />} />
        <Route path='/service' element={<ServicePage />} />
        <Route path='/koihealth' element={<KoiHealthComponent />} />
        <Route path='/veterian' element={<Timetable />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/requestAppointment' element={<RequestAppointment />} />
      </Route>

      <Route element={<AdminLayout />}>
        <Route path='/admin' element={<AdminHomePage />} />
        <Route path='/password' element={<PasswordPage />} />
        <Route path='/customer' element={<CustomerPage />} />
        {/* Route path='/booking' element={<BookingPage />} /> */}
        {/* Route path='/veterian' element={<VeterianPage />} /> */}
        {/* Route path='/prescription' element={<PrescriptonPage />} /> */}
      </Route>

      <Route path='/' element={
        <Navigate to='/home' relative={true} />
      } />

      <Route path='/' element={
        <Navigate to='/admin' relative={true} />
      } />
    </Routes >
  )
}

export default RouteComponent
