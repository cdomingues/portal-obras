import  Menu  from "../../components/Menu";
import Footer from '../../components/Footer'
import { Box, Flex, Text } from "@chakra-ui/react";

function Sobre(){
    return(
        <Flex direction="column" minH="90vh" ml='10px'>
        <Menu />
        <Box as="main" flex="1" p={2}>
        <Text fontSize="30px" fontWeight="bold" mb={4}>
        Portal de Obras do Município de Mogi das Cruzes
      </Text>
      <Text fontSize="md" color="gray.600" mb={4}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vel magna nec nulla vulputate facilisis. 
        Integer efficitur, nisi at consectetur ullamcorper, lorem erat elementum sapien, non feugiat metus ex ac libero.
      </Text>
      <Text fontSize="sm" color="gray.500">
        Phasellus id tincidunt libero, et malesuada eros. Aenean vel diam ut lectus sagittis volutpat. Suspendisse potenti. 
        Fusce efficitur eros ac urna tristique, at posuere justo condimentum.
      </Text>
        </Box>
     
     
        <Footer />
        </Flex>
    )
}
export default Sobre