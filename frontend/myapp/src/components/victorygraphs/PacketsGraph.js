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
  const [visibility, setVisibility] = useState({
    dl_rx: {},
    dl_err: {},
    ul_tx: {},
    ul_retx: {},
    dl_retx: {},
  });

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
      cell.dl_rx.push({
        x: time,
        y: cell.packets.dl_rx_count + Math.random(0, 3),
      });
      cell.dl_err.push({
        x: time,
        y: cell.packets.dl_err_count + Math.random(0, 3),
      });
      cell.ul_tx.push({
        x: time,
        y: cell.packets.ul_tx_count + Math.random(0, 3),
      });
      cell.ul_retx.push({
        x: time,
        y: cell.packets.ul_retx_count + Math.random(0, 3),
      });
      cell.dl_retx.push({
        x: time,
        y: cell.packets.dl_retx_count + Math.random(0, 3),
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
              data={dataSet.dl_rx}
              style={{
                data: {
                  stroke: visibility.dl_rx[dataSet.id]
                    ? color_dl[i]
                    : "transparent",
                },
              }}
            />
            {visibility.dl_rx[dataSet.id] && (
              <VictoryScatter
                style={{
                  
                  labels: { fill: color_dl[i] },
                }}
                labels={({ datum }) =>
                  `Cell#${dataSet.id}_dl_rx:${datum.y.toFixed(2)}`
                }
                size={({ active }) => (active ? 5 : 3)}
                data={dataSet.dl_rx}
                labelComponent={<VictoryTooltip />}
              />
            )}

            <VictoryLine
              data={dataSet.dl_retx}
              style={{
                data: {
                  stroke: visibility.dl_retx[dataSet.id]
                    ? color_dl[i]
                    : "transparent",
                },
              }}
            />
            {visibility.dl_retx[dataSet.id] && (
              <VictoryScatter
                style={{
                  
                  labels: { fill: color_dl[i] },
                }}
                labels={({ datum }) =>
                  `Cell#${dataSet.id}_dl_retx:${datum.y.toFixed(2)}`
                }
                size={({ active }) => (active ? 5 : 3)}
                data={dataSet.dl_retx}
                labelComponent={<VictoryTooltip />}
              />
            )}
            <VictoryLine
              data={dataSet.dl_err}
              style={{
                data: {
                  stroke: visibility.dl_err[dataSet.id]
                    ? color_err[i]
                    : "transparent",
                },
              }}
            />
            {visibility.dl_err[dataSet.id] && (
              <VictoryScatter
                style={{
                  
                  labels: { fill: color_err[i] },
                }}
                labels={({ datum }) =>
                  `Cell#${dataSet.id}_dl_err:${datum.y.toFixed(2)}`
                }
                size={({ active }) => (active ? 5 : 3)}
                data={dataSet.dl_err}
                labelComponent={<VictoryTooltip />}
              />
            )}
            <VictoryLine
              data={dataSet.ul_tx}
              style={{
                data: {
                  stroke: visibility.ul_tx[dataSet.id]
                    ? color_ul[i]
                    : "transparent",
                },
              }}
            />
            {visibility.ul_tx[dataSet.id] && (
              <VictoryScatter
                style={{
                  
                  labels: { fill: color_ul[i] },
                }}
                labels={({ datum }) =>
                  `Cell#${dataSet.id}_ul_tx:${datum.y.toFixed(2)}`
                }
                size={({ active }) => (active ? 5 : 3)}
                data={dataSet.ul_tx}
                labelComponent={<VictoryTooltip />}
              />
            )}
            <VictoryLine
              data={dataSet.ul_retx}
              style={{
                data: {
                  stroke: visibility.ul_retx[dataSet.id]
                    ? color_ul[i]
                    : "transparent",
                },
              }}
            />
            {visibility.ul_retx[dataSet.id] && (
              <VictoryScatter
                style={{
                  
                  labels: { fill: color_ul[i] },
                }}
                labels={({ datum }) =>
                  `Cell#${dataSet.id}_ul_retx:${datum.y.toFixed(2)}`
                }
                size={({ active }) => (active ? 5 : 3)}
                data={dataSet.ul_retx}
                labelComponent={<VictoryTooltip />}
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
                    toggleVisibility(dataSet.id, "DL_RX");
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
                name: `Cell#${dataSet.id}_dl_rx_count`,
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
                    toggleVisibility(dataSet.id, "DL_ERR");
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
                name: `Cell#${dataSet.id}_dl_err_count`,
                symbol: { fill: color_err[i], size: 2 },
              },
            ]}
          />
          <VictoryLegend
            events={[
              {
                target: "data",
                eventHandlers: {
                  onClick: () => {
                    toggleVisibility(dataSet.id, "UL_TX");
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
                name: `Cell#${dataSet.id}_ul_tx_count`,
                symbol: { fill: color_ul[i], size: 2 },
              },
            ]}
          />
          <VictoryLegend
             events={[
              {
                target: "data",
                eventHandlers: {
                  onClick: () => {
                    toggleVisibility(dataSet.id, "UL_RETX");
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
                name: `Cell#${dataSet.id}_ul_retx_count`,
                symbol: { fill: color_ul[i], size: 2 },
              },
            ]}
          />
          <VictoryLegend
             events={[
              {
                target: "data",
                eventHandlers: {
                  onClick: () => {
                    toggleVisibility(dataSet.id, "DL_RETX");
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
                name: `Cell#${dataSet.id}_dl_retx_count`,
                symbol: { fill: color_dl[i], size: 2 },
              },
            ]}
          />
        </div>
      ))}
    </div>
  );
}

export default PacketsGraph;
