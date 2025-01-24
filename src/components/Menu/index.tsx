import { Box, Link } from "@chakra-ui/react"
import { LuExternalLink } from "react-icons/lu"

function Menu(){
    return(
        <Box
  display="flex"
  justifyContent="space-around" // Distribui os itens igualmente
  alignItems="center" // Centraliza os itens verticalmente
  px="40px" // Espaçamento interno nas laterais
  py="5px" // Espaçamento interno superior e inferior
 // style={{ backgroundColor: '#f0f0f0' }} // Fundo opcional
  backgroundColor="rgba(255, 255, 255, 0.6)" // Exemplo de camada translúcida
backgroundBlendMode="overlay"
fontWeight='bold'
fontSize='x-large'
maxWidth='1200px'

>
 
 <Link href='/'>Home </Link>
 <Link href='/obras' >Obras </Link>
<Link href='/maps' >Mapa</Link>
 <Link href='/sobre' >Sobre  </Link>
 
</Box>
    )
}

export default Menu