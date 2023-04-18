import React from 'react'

function HighestPacketCount(data) {
    let highestPacketCount=0;
    for(const key in data.cells){
        const packets=data.cells[key].packets
        if(packets.dl_rx_count>highestPacketCount){
            highestPacketCount=packets.dl_rx_count
        }
        if(packets.dl_err_count>highestPacketCount){
            highestPacketCount=packets.dl_err_count
        }
        if(packets.ul_tx_count>highestPacketCount){
            highestPacketCount=packets.ul_tx_count
        }
        if(packets.ul_retx_count>highestPacketCount){
            highestPacketCount=packets.ul_retx_count
        }
        if(packets.dl_retx_count>highestPacketCount){
            highestPacketCount=packets.dl_retx_count
        }
    }

  return highestPacketCount+highestPacketCount*0.10
}

export default HighestPacketCount