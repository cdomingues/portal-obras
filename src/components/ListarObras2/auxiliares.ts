type Obra = {
    id: string;
    situacao: string;
    status: string;
    tipo: string;
    categoria: string;
    secretaria_responsavel: string;
    orgao_responsavel: string;
    responsavel_fiscalizacao: string;
    valoraditamento_set: any[]; // Ajuste conforme necessário
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
    escopo_da_obra: string;
    observacao: string;
    localizacao: string;
    data_etapa: string;
    percentual_etapa: string;
    etapas: string;
    cnpj: string;
    razao_social_contratada: string;
    numero_processo: string;
    numero_concorrencia: string;
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
    thumbnail: string | null;
    programa_ppa: string;
    numero_convenio: string | null;
    fonte_recurso: string;
    tipo_licitacao: string;
    bairro: string;
};

export const columns: { name: string; selector: (row: Obra) => any }[] = [
    { name: "ID", selector: (row: Obra) => row.id },
    { name: "Situação", selector: (row: Obra) => row.situacao },
    { name: "Status", selector: (row: Obra) => row.status },
    { name: "Tipo", selector: (row: Obra) => row.tipo },
    { name: "Categoria", selector: (row: Obra) => row.categoria },
    { name: "Secretaria Responsável", selector: (row: Obra) => row.secretaria_responsavel },
    { name: "Órgão Responsável", selector: (row: Obra) => row.orgao_responsavel },
    { name: "Responsável pela Fiscalização", selector: (row: Obra) => row.responsavel_fiscalizacao },
    { name: "Valor Aditamento (Set)", selector: (row: Obra) => row.valoraditamento_set },
    { name: "Valor Reajuste (Set)", selector: (row: Obra) => row.valorreajuste_set },
    { name: "Imagem (Set)", selector: (row: Obra) => row.image_set },
    { name: "Link (Set)", selector: (row: Obra) => row.link_set },
    { name: "Valor Total Medição", selector: (row: Obra) => row.valor_total_medicao },
    { name: "Valor Total Aditamento", selector: (row: Obra) => row.valor_total_aditamento },
    { name: "Valor Total Reajuste", selector: (row: Obra) => row.valor_total_reajuste },
    { name: "Valor Total Aditamento + Reajuste", selector: (row: Obra) => row.valor_total_aditamento_reajuste_contrato },
    { name: "Criado em", selector: (row: Obra) => row.created_at },
    { name: "Atualizado em", selector: (row: Obra) => row.updated_at },
    { name: "Número do Contrato", selector: (row: Obra) => row.numero_contrato },
    { name: "Nome da Obra", selector: (row: Obra) => row.nome_da_obra },
    { name: "Título", selector: (row: Obra) => row.titulo },
    { name: "Descrição da Obra", selector: (row: Obra) => row.descricao_da_obra },
    { name: "Escopo da Obra", selector: (row: Obra) => row.escopo_da_obra },
    { name: "Observação", selector: (row: Obra) => row.observacao },
    { name: "Localização", selector: (row: Obra) => row.localizacao },
    { name: "Data da Etapa", selector: (row: Obra) => row.data_etapa },
    { name: "Percentual da Etapa", selector: (row: Obra) => row.percentual_etapa },
    { name: "Etapas", selector: (row: Obra) => row.etapas },
    { name: "CNPJ", selector: (row: Obra) => row.cnpj },
    { name: "Razão Social Contratada", selector: (row: Obra) => row.razao_social_contratada },
    { name: "Número do Processo", selector: (row: Obra) => row.numero_processo },
    { name: "Número da Concorrência", selector: (row: Obra) => row.numero_concorrencia },
    { name: "Valor Recurso Próprio", selector: (row: Obra) => row.valor_recurso_proprio },
    { name: "Valor Convênio/Financiamento", selector: (row: Obra) => row.valor_convenio_financiamento },
    { name: "Início Até", selector: (row: Obra) => row.inicio_ate },
    { name: "Conclusão Até", selector: (row: Obra) => row.conclusao_ate },
    { name: "Aditivo de Prazo", selector: (row: Obra) => row.aditivo_prazo },
    { name: "Justificativa do Aditivo", selector: (row: Obra) => row.justificativa_aditivo },
    { name: "Valor do Contrato", selector: (row: Obra) => row.valor_contrato },
    { name: "Ano da Licitação", selector: (row: Obra) => row.ano_licitacao },
    { name: "Beneficiários", selector: (row: Obra) => row.beneficiarios },
    { name: "Mão de Obra", selector: (row: Obra) => row.mao_de_obra },
    { name: "Compromisso de Mandato", selector: (row: Obra) => row.compromisso_mandato },
    { name: "Destaque", selector: (row: Obra) => row.destaque },
    { name: "Estudo Ambiental", selector: (row: Obra) => row.estudo_ambiental },
    { name: "Financiamento Externo", selector: (row: Obra) => row.financiamento_externo },
    { name: "Data de Conclusão Real", selector: (row: Obra) => row.data_conclusao_real },
    { name: "Endereço", selector: (row: Obra) => row.endereco },
    { name: "Latitude e Longitude", selector: (row: Obra) => row.latitude_longitude },
    { name: "Thumbnail", selector: (row: Obra) => row.thumbnail },
    { name: "Programa PPA", selector: (row: Obra) => row.programa_ppa },
    { name: "Número do Convênio", selector: (row: Obra) => row.numero_convenio },
    { name: "Fonte do Recurso", selector: (row: Obra) => row.fonte_recurso },
    { name: "Tipo de Licitação", selector: (row: Obra) => row.tipo_licitacao },
    { name: "Bairro", selector: (row: Obra) => row.bairro },
];
