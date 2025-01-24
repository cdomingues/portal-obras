import { Box } from "@chakra-ui/react"
import mapasvg from '../../assets/images/selectores/mapa.svg'
import disco from '../../assets/images/selectores/montos.svg'
import etapas from '../../assets/images/selectores/etapas.svg'

function MenuSvg(){
    return(
        <Box p='22px' m="30px" display="flex" justifyContent="space-around" borderRadius="20px" >
           
            <Box border='2px solid red' borderRadius='20px' style={{ width: "300px" }}  alignItems="center" padding="10px">
                <img src={mapasvg} alt="" width='250px'/>
            </Box>

            <Box border='2px solid red' borderRadius='20px' style={{ width: "300px" }}  alignItems="center" padding="10px">
                <img src={disco} alt="" width='250px'/>
            </Box>

            <Box border='2px solid red' borderRadius='20px' style={{ width: "300px" }}  alignItems="center" padding="10px">
                <img src={etapas} alt="" width='250px'/>
            </Box>
        </Box>
      
    )
}
export default MenuSvg