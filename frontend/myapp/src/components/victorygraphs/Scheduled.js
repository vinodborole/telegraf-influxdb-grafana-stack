import React, { useState, useEffect } from "react";
import data from "./data/Scheduled.json";
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
import {
  XaxisProps,
  YaxisProps,
  chartProps,
  victorygroupstyle,
  color_dl,
  color_ul,
  chartStyles,
} from "./helpers/chartstyle";

const cellData = Object.entries(data.cells).map(([id, cell]) => ({
  id: parseInt(id),
  dl_sched_users_avg: [],
  ul_sched_users_avg: [],
  schedule: {
    dl_sched_users_avg: cell.schedule.dl_sched_users_avg,
    ul_sched_users_avg: cell.schedule.ul_sched_users_avg,
  },
}));

function Scheduled({ isDarkTheme }) {
  const [zoomaxis, setZoomaxis] = useState("null");
  const [checkboxX, setCheckboxX] = useState(false);
  const [checkboxY, setCheckboxY] = useState(false);

  const now = Date.now();
  for (let i = 0; i < 20; i++) {
    const timestamp = now - (20 - i) * 1000;
    const time = new Date(timestamp);
    cellData.forEach((cell) => {
      cell.dl_sched_users_avg.push({
        x: time,
        y: cell.schedule.dl_sched_users_avg + Math.random(0.1, 0.3),
      });
      cell.ul_sched_users_avg.push({
        x: time,
        y: cell.schedule.ul_sched_users_avg + Math.random(0.1, 0.3),
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
            grid: {
              stroke: "#D0D2D1",
              strokeWidth: chartStyles.gridStoleWidth,
            },
            axis: { stroke: isDarkTheme ? "white" : "black" },
          }}
        />
        <VictoryAxis
          dependentAxis
          label="UE/TTI"
          style={{
            axisLabel: {
              fontSize: chartStyles.tickLabelsFontSize,
              padding: 10,
              fill: isDarkTheme ? "white" : "black",
            },
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
              data={dataSet.dl_sched_users_avg}
              style={{ data: { fill: color_dl[i], stroke: color_dl[i] } }}
            />
            <VictoryArea
              data={dataSet.ul_sched_users_avg}
              style={{ data: { fill: color_ul[i], stroke: color_ul[i] } }}
            />
          </VictoryGroup>
        ))}
      </VictoryChart>
    </div>
  );
}

export default Scheduled;
