import React, { useState } from "react";

function BitrateConverter(bitrate) {
  let formattedBitrate = "";
  let unit = "";
  if (bitrate >= 1000000000) {
    formattedBitrate = (bitrate / 1000000000).toFixed(2);
    unit = "Gbps";
  } else if (bitrate >= 1000000) {
    formattedBitrate = (bitrate / 1000000).toFixed(1);
    unit = "Mbps";
  } else if (bitrate >= 1024) {
    formattedBitrate = (bitrate / 1024).toFixed(1);
    unit = "Kpbs";
  } else {
    formattedBitrate = bitrate.toFixed(2);
    unit = "bps";
  }
  return `${formattedBitrate} ${unit}`;
}

export default BitrateConverter;

  
  