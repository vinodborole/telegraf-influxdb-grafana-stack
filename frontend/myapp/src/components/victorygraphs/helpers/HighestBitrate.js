import React from 'react'

function HighestBitrate(data) {
    let highestBitrate=0;
    for(const key in data.cells){
        const throughput=data.cells[key].throughput;
        if(throughput.dl_bitrate>highestBitrate){
            highestBitrate=throughput.dl_bitrate;
        }
        if(throughput.ul_bitrate>highestBitrate){
            highestBitrate=throughput.ul_bitrate;
        }
    }
  return highestBitrate+highestBitrate*0.10
}

export default HighestBitrate