// import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import SignUp from './pages/SignUp';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Watchlist from './pages/Watchlist';
import Preferences from './pages/Preferences';
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>

        <Route path="/" element={<Landing />} />
        <Route path="/Signup" element={<SignUp/>} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/Dashboard" element={<Watchlist />} />
        <Route path="/Preferences" element={<Preferences />} />

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
