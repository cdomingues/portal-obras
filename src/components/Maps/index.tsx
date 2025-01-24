import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import { Topology } from "topojson-specification";
import { renderToString } from "react-dom/server";
import { FaMapMarkerAlt } from "react-icons/fa";
import saude from "../../assets/images/iconos/salud.svg"
import tea from '../../assets/images/ESCOLA_AUTISTA01.png'
import { Box } from "@chakra-ui/react";

interface MapOutlineProps {
  topojsonFile: string; // Arquivo TopoJSON dos bairros
}

const MapOutline: React.FC<MapOutlineProps> = ({ topojsonFile }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  const [activeMarker, setActiveMarker] = useState<{
    x: number;
    y: number;
    localidade: string;
  } | null>(null);

  const activeIconHTML = renderToString(
    <FaMapMarkerAlt fontSize={10} color="rgb(35, 5, 132)" />
  );

  useEffect(() => {
    const svgElement = svgRef.current;

    if (!svgElement) return;

    const svg = d3.select(svgElement);
    svg.selectAll("*").remove();

    const g = svg.append("g"); // Grupo para suportar zoom

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

        // Renderizar os bairros
        g.selectAll("path")
          .data((geojsonData as any).features)
          .enter()
          .append("path")
          .attr("d", (d: any) => pathGenerator(d) || "")
          .attr("fill", "lightgrey")
          .attr("stroke", "white")
          .attr("stroke-width", 0.5);

        // Adicionar marcadores com activeIcon
        const markers = [
          { localidade: "Local 1", longitude: -46.2005685, latitude: -23.5155994 },
          { localidade: "Local 2", longitude: -46.1795000, latitude: -23.5165000 },
          { localidade: "Local 3", longitude: -46.2500000, latitude: -23.5170000 },
        ];

        g.selectAll(".marker")
          .data(markers)
          .enter()
          .append("foreignObject")
          .attr("class", "marker")
          .attr("x", (d: any) => {
            const projected = projection([d.longitude, d.latitude]);
            return projected ? projected[0] - 15 : null; // Ajusta para centralizar
          })
          .attr("y", (d: any) => {
            const projected = projection([d.longitude, d.latitude]);
            return projected ? projected[1] - 30 : null; // Ajusta para centralizar
          })
          .attr("width", 30) // Largura do ícone
          .attr("height", 30) // Altura do ícone
          .html(activeIconHTML)
          .on("mouseover", function (event, d) {
            const projected = projection([d.longitude, d.latitude]);
            if (projected) {
              setActiveMarker({
                x: projected[0],
                y: projected[1],
                localidade: d.localidade,
              });
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
  }, [topojsonFile, activeIconHTML]);

  return (
    <Box width='100vw' style={{ position: "relative" }}
    
    >
      <svg
        ref={svgRef}
        width={1200}
        height={600}
        style={{ border: "1px solid black" }}
      ></svg>
      {activeMarker && (
        <div
        
          style={{
            position: "absolute",
            top: "10%",
            left: `${activeMarker.x + 20}px`,
            //top: `${activeMarker.y}px`,
            background: "white",
            border: "1px solid black",
            borderRadius: "5px",
            padding: "10px",
            boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
            zIndex: 1000,
            width: "20vw",
            height:"450px ",
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', fontFamily: 'Arial, sans-serif' }}>
      {/* Alinhamento do SVG e texto */}
      <div style={{ display: 'flex', alignItems: 'center', alignContent: 'center' }}>
        <img src={saude} alt="" width="60px" />
        <div style={{color: '#7874B2', fontWeight: "bold", fontSize:"25px", marginLeft: '10px', marginTop: '5px'}}>Saúde</div>
      </div>
      {/* Texto de descrição */}
      <p style={{ color: '#000', fontSize: '14px', fontFamily: "sans-serif" }}>Escola Clinica do Espectro Autista - TEA</p>
    </div>
    <div style={{display: 'flex', justifyContent:'center', paddingBottom:'15px'}}><img   src={tea} alt="" width="90%"/></div>
    <div><div
      style={{
        display: 'flex',
        alignItems: 'center',

        
        justifyContent: 'center',
        width: '300px', // Largura da barra
        height: '40px', // Altura da barra
        backgroundColor: '#d3d3d3', // Cor cinza
        borderRadius: '8px', // Bordas arredondadas
        fontFamily: 'Arial, sans-serif',
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#333', // Cor do texto
        margin: '0 auto', // Centralizar horizontalmente
      }}
    >
      Finalizada: 100%
    </div></div>
          
          {/* <p>{activeMarker.localidade}</p> */}
          <p>Bairro: Jardim Rodeio</p>
          <p>Secretaria Responsável: SMS</p>
          <button>Saiba Mais</button>
          

          <button onClick={() => setActiveMarker(null)} style={{
      position: 'absolute',
      top: '10px',
      right: '10px',
      margin: 0,
      padding: '5px 10px',
      backgroundColor: '#f0f0f0',
      border: '1px solid #ccc',
      borderRadius: '5px',
      cursor: 'pointer',
    }}>
            X
          </button>
        </div>
      )}
    </Box>
  );
};

export default MapOutline;
