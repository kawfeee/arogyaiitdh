import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { Button } from './components/ui/Button'
import AppLayout from './layouts/app-layout'
import LandingPage from './pages/landing'
import Onboarding from './pages/onboarding'
import JobListing from './pages/job-listing'
import JobPage from './pages/job'
import PostJob from './pages/post-job'
import SavedJobs from './pages/saved-job'
import MyJobs from './pages/my-jobs'
import { ThemeProvider } from './components/theme-provider'
import ProtectedRoute from './components/protected-route'
import DashboardDoc from './pages/dashboardDoc'
import DashboardPatient from './pages/dashboardPatient'
import LotteryPage from './pages/lottery'

const router = createBrowserRouter([
  {
    element:<AppLayout/>,
    children:[
      {
        path:'/',
        element:<LandingPage/>
      },
      {
        path:'/onboarding',
        element:(
          <ProtectedRoute>
            <Onboarding/>
          </ProtectedRoute>
        ),
      },
      {
        path:'/jobs',
        element:(
          <ProtectedRoute>
            <JobListing/>
          </ProtectedRoute>
        ),
      },
      {
        path:'/job/:id',
        element:(
          <ProtectedRoute>
            <JobPage/>
          </ProtectedRoute>
        ),
          
      },
      {
        path:'/post-job',
        element:(
          <ProtectedRoute>
            <PostJob/>
          </ProtectedRoute>
        ),
      },
      {
        path:'/saved-jobs',
        element:(
          <ProtectedRoute>
            <SavedJobs/>
          </ProtectedRoute>
        ),
      },
      {
        path:'/my-jobs',
        element:(
          <ProtectedRoute>
            <MyJobs/>
          </ProtectedRoute>
        ),
      },
      {
        path:'/dashboardDoc',
        element:(
          <ProtectedRoute>
            <DashboardDoc/>
          </ProtectedRoute>
        ),
      },
      {
        path:'/dashboardPatient',
        element:(
          <ProtectedRoute>
            <DashboardPatient/>
          </ProtectedRoute>
        ),
      },
      {
        path:'/lotteryBlockchain',
        element:(
          <ProtectedRoute>
            <LotteryPage/>
          </ProtectedRoute>
        ),
      },
    ]
  }
])
function App() {
  return (
    
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router}/>
    </ThemeProvider>
  )
}

export default App
