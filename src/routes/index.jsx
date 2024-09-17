import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import DefaultLayout from '~/layouts/DefaultLayout/default.layout'
import AboutComponent from '~/pages/About/About.component'
import HomePageComponent from '~/pages/HomePage/HomePage.component'

const RouteComponent = () => {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path='/home' element={<HomePageComponent />} />
        <Route path='/about' element={<AboutComponent />} />
      </Route>

      <Route path='/' element={
        <Navigate to='/home' relative={true} />
      } />
    </Routes>
  )
}

export default RouteComponent
