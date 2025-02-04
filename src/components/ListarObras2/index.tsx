import { Box, Button, Tooltip } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { CSVLink } from "react-csv";
import moneyFormatter from '../../utils/moneyFormatter'
import * as XLSX from 'xlsx'
import { saveAs } from "file-saver";

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

type Obra = {
  thumbnail: string;
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

const columns: TableColumn<Obra>[] = [
  
  { name: "Título", selector: (row) => row.titulo, sortable: true, },
  { name: "Situação", selector: (row) => row.situacao , sortable: true,},
  
  { name: "Status", selector: (row) => {return row.status.split('-')[1]?.trim() || "Não disponível";} , sortable: true,},
  //{ name: "Tipo", selector: (row) => row.tipo },
  
  { name: "Categoria", selector: (row) => {return row.categoria.split(':')[1]?.trim() || "Não disponível";} },
  { name: "Contrato", selector: (row) => row.numero_contrato , sortable: true,},
  { 
    name: "Órgão Responsável", 
    selector: (row) => row.titulo, 
    cell: (row) => (
      
        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {row.orgao_responsavel.split('-')[1]?.trim() || "Não disponível"}
        </span>
      
    ) 
  },
  //{ name: "Órgão Responsável", selector: (row) => row.orgao_responsavel , sortable: true,},
  { name: "Valor Total Medição", selector: (row) =>moneyFormatter(row.valor_total_medicao) },
  { name: "Valor Total Aditamento", selector: (row) => moneyFormatter(row.valor_total_aditamento) },
  { name: "Valor Total Reajuste", selector: (row) => moneyFormatter(row.valor_total_reajuste )},
  //{ name: "Criado em", selector: (row) => row.created_at },
 // { name: "Atualizado em", selector: (row) => row.updated_at },
  
 {
  name: "Início",
  selector: (row) => {
    const date = new Date(row.inicio_ate); // Converte a string para uma data
    return isNaN(date.getTime())
      ? "Data inválida" // Fallback para datas inválidas
      : new Intl.DateTimeFormat("pt-BR").format(date); // Formata para dd/mm/aaaa
  },
  sortable: true,
},
{
  name: "Conclusão",
  selector: (row) => {
    const date = new Date(row.conclusao_ate); // Converte a string para uma data
    return isNaN(date.getTime())
      ? "Data inválida" // Fallback para datas inválidas
      : new Intl.DateTimeFormat("pt-BR").format(date); // Formata para dd/mm/aaaa
  },
  sortable: true,
},
  
  //{ name: "Nome da Obra", selector: (row) => row.nome_da_obra },
  //{ name: "Observação", selector: (row) => row.observacao },
  { name: "CNPJ", selector: (row) => row.cnpj , sortable: true,},
  { name: "Número do Processo", selector: (row) => row.numero_processo , sortable: true,},
 // { name: "Ano da Licitação", selector: (row) => row.ano_licitacao },
  //{ name: "Compromisso de Mandato", selector: (row) => (row.compromisso_mandato ? "Sim" : "Não") },
 // { name: "Destaque", selector: (row) => (row.destaque ? "Sim" : "Não") },
 // { name: "Estudo Ambiental", selector: (row) => (row.estudo_ambiental ? "Sim" : "Não") },
  //{ name: "Data de Conclusão Real", selector: (row) => row.data_conclusao_real || "Não concluída" },
  { name: "Endereço", selector: (row) => row.endereco, sortable: true, },
 // { name: "Programa PPA", selector: (row) => row.programa_ppa },
  {name: "Detalhes",
    cell:(row)=>(<button onClick={() =>
      window.open(`/controle-de-obras/construcao?${row?.id}`, '_blank')
                  }> Detalhes</button>)
  }
];


export default function Obras() {
  const [data, setData] = useState<Obra[]>([]);
  const [search, setSearch] = useState<string>('');
  const [filter, setFilter] = useState<Obra[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const paginationComponentOptions = {
    rowsPerPageText: 'Itens por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
    
    
  }

  const getObras = async () => {
    try {
      const req = await fetch("https://dadosadm.mogidascruzes.sp.gov.br/api/listaobras/");
      const res = await req.json();
      setData(res); // Certifique-se de que a estrutura retornada seja um array
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  useEffect(() => {
    getObras(); // Chame a função aqui, com os parênteses para executá-la
  }, []);

  useEffect(()=>{
    const result = data.filter((item)=>{
        return (
          item.titulo.toLowerCase().includes(search.toLowerCase()) || 
          item.numero_contrato.toLowerCase().includes(search.toLowerCase())
        );
    })
    setFilter(result)
  },[search])
  
  const csvHeaders = [
    { label: "Título", key: "titulo" },
    { label: "Situação", key: "situacao" },
    { label: "Status", key: "status" },
    { label: "Categoria", key: "categoria" },
    { label: "Contrato", key: "numero_contrato" },
    { label: "Órgão Responsável", key: "orgao_responsavel" },
    { label: "Valor Total Medição", key: "valor_total_medicao" },
    { label: "Valor Total Aditamento", key: "valor_total_aditamento" },
    { label: "Valor Total Reajuste", key: "valor_total_reajuste" },
    { label: "Início", key: "inicio_ate" },
    { label: "Conclusão", key: "conclusao_ate" },
    { label: "CNPJ", key: "cnpj" },
    { label: "Número do Processo", key: "numero_processo" },
    { label: "Endereço", key: "endereco" },
  ];

  const exportToXLS = (data: unknown[]) => {
    const worksheet = XLSX.utils.json_to_sheet(data); // Converte os dados para formato Excel
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Dados");
  
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
  
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "dados.xlsx");
  };

  return (
    <>
    <Box pl='20px'>
      <h1 >Lista de Obras</h1>
      
      </Box>
    </>
  );
}

