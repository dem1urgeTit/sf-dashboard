import { Table, Card, Tag, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { projectsData } from "../mockData";

export default function ProjectsSF() {
  const navigate = useNavigate();

  const columns = [
    { title: "ID проекта", dataIndex: "projectId" },
    { title: "Период", dataIndex: "period" },
    {
      title: "Проводок",
      dataIndex: "records",
      render: (val) => val.toLocaleString("ru-RU")
    },
    {
      title: "Статус",
      dataIndex: "status",
      render: (status) => (
        <Tag
          color={
            status === "Готов" ? "green" : status === "Ошибка" ? "red" : "orange"
          }
        >
          {status}
        </Tag>
      )
    },
    {
      title: "Действия",
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => navigate(`/edit-project/${record.key}`)}
        >
          Редактировать
        </Button>
      )
    }
  ];

  return (
    <div style={{ padding: 24 }}>
      <Card title="Проекты счетов-фактур">
        <Table
          columns={columns}
          dataSource={projectsData}
          pagination={{ pageSize: 8 }}
        />
      </Card>
    </div>
  );
}
