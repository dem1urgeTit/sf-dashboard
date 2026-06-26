import { useEffect } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Typography,
  message,
  Result
} from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { projectsData } from "../mockData";

const { Title } = Typography;
const { TextArea } = Input;

export default function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const record = projectsData[Number(id)];

  useEffect(() => {
    if (record) {
      form.setFieldsValue({
        projectId: record.projectId,
        period: record.period,
        status: record.status,
        manager: record.manager,
        comment: record.comment,
      });
    }
  }, [id]);

  if (!record) {
    return (
      <Result
        status="404"
        title="Проект не найден"
        extra={
          <Button type="primary" onClick={() => navigate("/projects-sf")}>
            Вернуться к проектам
          </Button>
        }
      />
    );
  }

  const onFinish = (values) => {
    // При наличии API здесь будет PUT/PATCH запрос
    console.log("Сохранено:", values);
    message.success("Проект успешно сохранён");
    navigate("/projects-sf");
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
          Редактирование проекта — {record.projectId}
        </Title>

        <Space>
          <Button onClick={() => navigate("/projects-sf")}>
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
                label="ID проекта"
                name="projectId"
                rules={[{ required: true, message: "Введите ID проекта" }]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Период"
                name="period"
                rules={[{ required: true, message: "Введите период" }]}
              >
                <Input placeholder="например: 2026-05" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Статус" name="status">
                <Select
                  options={[
                    { value: "В обработке", label: "В обработке" },
                    { value: "Готов", label: "Готов" },
                    { value: "Ошибка", label: "Ошибка" },
                  ]}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Ответственный" name="manager">
                <Select
                  options={[
                    { value: "Иванов И. И.", label: "Иванов И. И." },
                    { value: "Петров П. П.", label: "Петров П. П." },
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
