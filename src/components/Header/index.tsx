import { HStack, Box, Flex,  Link, Image, VStack, useDisclosure,Collapse, Img  } from '@chakra-ui/react'; // Se você estiver usando o Chakra UI

import brasao from '../../assets/images/brasao/brasao_horizontal_mogi.png'

import hmenu from '../../assets/images/iconos/burger-menu-svgrepo-com.svg'



function Header() {
  

  const MobileMenu = () => {
    const { isOpen, onToggle } = useDisclosure();
    return(
      
    <Flex  justify="space-between" px='10px' pt="10px"  w="100%" 
    sx={{
      "@media (min-width: 480px)": {
        display: "none", // Esconde quando a tela for maior que o mobile
      },
    }}>
      {/* Logo à esquerda */}
   
      <Image alt="logo" src={brasao} width="180px"  mr='10px' marginBottom='15px' />
      {/* Botão de Menu Hambúrguer */}
      <Box position="relative">
      <Img 
        pr='15px'
        src={hmenu} 
        width='50px'
        onClick={onToggle} 
        aria-label="Abrir menu"
       
      />
  
      
      <Collapse in={isOpen} >
      <VStack spacing={4}
            mt="10px"
            w="100%"
            justifyContent="center"
            align="flex-end" // Alinha os links à direita
            //bg="white"
            position="absolute"
            top="35%" // Coloca o conteúdo do menu abaixo do ícone
            left="0"
            right="0"
            boxShadow="md"
            p="10px" >
          <Link href="https://www.mogidascruzes.sp.gov.br/" target="_blank" color="black" fontWeight="bold" textDecoration="none" fontSize="15px" mr='30px'  _hover={{
          // color: "blue.300",
            textDecoration: "none",
            color: "lightgrey",
          }}>
            PREFEITURA
          </Link>
          <Link href="https://dadosabertos.mogidascruzes.sp.gov.br/" target="_blank" color="black" fontWeight="bold" textDecoration="none" fontSize="15px" mr='28px'  _hover={{
          // color: "blue.300",
            textDecoration: "none",
            color: "lightgrey",
          }}>
            TRANSPARÊNCIA
          </Link>
        </VStack>
      </Collapse></Box>
    </Flex>)
  }; 
  
  return ( 
  <>
  <MobileMenu  />
  <Box bgColor='black' height='25px'width='100%'></Box>
    <Box bg="gray.800" color="white" px={6} py={3}>
      {/* Menu principal */}
      <Flex align="center" justify="space-between" pt='10px' pr='10px'  
      sx={{
              "@media (max-width: 767px)": {
                display: "none", // Esconde no mobile
              },
            }}>
        {/* Logo à esquerda */}
       
        <Image alt="logo" src={brasao} width="180px"  marginBottom='15px'/>
       

        {/* Itens do menu principal alinhados à direita */}
        
          <HStack spacing={15} as="nav" pr='20px' 
           
        >
          <Link href="https://www.mogidascruzes.sp.gov.br/"
         
          target='_blank'
          color="black"
          fontWeight="bold"
          textDecoration="none"
          fontFamily="'Poppins', sans-serif"
          _hover={{
          // color: "blue.300",
            textDecoration: "none",
            color: "lightgrey",
          }}
          transition="all 0.2s ease-in-out">
            PREFEITURA
          </Link> 
         
          <Link href="https://dadosabertos.mogidascruzes.sp.gov.br/" color="black" target='_blank'
          fontWeight="bold"
          textDecoration="none"
          fontFamily="'Poppins', sans-serif"
          _hover={{
          // color: "blue.300",
            textDecoration: "none",
            color: "lightgrey",
          }}
          transition="all 0.2s ease-in-out">
            TRANSPARÊNCIA
          </Link>
         
        </HStack>
      </Flex>

      {/* Menu secundário abaixo */}
      
    </Box></>
  );
}

export default Header;
