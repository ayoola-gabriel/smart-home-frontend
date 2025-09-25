import React, { useContext } from "react";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import PowerConsumption from "../components/dashboard/PowerConsumption";
import SystemStats from "../components/dashboard/SystemStats";
import VoltageChart from "../components/dashboard/VoltageChart";
import CurrentChart from "../components/dashboard/CurrentChart";
import NoDeviceMessage from "../components/NoDeviceMessage";
import Room from "../components/Room";
import { availableRooms } from "../utils/availableRooms";
import DevicesCard from "../components/cards/DevicesCard";
import DashboardCard from "../components/cards/DashboardCard";
import DeviceHeader from "../components/dashboard/DeviceHeader";
import { io } from "socket.io-client";
import MyActivity from "../components/MyActivity";
import { Squares } from "react-activity";
import DeviceOfflineMessage from "../components/cards/DeviceOffline";
import { DeviceContext } from "../DeviceContext";
import NoIDMessage from "../components/settings/NoIDMessage";
import { loadStates } from "../useFetch/loadState";
import PWAInstallPrompt from "../PWAInstallPrompt";
import "react-activity/dist/library.css";

export const ENDPOINT = "https://smart-home-backend-fy58.onrender.com";

// export const ENDPOINT = `http://127.0.0.1:5000`;

const Dashboard = () => {
  const { hardwareOnline, setHardwareOnline } = useContext(DeviceContext);
  const [toggles, setToggles] = useState({
    1: { state: false, syncing: false },
    2: { state: false, syncing: false },
    3: { state: false, syncing: false },
    4: { state: false, syncing: false },
    5: { state: false, syncing: false },
    6: { state: false, syncing: false },
    7: { state: false, syncing: false },
    8: { state: false, syncing: false },
  });

  const [socketInstance, setSocketInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [relays, setRelays] = useState({});
  const { selectedRooms, setSelectedRooms } = useContext(DeviceContext); //all

  const deviceID = localStorage.getItem("device_id") || "";

  const socket = io(`${ENDPOINT}/?device_id=${deviceID}`, {
    transports: ["websocket", "polling"],
    // query: { api_key: API_KEY }
  });

  const [hardwareData, setHardwareData] = useState({
    relay_states: [],
    measurements: {
      voltage: 0,
      current: 0,
      power: 0,
      status: "Waiting",
      frequency: 0,
      temperature: 0,
    },
  });

  const devices = selectedRooms.map((roomName, index) => {
    const room = availableRooms.find((r) => r.name === roomName);
    return {
      id: index + 1,
      name: room.name,
      icon: room.icon,
      status: false, //adjust for live status update
      syncing: false,
    };
  });

  const handleToggle = (name, checked) => {
    const updates = { [name]: checked };

    // Update UI optimistically
    setRelays((prev) => ({ ...prev, ...updates }));

    setToggles((prev) => ({
      ...prev,
      [name]: { state: checked, syncing: true },
    }));
    socket.emit("toggle_update", {
      device_id: deviceID,
      updates: { [name]: checked },
    });
  };

  useEffect(()=>{
    loadStates({
      ENDPOINT,
      deviceID,
      setRelays,
      setSelectedRooms,
      setToggles,
      setLoading,
    });
  },[hardwareOnline])

  useEffect(() => {
    //listen for incoming messages from server
    setSocketInstance(socket);
    setLoading(true);

    socket.on("connected_message", () => {
      setLoading(false);
      setCurrentTime(new Date());
    });

    socket.on("hardware_online", () => {
      setHardwareOnline(true);
    });

    let timeoutId;
    socket.on("hardware_update", (data) => {
      setHardwareOnline(true);
      setHardwareData(data);
      setCurrentTime(new Date());
      // console.log(data)

      const timestamp = new Date().toLocaleTimeString();

      let voltage_history = JSON.parse(
        localStorage.getItem("voltage-history") || "[]"
      );
      let current_history = JSON.parse(
        localStorage.getItem("current-history") || "[]"
      );

      let voltage = data.measurements.voltage;
      voltage_history.push({ time: timestamp, voltage });

      if (voltage_history.length > 100) {
        voltage_history = voltage_history.slice(-100);
      }

      let current = data.measurements.current;
      current_history.push({ time: timestamp, current });

      if (current_history.length > 100) {
        current_history = current_history.slice(-100);
      }

      // Save back to localStorage
      localStorage.setItem("voltage-history", JSON.stringify(voltage_history));
      localStorage.setItem("current-history", JSON.stringify(current_history));

      if (timeoutId) clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        setHardwareOnline(false);
      }, 20000);
    });

    socket.on("toggle_ack_update", (data) => {
      const updatedKey = Object.keys(data.updates)[0];
      const updatedValue = data.updates[updatedKey];

      setRelays((prev) => ({ ...prev, ...data.updates }));

      setToggles((prev) => ({
        ...prev,
        [updatedKey]: {
          state: updatedValue,
          syncing: false,
        },
      }));
    });

    return () => {
      socket.off("connected_message");
      socket.off("hardware_online");
      socket.off("hardware_update");
      socket.off("toggle_ack_update");
      socket.off("toggle_update");
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const loadMeasurements = (type) => {
    return JSON.parse(localStorage.getItem(`${type}`) || "[]");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {loading ? (
        <MyActivity />
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Header
            hardwareStatus={hardwareOnline}
            lastUpdated={currentTime.toLocaleTimeString()}
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* <!-- Device Controls --> */}
            <div className="lg:col-span-2 mb-6">
              <DashboardCard>
                <DeviceHeader
                  active={hardwareOnline ? selectedRooms.length : "0"}
                  all={8}
                />
                {hardwareOnline ? (
                  deviceID == "" ? (
                    <NoIDMessage />
                  ) : selectedRooms.length === 0 ? (
                    <NoDeviceMessage />
                  ) : (
                    <DevicesCard>
                      {devices.map((d) => (
                        <li key={d.id}>
                          <Room
                            roomID={d.id}
                            icon={d.icon}
                            name={d.name}
                            check={relays[d.id]}
                            disable={toggles[d.id].syncing}
                            status={
                              toggles[d.id].syncing ? (
                                <Squares />
                              ) : toggles[d.id].state ? (
                                "ON"
                              ) : (
                                "OFF"
                              )
                            }
                            onChangeFn={(e) =>
                              handleToggle(d.id, e.target.checked)
                            }
                          />
                        </li>
                      ))}
                    </DevicesCard>
                  )
                ) : (
                  <DeviceOfflineMessage  />
                )}
              </DashboardCard>
            </div>

            {/* System stats */}
            <div className="space-y-6">
              <PowerConsumption
                current={hardwareData.measurements.current}
                total_power={hardwareData.measurements.power}
              />

              <SystemStats
                voltage={hardwareData.measurements.voltage}
                frequency={hardwareData.measurements.frequency}
                temperature={hardwareData.measurements.temperature}
                total_power={hardwareData.measurements.total_power}
                current={hardwareData.measurements.current}
              />
            </div>
          </div>

          {/* <!-- Charts Section --> */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <CurrentChart data={loadMeasurements("current-history")} />
            <VoltageChart data={loadMeasurements("voltage-history")} />
          </div>
          <PWAInstallPrompt />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
