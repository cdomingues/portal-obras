
//import { Link, useLocation } from 'react-router-dom';
import { Box,   Text } from '@chakra-ui/react';
import background from '../../assets/images/mogi03.jpeg'
import Painel from '../../components/Painel';
import Menu from '../../components/Menu';
//import { LuExternalLink } from "react-icons/lu"

//import FiltroObras from '../../components/FiltroObras';
import Footer from '../../components/Footer';
//import Maps from '../../components/Maps';

function HomePage() {

   

   

  return (
    <>
<Box 

backgroundImage={`url(${background})`}
backgroundSize="cover"
backgroundPosition="center"
borderRadius='7px'
height="500px"
width="100%"
backgroundColor="" // Exemplo de camada translúcida
backgroundBlendMode="overlay"
display="flex"
flexDirection="column"
justifyContent="space-between" >
    
    <Text 
    
    pl="50px" 
    //pt="20px"  
    fontSize="45px"
    fontWeight="bold"
    color='white'
    textShadow="3px 3px 5px black"
    sx={{
      "@media (max-width: 767px)": {
        fontSize: '30px',
        alignSelf: 'center',
        textAlign: "center",
        pl: "0px", 
      },
    }}
    >
        Obras Mogi das Cruzes
        </Text>

        <Text 
   
    pl="50px" 
    pr="650px"
   minWidth='400px'
    fontSize="large"
    fontWeight="bold"
    color='white'
    textShadow="3px 3px 5px black"
    textAlign='justify'
    sx={{
      "@media (max-width: 767px)": {
        minWidth:'370px',
        fontSize:'15px',
        //alignSelf: 'center',
        textAlign: "center",
        //px: "3px", 
        pl:"2px" ,
    pr:"2px",
         //bgColor:'lightgrey',
         color:'white',
         bg:"rgba(0, 0, 0, 0.5)",
         marginX:'5px',

        
      },
    }}
    >
      <p> Bem-vindo ao Portal de Obras de Mogi das Cruzes, sua plataforma central de informações sobre o desenvolvimento urbano e infraestrutura da nossa cidade. Aqui, você encontrará dados completos e atualizados sobre as obras em andamento, concluídas e planejadas, reforçando o compromisso da administração municipal com a transparência e o progresso.
<br/>
Nosso objetivo é fornecer à população uma visão clara e detalhada das iniciativas que transformam Mogi das Cruzes, garantindo acessibilidade às informações e promovendo a participação cidadã.</p>
        </Text>
      <Menu />
     </Box>
    
<Painel /> 
<Box w='100vw' h='100vh' display='flex' justifyContent='center' alignItems='center'
sx={{
  "@media (max-width: 900px)": {
    display:'none',
  },
}}
>
<iframe src="https://app.powerbi.com/view?r=eyJrIjoiODhjY2NhZDktZDcxNi00YWUwLThlYmUtMTMxNGEyZGJjNzg0IiwidCI6IjU3MjU0YWRhLTUxMmUtNDhjNi05NTI5LTAyOTE4ODg1OTliZiJ9" 
 width='80%'
  height='100%' 
  style={{ border: "none" }}
  ></iframe>
</Box>
    
     <Footer />
     </>
  );
}



export default HomePage;
