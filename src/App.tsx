import React, { ReactElement, useEffect, useState } from "react";
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
import reactLogo from "./assets/react.svg";
import { version } from "../package.json";
import Dashboard from "./views/Dashboard";
import ActiveTransfers from "./views/ActiveTransfers";
import History from "./views/History";
import Settings from "./views/Settings";
import About from "./views/About";

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
  const [currentView, setCurrentView] = useState("dashboard");
  const [buildMetadata, setBuildMetadata] = useState<bindings.BuildMetadata>();

  // Perform basic setup stuff when the component is mounted (only once).
  useEffect(() => {
    // Get build metadata.
    bindings.getBuildMetadata().then((metadata) => {
      setBuildMetadata(metadata);
    });

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
    getMenuItem("Active Transfers", "active_transfers", <RocketOutlined />),
    getMenuItem("History", "history", <HistoryOutlined />),
    getMenuItem("Settings", "settings", <SettingOutlined />),
    getMenuItem("About", "about", <InfoCircleOutlined />),
  ];

  /**
   * The available views that can be displayed in the app.
   *
   * @type {Map<string, ReactElement>} A map containing the unique key identifying the view, along with the view component.
   */
  const views: Map<string, ReactElement> = new Map([
    ["dashboard", <Dashboard appLogo={reactLogo} />],
    ["active_transfers", <ActiveTransfers />],
    ["history", <History />],
    ["settings", <Settings />],
    [
      "about",
      <About
        logo={reactLogo}
        appName="Pylon"
        guiVersion={version}
        buildMetadata={buildMetadata}
        author="Nikhil Prabhu"
      />,
    ],
  ]);

  /**
   * Sets the current view based on the selected menu item.
   *
   * @param {*} e The menu item click event.
   */
  const switchView: MenuProps["onClick"] = (e: any) => {
    setCurrentView(e.key);
  };

  // TODO: don't inline styles
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
            {views.get(currentView)}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
