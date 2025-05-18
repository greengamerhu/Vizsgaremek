import { Routes, Route } from "react-router-dom"
import { Container } from "react-bootstrap"
import { Home } from "./pages/Home"
import { Store } from "./pages/Store"
import { About } from "./pages/About"
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
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/adress" element={<ShippingAddressList />} />
        </Routes>
      <ToastContainer toastStyle={{backgroundColor : '#272927'}} />
      </Container>

    </ShoppingCartProvider>
  </AuthProvider>
  )
}

export default App
