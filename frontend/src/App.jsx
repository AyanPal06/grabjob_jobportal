import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/shared/Navbar'
import Signup from './components/auth/Signup'
import Login from './components/auth/Login'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from "./components/admin/AdminJobs"
import PostJob from './components/admin/PostJob'
import Applicants from './components/admin/Applicants'
import ProtectRoute from './components/admin/ProtectedRoute'
import ProtectStudent from './components/ProtectStudent'

const appRouter = createBrowserRouter([

  // user side routes

  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/login',
    element:<Login/>
  },

  {
    path:'/signup',
    element:<Signup/>
  },
  {
    path:'/jobs',
    element:<ProtectStudent><Jobs/></ProtectStudent>
  },
  {
    path:'/description/:id',
    element:<ProtectStudent><JobDescription/></ProtectStudent>
  },
  {
    path:'/browse',
    element:<ProtectStudent><Browse/></ProtectStudent>
  },
  {
    path:'/profile',
    element:<ProtectStudent><Profile/></ProtectStudent>
  },

  // admin side routes
  
  {
    path:'/admin/companies',
    element:<ProtectRoute><Companies/></ProtectRoute>
  },
  {
    path:'/admin/companies/create',
    element:<ProtectRoute><CompanyCreate/></ProtectRoute>
  },
  {
    path:'/admin/companies/:id',
    element:<ProtectRoute><CompanySetup/></ProtectRoute>
  },
  {
    path:'/admin/jobs',
    element:<ProtectRoute><AdminJobs/></ProtectRoute>
  },
  {
    path:'/admin/jobs/create',
    element:<ProtectRoute><PostJob/></ProtectRoute>
  },
  {
    path:'/admin/jobs/:id/applicants',
    element:<ProtectRoute><Applicants/></ProtectRoute>
  }
 
])

function App() {
  
  return (
    <div>
      <RouterProvider router ={appRouter}/>
    </div>
  )
}

export default App
