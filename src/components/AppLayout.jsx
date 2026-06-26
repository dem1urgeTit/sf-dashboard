import { Layout, Dropdown } from "antd";
import SidebarMenu from "./SidebarMenu";
import {
  BellOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Outlet, useNavigate } from "react-router-dom";

const { Sider, Header, Content } = Layout;

export default function AppLayout() {
  const navigate = useNavigate();

  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  })();

  const fullName = user?.fullName || "Пользователь";

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const menuItems = [
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Выйти",
      onClick: handleLogout,
      danger: true,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>

      {/* SIDEBAR */}
      <Sider width={240} className="sidebar">
        <div className="logo">
          <div className="logo-icon">📄</div>
          <div>
            <div className="logo-title">Учетная</div>
            <div className="logo-title">система</div>
          </div>
        </div>
        <SidebarMenu />
      </Sider>

      {/* MAIN */}
      <Layout>

        {/* HEADER */}
        <Header className="header">
          <div className="header-right">
            <BellOutlined className="header-icon" />
            <Dropdown menu={{ items: menuItems }} placement="bottomRight">
              <div className="user-block">
                <UserOutlined />
                <span>{fullName}</span>
              </div>
            </Dropdown>
          </div>
        </Header>

        {/* CONTENT */}
        <Content className="content">
          <Outlet />
        </Content>

      </Layout>
    </Layout>
  );
}
