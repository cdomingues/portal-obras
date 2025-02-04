import { Box, Link } from "@chakra-ui/react"


function Menu(){

    
    return(
        <Box
         
        width='100%'
        display="flex"
        justifyContent="space-around"
        alignItems="center"
        //px="40px"
        py="20px"
        backgroundColor="rgba(255, 255, 255, 0.6)"
        backgroundBlendMode="overlay"
        fontWeight="bold"
        fontSize="x-large"
        maxWidth="1600px"
        borderRadius='7px'
        sx={{
              "@media (max-width: 767px)": {
                fontSize:'25px'
              },
            }}
      >
        <Link href="/" sx={{ textDecoration: 'none', color: 'black', '&:hover': { color: 'grey' } }}>Home</Link>
        <Link href="/obras" sx={{ textDecoration: 'none', color: 'black', '&:hover': { color: 'grey' } }}>Obras</Link>
        <Link href="/maps" sx={{ textDecoration: 'none', color: 'black', '&:hover': { color: 'grey' } }}>Mapa</Link>
        <Link href="/sobre" sx={{ textDecoration: 'none', color: 'black', '&:hover': { color: 'grey' } }}>Sobre</Link>
        
      </Box>
    )
}

export default Menu