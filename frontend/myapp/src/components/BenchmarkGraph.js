import React, { useEffect, useState } from "react";
import { getGrafanaSourceSnapshot } from "./BenchmarkSources";
import { getGrafanaGraphSnapshot } from "./BenchmarkSources";
import BenchmarkGraphHeader from "./BenchmarkGraphHeader";
import "../index.css";
import "./scrollbar.css";
import "./panel.css";
import ThroughPutGraph from "./victorygraphs/ThroughPutGraph";
import PacketsGraph from "./victorygraphs/PacketsGraph";
import Scheduled from "./victorygraphs/Scheduled";

const timeRanges = {
  "Last 5 minutes": "now-5m",
  "Last 10 minutes": "now-10m",
  "Last 30 minutes": "now-30m",
  "Last 1 hour": "now-1h",
  "Last 3 hours": "now-3h",
  "Last 6 hours": "now-6h",
  "Last 12 hours": "now-12h",
  "Last 24 hours": "now-24h",
  "Last 2 days": "now-2d",
  "Last 7 days": "now-7d",
};

const refreshRanges = {
  "5s": "5s",
  "10s": "10s",
  "30s": "30s",
  "1m": "1m",
  "2m": "2m",
  "5m": "5m",
  "10m": "10m",
  "30m": "30m",
  "1h": "1h",
  "3h": "3h",
  "1d": "1d",
};

const BenchmarkGraph = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [timeRange, setTimeRange] = useState("Last 5 minutes");
  const [fromDate, setFromDate] = useState("now-5m");
  const [toDate, setToDate] = useState("now");
  const [refreshTime, setRefreshTime] = useState("1m");

  const grafanaSources = getGrafanaSourceSnapshot();
  const sourcesToShow = Object.values(grafanaSources);

  const grafanaGraphs = getGrafanaGraphSnapshot();
  const graphsToShow = Object.values(grafanaGraphs);

  const itemsToShow = [...sourcesToShow, ...graphsToShow];

  function datetimeLocaltoUnix(datetime) {
    if (datetime.startsWith("now")) {
      return datetime;
    }
    const dateObj = new Date(Date.parse(datetime));
    const unixTimestamp = Math.floor(dateObj.getTime());
    return unixTimestamp;
  }

  useEffect(() => {
    setFromDate(timeRanges[timeRange]);
    setRefreshTime(refreshRanges[refreshTime]);
  }, [timeRange, refreshTime]);

  itemsToShow.forEach((source) => {
    const url = new URL(source.src);
    url.searchParams.set("theme", isDarkTheme ? "dark" : "light");
    url.searchParams.set("from", datetimeLocaltoUnix(fromDate));
    url.searchParams.set("to", datetimeLocaltoUnix(toDate));
    url.searchParams.set("refresh", refreshTime);
    source.src = url.toString();
  });

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    const body = document.querySelector("body");
    body.classList.toggle("dark", !isDarkTheme);
  };
  const handleFromDateChange = (event) => {
    setFromDate(event.target.value);
  };
  const handleToDateChange = (event) => {
    setToDate(event.target.value);
  };
  const handleTimeRangeChange = (event) => {
    setTimeRange(event.target.value);
  };
  const handleRefreshRangeChange = (event) => {
    setRefreshTime(event.target.value);
  };

  return (
    <div class="bg-gray-200 dark:bg-dark-teal overflow-x-hidden flex-auto w-auto">
      <BenchmarkGraphHeader
        isDarkTheme={isDarkTheme}
        toggleTheme={toggleTheme}
      />

      <div className="relative overflow-hidden p-4 w-100%" >
        <div className=" shadow-md border-2 p-4 border-gray-400 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-800 ">
          <ThroughPutGraph isDarkTheme={isDarkTheme} />
        </div>
      </div>
      <div className="relative pb-56.25 overflow-hidden p-4 w-100%">
        <div className=" shadow-md border-2 p-4 border-gray-400 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-800 ">
          <Scheduled isDarkTheme={isDarkTheme} />
        </div>
      </div>

      <div className="relative pb-56.25 overflow-hidden p-4 w-100%">
        <div className="shadow-md border-2 p-4 border-gray-400 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-800 ">
          <PacketsGraph isDarkTheme={isDarkTheme} />
        </div>
      </div>
    </div>
  );
};

export default BenchmarkGraph;
