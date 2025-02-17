import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import { Topology } from "topojson-specification";
import {Image, Box , Button, Text} from "@chakra-ui/react";
import { categoriaIcones } from "../../utils/categorias"; // Importando a lista de categorias

interface MapOutlineProps {
  topojsonFile: string;
}

interface Marker {
  status: string;
  titulo: string;
  localidade: string;
  longitude: number;
  latitude: number;
  categoria: string;
}

const MapOutline: React.FC<MapOutlineProps> = ({ topojsonFile }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [activeMarker, setActiveMarker] = useState<Marker | null>(null);
  const [hoveredPosition, setHoveredPosition] = useState<{ x: number, y: number } | null>(null);


  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const response = await fetch(
          "https://dadosadm.mogidascruzes.sp.gov.br/api/listaobras/"
        );
        const data = await response.json();

        const parsedMarkers = data
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
    <Box width="100vw" alignItems="center">
      <svg
        ref={svgRef}
        width="100%"
        height={600}
        style={{ border: "1px solid black" }}
      ></svg>

{hoveredPosition && activeMarker && (
        <Box
          border='1px solid black'
           width='350px'
          position="absolute"
          top="50%"
          right="5px"
          bg="white"
          p={3}
          borderRadius="10px"
          boxShadow="15px"
          zIndex={999}
          transform="translate(-50%, -100%)"
        >
          <Text fontWeight="bold">{activeMarker.titulo}</Text>
          <Text>Status: {activeMarker.status}</Text>
          <Box>
          {categoriaIcones.map((row) => {
              if (row.categoria === activeMarker.categoria) {
                return (
                  <Box
                    key={row.categoria}
                    position="absolute"
                    top="10px"
                    left="10px"
                    display="flex"
                    alignItems="center"
                    
                    
                  >
                     <Image width="40px"
                   height="40px" src={row.icone} alt={row.categoria}  title={(row.categoria).split(':')[1]}/>
                  </Box>
                );
              }
              return null;
            })}
 <Button
            onClick={handleClose}
            colorScheme="red"
            size="sm"
            position="absolute"
            top="10px"  // Distância do topo
            right="10px"  // Distância da borda direita
            p={0}
            width="20px"
            height="20px"
            borderRadius="50%"
          >
            X
            </Button>

          </Box>
         
        </Box>
      )}
    </Box>
  );
};

export default MapOutline;
