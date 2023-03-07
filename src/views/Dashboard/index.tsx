import { useState, ChangeEvent } from "react";
import { Button, Row, Col, Space, Input } from "antd";
import { UploadOutlined, DownloadOutlined } from "@ant-design/icons";

import "./Dashboard.css";

interface DashboardProps {
  appLogo?: string;
}

/**
 * View that contains the main functionality; initiating file transfers.
 *
 * @param {DashboardProps} props
 * @returns {*}
 */
function Dashboard(props: DashboardProps): any {
  const [receiveDisabled, setReceiveDisabled] = useState(true);

  /**
   * Event handler for when the Pylon code is entered into the input field.
   *
   * @param {ChangeEvent<HTMLInputElement>} e
   */
  function codeEntered(e: ChangeEvent<HTMLInputElement>) {
    if (e.currentTarget.value) {
      setReceiveDisabled(false);
    } else {
      setReceiveDisabled(true);
    }
  }

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
          <Space size="middle">
            <Button icon={<UploadOutlined />}>Send</Button>
            <Input.Group compact>
              <Input
                allowClear
                onChange={codeEntered}
                style={{ width: "65%" }}
                placeholder="Enter Pylon code"
              />
              <Button disabled={receiveDisabled} icon={<DownloadOutlined />}>
                Receive
              </Button>
            </Input.Group>
          </Space>
        </Row>
      </Space>
    </div>
  );
}

export default Dashboard;
