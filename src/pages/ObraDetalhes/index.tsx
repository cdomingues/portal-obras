import Screen from "./screen";

function Controller() {
  const location = window?.location?.href?.split("?");
  const id = location?.[1] || "1";
  const handler = {};
//console.log(id)
  return <Screen handler={handler} id={id}  />;
}

export default Controller;