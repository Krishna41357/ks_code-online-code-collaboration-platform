import React from 'react'
import { io } from 'socket.io-client'

const SIGNALING_SERVER_URL = process.env.REACT_APP_SIGNALING_URL || 'http://localhost:4000';

const ICE_SERVERS = [
  { urls: 'stun:stun.l.google.com:19302' },
  { urls: 'stun:stun1.l.google.com:19302' }
]; // using google provided free stun servers

const VideoRoom = (roomId , userId , enableAudio = true , enableVideo = true) => {
    const pc = new RTCPeerConnection();


  return (
    <div>
      
    </div>
  )
}

export default VideoRoom
