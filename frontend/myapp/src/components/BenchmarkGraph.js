import React, { useEffect, useState } from "react";
import { getGrafanaSourceSnapshot } from "./BenchmarkSources";

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

const BenchmarkGraph = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [timeRange, setTimeRange] = useState("Last 5 minutes");
  const [fromDate, setFromDate] = useState("now-5m");
  const [toDate, setToDate] = useState("now");

 

  const grafanaSources = getGrafanaSourceSnapshot();
  const sourcesToShow = Object.values(grafanaSources);

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
  }, [timeRange]);

  sourcesToShow.forEach((source) => {
    const url = new URL(source.src);
    url.searchParams.set("theme", isDarkTheme ? "dark" : "light");
    url.searchParams.set("from", datetimeLocaltoUnix(fromDate));
    url.searchParams.set("to", datetimeLocaltoUnix(toDate));
    source.src = url.toString();
  });

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
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

  return (
    <div>
      <h2>Grafana Dashboard</h2>
      <button onClick={toggleTheme}>
        {isDarkTheme ? "Switch to Light Theme" : "Switch to Dark Theme"}
      </button>

      <div>
        <label htmlFor="from-date">From:</label>
        <input id="from-date" type="datetime-local" name="from-date" value={fromDate} onChange={handleFromDateChange}/>
        <label htmlFor="to-date">To:</label>
        <input id="to-date" type="datetime-local" name="to-date" value={toDate} onChange={handleToDateChange}/>
        <label htmlFor="time-range-select">Select Time Range:</label>

        <select id="time-range-select" onChange={handleTimeRangeChange} value={timeRange}>
          {Object.keys(timeRanges).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>

        <button type="button" onClick={() => {setFromDate("now-5m");setToDate("now");}}>reset</button>
      </div>

      <div>
        {sourcesToShow.map((source) => (
          <iframe src={source.src} width="450" height="200" />
        ))}
      </div>
    </div>
  );
};

export default BenchmarkGraph;
