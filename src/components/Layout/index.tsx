import { Box, Stack, Text , useColorModeValue, Image} from "@chakra-ui/react";
import Header from "../Header";
import brasao from '../../assets/images/brasao/Brasao_PMMC_Normal.png'
import ModalPopup from "../Modal";
function PublicHome() {

    return (
        <>
         
              
    
          {/* Menu de abertura */}
          <Box
            backgroundColor={"transparent"}
            width={"95%"} // Ocupa toda a largura da tela
            maxWidth={"100%"} // Largura máxima de 1280 pixels
            //alignItems="left" // Centraliza os filhos verticalmente
           // justifyContent="center" // Centraliza os filhos horizontalmente
            margin="0 auto" // Centraliza a Stack horizontalmente na tela
            paddingTop={15}
           // height="1500px"
            border="2px"
           display='flex'
           justifyContent="space-between"
            
           
          >
           
           
          </Box>
    
          
    
          {/* <Footer /> */}
        </>
      );
    }
    
    export default PublicHome;
