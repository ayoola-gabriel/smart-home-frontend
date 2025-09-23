import React, { createContext, useState } from "react";

// Create context
export const DeviceContext = createContext();

// Create provider component
export const DeviceProvider = ({ children }) => {
  const [hardwareOnline, setHardwareOnline] = useState(false);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [deviceID, setDeviceID] = useState('')

  return (
    <DeviceContext.Provider value={{ 
      hardwareOnline, 
      setHardwareOnline,
      selectedRooms,
      setSelectedRooms,
      deviceID,
      setDeviceID
       }}>
      {children}
    </DeviceContext.Provider>
  );
};
