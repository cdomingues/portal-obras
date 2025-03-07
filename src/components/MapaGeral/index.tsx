import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MarkerData {
  descricao_da_obra: string;
  id: string;
  status: string;
  titulo: string;
  localidade: string;
  longitude: number;
  latitude: number;
  categoria: string;
  thumbnail: string;
  percentual_etapa: string;
}

const MapaGeral: React.FC = () => {
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [hoveredMarker, setHoveredMarker] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true); // Evita erro de SSR

    const fetchMarkers = async () => {
      try {
        const response = await fetch("https://dadosadm.mogidascruzes.sp.gov.br/api/listaobras/");
        const data = await response.json();

        const parsedMarkers = data
          .filter((obra: any) => obra.tipo === "Tipo:OBRA" && obra.status !== "07 - OBRA RESCINDIDA")
          .map((obra: any) => {
            if (obra.latitude_longitude) {
              const [latitude, longitude] = obra.latitude_longitude.split(",").map(Number);
              return {
                id: obra.id,
                localidade: obra.local,
                latitude,
                longitude,
                categoria: obra.categoria,
                titulo: obra.titulo,
                status: obra.status,
                thumbnail: obra.thumbnail,
                percentual_etapa: obra.percentual_etapa,
              };
            }
            return null;
          })
          .filter(Boolean) as MarkerData[];

        setMarkers(parsedMarkers);
      } catch (error) {
        console.error("Erro ao buscar os dados da API:", error);
      }
    };

    fetchMarkers();
  }, []);

  if (!isClient) return <p>Carregando mapa...</p>;

  // Ícone personalizado
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
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="30" height="30" fill="blue">
          <path d="M192 0C86 0 0 86 0 192c0 77.4 27 135.4 85.8 211.8 26.5 34.5 57.5 70.7 92.4 110.9a24 24 0 0 0 36.5 0c34.9-40.2 65.9-76.4 92.4-110.9C357 327.4 384 269.4 384 192 384 86 298 0 192 0zm0 272a80 80 0 1 1 0-160 80 80 0 0 1 0 160z"/>
        </svg>
      </div>`,
    iconSize: [30, 30],
  });

  return (
    <MapContainer
    center={[-23.5205, -46.1855]}
    zoom={12}
    style={{
      width: "95%",
      height: "95%",
      minHeight: "400px",
    }}
    scrollWheelZoom={true} 
    touchZoom={true} 
    dragging={true} 
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      {markers.map((obra) => (
        <Marker 
        key={obra.id} 
        position={[obra.latitude, obra.longitude]} 
        icon={customIcon}
        eventHandlers={{
          mouseover: () => setHoveredMarker(obra.descricao_da_obra),
          mouseout: () => setHoveredMarker(null),
        }}
        >
           <Tooltip direction="bottom" offset={[0, 20]} opacity={1} permanent={false} interactive>
            {hoveredMarker === obra.id ? obra.descricao_da_obra : obra.titulo}
          </Tooltip>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapaGeral;
