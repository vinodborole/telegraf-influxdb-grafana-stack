import React, { useState, useEffect } from "react";
import {
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryScatter,
  VictoryLegend,
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
      cell.dl.push({
        x: time,
        y:cell.throughput.dl_bitrate +Math.floor(Math.random() * 100000000) + 1,
      });
      cell.ul.push({
        x: time,
        y: cell.throughput.ul_bitrate + Math.floor(Math.random() * 10000000) + 1,
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
            grid: {
              stroke: "#D0D2D1",
              strokeWidth: chartStyles.gridStoleWidth,
            },
            axis: { stroke: isDarkTheme ? "white" : "black" },
          }}
        />
        <VictoryAxis
          dependentAxis
          label="Throughput"
          tickFormat={BitrateConverter}
          style={{
            axisLabel: {
              fontSize: chartStyles.tickLabelsFontSize,
              padding: 27,
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
              data={dataSet.dl}
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
                  `Cell#${dataSet.id}_dl:${datum.y.toFixed(2)}`
                }
                size={({ active }) => (active ? 5 : 3)}
                data={dataSet.dl}
                labelComponent={<VictoryTooltip />}
              />
            )}

            <VictoryLine
              data={dataSet.ul}
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
                data={dataSet.ul}
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
                name: `Cell#${dataSet.id}_dl_bitrate`,
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
                name: `Cell#${dataSet.id}_ul_bitrate`,
                symbol: { fill: color_ul[i], size: 2 },
              },
            ]}
          />
        </div>
      ))}
    </div>
  );
}

export default ThroughPutGraph;
