import React, { useState, useEffect, useRef } from "react";
import {
  csv,
  scaleTime,
  scaleLinear,
  extent,
  axisBottom,
  axisLeft,
  select,
  line
} from "d3";

function LineChart({ data, width, height }) {
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
    .range([innerHeight, 0]);

  const lineGenerator = line()
    .x(d => xScale(new Date(d.timestamp)))
    .y(d => yScale(d.temperature));

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
          fill: "none",
          stroke: "black",
          strokeWidth: "2",
          strokeLinejoin: "round"
        }}
        d={lineGenerator(data)}
      />
    </g>
  );
}

export default function TemperatureLineChart() {
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
    <svg
      style={{ marginTop: "100px", marginBottom: "100px" }}
      width={width}
      height={height}
    >
      {data && <LineChart data={data} width={width} height={height} />}
    </svg>
  );
}
