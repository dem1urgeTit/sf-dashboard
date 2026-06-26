import {
  Button,
  Card,
  Col,
  ConfigProvider,
  DatePicker,
  Input,
  Row,
  Select,
  Space,
  Table,
  Tag,
} from "antd";

import ruRU from "antd/locale/ru_RU";

import {
  UploadOutlined,
  FileOutlined,
} from "@ant-design/icons";

import { useMemo, useState } from "react";

import dayjs from "dayjs";
import "dayjs/locale/ru";

dayjs.locale("ru");

const { RangePicker } = DatePicker;

export default function Uploads() {
  const uploadsData = [
    {
      key: 1,
      datetime: "11.02.2026 09:41",
      filename: "Проводки_11-02-2026.xlsx",
      source: "1С: Бухгалтерия",
      type: "Excel (.xlsx)",
      entries: "5 000",
      status: "Успешно",
      errors: 0,
    },
    {
      key: 2,
      datetime: "11.02.2026 08:41",
      filename: "Проводки_11-02-2026.csv",
      source: "1С: Бухгалтерия",
      type: "CSV (.csv)",
      entries: "3 200",
      status: "Ошибка",
      errors: 20,
    },
    {
      key: 3,
      datetime: "10.02.2026 17:12",
      filename: "Проводки_10-02-2026.xlsx",
      source: "1С: Бухгалтерия",
      type: "Excel (.xlsx)",
      entries: "12 450",
      status: "Успешно",
      errors: 0,
    },
    {
      key: 4,
      datetime: "10.02.2026 09:41",
      filename: "Проводки_10-02-2026.csv",
      source: "API",
      type: "CSV (.csv)",
      entries: "7 800",
      status: "Ошибка",
      errors: 50,
    },
    {
      key: 5,
      datetime: "09.02.2026 15:22",
      filename: "Проводки_09-02-2026.xlsx",
      source: "1С: Бухгалтерия",
      type: "Excel (.xlsx)",
      entries: "4 560",
      status: "Успешно",
      errors: 0,
    },
    {
      key: 6,
      datetime: "09.02.2026 14:11",
      filename: "Проводки_09-02-2026.csv",
      source: "Ручная загрузка",
      type: "CSV (.csv)",
      entries: "2 100",
      status: "Ошибка",
      errors: 500,
    },
  ];

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Все");
  const [typeFilter, setTypeFilter] = useState("Все");
  const [sourceFilter, setSourceFilter] = useState("Все");
  const [dateRange, setDateRange] = useState([]);

  const filteredData = useMemo(() => {
    return uploadsData.filter((item) => {
      const matchesSearch = item.filename
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "Все" ||
        item.status === statusFilter;

      const matchesType =
        typeFilter === "Все" ||
        item.type === typeFilter;

      const matchesSource =
        sourceFilter === "Все" ||
        item.source === sourceFilter;

      let matchesDate = true;

      if (dateRange?.length === 2) {
        const itemDate = dayjs(
          item.datetime.split(" ")[0],
          "DD.MM.YYYY"
        );

        matchesDate =
          itemDate.isAfter(
            dateRange[0].startOf("day")
          ) &&
          itemDate.isBefore(
            dateRange[1].endOf("day")
          );
      }

      return (
        matchesSearch &&
        matchesStatus &&
        matchesType &&
        matchesSource &&
        matchesDate
      );
    });
  }, [
    uploadsData,
    search,
    statusFilter,
    typeFilter,
    sourceFilter,
    dateRange,
  ]);

  const columns = [
    {
      title: "",
      render: () => (
        <input type="checkbox" />
      ),
      width: 50,
    },
    {
      title: "Дата и время",
      dataIndex: "datetime",
    },
    {
      title: "Имя файла",
      dataIndex: "filename",
      render: (text) => (
        <Space>
          <FileOutlined />
          {text}
        </Space>
      ),
    },
    {
      title: "Источник",
      dataIndex: "source",
    },
    {
      title: "Тип файла",
      dataIndex: "type",
    },
    {
      title: "Проводок",
      dataIndex: "entries",
    },
    {
      title: "Статус",
      dataIndex: "status",
      render: (status) => (
        <Tag
          color={
            status === "Успешно"
              ? "green"
              : "red"
          }
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Ошибок",
      dataIndex: "errors",
      render: (value) => (
        <span
          style={{
            color:
              value > 0 ? "#ff4d4f" : "inherit",
          }}
        >
          {value}
        </span>
      ),
    },
    {
      title: "Действия",
      render: () => (
        <Button size="small">
          Открыть
        </Button>
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
          <h1 style={{ margin: 0 }}>
            Журнал загрузки
          </h1>

          <Button
            type="primary"
            icon={<UploadOutlined />}
          >
            Загрузить файл
          </Button>
        </div>

        <Card style={{ marginBottom: 24 }}>
          <Row gutter={[16, 16]}>
            <Col span={5}>
              <div style={{ marginBottom: 8 }}>
                Период загрузки
              </div>

              <RangePicker
                style={{ width: "100%" }}
                value={dateRange}
                onChange={setDateRange}
                format="DD.MM.YYYY"
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
                  {
                    value: "Все",
                    label: "Все",
                  },
                  {
                    value: "Успешно",
                    label: "Успешно",
                  },
                  {
                    value: "Ошибка",
                    label: "Ошибка",
                  },
                ]}
              />
            </Col>

            <Col span={4}>
              <div style={{ marginBottom: 8 }}>
                Тип файла
              </div>

              <Select
                style={{ width: "100%" }}
                value={typeFilter}
                onChange={setTypeFilter}
                options={[
                  {
                    value: "Все",
                    label: "Все",
                  },
                  {
                    value: "Excel (.xlsx)",
                    label: "Excel (.xlsx)",
                  },
                  {
                    value: "CSV (.csv)",
                    label: "CSV (.csv)",
                  },
                ]}
              />
            </Col>

            <Col span={4}>
              <div style={{ marginBottom: 8 }}>
                Источник
              </div>

              <Select
                style={{ width: "100%" }}
                value={sourceFilter}
                onChange={setSourceFilter}
                options={[
                  {
                    value: "Все",
                    label: "Все",
                  },
                  {
                    value: "1С: Бухгалтерия",
                    label: "1С: Бухгалтерия",
                  },
                  {
                    value: "API",
                    label: "API",
                  },
                  {
                    value: "Ручная загрузка",
                    label: "Ручная загрузка",
                  },
                ]}
              />
            </Col>

            <Col span={5}>
              <div style={{ marginBottom: 8 }}>
                Поиск
              </div>

              <Input
                placeholder="Поиск по имени файла"
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
              pageSize: 10,
              showSizeChanger: false,
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