export interface NavItem {
    label: string;
    subLabel?: string;
    children?: Array<NavItem>;
    href?: string;
  }
  
  export default [
    {
      label: "PREFEITURA",
      children: [
        {
          label: "Gabinete",
          subLabel: "",
          href: "",
          children: [
            {
              label: "Gabinete",
              subLabel: "",
              href: "https://www.mogidascruzes.sp.gov.br/pagina/gabinete/institucional",
            },
            {
              label: "Prefeita",
              subLabel: "Gabinete",
              href: "https://www.mogidascruzes.sp.gov.br/pagina/prefeita/institucional",
            },
            {
              label: "Vice-prefeito",
              subLabel: "Gabinete",
              href: "https://www.mogidascruzes.sp.gov.br/pagina/vice-prefeito/institucional",
            },
          ],
        },
        {
          label: "Secretaria",
          subLabel: "",
          href: "",
          children: [
            {
              label: "Agricultura e Abastecimento",
              subLabel: "",
              href:"https://www.mogidascruzes.sp.gov.br/pagina/secretaria-de-agricultura-e-abastecimento/institucional",
            },
            {
              label: "Assistência Social",
              subLabel: "",
              href: "https://www.mogidascruzes.sp.gov.br/pagina/secretaria-de-assistencia-social/institucional",
            },
            {
              label: "Assuntos Assuntos da Pessoa com Deficiência",
              subLabel: "",
              href: "https://www.mogidascruzes.sp.gov.br/pagina/conselho-para-assuntos-da-pessoa-com-deficiencia/institucional",
            },
            {
              label: "Assuntos Juridicos",
              subLabel: "",
              href: "https://www.mogidascruzes.sp.gov.br/pagina/secretaria-de-assuntos-juridicos/institucional",
            },
            {
              label: "Comunicação",
              subLabel: "",
              href: "https://www.mogidascruzes.sp.gov.br/pagina/coordenadoria-de-comunicacao/institucional",
            },
            {
              label: "Cultura",
              subLabel: "",
              href: "https://www.mogidascruzes.sp.gov.br/pagina/secretaria-de-cultura/institucional",
            },
            {
              label: "Desenvolvimento Econômico e Inovação",
              subLabel: "",
              href: "https://www.mogidascruzes.sp.gov.br/pagina/secretaria-de-desenvolvimento-economico-e-inovacao/institucional",
            },
            {
              label: "Educação",
              subLabel: "",
              href: "https://www.mogidascruzes.sp.gov.br/pagina/secretaria-de-educacao/institucional",
            },
            {
              label: "Esporte e Lazer",
              subLabel: "",
              href: "https://www.mogidascruzes.sp.gov.br/pagina/secretaria-de-esportes-e-lazer/institucional",
            },
            {
              label: "Finanças",
              subLabel: "",
              href: "https://www.mogidascruzes.sp.gov.br/pagina/secretaria-de-financas/institucional",
            },
            {
              label: "Gestão Pública",
              subLabel: "",
              href: "https://www.mogidascruzes.sp.gov.br/pagina/secretaria-de-gestao-publica/institucional",
            },
            {
              label: "Governo",
              subLabel: "",
              href: "https://www.mogidascruzes.sp.gov.br/pagina/secretaria-de-governo/institucional",
            },
            {
              label: "Habitação Social e Regularização Fundiária",
              subLabel: "",
              href: "https://www.mogidascruzes.sp.gov.br/pagina/secretaria-de-habitacao-social-e-regularizacao-fundiaria/institucional",
            },
            {
              label: "Infraestrutura Urbana",
              subLabel: "",
              href: "https://www.mogidascruzes.sp.gov.br/pagina/secretaria-de-infraestrutura-urbana/institucional",
            },
            {
              label: "Meio Ambiente e Proteção Animal",
              subLabel: "",
              href: "https://www.mogidascruzes.sp.gov.br/pagina/secretaria-de-meio-ambiente-e-protecao-animal/institucional",
            },
            {
              label: "Mobilidade Urbana",
              subLabel: "",
              href: "https://www.mogidascruzes.sp.gov.br/pagina/secretaria-de-mobilidade-urbana/institucional",
            },
            {
              label: "Planejamento e Gestão Estratégica",
              subLabel: "",
              href: "https://www.mogidascruzes.sp.gov.br/pagina/secretaria-de-planejamento-e-gestao-estrategica/institucional",
            },
            {
              label: "Urbanismo",
              subLabel: "",
              href: "https://www.mogidascruzes.sp.gov.br/pagina/secretaria-de-urbanismo/institucional",
            },
            {
              label: "Saúde",
              subLabel: "",
              href: "https://www.mogidascruzes.sp.gov.br/pagina/secretaria-de-saude/institucional",
            },
            {
              label: "Segurança",
              subLabel: "",
              href: "https://www.mogidascruzes.sp.gov.br/pagina/secretaria-de-seguranca/institucional",
            },
            {
              label: "Transparência e Dados Abertos",
              subLabel: "",
              href: "https://www.mogidascruzes.sp.gov.br/pagina/secretaria-de-transparencia-e-dados-abertos/institucional",
            },
            
          ],
        },
        {
          label: "Coordenadoria",
          subLabel: "",
          href: "",
          children: [
            {
              label:"Análises e Gestão de Dados",
              subLabel:"",
              href: "https://www.mogidascruzes.sp.gov.br/pagina/coordenadoria-de-analises-e-gestao-de-dados/institucional",
            },
            {
              label: "Habitação",
              subLabel: "",
              href: "https://www.mogidascruzes.sp.gov.br/pagina/coordenadoria-de-habitacao/institucional",
            },
            {
              label: "Idoso",
              subLabel: "",
              href: "https://www.mogidascruzes.sp.gov.br/pagina/coordenadoria-do-idoso/institucional",
            },
            {
              label: "Pessoa com Deficiência",
              subLabel: "",
              href: "https://www.mogidascruzes.sp.gov.br/pagina/coordenadoria-da-pessoa-com-deficiencia/institucional",
            },
            {
              label: "Turismo",
              subLabel: "",
              href: "https://www.mogidascruzes.sp.gov.br/pagina/coordenadoria-de-turismo/institucional",
            },
          ],
        },
        {
          label: "Autarquia",
          subLabel: "",
          href: "",
          children: [
            {
              label: "Cresamu",
              subLabel: "",
              href: "https://www.mogidascruzes.sp.gov.br/pagina/cresamu/institucional",
            },
            {
              label: "Iprem",
              subLabel: "",
              href: "https://www.mogidascruzes.sp.gov.br/pagina/instituto-de-previdencia-municipal/institucional",
            },
            {
              label: "Semae",
              subLabel: "",
              href: "https://www.mogidascruzes.sp.gov.br/pagina/servico-municipal-de-aguas-e-esgotos/institucional",
            },
          ],
        },
        {
          label: "Conselho",
          subLabel: "",
          href: "",
          children: [
            {
              label: "Cab",
              subLabel: "",
              href: "https://www.mogidascruzes.sp.gov.br/pagina/conselho-de-abastecimento-de-alimentos-e-bens-de-consumo/institucional",
            },
            {
              label: "Cae",
              subLabel: "",
              href: "https://www.mogidascruzes.sp.gov.br/pagina/conselho-de-alimentacao-escolar/institucional",
            },
            {
              label: "Cmapd",
              subLabel: "",
              href: "https://www.mogidascruzes.sp.gov.br/pagina/conselho-para-assuntos-da-pessoa-com-deficiencia/institucional",
            },
            {
              label: "Cmdr",
              subLabel: "",
              href: "https://www.mogidascruzes.sp.gov.br/pagina/conselho-de-desenvolvimento-rural/institucional",
            },
            {
              label: "Cme",
              subLabel: "",
              href: "https://www.mogidascruzes.sp.gov.br/pagina/conselho-de-educacao/institucional",
            },
            {
              label: "Cmi",
              subLabel: "",
              href: "https://www.mogidascruzes.sp.gov.br/pagina/conselho-do-idoso/institucional",
            },
            {
              label: "Cmit",
              subLabel: "",
              href: "https://www.mogidascruzes.sp.gov.br/pagina/conselho-de-inovacao-e-tecnologia/institucional",
            },
            {
              label: "Cmpsd",
              subLabel: "",
              href: "https://www.mogidascruzes.sp.gov.br/pagina/conselho-de-politicas-sobre-drogas/institucional",
            },
            {
              label: "Cms",
              subLabel: "",
              href: "https://www.mogidascruzes.sp.gov.br/pagina/conselho-de-saude/institucional",
            },
            {
              label: "Cmttmu",
              subLabel: "",
              href: "https://www.mogidascruzes.sp.gov.br/pagina/conselho-de-transporte-transito-e-mobilidade-urbana/institucional",
            },
            {
              label: "Comas",
              subLabel: "",
              href: "https://www.mogidascruzes.sp.gov.br/pagina/conselho-de-assistencia-social/institucional",
            },
            {
              label: "Comjuve",
              subLabel: "",
              href: "https://www.mogidascruzes.sp.gov.br/pagina/conselho-da-juventude/institucional",
            },
            {
              label: "Commulher",
              subLabel: "",
              href: "https://www.mogidascruzes.sp.gov.br/pagina/conselho-da-mulher/institucional",
            },
            {
              label: "Comoma",
              subLabel: "",
              href: "https://www.mogidascruzes.sp.gov.br/pagina/conselho-mogiano-de-meio-ambiente/institucional",
            },
            {
              label: "Comphap",
              subLabel: "",
              href: "https://www.mogidascruzes.sp.gov.br/pagina/conselho-de-preservacao-do-patrimonio-historico-cultural-e-artistico/institucional",
            },
            {
              label: "Compir",
              subLabel: "",
              href: "https://www.mogidascruzes.sp.gov.br/pagina/conselho-de-promocao-da-igualdade-racial/institucional",
            },
            {
              label: "Comsep",
              subLabel: "",
              href: "https://www.mogidascruzes.sp.gov.br/pagina/conselho-de-seguranca-publica/institucional",
            },
            {
              label: "Comtur",
              subLabel: "",
              href: "https://www.mogidascruzes.sp.gov.br/pagina/conselho-de-turismo/institucional",
            },
            {
              label: "Comuc",
              subLabel: "",
              href: "https://www.mogidascruzes.sp.gov.br/pagina/conselho-de-cultura/institucional",
            },
            {
              label: "Concidade",
              subLabel: "",
              href: "https://www.mogidascruzes.sp.gov.br/pagina/conselho-da-cidade/institucional",
            },
            {
              label: "Consea",
              subLabel: "",
              href: "https://www.mogidascruzes.sp.gov.br/pagina/conselho-de-seguranca-alimentar/institucional",
            },
            {
              label: "Desporto",
              subLabel: "",
              href: "https://www.mogidascruzes.sp.gov.br/pagina/conselho-do-desporto/institucional",
            },
            {
              label: "Fundeb",
              subLabel: "",
              href: "https://www.mogidascruzes.sp.gov.br/pagina/fundo-de-manutencao-e-desenvolvimento-da-educacao-basica/institucional",
            },
            {
              label: "Tutelar",
              subLabel: "",
              href: "https://www.mogidascruzes.sp.gov.br/pagina/conselho-tutelar/institucional",
            },
          ],
        },
        {
          label: "Comite",
          subLabel: "",
          href: "",
          children: [
            {
              label: "Ciam",
              subLabel: "",
              href: "https://www.mogidascruzes.sp.gov.br/pagina/comite-integrado-de-apoio-ao-mogiano/institucional",
            },
            {
              label: "Comcriança",
              subLabel: "",
              href: "https://www.mogidascruzes.sp.gov.br/pagina/comite-gestor-dos-programas-prefeito-amigo-da-crianca-e-crianca-feliz/institucional",
            },
            {
              label: "POP RUA",
              subLabel: "",
              href: "https://www.mogidascruzes.sp.gov.br/pagina/comite-da-politica-para-a-populacao-em-situacao-de-rua/institucional",
            },
          ],
        },
        {
          label: "Orgão",
          subLabel: "",
          href: "",
          children: [
            {
              label: "Controladoria",
              subLabel: "",
              href: "https://www.mogidascruzes.sp.gov.br/pagina/controladoria-geral-do-municipio/institucional",
            },
            {
              label: "Fundo Social",
              subLabel: "",
              href: "https://www.mogidascruzes.sp.gov.br/pagina/fundo-social/institucional",
            },
            {
              label: "Ouvidoria",
              subLabel: "",
              href: "https://www.mogidascruzes.sp.gov.br/pagina/ouvidoria-geral/institucional",
            },
            {
              label: "Procon",
              subLabel: "",
              href: "https://www.mogidascruzes.sp.gov.br/pagina/procon/institucional",
            },
            {
              label: "Serviço Militar",
              subLabel: "",
              href: "https://www.mogidascruzes.sp.gov.br/pagina/servico-militar/institucional",
            },
          ],
        },
      ],
    },
    {
      label: "CARTA DE SERVIÇOS",
      children: [
        {
          label: "Agricultura e Meio Ambiente",
          subLabel: "",
          href: "https://www.mogidascruzes.sp.gov.br/servicos/agricultura-e-meio-ambiente",
        },
        {
          label: "Alvarás, Certidões e Licenças",
          subLabel: "",
          href: "https://www.mogidascruzes.sp.gov.br/servicos/alvara-certidoes-e-licencas",
        },
        {
          label: "Animais",
          subLabel: "",
          href: "https://www.mogidascruzes.sp.gov.br/servicos/animais",
        },
        {
          label: "Assistência Social e Habitação",
          subLabel: "",
          href: "https://www.mogidascruzes.sp.gov.br/servicos/assistencia-social-e-habitacao",
        },
        {
          label: "Cultura e Turismo",
          subLabel: "",
          href: "https://www.mogidascruzes.sp.gov.br/servicos/cultura-e-turismo",
        },
        {
          label: "Educação",
          subLabel: "",
          href: "https://www.mogidascruzes.sp.gov.br/servicos/educacao",
        },
        {
          label: "Emprego e Profissionalização",
          subLabel: "",
          href: "https://www.mogidascruzes.sp.gov.br/servicos/emprego-e-profissionalizacao",
        },
        {
          label: "Esporte e Lazer",
          subLabel: "",
          href: "https://www.mogidascruzes.sp.gov.br/servicos/esporte-e-lazer",
        },
        {
          label: "Impostos e Taxas",
          subLabel: "",
          href: "https://www.mogidascruzes.sp.gov.br/servicos/impostos-e-taxas",
        },
        {
          label: "Obras e Serviços Urbanos",
          subLabel: "",
          href: "https://www.mogidascruzes.sp.gov.br/servicos/obras-e-servicos-urbanos",
        },
        {
          label: "Procon, SAC e Ouvidoria",
          subLabel: "",
          href: "https://www.mogidascruzes.sp.gov.br/servicos/procon-sac-e-ouvidoria",
        },
        {
          label: "Saneamento",
          subLabel: "",
          href: "https://www.mogidascruzes.sp.gov.br/servicos/saneamento",
        },
        {
          label: "Saúde",
          subLabel: "",
          href: "https://www.mogidascruzes.sp.gov.br/servicos/saude",
        },
        {
          label: "Segurança e Fiscalização",
          subLabel: "",
          href: "https://www.mogidascruzes.sp.gov.br/servicos/seguranca-e-fiscalizacao",
        },
        {
          label: "Transporte e Trânsito",
          subLabel: "",
          href: "https://www.mogidascruzes.sp.gov.br/servicos/transporte-e-transito",
        },
      ],
    },
    {
      label: "CIDADE",
      children: [
        {
          label: "Sala de Notícias",
          subLabel: "",
          href: "",
          children: [
            {
              label: "Notícias",
              subLabel: "",
              href: "https://www.mogidascruzes.sp.gov.br/noticias",
            },
            {
              label: "Prefeitura Esclarece",
              subLabel: "",
              href: "https://www.mogidascruzes.sp.gov.br/prefeitura-esclarece",
            },
            {
              label: "Banco de Imagens",
              subLabel: "",
              href: "https://www.mogidascruzes.sp.gov.br/pagina/secretaria-de-transparencia-e-comunicacao/banco-de-imagens",
            },
          ],
        },
        {
          label: "Guia Turístico",
          subLabel: "",
          href: "",
          children: [
            {
              label: "Mogi das Cruzes",
              subLabel: "",
              href: "https://www.mogidascruzes.sp.gov.br/mogi-das-cruzes/descobrindo-mogi-das-cruzes",
            },
            {
              label: "Pontos Turísticos",
              subLabel: "",
              href: "https://www.mogidascruzes.sp.gov.br/pontos-turisticos/todos-os-assuntos",
            },
            {
              label: "Agenda da Cidade",
              subLabel: "",
              href: "https://www.mogidascruzes.sp.gov.br/agenda-da-cidade/atracoes",
            },
          ],
        },
      ],
    },
    {
      label: "FALE CONOSCO",
      href: "https://www.mogidascruzes.sp.gov.br/fale-conosco",
    },
  ] as Array<NavItem>;
  