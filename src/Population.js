import React, { useEffect, useState, useRef } from "react";
import {
  axisBottom,
  axisLeft,
  scaleBand,
  scaleLinear,
  csv,
  max,
  select,
  format
} from "d3";

/**
 * data used in this chart from https://esa.un.org/unpd/wpp/Download/Standard/Population/
 */

function BarChart({ data, width, height }) {
  const marginLeft = 80,
    marginBottom = 50,
    marginRight = 100,
    barWidth = width / (data.length * 2);

  const xAxisRef = useRef(null);
  const yAxisRef = useRef(null);

  const xScale = scaleBand()
    .domain(data.map(d => d.country))
    .range([0, width - marginRight]);

  const yScale = scaleLinear()
    .domain([0, max(data, d => d.population)])
    .range([height - marginBottom, 0]);

  useEffect(() => {
    const xAxis = axisBottom(xScale);
    const yAxis = axisLeft(yScale)
      .tickFormat(format(".2s"))
      .tickSize(-width - marginLeft);

    select(xAxisRef.current)
      .call(xAxis)
      .selectAll(".domain, .tick line")
      .remove();

    select(yAxisRef.current)
      .call(yAxis)
      .select(".domain")
      .remove();
  }, [xScale, yScale, width]);

  return (
    <>
      <g
        style={{ fontSize: "15" }}
        ref={xAxisRef}
        transform={`translate(${marginLeft}, ${height - marginBottom})`}
      />
      <g
        style={{ fontSize: "20" }}
        ref={yAxisRef}
        transform={`translate(${marginLeft}, ${0})`}
      />
      {data.map(d => (
        <rect
          key={d.country}
          x={xScale(d.country) + xScale.bandwidth()}
          y={yScale(d.population) - marginBottom}
          width={barWidth}
          height={height - yScale(d.population)}
          fill="steelblue"
        />
      ))}
    </>
  );
}

export default function Population() {
  const width = 800,
    height = 600;

  const [data, setData] = useState(null);

  useEffect(() => {
    async function getData() {
      csv("/northen-africa-population.tsv", ({ country, population }) => ({
        country,
        population: Number(population)
      })).then(data => setData(data));
    }

    getData();
  }, []);

  return (
    <svg width={width} height={height}>
      {data && <BarChart data={data} width={width} height={height} />}
    </svg>
  );
}
