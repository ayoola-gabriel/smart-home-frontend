export const loadStates = async ({
  ENDPOINT,
  deviceID,
  setRelays,
  setSelectedRooms,
  setToggles,
  setLoading,
}) => {
  try {
    const res = await fetch(`${ENDPOINT}/get-relay-states/${deviceID}`);
    const data = await res.json();

    if ("error" in data) {
      return;
    }

    setRelays(data.relay_states);

    const roomsArray = data?.rooms_saved?.split(",");
    if (roomsArray) {
      setSelectedRooms(roomsArray);
    } else {
      console.error("Failed to get rooms");
    }

    // Update toggles based on relay states
    setToggles((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((key) => {
        updated[key] = {
          ...updated[key],
          state: data.relay_states[key] || false, // fallback to false if not provided
        };
      });
      return updated;
    });
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};
