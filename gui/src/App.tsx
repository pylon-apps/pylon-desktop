import React, { ReactElement, useState } from "react";
import { invoke } from "@tauri-apps/api";
import {
  DashboardOutlined,
  RocketOutlined,
  HistoryOutlined,
  SettingOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, Empty, theme } from "antd";

import "./App.css";
import reactLogo from "./assets/react.svg";
import Dashboard from "./views/Dashboard/Dashboard";
import ActiveTransfers from "./views/ActiveTransfers/ActiveTransfers";
import History from "./views/History/History";
import Settings from "./views/Settings/Settings";
import About from "./views/About/About";

const { Content, Sider } = Layout;

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
  const [currentView, setCurrentView] = useState("dashboard");
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  /**
   * The available views that can be displayed in the app.
   * @date 2/25/2023 - 11:15:59 AM
   *
   * @type {Map<string, ReactElement>} A map containing the unique key identifying the view, along with the view component.
   */
  const views: Map<string, ReactElement> = new Map([
    ["dashboard", <Dashboard logo={reactLogo} />],
    ["active_transfers", <ActiveTransfers />],
    ["history", <History />],
    ["settings", <Settings />],
    ["about", <About />],
  ]);

  // Disable right-click context menu when running in production.
  invoke("is_release_mode").then((res) => {
    if (res as boolean) {
      document.addEventListener("contextmenu", (event) =>
        event.preventDefault()
      );
    }
  });

  /**
   * Sets the current view based on the selected menu item.
   * @date 2/25/2023 - 11:13:24 AM
   *
   * @param {*} e The menu item click event.
   */
  const switchView: MenuProps["onClick"] = (e: any) => {
    setCurrentView(e.key);
  };

  // TODO: don't inline styles
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        theme="dark"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Menu
          theme="dark"
          defaultSelectedKeys={["dashboard"]}
          mode="inline"
          items={items}
          onClick={switchView}
        />
      </Sider>

      <Layout className="site-layout">
        <Content style={{ margin: "0 0" }}>
          <div className="View-container">
            {/* This is where our views would be rendered */}
            {/* TODO: Use custom logo */}
            {views.get(currentView)}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
