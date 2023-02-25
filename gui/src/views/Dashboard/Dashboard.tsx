import { Button, Row, Space } from "antd";
import { UploadOutlined, DownloadOutlined } from "@ant-design/icons";

import "./Dashboard.css";

interface DashboardProps {
  appLogo?: string;
}

function Dashboard(props: DashboardProps) {
  return (
    <div className="Dashboard">
      <Space
        direction="vertical"
        align="center"
        size="large"
        style={{ display: "flex" }}
      >
        <Row justify="space-around" align="middle">
          <img className="Dashboard-logo" src={props.appLogo} alt="logo" />
        </Row>
        <Row justify="center" align="middle">
          <Space size="large">
            <Button className="Dashboard-button" icon={<UploadOutlined />}>
              Send
            </Button>
            <Button className="Dashboard-button" icon={<DownloadOutlined />}>
              Receive
            </Button>
          </Space>
        </Row>
      </Space>
    </div>
  );
}

export default Dashboard;
