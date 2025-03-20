import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'
import AdminHeader from './components/AdminHeader';
import AdminRoute from './components/AdminRoute';
import AdminDashboard from './pages/adminPages/AdminDashboard';
import { useSelector } from 'react-redux';
function App() {
  const { currentUser } = useSelector(state => state.user);
  return (
    <BrowserRouter>
     {currentUser?.isAdmin ? <AdminHeader /> : <Header />}
      <Routes >
       
        <Route path='/sign-in' element={<SignIn/>}/>
        <Route path='/sign-up' element={<SignUp/>}/>

        {/* <Route path='/about' element={<Profile/>}/> */}

        <Route element={<PrivateRoute/>}>
        <Route path="/" element={currentUser?.isAdmin ? <AdminDashboard /> : <Home />} />
            {/* <Route path='/' element={<Home/>}/> */}
            <Route path='/profile' element={<Profile/>}/>
        </Route>
        
        {/* Protected Admin Routes */}
        <Route element={<AdminRoute />}>
          <Route path='/admin' element={<AdminDashboard />} />
        </Route>



        
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
