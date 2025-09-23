import { 
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Router
} from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import Dashboard from './pages/Dashboard'
import SettingsPage from './pages/SettingsPage'
// import DashboardWs from './pages/DashboardWs'

const router = createBrowserRouter(
  createRoutesFromElements(
  <Route path='/' element={<MainLayout />}>
    <Route index element={<Dashboard />} />
    <Route path='/settings' element={<SettingsPage />} />
  </Route>)
)
const App = () => {
  return <RouterProvider router={router}/>
}

export default App