import LayoutConstructions from "../../../components/LayoutConstructions";
import * as Text from "../../../styles/text";
import * as Style from "../../../styles/components/sobre-as-obras/styles";
import { Input } from "@chakra-ui/react";

export const contentAboutConstructions = {
  titlePage: "Conheça as Obras",
  description:
    "Saiba mais sobre todas as informações das obras que estão acontecendo nos bairros de Mogi das Cruzes",
};

const AboutScreen = () => {
  return (
    <LayoutConstructions
      title="Sobre"
      bannerSrc="https://images8.alphacoders.com/368/368165.jpg"
      bannerTitle={contentAboutConstructions?.titlePage}
      bannerDescription={contentAboutConstructions?.description}
    >
      <Style.Description>
        <Text.Heading5Regular>
        O Portal da Transparência de Mogi faz parte do Ecossistema de Governo Aberto da cidade e disponibiliza aos munícipes todas as informações sobre as obras que estão acontecendo em Mogi das Cruzes.
        </Text.Heading5Regular>

        <Text.Heading5Regular marginTop={12}>
        A pauta de Governo Aberto é uma novidade na gestão pública de cidades e estados. Mogi, mais uma vez, assume essa vanguarda de trabalhar essas iniciativas na Administração Municipal.
        </Text.Heading5Regular>

        <Text.Heading5Regular marginTop={12}>
        No Portal da Transparência de Mogi, você pode conhecer os destaques do Plano de Obras da Cidade em termos de transformação urbana, como novas obras de espaço público e áreas verdes, obras de saneamento básico, de mobilidade urbana e atendimentos nas novas unidades de saúde.
        </Text.Heading5Regular>

        <Text.Heading5Regular marginTop={12}>
        Além disso, você poderá ver as obras realizadas e as que estão previstas em cada um dos bairros, saber quando começam, quando terminam e quanto custam, bem como o andamento de cada uma em fotos e vídeos.
        </Text.Heading5Regular>

        <Text.Heading4Regular marginTop={12}>
        É preciso expandir este processo para que toda a população possa participar e se engajar. Nosso objetivo é fazer um governo cada vez mais transparente e guiado pelo que a população mais espera.
        </Text.Heading4Regular>
      </Style.Description>
    </LayoutConstructions>
  );
};

export default AboutScreen;

