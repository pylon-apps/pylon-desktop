import React, { useEffect, useState } from "react";
import {
  DashboardOutlined,
  RocketOutlined,
  HistoryOutlined,
  SettingOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";

import "./App.css";
import * as bindings from "./bindings";
import { Outlet, useNavigate } from "react-router-dom";

const { Content, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

/**
 * Returns a constructed `MenuItem`
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
 * Primary component of our app
 *
 * This component will encapsulate and render the various other views of our app
 *
 * @returns {*}
 */
function App(): any {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  // Perform basic setup stuff when the component is mounted (only once).
  useEffect(() => {
    // Disable right-click context menu when running in production.
    bindings.isReleaseMode().then((is_release) => {
      if (is_release) {
        document.addEventListener("contextmenu", (event) =>
          event.preventDefault()
        );
      }
    });
  }, []);

  /**
   * The menu items to display in the sidebar of our app
   *
   * @type {MenuItem[]}
   */
  const items: MenuItem[] = [
    getMenuItem("Dashboard", "dashboard", <DashboardOutlined />),
    getMenuItem("Active Transfers", "activeTransfers", <RocketOutlined />),
    getMenuItem("History", "history", <HistoryOutlined />),
    getMenuItem("Settings", "settings", <SettingOutlined />),
    getMenuItem("About", "about", <InfoCircleOutlined />),
  ];

  /**
   * Sets the current view based on the selected menu item.
   *
   * @param {*} e The menu item click event.
   */
  const switchView: MenuProps["onClick"] = (e: any) => {
    navigate(`/${e.key}`);
  };

  return (
    <Layout style={{ minHeight: "100vh", overflow: "hidden" }}>
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

      <Layout className="site-layout" style={{ overflowY: "scroll" }}>
        <Content style={{ margin: "0 0" }}>
          <div className="View-container">
            {/* This is where our views would be rendered */}
            {/* TODO: Use custom logo */}
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
