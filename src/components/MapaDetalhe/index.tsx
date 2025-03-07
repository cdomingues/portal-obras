import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";


interface MapaProps {
  latitude: number;
  longitude: number;
  descricao: string;
}

const Mapa: React.FC<MapaProps> = ({ latitude, longitude, descricao }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Evita erro de SSR ou execução antes da montagem
  }, []);

  if (!isClient) return <p>Carregando mapa...</p>; // Evita erro de acesso ao DOM

  // Criando um ícone personalizado usando o arquivo location.svg
  const customIcon = L.divIcon({
    className: "custom-marker",
    html: `
      <div style="
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
      ">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="50" height="50" fill="blue">
          <path d="M192 0C86 0 0 86 0 192c0 77.4 27 135.4 85.8 211.8 26.5 34.5 57.5 70.7 92.4 110.9a24 24 0 0 0 36.5 0c34.9-40.2 65.9-76.4 92.4-110.9C357 327.4 384 269.4 384 192 384 86 298 0 192 0zm0 272a80 80 0 1 1 0-160 80 80 0 0 1 0 160z"/>
        </svg>
      </div>`,
    iconSize: [30, 30], // Tamanho do ícone
  });
  return (
    <MapContainer
      center={[latitude, longitude]} // Coordenadas iniciais
      zoom={12}
      style={{ height: "400px", width: "95%", margin: "0 auto", marginTop: "20px" }}     
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      <Marker position={[latitude, longitude]} icon={customIcon}>
        <Tooltip direction="bottom" offset={[0, 20]} opacity={1} permanent>
          {descricao}
        </Tooltip>
      </Marker>
    </MapContainer>
  );
};

export default Mapa;
