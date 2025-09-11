import { Routes, Route } from 'react-router-dom'
import Signup from './keyComponents/SignupPage/signup'
import Login from './keyComponents/LoginPage/Login'
import Home from './keyComponents/HomePage/Home'
import './App.css'
import Product from './keyComponents/ProductDetails/Product'
import Contact from './keyComponents/ContactUs/Contact'
import About from './keyComponents/About/About'

import ProtectedRoute from './keyComponents/ProtectedRoutes'


function App() {
  

  return (
    <>
      <Routes >
        <Route path = "/about" element={<ProtectedRoute><About></About></ProtectedRoute>}> </Route>
        <Route path = "/signUp" element={<Signup/>}> </Route> 
        <Route path = "/login" element={<Login></Login>}> </Route>
         <Route path = "/" element={
         <Login></Login>}> </Route>
         < Route path = "/home" element={<ProtectedRoute><Home/></ProtectedRoute>}> </Route>  
         <Route path = "/product" element={<ProtectedRoute><Product/></ProtectedRoute>}> </Route> 
         <Route path = "/contact" element={<ProtectedRoute><Contact/></ProtectedRoute>}> </Route>
      </Routes>
    </>
  )
}

export default App
