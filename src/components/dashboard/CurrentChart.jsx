import DashboardCard from "../cards/DashboardCard";
import RenderChart from "./RenderChart";
import ChartHeader from "./ChartHeader";

const CurrentChart = ({data,title='current',unit='A'}) => {
  return (
    <DashboardCard>
    <ChartHeader title={'Current (A)'}/>
        <RenderChart
        minValue={0}
        maxValue={100}
        data={data}
        title={title}
        unit={unit}
        /> 
    </DashboardCard>
  );
};

export default CurrentChart;
