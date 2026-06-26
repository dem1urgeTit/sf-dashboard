import { useEffect } from "react";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Typography,
  message,
  Result
} from "antd";
import { useParams, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { registryData } from "../mockData";

const { Title } = Typography;
const { TextArea } = Input;

export default function EditRegistery() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const record = registryData[Number(id)];

  useEffect(() => {
    if (record) {
      form.setFieldsValue({
        invoiceNumber: record.id,
        invoiceDate: dayjs(record.date),
        contractor: record.counterparty,
        amount: record.amount,
        status: record.status,
        project: record.project,
        comment: record.comment,
      });
    }
  }, [id]);

  if (!record) {
    return (
      <Result
        status="404"
        title="Запись не найдена"
        extra={
          <Button type="primary" onClick={() => navigate("/registry")}>
            Вернуться к реестру
          </Button>
        }
      />
    );
  }

  const onFinish = (values) => {
    // При наличии API здесь будет PUT/PATCH запрос
    console.log("Сохранено:", values);
    message.success("Счет-фактура успешно сохранён");
    navigate("/registry");
  };

  return (
    <div style={{ padding: 24 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 24,
        }}
      >
        <Title level={2}>
          Редактирование счета-фактуры — {record.id}
        </Title>

        <Space>
          <Button onClick={() => navigate("/registry")}>
            Отмена
          </Button>
          <Button type="primary" onClick={() => form.submit()}>
            Сохранить
          </Button>
        </Space>
      </div>

      <Card>
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="Номер счета-фактуры"
                name="invoiceNumber"
                rules={[{ required: true, message: "Введите номер счета-фактуры" }]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Дата счета-фактуры"
                name="invoiceDate"
                rules={[{ required: true, message: "Выберите дату" }]}
              >
                <DatePicker style={{ width: "100%" }} format="DD.MM.YYYY" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Контрагент"
                name="contractor"
                rules={[{ required: true, message: "Выберите контрагента" }]}
              >
                <Select
                  options={[
                    { value: 'ООО "Ромашка"', label: 'ООО "Ромашка"' },
                    { value: 'ООО "Василек"', label: 'ООО "Василек"' },
                    { value: 'АО "Тюльпан"', label: 'АО "Тюльпан"' },
                  ]}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Проект" name="project">
                <Select
                  options={[
                    { value: "Проект Альфа", label: "Проект Альфа" },
                    { value: "Проект Бета", label: "Проект Бета" },
                  ]}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Сумма"
                name="amount"
                rules={[{ required: true, message: "Введите сумму" }]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  min={0}
                  formatter={(val) =>
                    `${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                  }
                  addonAfter="₽"
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Статус" name="status">
                <Select
                  options={[
                    { value: "PENDING", label: "На проверке" },
                    { value: "OK", label: "Подтверждён" },
                    { value: "ERROR", label: "Ошибка" },
                  ]}
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Комментарий" name="comment">
                <TextArea rows={4} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
}
