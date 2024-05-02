import React from 'react'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'
import './Darkmode.css'
import { ThemeProvider, useTheme } from './context/theme'
import { AuthProvider } from './context/AuthProvider'
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage/index';
import Home from './pages/Home/index';
import Profile from './pages/Profile/index';
import Project from './pages/Project/index';
import Messages from './pages/Messages/index';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider> 
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}

const AppContent = () => {
  const { theme } = useTheme();

  return (
    <div className={`App ${theme}`}>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route element={<ProtectedRoute />} >
          <Route path='/home' element={<Home />} />
          <Route path='/my-profile' element={<Profile type='myProfile'/>} />
          <Route path='/profile/:userId' element={<Profile />} />
          <Route path='/projects/:projectId'element={<Project />} />
          <Route path='/messages' element={<Messages />} />
        </Route>
      </Routes>
    </div>  
  );
};

export default App;
