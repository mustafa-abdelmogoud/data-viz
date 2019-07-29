import React, { useEffect, useRef } from "react";
import { arc, select } from "d3";

export default function Face() {
  const width = 400,
    height = 500;

  const leftEyeRef = useRef(null);
  const RightEyeRef = useRef(null);

  useEffect(() => {
    select(leftEyeRef.current)
      .transition()
      .duration(1000)
      .attr("y", height / 2 - 90)
      .transition()
      .duration(1000)
      .attr("y", height / 2 - 70);

    select(RightEyeRef.current)
      .transition()
      .duration(1000)
      .attr("y", height / 2 - 90)
      .transition()
      .duration(1000)
      .attr("y", height / 2 - 70);
  }, []);

  return (
    <svg width={width} height={height}>
      <circle cx={width / 2} cy={height / 2} r="150" fill="yellow" />
      <circle cx={width / 2 - 70} cy={height / 2 - 30} r="20" />
      <rect
        ref={leftEyeRef}
        width="40"
        height="10"
        x={width / 2 - 90}
        y={height / 2 - 70}
      />
      <circle cx={width / 2 + 70} cy={height / 2 - 30} r="20" />
      <rect
        ref={RightEyeRef}
        width="40"
        height="10"
        x={width / 2 + 50}
        y={height / 2 - 70}
      />

      <path
        d={arc()({
          innerRadius: 70,
          outerRadius: 80,
          startAngle: Math.PI / 2,
          endAngle: (Math.PI * 3) / 2
        })}
        transform={`translate(${width / 2}, ${height / 2 + 30})`}
      />
    </svg>
  );
}
