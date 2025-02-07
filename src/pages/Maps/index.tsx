import { Box } from "@chakra-ui/react";
import MapOutline from "../../components/Maps";
import Menu from '../../components/Menu';


function Mapa() {
    return (
      <>
      <Menu />
      
      <div  style={{backgroundColor: 'black', width: '100%', height: '1px'}} ></div>
      <Box alignItems='center' pt='20px'>
      <MapOutline topojsonFile={"/abairramento.json"} />
      </Box>
      </>
    );
  }
  
  
  
  export default Mapa;