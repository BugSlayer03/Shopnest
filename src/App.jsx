import { Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { CheckoutPage } from './pages/CheckoutPage'
import { OrdersPage } from './pages/OrdersPage'
import { Gadgets } from './pages/Gadgets'
import { Beauty } from './pages/Beauty'
import { Foods } from './pages/Foods'
import { HomeAppliances } from './pages/HomeAppliances'
import { SearchResults } from './pages/SearchResults'
import { ProductPage } from './pages/ProductPage'
import { AboutPage } from './pages/AboutPage'
import { ContactUs } from './pages/ContactUs'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { ProfilePage } from './pages/ProfilePage'
import { ProtectedRoute } from './components/protectedRoute'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage/>}></Route>
      <Route path='checkout' element={<ProtectedRoute><CheckoutPage/></ProtectedRoute>}></Route>
      <Route path='orders' element={<ProtectedRoute><OrdersPage/></ProtectedRoute>}></Route>
      <Route path='gadgets' element={<Gadgets/>}></Route>
      <Route path='beauty' element={<Beauty/>}></Route>
      <Route path='foods' element={<Foods/>}></Route>
      <Route path='home_appliances' element={<HomeAppliances/>}></Route>
      <Route path='search' element={<SearchResults/>}></Route>
      <Route path='productPage' element={<ProductPage/>}></Route>
      <Route path='about' element={<AboutPage/>}></Route>
      <Route path='contact' element={<ContactUs/>}></Route>
      <Route path='login' element={<LoginPage/>}></Route>
      <Route path='register' element={<RegisterPage/>}></Route>
      <Route path='profile' element={<ProfilePage/>}></Route>
    </Routes>
    
  )
}

export default App
