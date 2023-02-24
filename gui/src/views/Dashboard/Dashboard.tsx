import { Button, Col, Row } from "antd";
import { UploadOutlined, DownloadOutlined } from "@ant-design/icons";

import "./Dashboard.css";

interface DashboardProps {
  logo?: string;
}

function Dashboard(props: DashboardProps) {
  return (
    <div>
      <Row justify="space-around" align="middle">
        <Col span={24}>
          <img className="Dashboard-logo" src={props.logo} alt="logo" />
        </Col>
      </Row>
      <Row justify="space-around" align="middle">
        <Col span={12}>
          <Button icon={<UploadOutlined />}>Send</Button>
        </Col>
        <Col span={12}>
          <Button icon={<DownloadOutlined />}>Receive</Button>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
