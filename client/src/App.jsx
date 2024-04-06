import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { ThemeProvider, useTheme } from './theme'
import LoginPage from './pages/LoginPage/index'
import Home from './pages/Home/index'

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  )
}

const AppContent = () => {
  const { theme } = useTheme(); 
  return (
    <div className={`App ${theme}`}>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </div>  
  );
};

export default App
