import React, { useState, useEffect } from "react";

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

const Obras = () => {
  const [data2, setData2] = useState<ObraApiResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
  const totalObras = obrasFiltradas.length;
  const totalObrasAndamento = obrasFiltradas.filter((item) =>
    item.status.includes("05 - EM EXECUÇÃO")
  ).length;
  const totalObrasConcluidas = obrasFiltradas.filter((item) =>
    item.status.includes("06 - OBRA CONCLUIDA")
  ).length;

  //const program = item?.categoria;

  const programConfigTranslator: any = {

  "	Categoria: ÁGUA/ESGOTO": {
    backgroundColor: "#87C13F",
    imageBackgroundColor: "#7DA83C",
    imageName: "saneamento",
  },
  "Categoria: VIAS E LOGRADOUROS": {
    backgroundColor: "#7F3F93",
    imageBackgroundColor: "#713A80",
    imageName: "infraestrutura",
  },
  "5365203c-6e94-42b9-b0de-e04ce713c742": {
    backgroundColor: "#FF588A",
    imageBackgroundColor: "#CD507D",
    imageName: "mogi-eficiente",
  },
  "Categoria: UNIDADES DE EDUCAÇÃO": {
    backgroundColor: "#008C57",
    imageBackgroundColor: "#087D4D",
    imageName: "educa-mogi",
  },
  "2db3ac4b-97c1-4342-a59b-8283f227524b": {
    backgroundColor: "#F8C336",
    imageBackgroundColor: "#DBAE2F",
    imageName: "primeiros-passos",
  },
  "	Categoria: PARQUES E PRAÇAS": {
    backgroundColor: "#22BFBD",
    imageBackgroundColor: "#31A4A4",
    imageName: "cidade-inteligente",
  },
  "2afecc1c-084f-4c05-824c-e4b58071c8a1": {
    backgroundColor: "#1C3C6E",
    imageBackgroundColor: "#183560",
    imageName: "seguranca",
  },
  "Categoria: MOBILIDADE URBANA": {
    backgroundColor: "#F88B2A",
    imageBackgroundColor: "#D67B28",
    imageName: "mobilidade-urbana",
  },
  "f8d4a8b6-389e-4ce4-96ac-79ae9079f4ad": {
    backgroundColor: "#DD4134",
    imageBackgroundColor: "#DD4134",
    imageName: "esporte",
  },
  "Categoria: UNIDADE DE SAÚDE": {
    backgroundColor: "#0093D3",
    imageBackgroundColor: "#0E83BB",
    imageName: "saude",
  },
};
/* const programConfig = programConfigTranslator[program] || {
  backgroundColor: "#7F3F93",
  imageBackgroundColor: "#713A80",
  imageName: "not-found"
}; */

  return (
    <div>
      <h2>Lista de Prestação de Contas</h2>
      <p><strong>Total de Obras:</strong> {totalObras}</p>
      <p><strong>Obras em Andamento:</strong> {totalObrasAndamento}</p>
      <p><strong>Obras Concluídas:</strong> {totalObrasConcluidas}</p>
      <ul>
        {obrasFiltradas.map((item) => (
          <li key={item.id}>
            <strong>Contrato:</strong> {item.numero_contrato}
            <br />
            <strong>Nome da Obra:</strong> {item.nome_da_obra}
            <br />
            <strong>Descrição:</strong> {item.descricao_da_obra}
            <br />
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Obras;
