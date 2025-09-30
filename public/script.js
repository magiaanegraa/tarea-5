import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import datos from "./data.json" with { type: "json" };

const svg = d3.select("#grafico");
const width = +svg.attr("width");
const height = +svg.attr("height");
const tooltip = d3.select("#tooltip");


const r = d3.scaleSqrt()
  .domain([0, d3.max(datos, d => d.valor)])
  .range([0, 60]);


const posiciones = [
  { x: 120, y: 150 },
  { x: 240, y: 150 },
  { x: 360, y: 150 },
  { x: 480, y: 150 }
];


svg.selectAll("circle")
  .data(datos)
  .join("circle")
  .attr("cx", (_, i) => posiciones[i].x)
  .attr("cy", (_, i) => posiciones[i].y)
  .attr("r", d => r(d.valor))
  .attr("fill", d => d.color)
  .on("mouseenter", (e, d) => {
    tooltip.style("opacity", 1)
      .style("left", (e.pageX + 10) + "px")
      .style("top", (e.pageY - 20) + "px")
      .html(`<strong>${d.nombre}</strong><br>${d.valor} muertes/resurrecciones`);
  })
  .on("mousemove", (e) => {
    tooltip.style("left", (e.pageX + 10) + "px")
           .style("top", (e.pageY - 20) + "px");
  })
  .on("mouseleave", () => tooltip.style("opacity", 0));


svg.selectAll("text")
  .data(datos)
  .join("text")
  .attr("x", (_, i) => posiciones[i].x)
  .attr("y", (_, i) => posiciones[i].y + r(datos[i].valor) + 20)
  .attr("text-anchor", "middle")
  .text(d => d.nombre);
