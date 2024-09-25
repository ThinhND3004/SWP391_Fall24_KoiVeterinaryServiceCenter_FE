import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import DefaultLayout from '~/layouts/DefaultLayout/default.layout'
import AboutComponent from '~/pages/About/About.component'
import HomePageComponent from '~/pages/HomePage/HomePage.component'
import ContactUs from '~/pages/ContactUs/ContactUs.component'
import ServicePage from '~/pages/ServicePage/Service.component'
import KoiHealthComponent from '~/pages/KoiHealthPage/KoiHealth.component'
import Timetable from '~/pages/Management/Verterian/Timetable'

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
      </Route>

      <Route path='/' element={
        <Navigate to='/home' relative={true} />
      } />
    </Routes>
  )
}

export default RouteComponent
