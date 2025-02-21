import { Box, Button,  Image, VStack, Text,  Input, InputGroup, InputRightElement } from "@chakra-ui/react";
//import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
//import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import React, { useState, useEffect } from "react";
import not_found from '../../assets/images/not-found.jpg';
import { bairros } from "../../utils/bairros";
import {categoriaIcones} from '../../utils/categorias'
import ReactPaginate from "react-paginate";
//import { useNavigate } from "react-router-dom";
import '../../styles/pagination.css'
import { FaSearch } from "react-icons/fa";
import inversion from '../../assets/images/icones/parede-de-tijolos.png';
import dinheiro from '../../assets/images/icones/moedas.png';
import percentual from '../../assets/images/icones/grafico-de-pizza.png';
//import loading_bar from '../../assets/images/loader.gif'
import moneyFormatter from "../../utils/moneyFormatter";
import Papa from "papaparse";
import * as XLSX from 'xlsx'

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

export type ObraApiResponse = {
  contrato: any;
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
  id_contrato:string;
};

const Obras = () => {
  const [data2, setData2] = useState<ObraApiResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  //const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  
  
  
  console.log(currentPage)
  const ITEMS_PER_PAGE = 10;

  
  
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

  const safeSearchTerm = searchTerm ? searchTerm.toLowerCase() : "";

  const handleFilter = (category: React.SetStateAction<string | null>) => {
    if (selectedCategory === category) {
      // Remove o filtro caso o mesmo ícone seja clicado novamente
      setSelectedCategory(null);
    } else {
      // Aplica o filtro
      setSelectedCategory(category);
    }
  };

  const obrasFiltradas = data2.filter(
    (item) => 
      item.tipo === "Tipo:OBRA" && 
      item.status !== "07 - OBRA RESCINDIDA" &&
      item.titulo.toLocaleLowerCase().includes(safeSearchTerm)  &&
      (!selectedCategory || item.categoria === selectedCategory)
  );

const totalPages = Math.ceil(obrasFiltradas.length / ITEMS_PER_PAGE)  

const filteredObras = obrasFiltradas.filter((obra)=>
  obra.titulo.toLowerCase().includes(searchTerm.toLowerCase()))

const paginatedObras = filteredObras.slice(
 ( currentPage -1) * ITEMS_PER_PAGE,
 currentPage  * ITEMS_PER_PAGE
);

const totalObras = obrasFiltradas.length;

const totalObrasAndamento = obrasFiltradas.filter((item) =>
  item.status.includes("05 - EM EXECUÇÃO")
).length;
const totalObrasConcluidas = obrasFiltradas.filter((item) =>
  item.status.includes("06 - OBRA CONCLUIDA")
).length;
const totalInvestido = obrasFiltradas.reduce((acc, item) => {
  const valor = item.valor_total_aditamento_reajuste_contrato;
  return isNaN(valor) ? acc : acc + valor;
}, 0);

const percentualConcluidas =
  (totalObrasConcluidas / (totalObrasAndamento + totalObrasConcluidas)) * 100;

const handlePageClick = (data: {selected: number}) =>{
  const newPage = Math.max(1, Math.min(data.selected +1, totalPages))
  setCurrentPage(newPage)
}

// Função para converter os dados para CSV e fazer o download
const exportToCSV = (data: unknown[] | Papa.UnparseObject<unknown>) => {
  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", "obras_filtradas.csv");
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Função para exportar os dados para XLSX

const exportToXLSX = (data: unknown[])=>{
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb,ws, "Obras")

  XLSX.writeFile(wb, "obras.xlsx")
}

// Função para exportar os dados para JSON
const exportToJSON = (data: any) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", "obras_filtradas.json");
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};


  return (
    
    <div>


<>
    <Box  marginX='40px' mt="30px" display="flex" justifyContent="space-around" borderRadius="20px" backgroundColor="lightgrey" maxWidth='100%' mb='20px'  boxShadow="0px 4px 10px rgba(0, 0, 0, 0.2)"
    sx={{
      "@media (max-width: 900px)": {
        display:'none',
      },
    }}
    >
       
       <Box  style={{ width: "350px" }} display="flex" justifyContent="space-between" alignItems="center"  >
        <Box flex="0 0 auto" marginRight="10px">
          <img src={dinheiro} alt="Investimento" width="100px" height="100px" />
        </Box>
        <Box  flexDirection="column" alignItems="center" >
          <Text fontSize="25px" fontWeight="bold" textAlign='center'>Total Investimento</Text>
          <Text fontSize="30px" fontWeight="bold" textAlign="center">
          {moneyFormatter(totalInvestido)}
          </Text>
        </Box>
      </Box>
      
      <Box style={{ width: "350px" }} display="flex" justifyContent="space-between" alignItems="center" >
        <Box flex="0 0 auto" marginRight="20px">
          <img src={inversion} width="100" height="100" />
        </Box>
        <Box  flexDirection="column" alignContent='center'   >
          <Box marginBottom="10px">
            <Text fontSize="25px" fontWeight="bold" >Total de Obras</Text>
          </Box>
          <Box>
            <Text fontSize="30px" fontWeight="bold" textAlign="center" >
              {totalObras.toFixed(0)}
            </Text>
          </Box>
        </Box>
      </Box>

      <Box style={{ width: "400px" }} display="flex" justifyContent="space-between" alignItems="center" >
        <Box flex="0 0 auto" marginRight="20px">
          <img src={percentual} width="100" height="100" />
        </Box>
        <Box  flexDirection="column" alignContent='center'   >
          <Box marginBottom="10px">
            <Text fontSize="25px" fontWeight="bold">Obras Concluídas</Text>
          </Box>
          <Box>
            <Text fontSize="30px" fontWeight="bold" textAlign="center">
           {percentualConcluidas.toFixed(2)+  '%'}
            </Text>
            
          </Box>
        </Box>
      </Box>
    
    </Box>
{/* Painel versão mobile */}

<Box p="20px" m="30px" display="flex" flexDirection="column" alignItems="center" borderRadius="20px" backgroundColor="lightgrey" 
sx={{
  "@media (min-width: 901px)": {
    display: "none", // Esconde quando a tela for maior que o mobile
  },
}}
>
  <Box style={{ width: "100%", maxWidth: "350px" }} display="flex" flexDirection="column" alignItems="center" padding="10px" textAlign="center">
    <Box marginBottom="10px">
      <img src={dinheiro} alt="Investimento" width="120" height="120" />
    </Box>
    <Text fontSize="20px" fontWeight="bold">Total Investimento</Text>
    <Text fontSize="25px" fontWeight="bold">{moneyFormatter(totalInvestido)}</Text>
  </Box>

  <Box style={{ width: "100%", maxWidth: "350px" }} display="flex" flexDirection="column" alignItems="center" padding="20px" textAlign="center">
    <Box marginBottom="10px">
      <img src={inversion} width="140" height="140" />
    </Box>
    <Text fontSize="20px" fontWeight="bold">Total de Obras</Text>
    <Text fontSize="30px" fontWeight="bold">{totalObras.toFixed(0)}</Text>
  </Box>

  <Box style={{ width: "100%", maxWidth: "350px" }} display="flex" flexDirection="column" alignItems="center" padding="20px" textAlign="center">
    <Box marginBottom="10px">
      <img src={percentual} width="160" height="160" />
    </Box>
    <Text fontSize="20px" fontWeight="bold">Obras Concluídas</Text>
    <Text fontSize="30px" fontWeight="bold">{percentualConcluidas.toFixed(2) + '%'}</Text>
  </Box>
</Box></>




      
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
      onClick={()=>handleFilter(row.categoria)}
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
        cursor: "pointer",
        background: selectedCategory === row.categoria ? "#ddd" : '',
        opacity: selectedCategory && selectedCategory !== row.categoria ? 0.4 : 1, // Opacidade para os ícones não selecionados
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



    <Box  pt='20p' display='flex' flexDirection='row' mt='15px' fontSize='40px' justifyContent='space-between' mr='20px'
    sx={{
      "@media (max-width: 900px)": {
        flexDir: 'column'
      },
    }}
    >

    <InputGroup mt='10px' ml="40px" width="40%"
     sx={{
      "@media (max-width: 900px)": {
        width: '80%'
      },
    }}>
      <Input
        type="text"
        placeholder="Buscar por título da obra ..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        borderRadius="8px"
        height="40px"
        pr="40px" // Adiciona espaço para o ícone à direita
        width='100%'
      />
      <InputRightElement height='100%' display='flex' pr='10px' >
        <FaSearch color="gray" />
      </InputRightElement>
      
    </InputGroup>  
    <Box
   // width='80%'
   // border='1px solid black'
    //
     sx={{
      "@media (max-width: 900px)": {
       justifyContent: 'space-between',
       ml:'40px'
      },
    }}
   
    >
    <Button 
    width='150px'
    border='0' cursor='pointer'  fontSize='20px'  textColor='white' 
    bgColor='#4CAF50' 
    _hover={{
    bgColor: "#078d0c",  // Cor de fundo ao passar o mouse
    
  }}
   height='40px' borderRadius='8px' mr='15px'  onClick={() => exportToCSV(obrasFiltradas)}
   transition='background-color 0.3s ease'
   boxShadow="0px 4px 10px rgba(0, 0, 0, 0.2)"
   sx={{
    "@media (max-width: 900px)": {
      width: '27%'
    },
  }}
   >CSV</Button>

    <Button  width='150px'border='0' cursor='pointer' fontSize='20px'textColor='white' 
    bgColor='#FF9800' 
    _hover={{
      bgColor: "#977505",  // Cor de fundo ao passar o mouse
    }}
    height='40px' borderRadius='8px' mr='15px'onClick={() => exportToXLSX(obrasFiltradas)}
    boxShadow="0px 4px 10px rgba(0, 0, 0, 0.2)"
    sx={{
      "@media (max-width: 900px)": {
        width: '27%'
      },
    }}
    >XLSX</Button>

    <Button width='150px' border='0' cursor='pointer' fontSize='20px' textColor='white' 
    bgColor='#F44336' 
    _hover={{
      bgColor: "#D32F2F",  // Cor de fundo ao passar o mouse
    }}
    height='40px' borderRadius='8px' mr='15px'onClick={() => exportToJSON(obrasFiltradas)}
    boxShadow="0px 4px 10px rgba(0, 0, 0, 0.2)"
    sx={{
      "@media (max-width: 900px)": {
        width: '27%'
      },
    }}
    >JSON</Button>
   </Box>
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
            onClick={() => window.location.href = `/detalhes?${item.id}`}
            
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
                     <Image src={row.icone} alt={row.categoria} boxSize="80px" title={(row.categoria).split(':')[1]}/>
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
            onClick={() => window.location.href = `detalhes?${item.id}`}
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
        marginPagesDisplayed={1}
        pageRangeDisplayed={1}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
        
      />
     
    </div>
    
  );
};

export default Obras;
