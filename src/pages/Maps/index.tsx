import { Box } from "@chakra-ui/react";
import MapOutline from "../../components/Maps";
import Menu from '../../components/Menu';
import Footer from "../../components/Footer";


function Mapa() {
    return (
      <>
      <Menu />
      
      <div  style={{backgroundColor: 'black', width: '100%', height: '1px'}} ></div>
      <Box >
      <MapOutline topojsonFile={"/abairramento.json"} />
     
      </Box>
      <Footer/>
      </>
    );
  }
  
  
  
  export default Mapa;