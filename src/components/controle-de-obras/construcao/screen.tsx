import LayoutConstructions from "../../../components/LayoutConstructions";
import * as Text from "../../../styles/text";
import * as Style from "../../../styles/components/construcao/styles";
import moment from "moment";
import colors from "../../../styles/colors";
import Carousel from "../../../components/Swiper";
import { parseMoney } from "../../../utils/mask";
import { useEffect, useState } from "react";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { useRouter } from "next/router";
import { formatString } from "../../../utils/stringUtils";
import { Box, background, useColorModeValue } from "@chakra-ui/react";
import { Button } from "react-day-picker";
import { isMobile } from "react-device-detect";
import { m } from "framer-motion";
import { ppas } from "../pesquisar-obras/screen";
import { bairros } from "../pesquisar-obras/screen";
import moneyFormatter from "../../../utils/moneyFormatter";


const ConstructionScreen = ({ id }: any) => {
  const [file, setFile] = useState<any>();
  const [currentPage, setCurrentPage] = useState(1);
const [hasNextPage, setHasNextPage] = useState(true);
  const router = useRouter();
  const [valoresExecutados, setValoresExecutados] = useState<any[]>([]);
  const [daysDiff, setDaysDiff] = useState<number>(0); 
  const [percentualExecutado,setPercentualExecutado] = useState<number | undefined>();
  const [responsavelFiscalizacaoFormatted, setResponsavelFiscalizacaoFormatted] = useState(null);

  const getFileOfConstructions = async () => {
    
      const response = await fetch(
      `https://dadosadm.mogidascruzes.sp.gov.br/api/obras/${ id }`,
      
        {
          headers: {
            "Authorization": "Token 691239ed466fd053651a57ac9c075f0d80c25cdd"
          }
        }
      );
      
  
      const data = await response.json();
  
      if (!data) {
        return;
      }
  
    
      setFile(data);
      setValoresExecutados(data.valorexecutado_set || []);
      const startTime = new Date(data?.inicio_ate);
      const endTime = new Date(data?.aditivo_prazo ?? data?.conclusao_ate);
    //const endTime = new Date(data?.conclusao_ate);
      const timeDiff = Math.abs(endTime.getTime() - startTime.getTime());
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Convertendo milissegundos para dias
      setDaysDiff(daysDiff);

      const responsavelFiscalizacao = file?.responsavel_fiscalizacao ? `${file?.responsavel_fiscalizacao.split('|')[0]} | RGF: ${file?.responsavel_fiscalizacao.split('|')[1]}` : null;

      
      
    }
    useEffect(() => {

     
      const calculatePercentualExecutado = async () => {
        try {
          const valorTotalMedicao = parseFloat(file?.valor_total_medicao) || 0;
          console.log(valorTotalMedicao);
          
          const valorTotalAditamento = parseFloat(file?.valor_total_aditamento_reajuste_contrato) || 0;
          console.log(valorTotalAditamento);
          
          const percentualExecutado = Math.round((valorTotalMedicao / valorTotalAditamento) * 100 * 100) / 100;
          console.log(percentualExecutado);
          
          setPercentualExecutado(percentualExecutado);
        } catch (error) {
          console.error("Error calculating percentualExecutado:", error);
        }
      };
    
      calculatePercentualExecutado();
      getFileOfConstructions();
      
    }, [file]);

    
    
  
    const [collapseOpen, setCollapseOpen] = useState(false);
    const toggleCollapse = () => {
      setCollapseOpen(!collapseOpen);
    };
 
  

  const buildingData = (item: any) => {
    
    let arrayImages = [];
    arrayImages.push(
      item?.imagen_1 ||
        "https://www.stant.com.br/wp-content/uploads/2020/09/pexels-pixabay-159306_Easy-Resize.com_-1024x682.jpg"
    );
    item?.imagen_2 && arrayImages.push(item?.imagen_2);
    item?.imagen_3 && arrayImages.push(item?.imagen_3);
    item?.imagen_4 && arrayImages.push(item?.imagen_4);

    // let subtract = moment(item?.conclusao_ate, "DD/MM/YYYY").diff(
    //  moment(item?.inicio_ate, "DD/MM/YYYY")
    //);

    //let days = moment.duration(subtract).asDays().toFixed();

    var startTime = item?.inicio_ate;
    var endTime = item?.conclusao_ate;

    function run(start: string | number | Date, end: string | number | Date) {
      return Math.abs(new Date(start).getTime() - new Date(end).getTime());
    }

    const days = run(startTime, endTime) / (1000 * 60 * 60 * 24);

   

    
  };

  return (
    
    <LayoutConstructions
      title={file?.escopo_da_obra}
      bannerSrc={file?.imagen_1}
      bannerTitle={file?.categoria}
      bannerDescription={file?.descricao_da_obra}
    >
      <Style.Container>
        <a
          className="row"
          onClick={() => router.push("/controle-de-obras/inicio")}
        >
          <BsFillArrowLeftCircleFill fontSize={30} /> <span>Voltar</span>
        </a>
      
       
        
        {/*buildingData(file)}
        {/* {othersBuildings?.map((item: any) => buildingData(item))} */}
      </Style.Container>

      <Box
       m={0}
       bg={useColorModeValue("gray.100", "gray.800")}
       
       padding={"15px"}
       rounded="md"
       overflow="hidden"
       maxWidth="100%"
       borderRadius="18px"
       marginBottom="15px"
      > 
      
      


      <Box 
      maxW="100%"
      fontSize="x-large"
      bgColor={"rgb(255, 112, 111)"}
      borderRadius="10px"
      textAlign="center"

      >

      Ficha Técnica

      </Box>

      <Box 
      maxW="100%"
       fontSize="large"
       textAlign="center"
       mt="20px"
       fontWeight= 'bold'
       mb="10px"
      
       >

      {file?.nome_da_obra}

      </Box>

      <Box display="flex" flexDirection="row">
        
      <Box width="100%"
       fontSize="large"
       textAlign="center"
       mt="10px"
       //border="2px"
       alignContent="center"
      // display="flex" 
       alignItems="center"
       justifyContent="space-around"
      // flexDirection="row"
       >
        
        </Box>

      
      
      </Box>


      <Box 
      display="flex" flexDirection="row"
       >
         <Box width="50%"
       fontSize="large"
       textAlign="center"
       mt="10px"
      //border="2px"
      alignItems="center"
      justifyContent="space-around"
      display="flex" 
       >
<Box  ><Box fontWeight= 'bold'>Número do Contrato: </Box><Box>{file?.numero_contrato}</Box>  </Box>
<Box  ><Box fontWeight= 'bold'>Empresa Contratada: </Box><Box>{file?.razao_social_contratada}</Box>  </Box>
       
       

       </Box>
       
       <Box 
       width="50%"
       fontSize="large"
       textAlign="center"
       mt="10px"
      //border="2px"
      alignItems="center"
      justifyContent="space-around"
      display="flex" 
       >
        <Box><Box fontWeight= 'bold'>Data Inicio: </Box><Box>{moment(file?.inicio_ate).format("DD/MM/YYYY ")}</Box>  </Box>
       <Box> <Box fontWeight= 'bold'>Data Fim: </Box><Box> {file?.aditivo_prazo !== null ? moment(file?.aditivo_prazo).format("DD/MM/YYYY") : moment(file?.conclusao_ate).format("DD/MM/YYYY")} </Box></Box>
        
       </Box>
      
      

       </Box>

       <Box 
      display="flex" flexDirection="row"
       >
         <Box width="50%"
       fontSize="large"
       textAlign="center"
       mt="10px"
      //border="2px"
      alignItems="center"
      justifyContent="space-around"
      display="flex" 
       >
<Box><Box fontWeight= 'bold'>Endereço da Obra: </Box><Box>{file?.localizacao}</Box>  </Box>

       </Box>
       
       <Box width="50%"
       fontSize="large"
       textAlign="center"
       mt="10px"
      //border="2px"
      alignItems="center"
      justifyContent="space-around"
      display="flex" 
       >
        
        <Box><Box fontWeight= 'bold'>Bairro: </Box><Box>{bairros.map(row =>{
                            if(row.id === file?.bairro){
                              return row.nome
                            }
                          })}</Box>  </Box>
       </Box>
      

       </Box>
      <Box display="flex" flexDirection="row">
        
      <Box width="50%"
       fontSize="large"
       textAlign="center"
       mt="10px"
       //border="2px"
       alignContent="center"
      // display="flex" 
       alignItems="center"
       justifyContent="space-around"
      // flexDirection="row"
       >
        <Box fontWeight= 'bold'>Status da obra:</Box> <Box>{file?.status ? file.status.split("-")[1] : 'Status não disponível'}</Box>
        </Box>

      <Box width="50%"
       fontSize="large"
       textAlign="center"
       mt="10px"
      //border="2px"
      alignItems="center"
      justifyContent="space-around"
      display="flex" 
       >
        <Box><Box fontWeight= 'bold'>Prazo Total: </Box><Box>{daysDiff} </Box>  </Box>
       </Box>
      
      </Box>
      
      <Box 
      display="flex" flexDirection="row"
       >
         <Box width="50%"
       fontSize="large"
       textAlign="center"
       mt="10px"
      //border="2px"
      alignItems="center"
      justifyContent="space-around"
      display="flex" 
       >
        <Box><Box fontWeight= 'bold'>Programa PPA: </Box><Box>{ppas.map(ppa => {
        if (ppa.id === file?.programa_ppa) {
            return ppa.programa;
        }
        return null;
    })}</Box>  </Box>
       </Box>
       
       <Box width="50%"
       fontSize="large"
       textAlign="center"
       mt="10px"
      //border="2px"
      alignItems="center"
      justifyContent="space-around"
      display="flex" 
       >
        <Box><Box fontWeight= 'bold'>Tipo: </Box><Box>{file?.tipo ? file?.tipo.split(":")[1] : " "}</Box>  </Box>

       </Box>
      

       </Box>


       <Box 
      display="flex" flexDirection="row"
       >
         <Box width="50%"
       fontSize="large"
       textAlign="center"
       mt="10px"
      //border="2px"
      alignItems="center"
      justifyContent="space-around"
      display="flex" 
       >
<Box><Box fontWeight= 'bold'>Área responsável pela fiscalização: </Box><Box>{file?.secretaria_responsavel}</Box>  </Box>

       </Box>
       
       <Box width="50%"
       fontSize="large"
       textAlign="center"
       mt="10px"
      //border="2px"
      alignItems="center"
      justifyContent="space-around"
      display="flex" 
       >
        
        <Box><Box fontWeight= 'bold'>Orgão Responsavel:: </Box><Box>{file?.orgao_responsavel} </Box>  </Box>
       </Box>
      

       </Box>

       <Box 
      display="flex" flexDirection="row"
       >
         <Box width="50%"
       fontSize="large"
       textAlign="center"
       mt="10px"
      //border="2px"
      alignItems="center"
      justifyContent="space-around"
      display="flex" 
       >
<Box><Box fontWeight= 'bold'>Agente responsável pela fiscalização: </Box>
<Box>{file?.responsavel_fiscalizacao ? `${file?.responsavel_fiscalizacao.split('|')[0]} | RGF: ${file?.responsavel_fiscalizacao.split('|')[1]}` : 'null'} </Box>  </Box>

       </Box>
       
       <Box width="50%"
       fontSize="large"
       textAlign="center"
       mt="10px"
      //border="2px"
      alignItems="center"
      justifyContent="space-around"
      display="flex" 
       >
        
        <Box><Box fontWeight= 'bold'>Beneficiários: </Box><Box>{file?.beneficiarios} </Box>  </Box>
       </Box>
      

       </Box>


       <Box 
      display="flex" flexDirection="row"
       >
         <Box width="50%"
       fontSize="large"
       textAlign="center"
       mt="10px"
      //border="2px"
      alignItems="center"
      justifyContent="space-around"
      display="flex" 
       >
<Box><Box fontWeight= 'bold'>Valor previsto: </Box><Box>{moneyFormatter(file?.valor_total_aditamento_reajuste_contrato)}</Box>  </Box>

       </Box>
       
       <Box width="50%"
       fontSize="large"
       textAlign="center"
       mt="10px"
      //border="2px"
      alignItems="center"
      justifyContent="space-around"
      display="flex" 
       >
        
        <Box><Box fontWeight= 'bold'>Valor executado: </Box><Box>{moneyFormatter(file?.valor_total_medicao)} </Box>  </Box>
       </Box>
      

       </Box>

       <Box 
      display="flex" flexDirection="row"
       >
         <Box width="50%"
       fontSize="large"
       textAlign="center"
       mt="10px"
      //border="2px"
      alignItems="center"
      justifyContent="space-around"
      display="flex" 
       >
<Box><Box fontWeight= 'bold'>Percentual executado: </Box><Box>{percentualExecutado}  %</Box>  </Box>

       </Box>
       
       <Box width="50%"
       fontSize="large"
       textAlign="center"
       mt="10px"
      //border="2px"
      alignItems="center"
      justifyContent="space-around"
      display="flex" 
       >
        
        <Box><Box fontWeight= 'bold'>Percentual da etapa: </Box><Box>{file?.percentual_etapa} %  </Box> 
        <Box fontWeight= 'bold'>Etapa: </Box><Box>{file?.etapas} </Box>  </Box>
       </Box>
      

       </Box>
       <Box 
      display="flex" flexDirection="row"
       >
        
       </Box>
       <Box 
      display="flex" flexDirection="row"
       >
         <Box width="50%"
       fontSize="large"
       textAlign="center"
       mt="10px"
      //border="2px"
      alignItems="center"
      justifyContent="space-around"
      display="flex" 
       >
  <Box><Box fontWeight= 'bold'>Última atualização: </Box><Box>{file?.data_etapa ? moment(file.data_etapa).format("DD/MM/YYYY") : " "} </Box>  </Box>

       </Box>
       
       <Box width="50%"
       fontSize="large"
       textAlign="center"
       mt="10px"
      //border="2px"
      alignItems="center"
      justifyContent="space-around"
      display="flex" 
       >
        
        <Box><Box fontWeight= 'bold'>Justificativa de Aditivo:  </Box><Box> {file?.justificativa_aditivo}</Box>  </Box>
       </Box>
      

       </Box>
       <Box 
      display="flex" flexDirection="row"
       >
        
       </Box>
       <Box 
      display="flex" 
      flexDirection="row"
      justifyContent="center"
      mt="30px"
       ></Box>

      </Box>

    </LayoutConstructions>
  );
};

export default ConstructionScreen;
