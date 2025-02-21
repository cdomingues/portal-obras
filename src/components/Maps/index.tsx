import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import { Topology } from "topojson-specification";
import {Image, Box , Button, Text,  Img} from "@chakra-ui/react";
import { categoriaIcones } from "../../utils/categorias"; // Importando a lista de categorias
import not_found from '../../assets/images/not-found.jpg';
import Barra from "../Barra";

interface MapOutlineProps {
  topojsonFile: string;
}

interface Marker {
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

const MapOutline: React.FC<MapOutlineProps> = ({ topojsonFile }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [activeMarker, setActiveMarker] = useState<Marker | null>(null);
  const [hoveredPosition, setHoveredPosition] = useState<{ x: number, y: number } | null>(null);
  //const zoomRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);
 // const [zoomLevel, setZoomLevel] = useState(1);



  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const response = await fetch(
          "https://dadosadm.mogidascruzes.sp.gov.br/api/listaobras/"
        );
        const data = await response.json();

        const parsedMarkers = data
        .filter((obra: any) => obra.tipo === "Tipo:OBRA" && obra.status !== "07 - OBRA RESCINDIDA")
          .map((obra: any) => {
            const [latitude, longitude] = obra.latitude_longitude
              .split(",")
              .map((coord: string) => parseFloat(coord.trim()));
            return {
              localidade: obra.local,
              latitude,
              longitude,
              categoria: obra.categoria, // Supondo que a API retorna um campo `categoria`
              titulo: obra.titulo, // Título da obra
              status: obra.status,
              thumbnail: obra.thumbnail,
              percentual_etapa: obra.percentual_etapa,
              id: obra.id
              
            };
          })
          .filter(
            (marker: Marker) =>
              !isNaN(marker.latitude) && !isNaN(marker.longitude)
          );

        setMarkers(parsedMarkers);
      } catch (error) {
        console.error("Erro ao buscar os dados da API:", error);
      }
    };

    fetchMarkers();
  }, []);

  useEffect(() => {
    const svgElement = svgRef.current;
    if (!svgElement) return;

    const svg = d3.select(svgElement);
    svg.selectAll("*").remove();

    const g = svg.append("g");

    const fetchMap = async () => {
      try {
        const topojsonData = (await d3.json(topojsonFile)) as Topology;
        if (!topojsonData.objects || Object.keys(topojsonData.objects).length === 0) {
          throw new Error("O arquivo TopoJSON não contém objetos válidos.");
        }

        const geojsonData = topojson.feature(
          topojsonData,
          topojsonData.objects[Object.keys(topojsonData.objects)[0]]
        );

        const width = 1200;
        const height = 600;
        const projection = d3.geoMercator().fitSize([width, height], geojsonData);
        const pathGenerator = d3.geoPath().projection(projection);

        g.selectAll("path")
          .data((geojsonData as any).features)
          .enter()
          .append("path")
          .attr("d", (d: any) => pathGenerator(d) || "")
          .attr("fill", "lightgrey")
          .attr("stroke", "white")
          .attr("stroke-width", 0.5);

        
        // Renderizar marcadores com cores baseadas na categoria
        g.selectAll(".marker")
          .data(markers)
          .enter()
          .append("circle")
          .attr("class", "marker")
          .attr("cx", (d: any) => {
            const projected = projection([d.longitude, d.latitude]);
            return projected ? projected[0] : null;
          })
          .attr("cy", (d: any) => {
            const projected = projection([d.longitude, d.latitude]);
            return projected ? projected[1] : null;
          })
          .attr("r", 5)
          .attr("fill", (d: Marker) => {
            const categoriaInfo = categoriaIcones.find(
              (item) => item.categoria === d.categoria
            );
            return categoriaInfo ? categoriaInfo.cor : "#000000"; // Preto para categorias não definidas
          })
          .attr("stroke", "#fff")
          .attr("stroke-width", 1)
          .on("mouseover", function (_event, d) {
            const projected = projection([d.longitude, d.latitude]);
            if (projected) {
              setHoveredPosition({
                x: projected[0], // Posição horizontal para exibir a caixa
                y: projected[1], // Posição vertical para exibir a caixa
              });
              setActiveMarker(d); // Definir o marcador ativo ao passar o mouse
            }
          });
         

        // Configuração do zoom
        const zoom = d3.zoom<SVGSVGElement, unknown>()
          .scaleExtent([1, 8])
          .translateExtent([
            [0, 0],
            [width, height],
          ])
          .on("zoom", (event) => {
            g.attr("transform", event.transform);
          });

        svg.call(zoom);
      } catch (error) {
        console.error("Erro ao carregar o arquivo TopoJSON:", error);
      }
    };

    fetchMap();
  }, [topojsonFile, markers]);

  const handleClose = () => {
    setActiveMarker(null); // Fechar o box ao clicar no botão de fechar
  };

  return (
    <Box width="100%" alignItems="center" >
      <svg
        ref={svgRef}
        width="100%"
        height={700}
        style={{ border: "1px solid black" }}
      ></svg>

{hoveredPosition && activeMarker && (
        <Box
        border="1px solid black"
        width="350px"
        position="fixed"
        top="10%"  // Ajuste a posição conforme necessário
        right="5px"
        bg="white"
        p={3}
        borderRadius="10px"
        boxShadow="0px 4px 10px rgba(0, 0, 0, 0.2)"
        zIndex={999}
        transform="none"  
        >
           <Box  padding="5px" display="flex" justifyContent="space-between" alignItems="center">
          {categoriaIcones.map((row) => {
              if (row.categoria === activeMarker.categoria) {
                return (
                  <Box
                    key={row.categoria}
                    //position="fixed"
                    padding='10px'
                    left="10px"
                    display="flex"
                                     
                  >
                     <Image width="50px"
                   height="50px" src={row.icone} alt={row.categoria}  title={(row.categoria).split(':')[1]}/>
                  </Box>
                );
              }
              return null;
            })}
            <Button
            onClick={handleClose}
            //color='red'
            size="lg"
            width="40px"
            height="40px"
            borderRadius="12px"
            fontSize='25px'
            fontWeight='bold'
            cursor='pointer'
            transition="background 0.3s ease-in-out"
            _hover={{ bg: "lightgrey" }}
              >  X </Button>

          </Box>
          <Text ml='10px' fontWeight="bold">{activeMarker.titulo.length > 100 
    ? `${activeMarker.titulo.substring(0, 100)}...` 
    : activeMarker.titulo}</Text>
          <Text ml='10px' fontWeight="bold">STATUS: {(activeMarker.status).split('-')[1]}</Text>

          <Box>
          <Img 
          border='1px solid lightgrey' 
          ml='10px' 
          width="95%"   
          borderRadius='10px'
          src={activeMarker.thumbnail ? activeMarker.thumbnail : not_found}  alt="" />
          </Box>
         
         <Barra percentual_etapa={Number(activeMarker.percentual_etapa)} />
         <Box 
         ml='5px' 
         mb='5px'
         width='98%' 
         border='1px solid black'
        fontSize='24px'
        fontFamily='sans-serif'
        py='5px'
        textAlign='center'
        borderRadius='10px'
        bg="#393D6F" color="white"
        cursor='pointer'
        onClick={() => window.location.href = `/detalhes?${activeMarker.id}`}
         >Detalhes</Box>
         
        </Box>
      )}
      
    </Box>
  );
};

export default MapOutline;
