import { Box, Text, keyframes } from "@chakra-ui/react";
import { useEffect, useState } from "react";

// Definindo a animação de preenchimento


interface ProgressBarProps{
  percentual_etapa: number
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentual_etapa }) => {
  const [progress, setProgress] = useState(0);
  const fillAnimation = keyframes`
  from { width: 0%; }
  to  {width: $percentual_etapa}`

  useEffect(() => {
    // Inicia a animação com um pequeno atraso para suavidade
    setTimeout(() => setProgress(percentual_etapa), 500);
  }, [percentual_etapa]);

  // Define a cor com base no percentual
  const getColor = (percentual: number) =>
    percentual <= 40 ? "red" : percentual > 40 && percentual <= 75 ? "#E6C972" : percentual > 75 ? "green": "white";


  return (
    <Box
      my="30px"
      height="35px"
      width="100%"
      backgroundColor="gray.200"
      borderRadius="10px"
      position="relative"
      overflow="hidden"
      display="flex"
      alignItems="center"
      justifyContent="center"
      border='1px solid white'
      boxShadow="0px 4px 10px rgba(0, 0, 0, 0.2)" 
     
    >
      {/* Barra de progresso animada */}
      <Box
        height="100%"
        width={`${progress}%`}
        backgroundColor={getColor(progress)}
        borderRadius="10px"
        position="absolute"
        left="0"
        top="0"
        transition="width 1.5s ease-in-out" // Transição suave
        animation={`${fillAnimation} 3.0s ease-out`}
      />

      {/* Texto sobre a barra */}
      <Text
        position="absolute"
        fontWeight="bold"
        color={progress > 50 ? "white" : "black"} // Ajusta a cor do texto para melhor contraste
        zIndex="1"
      >
        {progress}%
      </Text>
    </Box>
  );
};

export default ProgressBar;
