import LayoutConstructions from "../../../components/LayoutConstructions";
import * as Text from "../../../styles/text";
import * as Style from "../../../styles/components/sobre-as-obras/styles";

const BigTransformationsScreen = () => {
  return (
    <LayoutConstructions
      title="Grandes Mudanças"
      bannerSrc="https://cdn.buenosaires.gob.ar/BAObrasrenovado/FOTOSBAOBRAS2022/Mesa_de_trabajo_1.png"
      bannerTitle="Grandes Mudanças na cidade"
      bannerDescription="Saiba mais sobre o site que disponibiliza aos moradores 
      toda a informação sobre as obras públicas que estão transformando a cidade."
    >
      <Style.Description>
        <Text.Heading5Regular>
          
        O Portal de Obras disponibiliza aos moradores toda a informação sobre 
        as obras públicas que estão transformando a cidade.
        </Text.Heading5Regular>

        <Text.Heading5Regular marginTop={12}>
        O Portal de Obras de Mogi das Cruzes, que faz parte do Ecossistema de 
        Governo Aberto de Mogi das Cruzes, é o resultado do Compromisso da 
        cidade em publicar um sistema online de obras públicas abertas.
        
        </Text.Heading5Regular>

        <Text.Heading5Regular marginTop={12}>
          No site, você pode conhecer as obras destacadas do plano de obras 
          públicas da cidade nas áreas de transformação urbana, espaços públicos
           e áreas verdes, educação, transporte público, integração de bairros, 
           segurança, saúde e cultura. Além disso, em breve será possível observar
           obras que foram realizadas e as que estão planejadas em cada um dos 
           bairros de Mogi das Cruzes, incluindo informações sobre datas de 
           início, término e custos, assim como acompanhar os avanços de cada 
           uma delas por meio de fotos e vídeos.
        </Text.Heading5Regular>

        <Text.Heading5Regular marginTop={12}>
          Mogi das Cruzes tem ampliado e valorizado o espaço público e as áreas
           verdes, buscando torná-los mais seguros e acessíveis, para que todos 
           os moradores possam desfrutar. No portal, você poderá conhecer todas 
           as obras que tornaram isso possível, bem como as oportunidades de 
           lazer e as ofertas comerciais, educacionais e culturais renovadas.
        </Text.Heading5Regular>

        <Text.Heading4Regular marginTop={12}>
          Considerando que algumas obras têm impacto em áreas além de um único
          bairro, devido ao uso por moradores de bairros vizinhos, em alguns 
          casos, o portal apresenta informações sobre o impacto das obras em 
          mais de um bairro. As informações são atualizadas aproximadamente 
          a cada 15 dias.
        </Text.Heading4Regular>
      </Style.Description>
    </LayoutConstructions>
  );
};

export default BigTransformationsScreen;
