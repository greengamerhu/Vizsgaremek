import { Routes, Route } from "react-router-dom"
import { Container } from "react-bootstrap"
import {  PlaceOrder, } from "./pages/PlaceOrder"
import { Store } from "./pages/Menu"
import { Orders } from "./pages/orders"
import { Navbar } from "./components/navbar"
import { ShoppingCartProvider } from "./context/ShoppingCartContext"
import Login from "./components/Login"
import Register from "./components/Register"
import { AuthProvider } from "./context/authContext"
import { ToastContainer } from "react-toastify"
import ShippingAddressList from "./components/ShippingAdresses"

function App() {
  return (
    <AuthProvider>
    <ShoppingCartProvider>
      <Navbar />
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<Store/>} />
          <Route path="/menu" element={<Store />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/address" element={<ShippingAddressList />} />
          <Route path="/placeOrder" element={<PlaceOrder />} />
        </Routes>
      <ToastContainer toastStyle={{backgroundColor : '#272927'}} />
      </Container>

    </ShoppingCartProvider>
  </AuthProvider>
  )
}

export default App
