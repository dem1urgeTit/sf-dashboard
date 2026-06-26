import { Table, Tag, Card } from "antd";

export default function SfTable() {

  const columns = [
    {
      title: "№ СФ",
      dataIndex: "id"
    },

    {
      title: "Дата",
      dataIndex: "date"
    },

    {
      title: "Контрагент",
      dataIndex: "name"
    },

    {
      title: "Сумма",
      dataIndex: "sum"
    },

    {
      title: "Статус",
      dataIndex: "status",

      render: (status) => (
        <Tag
          color={
            status === "Подтвержден"
              ? "green"
              : status === "Ошибка"
              ? "red"
              : "orange"
          }
        >
          {status}
        </Tag>
      )
    }
  ];

  /* MOCK DATA */

  const data = Array.from({ length: 100 }).map((_, index) => ({
    key: index,

    id: `SF-${1000 + index}`,

    date: "11.05.2026",

    name: `ООО Компания ${index + 1}`,

    sum: `${(Math.random() * 100000).toFixed(0)} ₽`,

    status:
      index % 3 === 0
        ? "Подтвержден"
        : index % 3 === 1
        ? "Ошибка"
        : "Проверка"
  }));

  return (
    <Card
      title="Реестр счетов-фактур"
      className="table-card"
    >

      <Table
        columns={columns}

        dataSource={data}

        pagination={{
          pageSize: 8,

          showSizeChanger: true,

          pageSizeOptions: ["5", "8", "10", "20"],

          showTotal: (total) =>
            `Всего записей: ${total}`,

          position: ["bottomCenter"]
        }}
      />

    </Card>
  );
}