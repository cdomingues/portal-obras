import MapOutline from "../../components/Maps";
import Menu from '../../components/Menu';


function Mapa() {
    return (
      <>
      <div  style={{backgroundColor: 'black', width: '100%', height: '1px'}} ></div>
      <Menu />
      <div  style={{backgroundColor: 'black', width: '100%', height: '1px'}} ></div>
      <MapOutline topojsonFile={"/abairramento.json"} />
      </>
    );
  }
  
  
  
  export default Mapa;