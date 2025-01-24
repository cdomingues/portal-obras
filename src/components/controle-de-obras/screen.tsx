//import BlogComponent from "../components/Blog";
//import { News } from "../types";
import {
  Box,
  Heading,
  Link,
  Stack,
  Stat,
  StatGroup,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import { isMobile } from "react-device-detect";
import noticias from "../../../data/noticias.json";
import relatorio_gestao_fiscal from "../../assets/images/icones/relatorio_gestao_fiscal.svg";
import CardHorizon from "../../components/CardHorizon";
import { useFontSizeAccessibilityContext } from "../../context/fontSizeAccessibility";
import useWindowDimensions from "../../utils/getWindowSize";
import { PublicPolicyData } from "../api/totalizador/politicas-publicas";
//import News from "../../components/News";
//import News from "../components/News";
import ContainerBasic from "../../components/Container/Basic";
import DisplayNews from "../../components/NewsHome";
import Video from "../../components/Videos";

type PropsInput = {
  handler: {
    expenseAmount: number;
    expensePercentageReached: number;
    expenseProvided: number;
    revenueAmount: number;
    revenuePercentageReached: number;
    revenueProvided: number;
    expenseLoanding: boolean;
    revenueLoading: boolean;
    publicPolicies: PublicPolicyData[];
    graphConfig: any;
    publicPoliciesLoading: boolean;
    chartLoading: boolean;
    date: string;
  };
};

const date = new Date();
const dia = String(date.getDate()).padStart(2, '0');
const mes = String(date.getMonth() + 1).padStart(2, '0');
const ano = date.getFullYear();

const dataFormatada = `${dia}/${mes}/${ano}`;
const link = 'https://paineldeobras.tce.sp.gov.br/pentaho/api/repos/:public:Obra:painel_obras.wcdf/generatedContent?userid=anony&password=zero';



export const contentInitial = {
  titlePage: "Portal de Obras",
  description: `Conheça as obras que estão transformando nossa cidade. `,
};

function Aside() {
  return (
    <div style={{ width: "380px", justifyContent: "left" }}>
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
        <div style={{ padding: "10px" }}>
          <Text fontWeight="500" color={"gray.500"}>
            Últimas Notícias
          </Text>
        </div>
        {noticias.slice(0, 2).map((info) => {
          return (
            <DisplayNews
              key={info.descricao}
              data_noticia={info.data_noticia}
              descricao={info.descricao}
              foto={info.foto}
              titulo={info.titulo}
              link={info.link}
            />
          );
        })}
        <div style={{ padding: "0px", width: "100%" }}></div>
      </Box>
    </div>
  );
}

function HomeScreen({ handler }: PropsInput) {
  const {
    //news,
    expenseAmount,
    expensePercentageReached,
    expenseProvided,
    revenueAmount,
    revenuePercentageReached,
    revenueProvided,
    expenseLoanding,
    revenueLoading,
    publicPolicies,
    graphConfig,
    publicPoliciesLoading,
    chartLoading,
    date,
  } = handler;
  const accessibility = useFontSizeAccessibilityContext();
  const titlePage = contentInitial?.titlePage;
  const description = contentInitial?.description;

  const { height, width } = useWindowDimensions();
  const url_video = "https://www.youtube.com/embed/K7_TUkedcGA?si=iPxaKODtZnboQT-_";
  const titulo = "O QUE SÃO AS SEIS MEDIDAS?"; 
   

  return (
    <ContainerBasic title={titlePage} description={description}>
      <Video url_video={url_video} titulo={titulo} />

      
      <Stack
        style={{
          paddingLeft: isMobile ? 0 : "0%",
          paddingRight: isMobile ? 0 : "0%",
        }}
      >
        {/* <Divider mb="6%" /> */}

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
          <Stack direction={isMobile ? "column" : "row"} spacing={2}></Stack>

          <Stack direction="column">
            <Heading
              fontSize={accessibility?.fonts?.regular}
              style={{ marginTop: "0px" }}
            >
              Políticas Públicas
            </Heading>

            <StatGroup width="100%" mb={20}>
              <Stat position="unset">
                <Stack
                  direction={isMobile ? "column" : "row"}
                  align={isMobile ? "center" : "center"}
                  justifyContent={isMobile ? "flex-start" : "center"}
                >
                  <Box padding="6" bg="transparent" flexDirection="row">
                    <CardHorizon
                      title="Portal de Obras"
                      imageURL={relatorio_gestao_fiscal.src}
                      description="O Plano Plurianual (PPA) é o principal instrumento pelo qual o município faz o planejamento de como irá investir os recursos públicos nos próximos anos."
                      link="controle-de-obras/inicio"
                      backgroundColor="transparent"
                    />
                  </Box>

                  <Box padding="6" bg="transparent" flexDirection="row">
                  <CardHorizon
                      title="Pesquisar Obras"
                      imageURL={relatorio_gestao_fiscal.src}
                      description="O Plano Plurianual (PPA) é o principal instrumento pelo qual o município faz o planejamento de como irá investir os recursos públicos nos próximos anos."
                      link="controle-de-obras/pesquisar-obras"
                 backgroundColor="transparent"/>
                  </Box>
                </Stack>
                <Stack
                  direction={isMobile ? "column" : "row"}
                  align={isMobile ? "center" : "center"}
                  justifyContent={isMobile ? "flex-start" : "center"}
                >
                  <Box padding="6" bg="transparent" flexDirection="row">
                    <CardHorizon
                      title="Obras - versão anterior"
                      imageURL={relatorio_gestao_fiscal.src}
                      description="O Plano Plurianual (PPA) é o principal instrumento pelo qual o município faz o planejamento de como irá investir os recursos públicos nos próximos anos."
                      link="controle-de-obras/obras-publicas"
                      backgroundColor="transparent"
                    />
                  </Box>
                </Stack>
                <Stack
                  direction={isMobile ? "column" : "row"}
                  align={isMobile ? "center" : "center"}
                  justifyContent={isMobile ? "flex-start" : "center"}
                ></Stack>
              </Stat>
            </StatGroup>
          </Stack>
        </Box>
      </Stack>
    </ContainerBasic>
  );
}

export default HomeScreen;
