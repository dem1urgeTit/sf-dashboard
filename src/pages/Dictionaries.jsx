import {
  Button,
  Card,
  Col,
  DatePicker,
  Input,
  Row,
  Select,
  Space,
  Table,
  Tag,
} from "antd";

import { useMemo, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import locale from "antd/es/date-picker/locale/ru_RU";

const { RangePicker } = DatePicker;

export default function Dictionaries() {
  const initialData = [
    {
      key: 1,
      id: "PR-00123",
      date: "11.02.2026",
      contractor: 'ООО "Ромашка"',
      amount: "10 000,00",
      status: "Активен",
      responsible: "Иванов И.И.",
    },
    {
      key: 2,
      id: "PR-00122",
      date: "11.02.2026",
      contractor: 'ООО "Василек"',
      amount: "45 000,00",
      status: "Активен",
      responsible: "Петров П.П.",
    },
    {
      key: 3,
      id: "PR-00121",
      date: "10.02.2026",
      contractor: 'АО "Тюльпан"',
      amount: "120 000,00",
      status: "Архив",
      responsible: "Сидоров А.А.",
    },
    {
      key: 4,
      id: "PR-00120",
      date: "10.02.2026",
      contractor: 'ООО "Лотос"',
      amount: "35 000,00",
      status: "Ошибка",
      responsible: "Иванов И.И.",
    },
  ];

  const [search, setSearch] = useState("");
  const [contractorFilter, setContractorFilter] = useState("Все");
  const [statusFilter, setStatusFilter] = useState("Все");
  const [employeeFilter, setEmployeeFilter] = useState("Все");

  const filteredData = useMemo(() => {
    return initialData.filter((item) => {
      const matchSearch =
        item.id.toLowerCase().includes(search.toLowerCase()) ||
        item.contractor.toLowerCase().includes(search.toLowerCase());

      const matchContractor =
        contractorFilter === "Все" ||
        item.contractor === contractorFilter;

      const matchStatus =
        statusFilter === "Все" ||
        item.status === statusFilter;

      const matchEmployee =
        employeeFilter === "Все" ||
        item.responsible === employeeFilter;

      return (
        matchSearch &&
        matchContractor &&
        matchStatus &&
        matchEmployee
      );
    });
  }, [
    search,
    contractorFilter,
    statusFilter,
    employeeFilter,
  ]);

  const columns = [
    {
      title: "ID проекта",
      dataIndex: "id",
      render: (text) => (
        <a href="#">{text}</a>
      ),
    },
    {
      title: "Дата создания",
      dataIndex: "date",
    },
    {
      title: "Контрагент",
      dataIndex: "contractor",
    },
    {
      title: "Сумма, ₽",
      dataIndex: "amount",
    },
    {
      title: "Статус",
      dataIndex: "status",
      render: (status) => {
        let color = "green";

        if (status === "Архив") color = "default";
        if (status === "Ошибка") color = "red";

        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Ответственный",
      dataIndex: "responsible",
    },
    {
      title: "Действия",
      render: () => (
        <Space>
          <Button size="small">Открыть</Button>
          <Button size="small">Изменить</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 24,
        }}
      >
        <h1 style={{ margin: 0 }}>Справочники</h1>

        <Button type="primary" icon={<PlusOutlined />}>
          Создать проект
        </Button>
      </div>

      <Card style={{ marginBottom: 24 }}>
        <Row gutter={[16, 16]}>
          <Col span={5}>
            <div style={{ marginBottom: 8 }}>
              Дата создания
            </div>

            <RangePicker
              locale={locale}
              style={{ width: "100%" }}
              format="DD.MM.YYYY"
            />
          </Col>

          <Col span={5}>
            <div style={{ marginBottom: 8 }}>
              Контрагент
            </div>

            <Select
              style={{ width: "100%" }}
              value={contractorFilter}
              onChange={setContractorFilter}
              options={[
                { value: "Все", label: "Все" },
                {
                  value: 'ООО "Ромашка"',
                  label: 'ООО "Ромашка"',
                },
                {
                  value: 'ООО "Василек"',
                  label: 'ООО "Василек"',
                },
                {
                  value: 'АО "Тюльпан"',
                  label: 'АО "Тюльпан"',
                },
              ]}
            />
          </Col>

          <Col span={4}>
            <div style={{ marginBottom: 8 }}>
              Статус
            </div>

            <Select
              style={{ width: "100%" }}
              value={statusFilter}
              onChange={setStatusFilter}
              options={[
                { value: "Все", label: "Все" },
                { value: "Активен", label: "Активен" },
                { value: "Архив", label: "Архив" },
                { value: "Ошибка", label: "Ошибка" },
              ]}
            />
          </Col>

          <Col span={4}>
            <div style={{ marginBottom: 8 }}>
              Ответственный
            </div>

            <Select
              style={{ width: "100%" }}
              value={employeeFilter}
              onChange={setEmployeeFilter}
              options={[
                { value: "Все", label: "Все" },
                {
                  value: "Иванов И.И.",
                  label: "Иванов И.И.",
                },
                {
                  value: "Петров П.П.",
                  label: "Петров П.П.",
                },
                {
                  value: "Сидоров А.А.",
                  label: "Сидоров А.А.",
                },
              ]}
            />
          </Col>

          <Col span={4}>
            <div style={{ marginBottom: 8 }}>Поиск</div>

            <Input
              placeholder="Поиск по номеру или контрагенту"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Col>

          <Col
            span={2}
            style={{
              display: "flex",
              alignItems: "end",
            }}
          >
            <Button type="primary" block>
              Применить
            </Button>
          </Col>
        </Row>
      </Card>

      <Card>
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{
            pageSize: 10,
            showSizeChanger: false,
            locale: {
              items_per_page: "на странице",
            },
          }}
        />
      </Card>
    </div>
  );
}