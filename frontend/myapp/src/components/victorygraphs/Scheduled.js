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
  VictoryLegend,
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
  const [visibility, setVisibility] = useState({ dl: {}, ul: {} });



  const toggleVisibility = (cellId, graphType) => {
    setVisibility((prevVisibleData) => {
      const graphVisibleData = prevVisibleData[graphType.toLowerCase()];
      return {
        ...prevVisibleData,
        [graphType.toLowerCase()]: {
          ...graphVisibleData,
          [cellId]: !graphVisibleData[cellId],
        },
      };
    });
    console.log(visibility);
  };

  useEffect(() => {
    setVisibility((prevVisibility) => {
      const updatedVisibility = {};
      Object.keys(prevVisibility).forEach((lineType) => {
        updatedVisibility[lineType] = {};
        Object.keys(data.cells).forEach((cellId) => {
          updatedVisibility[lineType][cellId] = true;
        });
      });
      return updatedVisibility;
    });
  }, []);
  

  const now = Date.now();
  for (let i = 0; i < 20; i++) {
    const timestamp = now - (20 - i) * 1000;
    const time = new Date(timestamp);
    cellData.forEach((cell) => {
      cell.dl_sched_users_avg.push({
        x: time,
        y: cell.schedule.dl_sched_users_avg + Math.random(0.1, 0.3),
        name: `Cell#${cell.id}_dl`,
      });
      cell.ul_sched_users_avg.push({
        x: time,
        y: cell.schedule.ul_sched_users_avg + Math.random(0.1, 0.3),
        name: `Cell#${cell.id}_ul`,
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
            <VictoryLine
              data={dataSet.dl_sched_users_avg}
              style={{
                data: {
                  stroke: visibility.dl[dataSet.id]
                    ? color_dl[i]
                    : "transparent",
                },
              }}
            />
            {visibility.dl[dataSet.id] && (
              <VictoryScatter
                style={{
                  
                  labels: { fill: color_dl[i] },
                }}
                labels={({ datum }) =>
                  `Cell#${dataSet.id}_dl_avg:${datum.y.toFixed(2)}`
                }
                size={({ active }) => (active ? 5 : 3)}
                data={dataSet.dl_sched_users_avg}
                labelComponent={<VictoryTooltip />}
              />
            )}
            <VictoryLine
              data={dataSet.ul_sched_users_avg}
              style={{
                data: {
                  stroke: visibility.ul[dataSet.id]
                    ? color_ul[i]
                    : "transparent",
                },
              }}
            />
            {visibility.ul[dataSet.id] && (
              <VictoryScatter
                style={{
                  labels: { fill: color_ul[i] },
                }}
                size={({ active }) => (active ? 5 : 3)}
                data={dataSet.ul_sched_users_avg}
                labels={({ datum }) =>
                  `Cell#${dataSet.id}_ul_avg:${datum.y.toFixed(2)}`
                }
                labelComponent={
                  visibility.ul[dataSet.id] ? <VictoryTooltip /> : null
                }
              />
            )}
          </VictoryGroup>
        ))}
      </VictoryChart>
      {cellData.map((dataSet, i) => (
        <div key={i}>
          <VictoryLegend
            events={[
              {
                target: "data",
                eventHandlers: {
                  onClick: () => {
                    toggleVisibility(dataSet.id, "DL");
                  },
                },
              },
            ]}
            style={{
              labels: {
                fontSize: 5,
                fontWeight: "bold",
                fill: isDarkTheme ? "white" : "black",
              },
            }}
            height={10}
            data={[
              {
                name: `Cell#${dataSet.id}_dl_sched_users_avg`,
                symbol: { fill: color_dl[i], size: 2 },
              },
            ]}
          />
          <VictoryLegend
            events={[
              {
                target: "data",
                eventHandlers: {
                  onClick: () => {
                    toggleVisibility(dataSet.id, "UL");
                  },
                },
              },
            ]}
            style={{
              labels: {
                fontSize: 5,
                fontWeight: "bold",
                fill: isDarkTheme ? "white" : "black",
              },
            }}
            height={10}
            padding={{ bottom: 5 }}
            data={[
              {
                name: `Cell#${dataSet.id}_ul_sched_users_avg`,
                symbol: { fill: color_ul[i], size: 2 },
              },
            ]}
          />
        </div>
      ))}
    </div>
  );
}

export default Scheduled;
