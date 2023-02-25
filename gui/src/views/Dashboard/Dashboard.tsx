import { Button, Row } from "antd";
import { UploadOutlined, DownloadOutlined } from "@ant-design/icons";

import "./Dashboard.css";

interface DashboardProps {
  appLogo?: string;
}

function Dashboard(props: DashboardProps) {
  return (
    <div>
      <Row justify="space-around" align="middle">
        <img className="About-logo" src={props.appLogo} alt="logo" />
      </Row>
      <Row justify="center" align="middle">
        <Button className="Dashboard-button" icon={<UploadOutlined />}>
          Send
        </Button>
        <Button className="Dashboard-button" icon={<DownloadOutlined />}>
          Receive
        </Button>
      </Row>
    </div>
  );
}

export default Dashboard;
