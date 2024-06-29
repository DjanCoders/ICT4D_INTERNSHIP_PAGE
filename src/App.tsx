import Home from "./pages/Home";
import ApplicationForm from "./pages/applicationform"
import { Route, Routes } from 'react-router-dom';
import './styles.css';




const App = () => {
  return (
  
    <div className='my-8 text-center'>
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/apply" element={<ApplicationForm/> } />
       </Routes>

      </div>
     
   
   
  );
};

export default App;
