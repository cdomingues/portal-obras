import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import { Topology } from "topojson-specification";
import { Box, Button, Text, Image } from "@chakra-ui/react";
import { categoriaIcones } from "../../utils/categorias";
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
            const [latitude, longitude] = obra.latitude_longitude.split(",").map((coord: string) => parseFloat(coord.trim()));
            return {
              localidade: obra.local,
              latitude,
              longitude,
              categoria: obra.categoria,
              titulo: obra.titulo,
              status: obra.status,
              thumbnail: obra.thumbnail,
              percentual_etapa: obra.percentual_etapa,
              id: obra.id
            };
          })
          .filter((marker: Marker) => !isNaN(marker.latitude) && !isNaN(marker.longitude));

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

    const width = 1200;
    const height = 600;

    const svg = d3.select(svgElement);
    svg.selectAll("*").remove();

    // Definir fundo do SVG
    svg.style("background-color", "#f0f0f0");

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

        const projection = d3.geoMercator().fitSize([width, height], geojsonData);
        const pathGenerator = d3.geoPath().projection(projection);

        // Adiciona caminhos do mapa
        g.selectAll("path")
          .data((geojsonData as any).features)
          .enter()
          .append("path")
          .attr("d", (d: any) => pathGenerator(d) || "")
          .attr("fill", "grey")
          .attr("stroke", "white")
          .attr("stroke-width", 0.5);

        // Adiciona marcadores
        g.selectAll(".marker")
          .data(markers)
          .enter()
          .append("circle")
          .attr("class", "marker")
          .attr("cx", (d: any) => projection([d.longitude, d.latitude])?.[0] ?? null)
          .attr("cy", (d: any) => projection([d.longitude, d.latitude])?.[1] ?? null)
          .attr("r", 5)
          .attr("fill", (d: Marker) => {
            const categoriaInfo = categoriaIcones.find((item) => item.categoria === d.categoria);
            return categoriaInfo ? categoriaInfo.cor : "#000000";
          })
          .attr("stroke", "#fff")
          .attr("stroke-width", 1)
          .on("mouseover", (_event, d) => setActiveMarker(d));

        // Configuração do zoom
        const zoom = d3.zoom<SVGSVGElement, unknown>()
          .scaleExtent([1, 8])
          .translateExtent([[0, 0], [width, height]])
          .on("zoom", (event) => g.attr("transform", event.transform));

        svg.call(zoom);
      } catch (error) {
        console.error("Erro ao carregar o arquivo TopoJSON:", error);
      }
    };

    fetchMap();
  }, [topojsonFile, markers]);

  return (
    <Box width="100%" display="flex" flexDirection="column" alignItems="center" bg="#E5E7EB" p={4}>
      <Text pb="30px" fontSize="40px" fontWeight="bold" textAlign="center" mb={4}>
        Mapa de Obras - Mogi das Cruzes
      </Text>

      <Box width="100%" maxW="1200px" height="700px" overflow="hidden" borderRadius="12px" boxShadow="lg">
        <svg ref={svgRef} width="100%" height="100%"></svg>
      </Box>

      {activeMarker && (
        <Box
          position="fixed"
          top="10%"
          right="5px"
          width="350px"
          bg="white"
          p={3}
          borderRadius="10px"
          boxShadow="0px 4px 10px rgba(0, 0, 0, 0.2)"
          zIndex={999}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center">
            {categoriaIcones.map((row) =>
              row.categoria === activeMarker.categoria ? (
                <Image key={row.categoria} width="50px" height="50px" src={row.icone} alt={row.categoria} title={row.categoria.split(":")[1]} />
              ) : null
            )}
            <Button onClick={() => setActiveMarker(null)} size="lg" width="40px" height="40px" borderRadius="12px" fontSize="25px" fontWeight="bold" _hover={{ bg: "lightgrey" }}>
              X
            </Button>
          </Box>

          <Text ml="10px" fontWeight="bold">
            {activeMarker.titulo.length > 100 ? `${activeMarker.titulo.substring(0, 100)}...` : activeMarker.titulo}
          </Text>
          <Text ml="10px" fontWeight="bold">STATUS: {activeMarker.status.split("-")[1]}</Text>

          <Box>
            <Image border="1px solid lightgrey" ml="10px" width="95%" borderRadius="10px" src={activeMarker.thumbnail || not_found} alt="" />
          </Box>

          <Barra percentual_etapa={Number(activeMarker.percentual_etapa)} />

          <Box
            ml="5px"
            mb="5px"
            width="98%"
            border="1px solid black"
            fontSize="24px"
            fontFamily="sans-serif"
            py="5px"
            textAlign="center"
            borderRadius="10px"
            bg="#393D6F"
            color="white"
            cursor="pointer"
            onClick={() => window.location.href = `/detalhes?${activeMarker.id}`}
          >
            Detalhes
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default MapOutline;
