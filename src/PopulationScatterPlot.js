import React, { useState, useEffect, useRef } from "react";
import {
  csv,
  scaleBand,
  scaleLinear,
  extent,
  format,
  axisBottom,
  axisLeft,
  select
} from "d3";

function ScatterPlot({ data, width, height }) {
  const margin = { top: 50, right: 50, bottom: 50, left: 60 },
    innerWidth = width - margin.right - margin.left,
    innerHeight = height - margin.top - margin.bottom;

  const xAxisRef = useRef(null);
  const yAxisRef = useRef(null);

  const xScale = scaleLinear()
    .domain(extent(data, d => d.horsepower))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(data, d => d.weight))
    .range([innerHeight, 0])
    .nice();

  useEffect(() => {
    const xAxis = axisBottom(xScale)
      .tickSize(-innerHeight)
      .tickPadding(15);

    const yAxis = axisLeft(yScale)
      .tickSize(-innerWidth)
      .tickPadding(10);

    select(xAxisRef.current)
      .call(xAxis)
      .select(".domain")
      .remove();

    select(yAxisRef.current)
      .call(yAxis)
      .select(".domain")
      .remove();
  }, [xScale, yScale, innerWidth, innerHeight]);

  return (
    <g transform={`translate(${margin.left}, ${margin.top})`}>
      <g
        style={{ fontSize: "15" }}
        ref={xAxisRef}
        transform={`translate(${0}, ${innerHeight})`}
      />
      <g style={{ fontSize: "20" }} ref={yAxisRef} />

      {data.map(d => (
        <circle
          style={{ fill: "#e83a3a", opacity: ".5" }}
          r="10"
          cx={xScale(d.horsepower)}
          cy={yScale(d.weight)}
        />
      ))}
    </g>
  );
}

export default function PopulationScatterPlot() {
  const width = 800,
    height = 600;

  const [data, setData] = useState(null);

  useEffect(() => {
    async function getData() {
      csv(
        "https://vizhub.com/curran/datasets/auto-mpg.csv",
        ({
          mpg,
          cylinders,
          displacement,
          horsepower,
          weight,
          acceleration,
          year
        }) => ({
          mpg: +mpg,
          cylinders: +cylinders,
          displacement: +displacement,
          horsepower: +horsepower,
          weight: +weight,
          acceleration: +acceleration,
          year: +year
        })
      ).then(data => setData(data));
    }

    getData();
  }, []);

  return (
    <svg width={width} height={height}>
      {data && <ScatterPlot data={data} width={width} height={height} />}
    </svg>
  );
}
