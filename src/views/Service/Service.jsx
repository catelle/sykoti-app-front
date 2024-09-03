import React from 'react'

import animationData from '../../Lotties/deux_homme_assis_derriere_des_micros_face_a_face_comme_enregistre_podcast.json';
import Lottie from 'react-lottie-player';
import styled from 'styled-components';
import { LottiePlayer } from 'lottie-react';
import { Player } from '@lottiefiles/react-lottie-player';

const Service = () => {

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: { animationData },
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"

    }
  };



  return (

    <div style={{ width: "60%" }}>
      
      <Player  src={animationData} 
      loop
      autoplay
      speed={1}/>

    </div>

  )
}

export default Service;