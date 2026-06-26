import { useState, useEffect } from "react";
import {
  Table,
  Card,
  Input,
  Select,
  DatePicker,
  Button,
  Space,
  Tag,
  Alert,
  Spin,
} from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { getDrafts } from "../api/client";

const { RangePicker } = DatePicker;

const STATUS_MAP = {
  0: { label: "Новый", color: "blue" },
  1: { label: "Подтверждён", color: "green" },
  2: { label: "Отклонён", color: "red" },
};

export default function Registry() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getDrafts(200, 0);
      const mapped = (result || []).map((item, i) => ({
        key: i,
        transactionDate: item.transactionDate
          ? new Date(item.transactionDate).toLocaleDateString("ru-RU")
          : "—",
        ndsRate: `${(item.ndsRate * 100).toFixed(0)}%`,
        totalWithNds: item.totalWithNds,
        totalNdsAmount: item.totalNdsAmount,
        totalWithoutNds: item.totalWithoutNds,
        status: item.status,
        createdAt: item.createdAt
          ? new Date(item.createdAt).toLocaleDateString("ru-RU")
          : "—",
      }));
      setData(mapped);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = data.filter((item) => {
    const matchStatus = status === null || status === undefined
      ? true
      : item.status === status;
    return matchStatus;
  });

  const columns = [
    {
      title: "Дата операции",
      dataIndex: "transactionDate",
      sorter: (a, b) =>
        new Date(a.transactionDate) - new Date(b.transactionDate),
    },
    {
      title: "Сумма с НДС",
      dataIndex: "totalWithNds",
      render: (val) => `${val.toLocaleString("ru-RU")} ₽`,
      sorter: (a, b) => a.totalWithNds - b.totalWithNds,
    },
    {
      title: "Сумма без НДС",
      dataIndex: "totalWithoutNds",
      render: (val) => `${val.toLocaleString("ru-RU")} ₽`,
    },
    {
      title: "Сумма НДС",
      dataIndex: "totalNdsAmount",
      render: (val) => `${val.toLocaleString("ru-RU")} ₽`,
    },
    {
      title: "Ставка НДС",
      dataIndex: "ndsRate",
    },
    {
      title: "Дата создания",
      dataIndex: "createdAt",
    },
    {
      title: "Статус",
      dataIndex: "status",
      render: (s) => {
        const { label, color } = STATUS_MAP[s] || {
          label: s,
          color: "default",
        };
        return <Tag color={color}>{label}</Tag>;
      },
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Card style={{ marginBottom: 16 }}>
        <Space wrap>
          <Select
            placeholder="Статус"
            allowClear
            value={status}
            onChange={setStatus}
            style={{ width: 180 }}
            options={[
              { value: 0, label: "Новый" },
              { value: 1, label: "Подтверждён" },
              { value: 2, label: "Отклонён" },
            ]}
          />
          <RangePicker />
          <Button
            onClick={() => setStatus(null)}
          >
            Сбросить
          </Button>
          <Button
            icon={<ReloadOutlined />}
            onClick={fetchData}
            loading={loading}
          >
            Обновить
          </Button>
        </Space>
      </Card>

      {error && (
        <Alert
          message={`Ошибка загрузки: ${error}`}
          type="error"
          showIcon
          style={{ marginBottom: 16 }}
          action={
            <Button size="small" onClick={fetchData}>
              Повторить
            </Button>
          }
        />
      )}

      <Card title="Реестр счетов-фактур">
        <Spin spinning={loading}>
          <Table
            columns={columns}
            dataSource={filteredData}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              pageSizeOptions: ["5", "10", "20", "50"],
              showTotal: (total) => `Всего записей: ${total}`,
            }}
          />
        </Spin>
      </Card>
    </div>
  );
}
