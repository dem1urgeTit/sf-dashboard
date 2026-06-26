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
  ConfigProvider,
} from "antd";

import ruRU from "antd/locale/ru_RU";

import {
  FileTextOutlined,
  BarChartOutlined,
  PieChartOutlined,
  FileDoneOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import { useMemo, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/ru";

dayjs.locale("ru");

const { RangePicker } = DatePicker;

export default function Reports() {
  const reportsData = [
    {
      key: 1,
      name: "Реестр счетов-фактур",
      type: "Счета-фактуры",
      period: "01.02.2026 - 11.02.2026",
      format: "Excel (.xlsx)",
      created: "11.02.2026",
      status: "Готов",
      author: "Иванов И.И.",
    },
    {
      key: 2,
      name: "Ошибки обработки",
      type: "Ошибки",
      period: "01.02.2026 - 11.02.2026",
      format: "PDF (.pdf)",
      created: "10.02.2026",
      status: "Формируется",
      author: "Петров П.П.",
    },
    {
      key: 3,
      name: "Проводки по контрагентам",
      type: "Проводки",
      period: "01.02.2026 - 11.02.2026",
      format: "Excel (.xlsx)",
      created: "09.02.2026",
      status: "Готов",
      author: "Сидорова С.С.",
    },
  ];

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("Все");
  const [formatFilter, setFormatFilter] = useState("Все");
  const [statusFilter, setStatusFilter] = useState("Все");
  const [dateRange, setDateRange] = useState([]);

  const filteredData = useMemo(() => {
    return reportsData.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesType =
        typeFilter === "Все" || item.type === typeFilter;

      const matchesFormat =
        formatFilter === "Все" ||
        item.format === formatFilter;

      const matchesStatus =
        statusFilter === "Все" ||
        item.status === statusFilter;

      let matchesDate = true;

      if (dateRange?.length === 2) {
        const itemDate = dayjs(item.created, "DD.MM.YYYY");

        matchesDate =
          itemDate.isAfter(dateRange[0].startOf("day")) &&
          itemDate.isBefore(dateRange[1].endOf("day"));
      }

      return (
        matchesSearch &&
        matchesType &&
        matchesFormat &&
        matchesStatus &&
        matchesDate
      );
    });
  }, [
    reportsData,
    search,
    typeFilter,
    formatFilter,
    statusFilter,
    dateRange,
  ]);

  const columns = [
    {
      title: "Название отчёта",
      dataIndex: "name",
    },
    {
      title: "Тип отчёта",
      dataIndex: "type",
    },
    {
      title: "Период",
      dataIndex: "period",
    },
    {
      title: "Формат",
      dataIndex: "format",
    },
    {
      title: "Дата создания",
      dataIndex: "created",
    },
    {
      title: "Статус",
      dataIndex: "status",
      render: (status) => (
        <Tag color={status === "Готов" ? "green" : "orange"}>
          {status}
        </Tag>
      ),
    },
    {
      title: "Создал",
      dataIndex: "author",
    },
    {
      title: "Действия",
      render: () => (
        <Space>
          <Button size="small">Скачать</Button>
          <Button size="small">Открыть</Button>
        </Space>
      ),
    },
  ];

  return (
    <ConfigProvider locale={ruRU}>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 24,
          }}
        >
          <h1>Отчёты</h1>

          <Button
            type="primary"
            icon={<PlusOutlined />}
          >
            Создать отчёт
          </Button>
        </div>

        <Card style={{ marginBottom: 24 }}>
          <Row gutter={[16, 16]}>
            <Col span={5}>
              <div style={{ marginBottom: 8 }}>
                Период
              </div>

              <RangePicker
                style={{ width: "100%" }}
                format="DD.MM.YYYY"
                value={dateRange}
                onChange={setDateRange}
              />
            </Col>

            <Col span={4}>
              <div style={{ marginBottom: 8 }}>
                Тип отчёта
              </div>

              <Select
                value={typeFilter}
                onChange={setTypeFilter}
                style={{ width: "100%" }}
                options={[
                  { value: "Все", label: "Все" },
                  {
                    value: "Счета-фактуры",
                    label: "Счета-фактуры",
                  },
                  {
                    value: "Ошибки",
                    label: "Ошибки",
                  },
                  {
                    value: "Проводки",
                    label: "Проводки",
                  },
                ]}
              />
            </Col>

            <Col span={4}>
              <div style={{ marginBottom: 8 }}>
                Формат
              </div>

              <Select
                value={formatFilter}
                onChange={setFormatFilter}
                style={{ width: "100%" }}
                options={[
                  { value: "Все", label: "Все" },
                  {
                    value: "Excel (.xlsx)",
                    label: "Excel (.xlsx)",
                  },
                  {
                    value: "PDF (.pdf)",
                    label: "PDF (.pdf)",
                  },
                ]}
              />
            </Col>

            <Col span={4}>
              <div style={{ marginBottom: 8 }}>
                Статус
              </div>

              <Select
                value={statusFilter}
                onChange={setStatusFilter}
                style={{ width: "100%" }}
                options={[
                  { value: "Все", label: "Все" },
                  {
                    value: "Готов",
                    label: "Готов",
                  },
                  {
                    value: "Формируется",
                    label: "Формируется",
                  },
                ]}
              />
            </Col>

            <Col span={5}>
              <div style={{ marginBottom: 8 }}>
                Поиск
              </div>

              <Input
                placeholder="Поиск отчётов"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
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
              pageSize: 5,
              locale: {
                items_per_page: "на странице",
              },
            }}
          />
        </Card>
      </div>
    </ConfigProvider>
  );
}