import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { StorageProvider } from './components/context/StorageProvider';
import Login from './pages/Login';
import Home from './pages/Home';
import SignIn from './pages/SignIn';

function App() {
  return (
    <StorageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="signIn" element={<SignIn/>}></Route>
          <Route path="home" element={<Home/>}/>
        </Routes>
      </Router>
    </StorageProvider>
  );
}

export default App;
