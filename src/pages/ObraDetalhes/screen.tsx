import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Menu from "../../components/Menu";
import {ObraApiResponse} from '../../components/ListarObras'
import { Box, Image, Table, Tbody, Td, Text, Th, Tr } from "@chakra-ui/react";
import { bairros } from "../../utils/bairros";
import moneyFormatter from "../../utils/moneyFormatter";


function Detalhes({ id }: any) {
  const [obra, setObra] = useState<ObraApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [daysDiff, setDaysDiff] = useState<number>(0); 
  //const [percentualExecutado,setPercentualExecutado] = useState<number | undefined>();

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
        console.log("Dados recebidos:", result);

        // Filtra a obra pelo ID fornecido
        const obraEncontrada = result.find((obra) => obra.id === id);

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
          
  
  return  (
    
        <>
      <Menu />
      <Text fontSize='x-large' fontWeight='bold' textAlign='center'>{obra?.titulo}</Text>
      <Box display='flex' flexDirection='row' marginX='20px'>
      
      <Box width='30%' alignContent='center'>
        <Image borderRadius='10px' border='2px black solid' src={obra.thumbnail} width='100%' alt="" /></Box> <Box width={'70%'}>
      <div className="table-container" >
      <Table variant="simple" size="md" width="80%" fontFamily="Arial, sans-serif">
        <Tbody>
          <Tr>
            <Th bg="#4c59af" color="white">Nome</Th>
            <Td border="1px solid #ddd" p="10px">{obra?.titulo}</Td>
          </Tr>
          <Tr>
            <Th bg="#4c59af" color="white">Descrição</Th>
            <Td border="1px solid #ddd" p="10px">{obra?.descricao_da_obra}</Td>
          </Tr>
          <Tr>
            <Th bg="#4c59af" color="white">Status</Th>
            <Td border="1px solid #ddd" p="10px">{obra?.status.split("-")[1]}</Td>
          </Tr>
          <Tr>
            <Th bg="#4c59af" color="white">Data de Início</Th>
            <Td border="1px solid #ddd" p="10px">{formatarData(obra?.inicio_ate)}</Td>
          </Tr>
          <Tr>
            <Th bg="#4c59af" color="white">Data de Conclusão</Th>
            <Td border="1px solid #ddd" p="10px">
              {obra?.aditivo_prazo !== null ? formatarData(obra?.aditivo_prazo) : formatarData(obra?.conclusao_ate)}
            </Td>
          </Tr>
          <Tr>
            <Th bg="#4c59af" color="white">Prazo Total</Th>
            <Td border="1px solid #ddd" p="10px">{days}</Td>
          </Tr>
          <Tr>
            <Th bg="#4c59af" color="white">Endereço</Th>
            <Td border="1px solid #ddd" p="10px">{obra?.endereco}</Td>
          </Tr>
          <Tr>
            <Th bg="#4c59af" color="white">Bairro</Th>
            <Td border="1px solid #ddd" p="10px">
              {bairros.map((row) => (row.id === obra?.bairro ? row.nome : null))}
            </Td>
          </Tr>
          <Tr>
            <Th bg="#4c59af" color="white">Área responsável pela fiscalização</Th>
            <Td border="1px solid #ddd" p="10px">{obra?.secretaria_responsavel}</Td>
          </Tr>
          <Tr>
            <Th bg="#4c59af" color="white">Órgão Responsável</Th>
            <Td border="1px solid #ddd" p="10px">{obra?.orgao_responsavel}</Td>
          </Tr>
          <Tr>
            <Th bg="#4c59af" color="white">Agente responsável pela fiscalização</Th>
            <Td border="1px solid #ddd" p="10px">{obra?.responsavel_fiscalizacao}</Td>
          </Tr>
          <Tr>
            <Th bg="#4c59af" color="white">Valor previsto</Th>
            <Td border="1px solid #ddd" p="10px">{moneyFormatter(obra?.valor_total_aditamento_reajuste_contrato)}</Td>
          </Tr>
          <Tr>
            <Th bg="#4c59af" color="white">Valor executado</Th>
            <Td border="1px solid #ddd" p="10px">{moneyFormatter(obra?.valor_total_medicao)}</Td>
          </Tr>
          <Tr>
            <Th bg="#4c59af" color="white">Percentual executado</Th>
            <Td border="1px solid #ddd" p="10px">{percentualExecutado} %</Td>
          </Tr>
          <Tr>
            <Th bg="#4c59af" color="white">Percentual da etapa</Th>
            <Td border="1px solid #ddd" p="10px">{Number(obra?.percentual_etapa)} %</Td>
          </Tr>
          <Tr>
            <Th bg="#4c59af" color="white">Última atualização</Th>
            <Td border="1px solid #ddd" p="10px">{formatarData(obra?.data_etapa)}</Td>
          </Tr>
          <Tr>
            <Th bg="#4c59af" color="white">Justificativa do aditivo</Th>
            <Td border="1px solid #ddd" p="10px">{obra?.justificativa_aditivo}</Td>
          </Tr>
        </Tbody>
      </Table>
      </div></Box></Box>
      
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
            background-color: #4c59af;
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
