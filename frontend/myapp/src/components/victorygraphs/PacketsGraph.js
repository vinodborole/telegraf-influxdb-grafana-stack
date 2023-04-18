import {
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryScatter,
  VictoryGroup,
  VictoryTheme,
  VictoryArea,
  VictoryLegend,
  VictoryVoronoiContainer,
  VictoryTooltip,
  VictoryZoomContainer,
} from "victory";

import React, { useState, useEffect } from "react";
import data from "./data/Packets.json";
import HighestPacketCount from "./helpers/HighestPacketCount";
import {
  XaxisProps,
  YaxisProps,
  chartProps,
  victorygroupstyle,
  color_dl,
  color_ul,
  color_err,
  chartStyles,
} from "./helpers/chartstyle";


const cellData = Object.entries(data.cells).map(([id, cell]) => ({
  id: parseInt(id),
  dl_rx: [],
  dl_err: [],
  ul_tx: [],
  ul_retx: [],
  dl_retx: [],
  packets: {
    dl_rx_count: cell.packets.dl_rx_count,
    dl_err_count: cell.packets.dl_err_count,
    ul_tx_count: cell.packets.ul_tx_count,
    ul_retx_count: cell.packets.ul_retx_count,
    dl_retx_count: cell.packets.dl_retx_count,
  },
}));




function PacketsGraph({ isDarkTheme }) {
  const [zoomaxis, setZoomaxis] = useState("null");
  const [checkboxX, setCheckboxX] = useState(false);
  const [checkboxY, setCheckboxY] = useState(false);

  const now = Date.now();

  for (let i = 0; i < 20; i++) {
    const timestamp = now - (20 - i) * 1000;
    const time = new Date(timestamp);
    cellData.forEach((cell) => {
      cell.dl_rx.push({
        x: time,
        y: cell.packets.dl_rx_count+Math.random(0,3),

      });
      cell.dl_err.push({
        x: time,
        y: cell.packets.dl_err_count+Math.random(0,3),
      });
      cell.ul_tx.push({
        x: time,
        y: cell.packets.ul_tx_count+Math.random(0,3),
      });
      cell.ul_retx.push({
        x: time,
        y: cell.packets.ul_retx_count+Math.random(0,3),
      });
      cell.dl_retx.push({
        x: time,
        y: cell.packets.dl_retx_count+Math.random(0,3),
      });
    });
  }



  const HandleCheckboxX = () => {
    setCheckboxX(!checkboxX);
  };
  const HandleCheckboxY = () => {
    setCheckboxY(!checkboxY);
  };


  useEffect(() => {
    if (checkboxX && checkboxY) {
      setZoomaxis("");
    } else if (checkboxX) {
      setZoomaxis("x");
    } else if (checkboxY) {
      setZoomaxis("y");
    } else {
      setZoomaxis("null");
    }
  }, [checkboxX, checkboxY]);

  return (
    <div>
      <label className="float-right text-black dark:text-white">
        x:
        <input type="checkbox" checked={checkboxX} onChange={HandleCheckboxX} />
        y:
        <input type="checkbox" checked={checkboxY} onChange={HandleCheckboxY} />
      </label>
      <VictoryChart
        {...chartProps}
        //maxDomain={{ y: HighestPacketCount(data) }}
        containerComponent={<VictoryZoomContainer zoomDimension={zoomaxis} />}
        containerComponent={<VictoryVoronoiContainer labels={({ datum }) => `${datum.x}`}/>}
      >
        <VictoryAxis
          tickFormat={XaxisProps.tickFormat}
          style={{
            tickLabels: {
              fontSize: chartStyles.tickLabelsFontSize,
              padding: chartStyles.tickLabelsPadding,
              fill: isDarkTheme ? "white" : "black",
            },
            grid: {
              stroke: "#D0D2D1",
              strokeWidth: chartStyles.gridStoleWidth,
            },
            axis: { stroke: isDarkTheme ? "white" : "black" },
          }}
        />
        <VictoryAxis
          dependentAxis
          label="No .of Packets"
          
          style={{
            axisLabel:{
              fontSize:chartStyles.tickLabelsFontSize,
              padding:10,
              fill: isDarkTheme ? "white" : "black",},
            tickLabels: {
              fontSize: chartStyles.tickLabelsFontSize,
              padding: chartStyles.tickLabelsPadding,
              fill: isDarkTheme ? "white" : "black",
            },
            grid: {
              stroke: "#D0D2D1",
              strokeWidth: chartStyles.gridStoleWidth,
            },
            axis: { stroke: isDarkTheme ? "white" : "black" },
          }}
        />
        {cellData.map((dataSet, i) => (
          <VictoryGroup key={i} style={victorygroupstyle}>
            <VictoryArea
              data={dataSet.dl_rx}
              style={{ data: { fill: color_dl[i], stroke: color_dl[i] } }}
              
            />
            
            <VictoryArea
              data={dataSet.dl_retx}
              style={{ data: { fill: color_dl[i], stroke: color_dl[i] } }}
            />
            <VictoryArea
              data={dataSet.dl_err}
              style={{ data: { fill: color_err[i], stroke: color_err[i] } }}
            />
            <VictoryArea
              data={dataSet.ul_tx}
              style={{ data: { fill: color_ul[i], stroke: color_ul[i] } }}
            />
            <VictoryArea
              data={dataSet.ul_retx}
              style={{ data: { fill: color_ul[i], stroke: color_ul[i] } }}
            />
          </VictoryGroup>
        ))}
        
      </VictoryChart>
    </div>
  );
}

export default PacketsGraph;
