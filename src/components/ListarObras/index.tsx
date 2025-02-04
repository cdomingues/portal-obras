import { Box, Button, HStack, Image, VStack, Text, Tooltip,IconButton } from "@chakra-ui/react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import React, { useState, useEffect, useCallback, useRef } from "react";
import not_found from '../../assets/images/not-found.jpg';
import { bairros } from "../../utils/bairros";
import {categoriaIcones} from '../../utils/categorias'
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import '../../styles/pagination.css'
//import { Link } from "react-router-dom";

type ValorExecutado = {
  id: string;
  created_at: string;
  updated_at: string;
  processo_mediacao: string;
  medicao: number;
  data_medicao: string;
  valor: string;
  data_inicial_medicao: string;
  data_final_medicao: string;
  observacao: string;
  obra: string;
};

type ObraApiResponse = {
  thumbnail: string | undefined;
  id: string;
  situacao: string;
  status: string;
  tipo: string;
  categoria: string;
  secretaria_responsavel: string;
  orgao_responsavel: string;
  responsavel_fiscalizacao: string;
  valoraditamento_set: any[];
  valorexecutado_set: ValorExecutado[];
  valorreajuste_set: any[];
  image_set: any[];
  link_set: any[];
  valor_total_medicao: number;
  valor_total_aditamento: number;
  valor_total_reajuste: number;
  valor_total_aditamento_reajuste_contrato: number;
  created_at: string;
  updated_at: string;
  numero_contrato: string;
  nome_da_obra: string;
  titulo: string;
  descricao_da_obra: string;
  escopo_da_obra: string | null;
  observacao: string;
  localizacao: string;
  data_etapa: string;
  percentual_etapa: string;
  etapas: string;
  cnpj: string;
  razao_social_contratada: string;
  numero_processo: string;
  numero_concorrencia: string;
  numero_convenio: string | null;
  valor_recurso_proprio: string;
  valor_convenio_financiamento: string | null;
  inicio_ate: string;
  conclusao_ate: string;
  aditivo_prazo: string | null;
  justificativa_aditivo: string;
  valor_contrato: string;
  ano_licitacao: number;
  beneficiarios: string | null;
  mao_de_obra: string | null;
  compromisso_mandato: boolean;
  destaque: boolean;
  estudo_ambiental: boolean;
  financiamento_externo: boolean;
  data_conclusao_real: string | null;
  endereco: string;
  latitude_longitude: string;
  programa_ppa: string;
  fonte_recurso: string;
  tipo_licitacao: string;
  bairro: string;
};

const Obras = () => {
  const [data2, setData2] = useState<ObraApiResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1)
  console.log(currentPage)
  const ITEMS_PER_PAGE = 10;

  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

    
  
  
  useEffect(() => {
    const fetchObras = async () => {
      try {
        const response = await fetch(
          "https://dadosadm.mogidascruzes.sp.gov.br/api/listaobras/"
        );
        if (!response.ok) {
          throw new Error("Falha ao carregar os dados");
        }
        const result = await response.json();
        console.log("Dados recebidos:", result); // Verificar os dados recebidos no console
        setData2(result);
      } catch (error) {
        console.error("Erro ao carregar os dados:", error);
        setError("Não foi possível carregar os dados. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchObras();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const obrasFiltradas = data2.filter(
    (item) => item.tipo === "Tipo:OBRA" && item.status !== "07 - OBRA RESCINDIDA"
  );

const totalPages = Math.ceil(obrasFiltradas.length / ITEMS_PER_PAGE)  

const paginatedObras = obrasFiltradas.slice(
 ( currentPage -1) * ITEMS_PER_PAGE,
 currentPage  * ITEMS_PER_PAGE
);

const handlePageClick = (data: {selected: number}) =>{
  const newPage = Math.max(1, Math.min(data.selected +1, totalPages))
  setCurrentPage(newPage)
}



  return (
    
    <div>
      <Box
  width="90%"
  display="flex"
  height='200px'
  flexWrap="nowrap"
  justifyContent="space-between"
  mx="60px"
  pt="20px"
  overflowX="auto" // Permite rolagem horizontal se necessário
  sx={{
    "@media (max-width: 600px)": {
      justifyContent: "flex-start", // Alinha os itens à esquerda
      gap: "10px", // Espaçamento entre os itens
      mx: "20px", // Reduz margens para telas menores
      
    },
  }}
>
{/* <IconButton
        aria-label="Scroll Right"
        icon={<FaAngleLeft size='35px' />}
        mt='50px'
        position="absolute"
        onClick={() => scroll("left")}
        zIndex={2}
        bg="whiteAlpha.800"
        //boxShadow="md"
        _hover={{ bg: "whiteAlpha.900" }}
        display={{ base: "flex", md: "none" }}
      /> */}
  {categoriaIcones.map((row) => (
    <Box
      key={row.icone}
      textAlign="center"
      width="120px"
      minWidth="100px"
      maxWidth="120px"
      _hover={{
        border: `2px solid ${
          categoriaIcones.find((item) => item.categoria === row.categoria)?.cor || "transparent"
        }`,
      }}
      p="18px"
      borderRadius="15px"
      position="relative"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        mx: "auto",
        "@media (max-width: 600px)": {
          width: "150px",
          minWidth: "100px",
          p: "10px",
        },
      }}
    >
      <img src={row.icone} width="90%" alt={row.categoria} />
      <Text fontWeight="bold" mt="8px" fontSize="14px">
        {row.categoria.split(":")[1]}
      </Text>
    </Box>
  ))} 
  {/* <IconButton
  aria-label="Scroll Right"
  icon={<FaAngleRight  size='35px'/>}
  mt='50px'
  position="absolute"
  right="50"
  onClick={() => scroll("right")}
  zIndex={2}
  bg="whiteAlpha.800"
  boxShadow="md"
  _hover={{ bg: "whiteAlpha.900" }}
  display={{ base: "flex" }}
/> */}
</Box>

      <ul>
        {paginatedObras.map((item) => (
         <>        
         <Box
            border={categoriaIcones.find((row) => row.categoria === item.categoria)
              ? `2px solid ${categoriaIcones.find((row) => row.categoria === item.categoria)?.cor}`
              : "2px solid transparent"}

            key={item.id}
            width="98%"
            height="250px"
            borderRadius="12px"
            mb="20px"
            display="flex"
            flexDirection="row"
            position="relative" // Permite posicionar elementos internos de forma absoluta
            bgColor='white'
            boxShadow="0px 4px 10px rgba(0, 0, 0, 0.2)"
            onClick={() => window.location.href = `https://www.exemplo.com/pagina-destino/${item.categoria}`}
            
            cursor='pointer'
            sx={{
              "@media (max-width: 900px)": {
                display: 'none',
              },
            }}

          >
            {/* Ícone da Categoria no canto superior direito */}
            {categoriaIcones.map((row) => {
              if (row.categoria === item.categoria) {
                return (
                  <Box
                    key={row.categoria}
                    position="absolute"
                    top="10px"
                    right="10px"
                    display="flex"
                    alignItems="center"

                  >
                    <Tooltip label={item.categoria.split(":")[1]?.trim()} hasArrow bg="gray.700">
                      <Image src={row.icone} alt={row.categoria} boxSize="80px" />
                    </Tooltip>
                  </Box>
                );
              }
              return null;
            })}

            {/* Coluna da Imagem */}
            <Box>
              <Image
                src={item.thumbnail ? item.thumbnail : not_found}
                alt="Imagem da obra"
                w="350px"
                height="250px"
                objectFit="fill"
                borderRadius="12px" />
            </Box>

            {/* Coluna dos Dados */}
            <VStack spacing="0px" align="start" width="90%" fontSize="14px" fontFamily="sans-serif" ml="18px" mr="10px"

            >
              <VStack display="flex" flexDirection="row" pl="8px"


              >
                <Text fontWeight="bold" color="gray.800">CONTRATO: </Text> <Text>{item.numero_contrato}</Text>
              </VStack>

              <VStack display="flex" flexDirection="row" pl="8px">
                <Text fontWeight="bold" color="gray.800">STATUS: </Text> <Text>{(item.status).split('-')[1]}</Text>
              </VStack>

              <VStack display="flex" flexDirection="row" pl="8px">
                <Text fontWeight="bold" color="gray.800">TÍTULO: </Text> <Text>{item.titulo}</Text>
              </VStack>

              <VStack display="flex" flexDirection="row" pl="8px">
                <Text fontWeight="bold" color="gray.800">EMPRESA CONTRATADA: </Text> <Text>{item.razao_social_contratada}</Text>
              </VStack>

              <VStack display="flex" flexDirection="row" pl="8px">
                <Text fontWeight="bold" color="gray.800">BAIRRO: </Text>
                <Text>{bairros.map(row => row.id === item?.bairro ? row.nome : null)}</Text>
              </VStack>
            </VStack>
          </Box> 
           {/**Display Mobile */}
           <Box
           width='90%'
           border={categoriaIcones.find((row) => row.categoria === item.categoria)
            ? `2px solid ${categoriaIcones.find((row) => row.categoria === item.categoria)?.cor}`
            : "2px solid transparent"}
            borderRadius='12px'
            mb='8px'
            onClick={() => window.location.href = `https://www.exemplo.com/pagina-destino/${item.categoria}`}
            cursor='pointer'
            sx={{
              "@media (min-width: 901px)": {
                display: "none", // Esconde quando a tela for maior que o mobile
              },
            }}
           
           >
              
            <Image
                src={item.thumbnail ? item.thumbnail : not_found}
                alt="Imagem da obra"
                w="100%"
                //height="250px"
                objectFit="fill"
                borderRadius="12px" />
           <VStack spacing="0px" align="start" width="90%" fontSize="12px" fontFamily="sans-serif" ml="18px" mr="10px" 

>
  <VStack display="flex" flexDirection="row" pl="8px"


  >
    <Text fontWeight="bold" color="gray.800">CONTRATO: </Text> <Text>{item.numero_contrato}</Text>
  </VStack>

  <VStack display="flex" flexDirection="row" pl="8px">
    <Text fontWeight="bold" color="gray.800">STATUS: </Text> <Text>{(item.status).split('-')[1]}</Text>
  </VStack>

  <VStack display="flex" flexDirection="row" pl="8px">
    <Text fontWeight="bold" color="gray.800">TÍTULO: </Text> <Text>{item.titulo}</Text>
  </VStack>

  <VStack display="flex" flexDirection="row" pl="8px">
    <Text fontWeight="bold" color="gray.800">EMPRESA CONTRATADA: </Text> <Text>{item.razao_social_contratada}</Text>
  </VStack>

  <VStack display="flex" flexDirection="row" pl="8px">
    <Text fontWeight="bold" color="gray.800">BAIRRO: </Text>
    <Text>{bairros.map(row => row.id === item?.bairro ? row.nome : null)}</Text>
  </VStack>
</VStack>
{categoriaIcones.map((row) => {
              if (row.categoria === item.categoria) {
                return (
                  <Box
                    key={row.categoria}
                   top="0"     
                    textAlign='center'
                    left='0'
                    pb='5px'
                     >
                   
                  <Text color={row.cor} fontSize='18px' fontWeight='bold'>   {(row.categoria).split(':')[1]} </Text>
                    
                  </Box>
                );
              }
              return null;
            })}
           </Box>
           
            </>
           
        ))}
      </ul>

      
      <ReactPaginate
        previousLabel={"Anterior"}
        nextLabel={"Próximo"}
        breakLabel={"..."}
        pageCount={totalPages}
        marginPagesDisplayed={3}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
        
      />
     
    </div>
    
  );
};

export default Obras;
