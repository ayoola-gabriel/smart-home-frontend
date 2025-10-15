import React, { createContext, useState } from "react";

// Create context
export const DeviceContext = createContext();

// Create provider component
export const DeviceProvider = ({ children }) => {
  const [hardwareOnline, setHardwareOnline] = useState(false);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [deviceID, setDeviceID] = useState('')
  const [username, setUsername] = useState('')

  return (
    <DeviceContext.Provider value={{ 
      hardwareOnline, 
      setHardwareOnline,
      selectedRooms,
      setSelectedRooms,
      deviceID,
      setDeviceID,
      username,
      setUsername,
       }}>
      {children}
    </DeviceContext.Provider>
  );
};
