import React, { useEffect, useRef } from "react";
import { arc } from "d3";
import { TweenLite } from "gsap";

export default function Face() {
  const width = 400,
    height = 500;

  const leftEyeRef = useRef(null);
  const RightEyeRef = useRef(null);

  useEffect(() => {
    const t = TweenLite.to(leftEyeRef.current, 1, { y: -20 });
    const tTimer = setTimeout(() => t.reverse(), 500);
    const l = TweenLite.to(RightEyeRef.current, 1, { y: -20 });
    const lTimer = setTimeout(() => l.reverse(), 500);
    return () => {
      clearTimeout(tTimer);
      clearTimeout(lTimer);
    };
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
