import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Menu from "../../components/Menu";
import {ObraApiResponse} from '../../components/ListarObras'
import { Box,  Image, Table, Tbody, Td, Text, Th, Tr } from "@chakra-ui/react";
//import { bairros } from "../../utils/bairros";
import moneyFormatter from "../../utils/moneyFormatter";
import { categoriaIcones } from "../../utils/categorias";
import  ProgressBar from '../../components/Barra';
//import not_found from '../../assets/images/not-found.jpg'
import ImageCarousel from '../../components/CarroselImagens';
import Mapa from '../../components/MapaDetalhe'


function Detalhes({ id }: any) {
  const [obra, setObra] = useState<ObraApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  //const [daysDiff, setDaysDiff] = useState<number>(0); 

  

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString("pt-BR");
  };

  

  useEffect(() => {
    const fetchObras = async () => {
      try {
        const response = await fetch("https://dadosadm.mogidascruzes.sp.gov.br/api/listaobras");
        if (!response.ok) {
          throw new Error("Falha ao carregar os dados");
        }
        const result: ObraApiResponse[] = await response.json();
        //console.log("Dados recebidos:", result);

        // Filtra a obra pelo ID fornecido
        const obraEncontrada = result.find((obra) => obra.id === id);
        console.log(obraEncontrada)
        if (obraEncontrada) {
          setObra(obraEncontrada);
        } else {
          setError("Obra não encontrada.");
        }
      } catch (error) {
        console.error("Erro ao carregar os dados:", error);
        setError("Não foi possível carregar os dados. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchObras();
  }, [id]);
 
  

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!obra) {
    return <p>Obra não encontrada.</p>;
  }
  var startTime = obra?.inicio_ate;
    var endTime = obra?.conclusao_ate;

    function run(start: string | number | Date, end: string | number | Date) {
      return Math.abs(new Date(start).getTime() - new Date(end).getTime());
    }

    const days = run(startTime, endTime) / (1000 * 60 * 60 * 24);

    const percentualExecutado = Math.round((obra.valor_total_medicao / obra.valor_total_aditamento_reajuste_contrato)  * 100 * 100 / 100 );
          console.log(percentualExecutado);
    const statusCode = obra.status.split("-")[0].trim();       
    const latitude = Number(obra.latitude_longitude.split(',')[0]);
    const longitude = Number(obra.latitude_longitude.split(',')[1]);
   
  return  (
    
        <>
      <Menu />
      <Text
       py='8px' 
       mx='10px' 
       border='1px solid white'
       borderRadius='8px' 
       bgColor="#fff9ff" 
       fontSize='xx-large' 
       fontWeight='bold' 
       textAlign='center' 
       boxShadow="0px 4px 10px rgba(0, 0, 0, 0.2)"
       sx={{
        "@media (max-width: 600px)": {
          fontSize: '25px'
          
        },
      }}
       >
      
        {obra?.nome_da_obra}
        </Text>
      <Box display='flex' flexDirection='row' marginX='10px' 
      sx={{
        "@media (max-width: 600px)": {
          flexDir:'column',
         
          
        },
      }}
      >
      
      
        <Box width='60%'
        
        sx={{
          "@media (max-width: 600px)": {
           width: '100%',
           marginX: '5px'
            
          },
        }}
        >
      <div  >
      <Table variant="simple" size="md" width="95%" fontFamily="Arial, sans-serif" mb='15px'>
  <Tbody sx={{
    "@media (max-width: 600px)": {
      fontSize: '13px',
    },
  }}>
    <Tr>
      <Th borderRadius='8px' bg="#393D6F" color="white" textTransform="uppercase">Nome</Th>
      <Td height='30px' borderRadius='8px' bgColor="#fff9ff" border="1px solid #ddd" p="10px" textTransform="uppercase">
        {obra?.titulo}
      </Td>
    </Tr>

    <Tr>
      <Th height='30px' borderRadius='8px' bg="#393D6F" color="white" textTransform="uppercase">Contrato</Th>
      {obra?.id_contrato ? (
        <Td
          borderRadius='8px'
          bgColor="#fff9ff"
          height='30px'
          border="1px solid #ddd"
          _hover={{ bgColor: "#f0e6f0", transition: "0.3s" }}
          onClick={() => window.open(`https://dadosabertos.mogidascruzes.sp.gov.br/contratos-atas/contratos_teste_detalhes?${obra?.id_contrato}`, '_blank')}
          cursor='pointer'
          display='flex'
          flexDirection='row'
          alignItems='center'
          justifyContent='space-between'
          textTransform="uppercase"
        >
          {obra?.numero_contrato}
          <Text mr='15px' fontWeight='bold'>Clique aqui para ver as informações completas do contrato</Text>
        </Td>
      ) : (
        <Td
          height='40px'
          borderRadius='8px'
          bgColor="#fff9ff"
          border="1px solid #ddd"
          display='flex'
          flexDirection='row'
          alignItems='center'
          justifyContent='space-between'
          textTransform="uppercase"
          
        ><Text ml='10px'>
          {obra?.numero_contrato}</Text>
        </Td>
      )}
    </Tr>

    <Tr>
      <Th borderRadius='8px' bg="#393D6F" color="white" textTransform="uppercase">Data de Início</Th>
      <Td borderRadius='8px' bgColor="#fff9ff" border="1px solid #ddd" p="10px" height='30px' textTransform="uppercase">
        {formatarData(obra?.inicio_ate)}
      </Td>
    </Tr>

    <Tr>
      <Th borderRadius='8px' bg="#393D6F" color="white" textTransform="uppercase">Data de Conclusão</Th>
      <Td borderRadius='8px' bgColor="#fff9ff" border="1px solid #ddd" p="10px" height='30px' textTransform="uppercase">
        {obra?.aditivo_prazo !== null ? formatarData(obra?.aditivo_prazo) : formatarData(obra?.conclusao_ate)}
      </Td>
    </Tr>

    <Tr>
      <Th borderRadius='8px' bg="#393D6F" color="white" textTransform="uppercase">Prazo Total</Th>
      <Td borderRadius='8px' bgColor="#fff9ff" border="1px solid #ddd" p="10px" height='30px' textTransform="uppercase">
        {days} dias
      </Td>
    </Tr>

    <Tr>
      <Th borderRadius='8px' bg="#393D6F" color="white" textTransform="uppercase">Endereço</Th>
      <Td borderRadius='8px' bgColor="#fff9ff" border="1px solid #ddd" p="10px" height='30px' textTransform="uppercase">
        {obra?.endereco}
      </Td>
    </Tr>

    <Tr>
      <Th borderRadius='8px' bg="#393D6F" color="white" textTransform="uppercase">Bairro</Th>
      <Td borderRadius='8px' bgColor="#fff9ff" border="1px solid #ddd" p="10px" height='30px' textTransform="uppercase">
        {obra?.bairro}
      </Td>
    </Tr>

    <Tr>
      <Th borderRadius='8px' bg="#393D6F" color="white" textTransform="uppercase">Área beneficiada</Th>
      <Td borderRadius='8px' bgColor="#fff9ff" border="1px solid #ddd" p="10px" height='30px' textTransform="uppercase">
        {obra?.orgao_responsavel}
      </Td>
    </Tr>

    <Tr>
      <Th borderRadius='8px' bg="#393D6F" color="white" textTransform="uppercase">Área fiscalizadora</Th>
      <Td borderRadius='8px' bgColor="#fff9ff" border="1px solid #ddd" p="10px" height='30px' textTransform="uppercase">
        {obra?.secretaria_responsavel}
      </Td>
    </Tr>

    <Tr>
      <Th borderRadius='8px' bg="#393D6F" color="white" textTransform="uppercase">Agente fiscalizador</Th>
      <Td borderRadius='8px' bgColor="#fff9ff" border="1px solid #ddd" p="10px" height='30px' textTransform="uppercase">
        {obra?.responsavel_fiscalizacao}
      </Td>
    </Tr>

    <Tr>
      <Th borderRadius='8px' bg="#393D6F" color="white" textTransform="uppercase">Valor previsto</Th>
      <Td borderRadius='8px' bgColor="#fff9ff" border="1px solid #ddd" p="10px" height='30px' textTransform="uppercase">
        {moneyFormatter(obra?.valor_total_aditamento_reajuste_contrato)}
      </Td>
    </Tr>

    <Tr>
      <Th borderRadius='8px' bg="#393D6F" color="white" textTransform="uppercase">Valor medido</Th>
      <Td borderRadius='8px' bgColor="#fff9ff" border="1px solid #ddd" p="10px" height='30px' textTransform="uppercase">
        {moneyFormatter(obra?.valor_total_medicao)}
      </Td>
    </Tr>

    <Tr>
      <Th borderRadius='8px' bg="#393D6F" color="white" textTransform="uppercase">Percentual medido</Th>
      <Td borderRadius='8px' bgColor="#fff9ff" border="1px solid #ddd" p="10px" height='30px' textTransform="uppercase">
        {percentualExecutado} %
      </Td>
    </Tr>

    <Tr>
      <Th borderRadius='8px' bg="#393D6F" color="white" textTransform="uppercase">Última atualização</Th>
      <Td borderRadius='8px' bgColor="#fff9ff" border="1px solid #ddd" p="10px" height='30px' textTransform="uppercase">
        {obra?.data_etapa ? formatarData(obra?.data_etapa) : ''}
      </Td>
    </Tr>

    <Tr>
      <Th borderRadius='8px' bg="#393D6F" color="white" textTransform="uppercase">Etapa</Th>
      <Td borderRadius='8px' bgColor="#fff9ff" border="1px solid #ddd" p="10px" height='30px' textTransform="uppercase">
        {obra?.etapas}
      </Td>
    </Tr>

    <Tr>
      <Th borderRadius='8px' bg="#393D6F" color="white" textTransform="uppercase">Justificativa do aditivo</Th>
      <Td borderRadius='8px' bgColor="#fff9ff" border="1px solid #ddd" p="10px" height='30px' textTransform="uppercase">
        {obra?.justificativa_aditivo}
      </Td>
    </Tr>
  </Tbody>
</Table>

      </div></Box>
      <Box width='40%' display='flex' flexDirection='column'  alignItems='center'
      sx={{
        "@media (max-width: 600px)": {
          width: '100%'
          
        },
      }}
      >
     <Box display='flex' flexDir='row' boxShadow="0px 4px 10px rgba(0, 0, 0, 0.2)" 
     border='1px solid white' 
     borderRadius='10px' 
     bgColor='white'
     width='100%'
      height='90px'
      justifyContent='space-around'
      sx={{
        "@media (max-width: 600px)": {
          height: '100px'
          
        },
      }}
     >
     {categoriaIcones.map((row) => {
              if (row.categoria === obra.categoria) {
                return (
                  <Box
                 // height='100px'
                 
                    key={row.categoria}
                  //my='15px'
                  p='10px'
                  alignItems='center'
                  title={(row.categoria.split(':')[1])}
                  sx={{
                    "@media (max-width: 600px)": {
                      height: '60px',
                      alignContent: 'center'
                    },
                  }}
                  >
                 <Image ml='20px' src={row.icone} alt={row.categoria} height='60px'
                   sx={{
                    "@media (max-width: 600px)": {
                      boxSize: '60px'
                      
                    },
                  }}
                 />
                   
                  </Box>
                );
              }
              return null;
            })}
      <Box 
      alignContent='center' 
      fontSize='25px' 
      fontWeight='bold'  
      height='100px'
     alignItems='center'
      borderRadius='10px'   
      color={statusCode === "06" ? "green" : statusCode === "05" ? "#E6c972" : "red"}
      sx={{
        "@media (max-width: 600px)": {
          fontSize: '15px'
          
        },
      }}
       >
        {(obra.status).split('-')[1]}
      </Box>

     </Box>

     <ProgressBar percentual_etapa={Number(obra.percentual_etapa)} />
    
  <ImageCarousel obraId={obra.id} />
  
        </Box> 
       
      </Box>
      
      <Box width="99%" height="450px" overflow="hidden" marginLeft='10px' >
  <Mapa latitude={latitude} longitude={longitude} descricao={obra.titulo}/>

</Box>
        
      <Footer />
      <style>
        {`
          .table-container {
            display: flex;
            justify-content: center;
            margin-top: 20px;

          }

          .obra-table {
            width: 80%;
            border-collapse: collapse;
            font-family: Arial, sans-serif;
          }

          .obra-table th, .obra-table td {
            padding: 10px;
            border: 1px solid #ddd;
            text-align: left;
          }

          .obra-table th {
            background-color: #393D6F;
            color: white;
          }

          .obra-table tr:nth-child(even) {
            background-color: #f2f2f2; /* Cinza claro */
          }

          .obra-table tr:nth-child(odd) {
            background-color: #ffffff; /* Branco */
          }
        `}
      </style>
    </>
  );
   
}

export default Detalhes;
