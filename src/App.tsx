import { Box, Container, Text } from "@chakra-ui/react";
//import News from "./components/News";
import Fetch from "./components/ListarObras";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import HomePage from '../src/pages/Home';
import Maps from '../src/pages/Maps';
import Obras from '../src/pages/Obras';
import Layout from "./components/Layout";
import Header from "./components/Header";




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
      
      </Routes>
    </Router></>
  )
}
export default App;