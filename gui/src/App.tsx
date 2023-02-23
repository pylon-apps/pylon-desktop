import React, { useState } from "react";
import {
  DashboardOutlined,
  RocketOutlined,
  HistoryOutlined,
  SettingOutlined,
  HeartTwoTone,
  InfoCircleOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, Empty, theme } from "antd";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

/**
 * Returns a constructed `MenuItem`
 * @date 2/23/2023 - 10:55:20 PM
 *
 * @param {React.ReactNode} label The display label for the menu item
 * @param {React.Key} key The unique key for the menu item
 * @param {?React.ReactNode} [icon] Optional icon to use for the menu item
 * @param {?MenuItem[]} [children] Optional child menu items (for a submenu)
 * @returns {MenuItem} The constructed `MenuItem`
 */
function getMenuItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

/**
 * The menu items to display in the sidebar of our app
 * @date 2/23/2023 - 10:58:00 PM
 *
 * @type {MenuItem[]}
 */
const items: MenuItem[] = [
  getMenuItem("Dashboard", "dashboard", <DashboardOutlined />),
  getMenuItem("Active Transfers", "active_transfers", <RocketOutlined />),
  getMenuItem("History", "history", <HistoryOutlined />),
  getMenuItem("Settings", "settings", <SettingOutlined />),
  getMenuItem("About", "about", <InfoCircleOutlined />),
];

/**
 * Primary component of our app
 *
 * This component will encapsulate and render the various other views of our app
 * @date 2/23/2023 - 10:58:29 PM
 *
 * @returns {*}
 */
function App(): any {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // TODO: don't inline styles
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        theme="dark"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{
            height: 32,
            margin: 16,
          }}
        />
        <Menu
          theme="dark"
          defaultSelectedKeys={["dashboard"]}
          mode="inline"
          items={items}
        />
      </Sider>

      <Layout className="site-layout">
        <Header style={{ padding: 0, background: colorBgContainer }} />

        <Content style={{ margin: "0 0" }}>
          <div
            style={{
              padding: 24,
              margin: 24,
              minHeight: 400,
              background: colorBgContainer,
            }}
          >
            {/* This is where our other views would be rendered */}
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={<span>There's nothing here yet. Stay tuned!</span>}
            />
          </div>
        </Content>

        <Footer style={{ textAlign: "center" }}>
          Created with <HeartTwoTone twoToneColor="magenta" /> by Nikhil Prabhu
        </Footer>
      </Layout>
    </Layout>
  );
}

export default App;
