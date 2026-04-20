import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from './appStore/store.js'
import { Provider } from 'react-redux'; 
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route} from 'react-router-dom';
import { About, Contact, Home, ProfilePage } from './components/index.js'
import AuthPage from './pages/AuthPage.jsx'
import BranchPage from './pages/BranchPage.jsx'
import SubjectPage from './pages/SubjectPage.jsx'
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import PublicRoute from "./components/PublicRoute.jsx";
import RedirectRoute from "./components/RedirectRoute.jsx";
import {AboutDeveloperPage} from './components/index.js'
import {FeedbackPage} from './components/index.js'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/' element={<App/>}>
        <Route index element={
          <RedirectRoute>
            <Home/>
          </RedirectRoute>
          }/>
        <Route path='about' element={<About/>}/>
        <Route path='contact' element={<Contact/>}/>
      </Route>
      <Route path='/student/auth' element={
        <PublicRoute>
          <AuthPage/>
        </PublicRoute>
        }/>
      <Route path='/student/:branch/:semester' element={
        <ProtectedRoute>
          <BranchPage/>
        </ProtectedRoute>
        }/>
      <Route path='/student/:branch/:semester/:subject' element={
        <ProtectedRoute>
          <SubjectPage/>
        </ProtectedRoute>
        }/>
        <Route path='/about_developer' element={<AboutDeveloperPage/>}/>
        <Route path='/contact_developer' element={<Contact showBackButton={true}/>}/>
        <Route path='/feedback_page' element={<FeedbackPage/>}/>
        <Route path='/student_profile' element={
          <ProtectedRoute>
            <ProfilePage/>
          </ProtectedRoute>
        }/>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
