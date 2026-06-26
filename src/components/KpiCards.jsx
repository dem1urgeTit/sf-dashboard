import { Card, Statistic } from "antd";

export default function KpiCards() {
  return (
    <div className="kpi-row">

      <Card>
        <Statistic title="Обработано проводок" value={60000} />
      </Card>

      <Card>
        <Statistic title="Ожидают проверки" value={85} />
      </Card>

      <Card>
        <Statistic title="Ошибки обработки" value={3} />
      </Card>

      <Card>
        <Statistic title="Передано в учетную систему" value={980} />
      </Card>

    </div>
  );
}

