import React from 'react'
import Lottie from 'lottie-react'
import anim from '../../assets/lottie/radar-pulse.json'

export default function RadarLottie(){
  return (
    <Lottie animationData={anim} style={{ width: 220, height: 220 }} loop autoplay />
  )
}

