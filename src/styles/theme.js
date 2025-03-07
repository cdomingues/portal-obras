import {extendTheme} from '@chakra-ui/react'

const theme = extendTheme({
    styles: {
      global: {
        ":root": {
          "--darkBlue": "#1c3c6e",
          "--lightBlue": "#0094d4",
          "--green": "#8bc53f",
          "--yellow": "#f9a51a",
          "--red": "#de4134",
        },
      },
    },
    colors: {
      darkBlue: "#1c3c6e",
      lightBlue: "#0094d4",
      green: "#8bc53f",
      yellow: "#f9a51a",
      red: "#de4134",
    },
  });
  
  export default theme;