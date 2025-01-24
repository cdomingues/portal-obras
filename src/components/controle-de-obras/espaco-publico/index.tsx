import LayoutConstructions from "../../../components/LayoutConstructions";
import * as Text from "../../../styles/text";
import * as Style from "../../../styles/components/sobre-as-obras/styles";

const PublicSpaceScreen = () => {
  return (
    <LayoutConstructions
      title="Sobre"
      bannerSrc="https://cdn.buenosaires.gob.ar/BAObrasrenovado/CHACARITA-NICARAGUA-DORREGO.jpg"
      bannerTitle="Más y mejor espacio público"
      bannerDescription="Trabajamos por una Ciudad con más y mejor espacio público y verde, disfrutable, seguro y cercano a los vecinos y las vecinas."
    >
      <Style.Description>
        <Text.Heading5Regular>
          O Portal de Obras de Mogi das Cruzes disponibiliza aos moradores
          toda a informação sobre as obras públicas que estão transformando
          a cidade.
        </Text.Heading5Regular>

        <Text.Heading5Regular marginTop={12}>
          O portal, que faz parte do Ecossistema de Governo Aberto da 
          Cidade de Mogi das Cruzes, é o resultado do Compromisso da Cidade 
          de publicar um sistema online de obras públicas abertas.
        </Text.Heading5Regular>

        <Text.Heading5Regular marginTop={12}>
          No site, você pode conhecer as obras destacadas do plano de obras
          públicas da cidade nas áreas de transformação urbana, espaço público
          e áreas verdes, transformação educacional, transporte público, 
          integração de bairros, segurança e convivência, saúde e
          qualidade de vida, e cultura. Além disso, você pode ver as obras 
          realizadas e as planejadas, saber quando
          começam, quando terminam e quanto custam, assim como acompanhar o 
          progresso de cada uma por meio de fotos e vídeos.
        </Text.Heading5Regular>

        <Text.Heading5Regular marginTop={12}>
          A cidade de Mogi das Cruzes ampliou e revitalizou seus espaços públicos
          e áreas verdes, tornando-os mais seguros e acessíveis para que todos os
          moradores possam desfrutar. No site, você pode conhecer todas as obras
          que tornaram isso possível, bem como as oportunidades de lazer e as
          opções atualizadas de comércio, educação e cultura disponíveis na cidade.
        </Text.Heading5Regular>

        <Text.Heading4Regular marginTop={12}>
          *Dado que algumas obras possuem uma abrangência territorial ampla, uma
          vez que residentes de bairros vizinhos as utilizam, em alguns casos foi
          considerado o impacto das obras em mais de um bairro. As informações são
          atualizadas aproximadamente a cada 15 dias.
        </Text.Heading4Regular>
      </Style.Description>
    </LayoutConstructions>
  );
};

export default PublicSpaceScreen;
