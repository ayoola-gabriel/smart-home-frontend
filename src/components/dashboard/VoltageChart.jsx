import RenderChart from "./RenderChart";
import ChartHeader from "./ChartHeader";
import DashboardCard from "../cards/DashboardCard";

const VoltageChart = ({ data, title = "voltage", unit = "V" }) => {
  return (
    <DashboardCard>
      <ChartHeader title={"Voltage (V)"} />
      <RenderChart
        minValue={100}
        maxValue={400}
        data={data}
        title={title}
        unit={unit}
        color="green"
      />
    </DashboardCard>
  );
};

export default VoltageChart;
