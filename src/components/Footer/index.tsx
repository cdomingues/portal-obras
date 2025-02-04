
import { Box, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box as="footer" bg="#393D6F" color="white" py={4} textAlign="center"  bottom={0} width="100%">
      <Text fontSize="sm">© 2025 Powered by CODATA | Prefeitura de Mogi das Cruzes.</Text>
    </Box>
  );
};

export default Footer;