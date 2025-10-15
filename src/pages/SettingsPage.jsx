import SettingsHeader from "../components/settings/SettingsHeader";
import DashboardCard from "../components/cards/DashboardCard";
import ConfigHeader from "../components/settings/ConfigHeader";
import { useState, useContext } from "react";
import { availableRooms } from "../utils/availableRooms";
import { DeviceContext } from "../components/DeviceContext";
import SelectedRoomsList from "../components/settings/SelectedRoomsList";
import DeviceOfflineMessage from "../components/DeviceOffline";
import { Spinner } from "react-activity";
import { CheckCheck } from "lucide-react";
import Alert from "../components/Alert";
import { ENDPOINT } from "./Dashboard";
import "react-activity/dist/library.css";

const SettingsPage = () => {
  const { selectedRooms, setSelectedRooms } = useContext(DeviceContext);
  const { hardwareOnline } = useContext(DeviceContext);
  const [roomToAdd, setRoomToAdd] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { deviceID, setDeviceID } = useContext(DeviceContext);
  const {username, setUsername} = useContext(DeviceContext);
  const [showAlert, setShowAlert] = useState(false);

  const device_id = localStorage.getItem("device_id");

  const handleAddRoom = () => {
    if (
      roomToAdd &&
      !selectedRooms.includes(roomToAdd) &&
      selectedRooms.length < 8
    ) {
      setSelectedRooms((prev) => [...prev, roomToAdd]);
      setRoomToAdd(""); // Reset select
    }
  };

  const handleSaveID = () => {
    if(username) {
      localStorage.setItem("username", username.split(' ')[0])
    }

    if (deviceID.trim()) {
      localStorage.setItem("device_id", deviceID.trim());
    }

    if(username || deviceID) {
      setShowAlert(true);
    }
  };

  return (
    <div>
      <div id="settingsPage" className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SettingsHeader />

          <div className="space-y-8">
            {/* <!-- Home ID Section --> */}
            <DashboardCard>
              <ConfigHeader />
              <div className="flex items-end space-x-4">
                <div className="flex-1">
                  <label
                    htmlFor="NameId"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Enter Your Name
                  </label>
                  <input
                    type="text"
                    id="NameId"
                    placeholder="Enter your Name"
                    className="w-full mb-5 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <label
                    htmlFor="homeId"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Enter Your Smarthome ID
                  </label>
                  <input
                    type="text"
                    id="homeId"
                    placeholder="Enter your Smart Home ID (e.g., SH-2024-001)"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    onChange={(e) => setDeviceID(e.target.value)}
                  />
                </div>
                <button
                  id="saveHomeId"
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors font-medium"
                  onClick={handleSaveID}
                >
                  Save
                </button>
              </div>
              {showAlert && (
                <Alert
                  message="Saved Successfully"
                  type="success"
                  onClose={() => setShowAlert(false)}
                />
              )}
            </DashboardCard>

            {/* <!-- Room Configuration --> */}
            <div className="dashboard-card bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🏘️</span>
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Room Configuration
                  </h2>
                  <p className="text-gray-600">
                    Select up to 8 rooms to monitor and control
                  </p>
                </div>
              </div>
              {hardwareOnline ? (
                <>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* <!-- Add Room Section --> */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Add Room
                      </h3>
                      <div className="flex space-x-3 mb-4">
                        <select
                          id="roomSelect"
                          value={roomToAdd}
                          onChange={(e) => setRoomToAdd(e.target.value)}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        >
                          <option value="">Select a room...</option>
                          {availableRooms
                            .filter(
                              (room) => !selectedRooms.includes(room.name)
                            )
                            .map((room) => (
                              <option key={room.name} value={room.name}>
                                {room.icon} {room.name}
                              </option>
                            ))}
                        </select>
                        <button
                          onClick={handleAddRoom}
                          disabled={
                            !roomToAdd ||
                            selectedRooms.includes(roomToAdd) ||
                            selectedRooms.length >= 8
                          }
                          id="addRoomBtn"
                          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                          Add
                        </button>
                      </div>
                      <p className="text-sm text-gray-500" id="roomCount">
                        {selectedRooms.length}/8 rooms selected
                      </p>
                    </div>

                    {/* <!-- Selected Rooms --> */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Selected Rooms
                      </h3>
                      <div
                        id="selectedRoomsList"
                        className="space-y-2 max-h-64 overflow-y-auto"
                      >
                        {selectedRooms.length === 0 ? (
                          <div
                            id="noRoomsMessage"
                            className="text-center py-8 text-gray-500"
                          >
                            <div className="text-4xl mb-2">🏠</div>
                            <p>No rooms selected</p>
                          </div>
                        ) : (
                          <ul>
                            {selectedRooms.map((roomName) => {
                              const room = availableRooms.find(
                                (r) => r.name === roomName
                              );
                              return (
                                <li key={roomName}>
                                  <SelectedRoomsList
                                    icon={room.icon}
                                    name={room.name}
                                    removeFn={() =>
                                      setSelectedRooms(
                                        selectedRooms.filter(
                                          (name) => name !== roomName
                                        )
                                      )
                                    }
                                  />
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex justify-evenly items-center">
                      <button
                        className="px-9 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors font-medium"
                        onClick={async () => {
                          setLoading(true);
                          setShowAlert(true);
                          try {
                            await fetch(`${ENDPOINT}/save-rooms/${device_id}`, {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({
                                rooms: selectedRooms,
                                device_id: device_id,
                              }),
                            });
                            // Optionally show a success message or handle response
                            setSuccess(true);
                          } catch (error) {
                            // Optionally handle error
                            console.error("Failed to save rooms:", error);
                            setSuccess(false);
                          } finally {
                            setLoading(false);
                          }
                        }}
                      >
                        {loading ? (
                          <Spinner />
                        ) : success ? (
                          <>
                            <span className="me-2">Saved</span>
                            <CheckCheck />
                          </>
                        ) : (
                          "Save"
                        )}
                      </button>
                      <button
                        className="px-9 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors font-medium"
                        onClick={() =>
                          setSelectedRooms([
                            "Living Room",
                            "Bedroom",
                            "Dining Room",
                            "Security",
                          ])
                        }
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <DeviceOfflineMessage />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
