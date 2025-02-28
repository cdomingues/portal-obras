
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import HomePage from '../src/pages/Home';
import Maps from '../src/pages/Maps';
import Obras from '../src/pages/Obras';
import Header from "./components/Header";
import Detalhes from "./pages/ObraDetalhes";
import Sobre from '../src/pages/Sobre';





function App()
{
  return(
    <>
    <Header />
    
    
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Página inicial */}
        <Route path="/maps" element={<Maps />} /> 
        <Route path="/obras" element={<Obras />} /> 
        <Route path='/detalhes' element={<Detalhes/>}/>
        <Route path='sobre' element={<Sobre/>}/>
       

      
      </Routes>
    </Router></>
  )
}
export default App;