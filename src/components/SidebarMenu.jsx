import { Menu } from "antd";

import {
  DashboardOutlined,
  FileTextOutlined,
  UploadOutlined,
  BarChartOutlined,
  BookOutlined
} from "@ant-design/icons";

import {
  useNavigate,
  useLocation
} from "react-router-dom";

export default function SidebarMenu() {

  const navigate = useNavigate();

  const location = useLocation();

  const items = [
    {
      key: "/",
      icon: <DashboardOutlined />,
      label: "Дашборд"
    },

    {
      key: "/registry",
      icon: <FileTextOutlined />,
      label: "Реестр СФ"
    },

    {
    key: "/projects-sf",
    icon: <FileTextOutlined />,
    label: "Проекты СФ"
    },

    {
      key: "/uploads",
      icon: <UploadOutlined />,
      label: "Журнал загрузки"
    },

    {
      key: "/reports",
      icon: <BarChartOutlined />,
      label: "Отчеты"
    },

    {
      key: "/dictionaries",
      icon: <BookOutlined />,
      label: "Справочники"
    }
  ];

  return (
    <Menu
      theme="dark"
      mode="inline"

      selectedKeys={[location.pathname]}

      items={items}

      onClick={(item) => {
        navigate(item.key);
      }}
    />
  );
}