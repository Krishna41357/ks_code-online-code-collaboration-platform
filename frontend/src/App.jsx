import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './components/Home';
import EditorPage from './components/EditorPage';
import { Toaster } from 'react-hot-toast';
import Login from './components/Login';
import ProtectedRoute from './services/ProtectedRoute.jsx';
import AboutUs from './components/AboutUs.jsx';
import ComingSoon from './components/ComingSoon.jsx';
function App() {
  return (
    <>
    <div>
      <Toaster  position='top-center'></Toaster>
    </div>    
    <Routes>
     <Route path="/" element={<Login />} />
     <Route path='/Home' element={ <ProtectedRoute><Home /></ProtectedRoute> } />
     <Route path='/editor/:roomId' element={ <EditorPage /> } />
     <Route path='/about' element={<AboutUs/>}/>
     <Route path='/settings' element={<ComingSoon/>}/>
     <Route path='/rooms' element={<ComingSoon/>}/>
    </Routes>
    </>
  );
}

export default App;
