import { Button , ButtonProps } from "@chakra-ui/react"
import React from "react";

interface Botao extends ButtonProps {
    titulo: string;
  }

  const ButtonLink: React.FC<Botao> = ({ titulo, ...props }) => {
    return <Button {...props}  sx={{
        _hover: {
          border: 'none', // Remove qualquer borda no hover
          boxShadow: 'none', // Remove sombra no hover
        },
        _focus: {
          border: 'none', // Remove qualquer borda no foco
          boxShadow: 'none', // Remove sombra no foco
        },
        _active: {
          border: 'none', // Remove qualquer borda no estado ativo
          boxShadow: 'none', // Remove sombra no estado ativo
        },
      }}>{titulo}</Button>;
  };
export default ButtonLink