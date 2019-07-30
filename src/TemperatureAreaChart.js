import React, { useState, useEffect, useRef } from "react";
import {
  csv,
  scaleTime,
  scaleLinear,
  extent,
  axisBottom,
  axisLeft,
  select,
  area,
  curveBasis
} from "d3";

function AreaChart({ data, width, height }) {
  const margin = { top: 50, right: 50, bottom: 50, left: 60 },
    innerWidth = width - margin.right - margin.left,
    innerHeight = height - margin.top - margin.bottom;

  const xAxisRef = useRef(null);
  const yAxisRef = useRef(null);

  const xScale = scaleTime()
    .domain(extent(data, d => new Date(d.timestamp)))
    .range([0, innerWidth]);

  const yScale = scaleLinear()
    .domain(extent(data, d => d.temperature))
    .range([innerHeight, 0])
    .nice();

  const areaGenerator = area()
    .x(d => xScale(new Date(d.timestamp)))
    .y0(innerHeight)
    .y1(d => yScale(d.temperature))
    .curve(curveBasis);

  useEffect(() => {
    const xAxis = axisBottom(xScale)
      .ticks(6)
      .tickPadding(15);

    const yAxis = axisLeft(yScale).tickPadding(10);

    select(xAxisRef.current).call(xAxis);

    select(yAxisRef.current).call(yAxis);
  }, [xScale, yScale, innerWidth, innerHeight]);

  return (
    <g transform={`translate(${margin.left}, ${margin.top})`}>
      <g
        style={{ fontSize: "15" }}
        ref={xAxisRef}
        transform={`translate(${0}, ${innerHeight})`}
      />
      <g style={{ fontSize: "20" }} ref={yAxisRef} />

      <path
        style={{
          fill: "maroon"
        }}
        d={areaGenerator(data)}
      />
    </g>
  );
}

export default function TemperatureAreaChart() {
  const width = 800,
    height = 600;

  const [data, setData] = useState(null);

  useEffect(() => {
    async function getData() {
      csv(
        "https://vizhub.com/curran/datasets/temperature-in-san-francisco.csv",
        ({ timestamp, temperature }) => ({
          timestamp,
          temperature: +temperature
        })
      ).then(data => setData(data));
    }

    getData();
  }, []);

  return (
    <svg width={width} height={height}>
      {data && <AreaChart data={data} width={width} height={height} />}
    </svg>
  );
}
