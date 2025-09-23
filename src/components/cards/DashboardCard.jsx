const DashboardCard = ({ children }) => {
  return (
    <div className="dashboard-card bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      {children}
    </div>
  );
};

export default DashboardCard;
