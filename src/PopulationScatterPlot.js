import React from 'react';


function ScatterPlot({data, width, height}) {
    const margin = {top: 30, right: 50, bottom: 50, left: 70},
    innerwidth = width - margin.right - margin.left,
    innerheight = height - margin.top - margin.bottom;

    console.log(data)

    return <g></g>

}

export default function PopulationScatterPlot() {
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
        {data && <ScatterPlot data={data} width={width} height={height} />}
      </svg>
    );