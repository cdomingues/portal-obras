// import { Select, Stack, useColorModeValue } from "@chakra-ui/react";
// import React from "react";
// import { Laws } from ".";
// import ContainerBasic from "../../../components/Container/Basic";
// import PlanContainer from "../../../components/Container/Plan";

// type PropsInput = {
//   handler: {
//     laws: Laws;
//     handleSelectValue: (value: number) => void;
//     selectOptions: Array<string | number>;
//     selectValue: number;
//   };
// };

// export const contentPublicWorks = {
//   titlePage: "Obras Públicas",
//   description: "Traz as informações sobre as obras públicas em andamento no município, bem como seu custo e origem dos recursos (municipais, estaduais e federais).",
// }

// function Screen({ handler }: PropsInput) {
//   const { handleSelectValue, selectOptions, laws, selectValue } = handler;
//   const title = contentPublicWorks?.titlePage;
//   const description = contentPublicWorks?.description;
//   return (
//     <ContainerBasic title={title} description={description}>
//       <PlanContainer laws={laws}>
//         <Select
//           minW={90}
//           width="20%"
//           bg={useColorModeValue("white", "gray.800")}
//           value={selectValue}
//           textAlign="center"
//           mb={5}
//           onChange={(event) => {
//             handleSelectValue(Number(event.target.value));
//           }}
//         >
//           {selectOptions.map((value, index) => (
//             <option key={index} value={value}>
//               {value}
//             </option>
//           ))}
//         </Select>
//       </PlanContainer>
//     </ContainerBasic>
//   );
// }

// export default Screen;

import { useColorModeValue, Box } from "@chakra-ui/react";
import React from "react";
import { Laws } from ".";
import ContainerBasic from "../../../components/Container/Basic";
import PlanContainerLaw from "../../../components/Container/PlanLaw";
import ListarArquivos from "../../../components/ListarArquivos";

type PropsInput = {
  handler: {
    laws: Laws;
    handleSelectValue: (value: number) => void;
    selectOptions: Array<string | number>;
    selectValue: number;
  };
};

export const contentPublicWorks = {
  titlePage: "Obras Públicas",
  description:
    "Traz as informações sobre as obras públicas em andamento no município, bem como seu custo e origem dos recursos (municipais, estaduais e federais).",
};

function Screen({ handler }: PropsInput) {
  const { handleSelectValue, selectOptions, laws, selectValue } = handler;

  const title = contentPublicWorks?.titlePage;
  const description = contentPublicWorks?.description;

  return (
    <ContainerBasic title={title} description={description}>
      <Box
        m={0}
        bg={useColorModeValue("white", "gray.800")}
        
        padding={"15px"}
        rounded="md"
        overflow="hidden"
        maxWidth="100%"
        borderRadius="18px"
        marginBottom="15px"
      >
        <ListarArquivos tipoFiltro={8}/>
      </Box>
    </ContainerBasic>
  );
}

export default Screen;
