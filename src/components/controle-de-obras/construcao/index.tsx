import ConstructionScreen from "./screen";

const ConstructionController = () => {
  const location = window?.location?.href?.split("?");

  // Obtém o segundo elemento após dividir a URL pela interrogação
  const id = location?.[1] || "1"; // Se não houver segundo elemento, usa "1" como valor padrão

  return <ConstructionScreen id={id} />;
};

export default ConstructionController;