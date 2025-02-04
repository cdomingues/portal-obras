import React, { useState, useEffect } from "react";
import moneyFormatter from "../../utils/moneyFormatter";
import { Box, Text } from "@chakra-ui/react";
import inversion from '../../assets/images/icones/parede-de-tijolos.png';
import dinheiro from '../../assets/images/icones/moedas.png';
import percentual from '../../assets/images/icones/grafico-de-pizza.png';
import loading_bar from '../../assets/images/loader.gif'

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

const Painel = () => {
  const [data2, setData2] = useState<ObraApiResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentTotalObras, setCurrentTotalObras] = useState(0);
  const [currentPercentualConcluidas, setCurrentPercentualConcluidas] = useState(0);
  const [currentTotalInvestido, setCurrentTotalInvestido] = useState(0);
  const moneyFormatt = (value: number) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)

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

  useEffect(() => {
    if (data2.length > 0) {
      const obrasFiltradas = data2.filter(
        (item) => item.tipo === "Tipo:OBRA" && item.status !== "07 - OBRA RESCINDIDA" 
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

      const duration = 2000; // Duração da animação em milissegundos
      const incrementObras = totalObras / (duration / 10);
      const incrementPercentual = percentualConcluidas / (duration / 10);
      const increment = totalInvestido / (duration / 10)

      const intervalObras = setInterval(() => {
        setCurrentTotalObras((prevValue) => {
          if (prevValue + incrementObras >= totalObras) {
            clearInterval(intervalObras);
            return totalObras;
          }
          return prevValue + incrementObras;
        });
      }, 10);

      const intervalPercentual = setInterval(() => {
        setCurrentPercentualConcluidas((prevValue) => {
          if (prevValue + incrementPercentual >= percentualConcluidas) {
            clearInterval(intervalPercentual);
            return percentualConcluidas;
          }
          return prevValue + incrementPercentual;
        });
      }, 10);

      const interval = setInterval(() => {
        setCurrentTotalInvestido((prevValue) => {
          if (prevValue + increment >= totalInvestido) {
            clearInterval(interval);
            return totalInvestido;
          }
          return prevValue + increment;
        });
      }, 10);

      

      return () => {
        clearInterval(intervalObras);
        clearInterval(intervalPercentual);
        clearInterval(interval)
      };
    }
  }, [data2]);

  if (loading) {
    return <Box  pt='20px' width='90%' display='flex' justifyContent='center'><img src={loading_bar} alt="" /></Box>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
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
          {moneyFormatt(currentTotalInvestido)}
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
              {currentTotalObras.toFixed(0)}
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
           {currentPercentualConcluidas.toFixed(2)+  '%'}
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
    <Text fontSize="25px" fontWeight="bold">{moneyFormatt(currentTotalInvestido)}</Text>
  </Box>

  <Box style={{ width: "100%", maxWidth: "350px" }} display="flex" flexDirection="column" alignItems="center" padding="20px" textAlign="center">
    <Box marginBottom="10px">
      <img src={inversion} width="140" height="140" />
    </Box>
    <Text fontSize="20px" fontWeight="bold">Total de Obras</Text>
    <Text fontSize="30px" fontWeight="bold">{currentTotalObras.toFixed(0)}</Text>
  </Box>

  <Box style={{ width: "100%", maxWidth: "350px" }} display="flex" flexDirection="column" alignItems="center" padding="20px" textAlign="center">
    <Box marginBottom="10px">
      <img src={percentual} width="160" height="160" />
    </Box>
    <Text fontSize="20px" fontWeight="bold">Obras Concluídas</Text>
    <Text fontSize="30px" fontWeight="bold">{currentPercentualConcluidas.toFixed(2) + '%'}</Text>
  </Box>
</Box></>
  );
};

export default Painel;

