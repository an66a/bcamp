import React, { useState } from 'react';
import { Button, Overlay } from 'react-native-elements';

const OverlayComp = () => {
 

  return (
    
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <Text>Hello from Overlay!</Text>
      </Overlay>
    
  );
};
export default OverlayComp