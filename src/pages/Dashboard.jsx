import KpiCards from "../components/KpiCards";
import Charts from "../components/Charts";
import SfTable from "../components/SfTable";
import UploadLog from "../components/UploadLog";
import Notifications from "../components/Notifications";

export default function Dashboard() {
  return (
    <div className="dashboard">

      {/* KPI */}
      <KpiCards />

      {/* Charts */}
      <Charts />

      {/* Bottom */}
      <div className="bottom-section">

        <div className="table-block">
          <SfTable />
        </div>

        <div className="side-blocks">
          <UploadLog />
          <Notifications />
        </div>

      </div>

    </div>
  );
}