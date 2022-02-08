import React from 'react'
import { useRive } from 'rive-react';

function LoadingBubble() {

  const { RiveComponent } = useRive({
    src: 'chunky_bounce.riv',
    autoplay: true,
    width: 500
  });


  // This example is using a state machine with a trigger input.
  return <RiveComponent style={{ height: 700}} />;
}

export default LoadingBubble