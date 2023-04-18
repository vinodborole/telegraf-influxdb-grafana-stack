import React, { useState,useEffect } from "react";
import {
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryScatter,
  VictoryGroup,
  VictoryTheme,
  VictoryArea,
  VictoryVoronoiContainer,
  VictoryTooltip,
  VictoryZoomContainer,
} from "victory";
import data from "./data/ThroughPut.json";
import BitrateConverter from "./helpers/BitrateConverter";
import HighestBitrate from "./helpers/HighestBitrate";
import {
  chartStyles,
  chartProps,
  XaxisProps,
  YaxisProps,
  victorygroupstyle,
  color_dl,
  color_ul,
} from "./helpers/chartstyle";

const cellData = Object.entries(data.cells).map(([id, cell]) => ({
  id: parseInt(id),
  dl: [],
  ul: [],
  throughput: {
    dl_bitrate: cell.throughput.dl_bitrate,
    ul_bitrate: cell.throughput.ul_bitrate,
  },
}));

function ThroughPutGraph({ isDarkTheme }) {
  const [zoomaxis, setZoomaxis] = useState("null");
  const [checkboxX, setCheckboxX] = useState(false);
  const [checkboxY, setCheckboxY] = useState(false);

  const now = Date.now();

  for (let i = 0; i < 20; i++) {
    const timestamp = now - (20 - i) * 1000;
    const time = new Date(timestamp);
    cellData.forEach((cell) => {
      cell.dl.push({
        x: time,
        y: cell.throughput.dl_bitrate+Math.floor(Math.random()*100000000)+1,

        label: `cell#${cell.id}-dl:${BitrateConverter(
          cell.throughput.dl_bitrate
        )}`,
      });
      cell.ul.push({
        x: time,
        y: cell.throughput.ul_bitrate+Math.floor(Math.random()*10000000)+1,

        label: `cell#${cell.id}-ul:${BitrateConverter(
          cell.throughput.ul_bitrate
        )}`,
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
        maxDomain={{ y: HighestBitrate(data) }}
        containerComponent={<VictoryZoomContainer zoomDimension={zoomaxis} />}
      >
        <VictoryAxis
          tickFormat={XaxisProps.tickFormat}
          style={{
            tickLabels: {
              fontSize: chartStyles.tickLabelsFontSize,
              padding: chartStyles.tickLabelsPadding,
              fill: isDarkTheme ? "white" : "black",
            },
            grid:{
              stroke:"#D0D2D1",
              strokeWidth:chartStyles.gridStoleWidth
            },
            axis:{stroke:isDarkTheme ? "white":"black"}

          }}
        />
        <VictoryAxis
          dependentAxis
          label="Throughput"
          tickFormat={BitrateConverter}
          style={{
            axisLabel:{
              fontSize:chartStyles.tickLabelsFontSize,
              padding:27,
              fill: isDarkTheme ? "white" : "black",},
            tickLabels: {
              fontSize: chartStyles.tickLabelsFontSize,
              padding: chartStyles.tickLabelsPadding,
              fill: isDarkTheme ? "white" : "black",
            },
            grid:{
              stroke:"#D0D2D1",
              strokeWidth:chartStyles.gridStoleWidth
            },
            axis:{stroke:isDarkTheme ? "white":"black"}
          }}
        />

        {cellData.map((dataSet, i) => (
          <VictoryGroup key={i} style={victorygroupstyle}>
            <VictoryArea
              data={dataSet.dl}
              label={({ datum }) => `${datum.label}`}
              style={{ data: { fill: color_dl[i], stroke: color_dl[i] } }}
              labelComponent={
                <VictoryTooltip flyoutStyle={{ stroke: color_dl[i] }} />
              }
            />

            <VictoryArea
              data={dataSet.ul}
              label={({ datum }) => `${datum.label}`}
              style={{ data: { fill: color_ul[i], stroke: color_ul[i] } }}
              labelComponent={
                <VictoryTooltip flyoutStyle={{ stroke: color_ul[i] }} />
              }
            />
          </VictoryGroup>
        ))}
      </VictoryChart>
    </div>
  );
}

export default ThroughPutGraph;
