const SelectedRoomsList = ({icon, name, removeFn}) => {
  return (
    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
      <div className="flex items-center space-x-3">
        <span className="text-xl">{icon}</span>
        <span className="font-medium text-gray-900">{name}</span>
      </div>
      <button
        className="text-red-600 hover:text-red-800 transition-colors"
        onClick={removeFn}
      >
        ✕
      </button>
    </div>
  );
};

export default SelectedRoomsList;
