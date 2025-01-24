
import { Link, useLocation } from 'react-router-dom';
import { Box, Button,  Text } from '@chakra-ui/react';
import background from '../../assets/images/mogi03.jpeg'
import Painel from '../../components/Painel';
import Menu from '../../components/Menu';
import { LuExternalLink } from "react-icons/lu"

import FiltroObras from '../../components/FiltroObras';

function HomePage() {

   

   

  return (
    <>
<Box 

backgroundImage={`url(${background})`}
backgroundSize="cover"
backgroundPosition="center"
height="500px"
width="100%"
backgroundColor="" // Exemplo de camada translúcida
backgroundBlendMode="overlay"
display="flex"
flexDirection="column"
justifyContent="space-between" >
    <div  style={{backgroundColor: 'black', width: '100%', height: '1px'}} >
   

    </div>
    <Text 
    
    pl="50px" 
    //pt="20px"  
    fontSize="45px"
    fontWeight="bold"
    color='white'
    textShadow="3px 3px 5px black"
    >
        Obras Mogi das Cruzes
        </Text>

        <Text 
    
    pl="50px" 
    pr="650px"
   // pt="20px"  
    fontSize="large"
    fontWeight="bold"
    color='white'
    textShadow="3px 3px 5px black"
    textAlign='justify'
    >
      <p> Bem-vindo ao Portal de Obras de Mogi das Cruzes, sua plataforma central de informações sobre o desenvolvimento urbano e infraestrutura da nossa cidade. Aqui, você encontrará dados completos e atualizados sobre as obras em andamento, concluídas e planejadas, reforçando o compromisso da administração municipal com a transparência e o progresso.
<br/>
Nosso objetivo é fornecer à população uma visão clara e detalhada das iniciativas que transformam Mogi das Cruzes, garantindo acessibilidade às informações e promovendo a participação cidadã.</p>
        </Text>
        <Menu />
     </Box>
     <Box>
<Painel />
<FiltroObras />
     </Box>
     </>
  );
}



export default HomePage;
