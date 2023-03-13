import { useState, ChangeEvent } from "react";
import { writeText } from "@tauri-apps/api/clipboard";
import { open, save } from "@tauri-apps/api/dialog";
import {
  Button,
  Row,
  Col,
  Space,
  Popover,
  Input,
  Spin,
  Typography,
} from "antd";
import { App as AntApp } from "antd";
import {
  UploadOutlined,
  DownloadOutlined,
  SyncOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import * as bindings from "../../bindings";

import "./Dashboard.css";

const { Text } = Typography;

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
  const { message, modal, notification } = AntApp.useApp();
  const [receiveDisabled, setReceiveDisabled] = useState(true);
  const [dashboardState, setDashboardState] = useState<
    "default" | "loading" | "displaycode"
  >("default");
  const [pylonCode, setPylonCode] = useState<string>();
  const [fileName, setFileName] = useState<string>();

  const buttonsView: React.ReactElement = (
    <Space size="middle">
      <Button icon={<UploadOutlined />} onClick={sendHandler}>
        Send
      </Button>
      <Input.Group compact>
        <Input
          allowClear
          onChange={codeEntered}
          style={{ width: "65%" }}
          placeholder="Enter Pylon code"
        />
        <Button
          disabled={receiveDisabled}
          icon={<DownloadOutlined />}
          onClick={recvHandler}
        >
          Receive
        </Button>
      </Input.Group>
    </Space>
  );

  const loadingView: React.ReactElement = (
    <Spin indicator={<SyncOutlined style={{ fontSize: "24px" }} spin />} />
  );

  const codeView: React.ReactElement = (
    <Space direction="vertical" size="large">
      <Row justify="space-around" align="middle">
        <Col span="flex">
          <Text keyboard>
            <Text strong>Sending file:</Text> {fileName}
          </Text>
        </Col>
      </Row>
      <Row justify="space-around" align="middle">
        <Col span={18}>
          <Input.Group compact>
            <Input
              disabled
              style={{ width: "65%", backgroundColor: "white", color: "black" }}
              value={pylonCode}
            />
            <Popover content="Copied!" trigger="focus">
              <Button icon={<CopyOutlined />} onClick={copyToClipboard}>
                Copy
              </Button>
            </Popover>
          </Input.Group>
        </Col>
        <Col span="flex">
          <Button type="primary" danger onClick={cancelHandler}>
            Cancel
          </Button>
        </Col>
      </Row>
      <Row justify="space-around" align="middle">
        <Spin
          tip="Waiting for receiver"
          indicator={<SyncOutlined style={{ fontSize: "24px" }} spin />}
        />
      </Row>
    </Space>
  );

  /**
   * Event handler for when the Pylon code is entered into the input field.
   *
   * @param {ChangeEvent<HTMLInputElement>} e
   */
  function codeEntered(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.value) {
      setPylonCode(e.target.value);
      setReceiveDisabled(false);
    } else {
      setReceiveDisabled(true);
    }
  }

  async function sendHandler() {
    const selected = (await open({
      multiple: false,
      title: "Select File",
    })) as string;

    if (!selected) {
      return;
    }

    setFileName(selected);
    setDashboardState("loading");

    try {
      let code = await bindings.genCode(2);

      setPylonCode(code);
      setDashboardState("displaycode");

      await bindings.sendFile(code, selected);

      message.success("Transfer started");
      setDashboardState("default");
    } catch (err) {
      modal.error({ title: "Error", content: err as string });
      setDashboardState("default");
    }
  }

  async function recvHandler() {
    const selected = (await save({
      title: "Save To",
    })) as string;

    if (!selected) {
      return;
    }

    setFileName(selected);

    try {
      setDashboardState("loading");

      await bindings.receiveFile(pylonCode!, selected);

      message.success("Transfer started");
      setDashboardState("default");
    } catch (err) {
      modal.error({ title: "Error", content: err as string });
      setDashboardState("default");
    }
  }

  async function cancelHandler() {
    try {
      await bindings.cancelTransfer(pylonCode!);
      message.warning("Transfer cancelled");
      setDashboardState("default");
    } catch (err) {
      modal.error({ title: "Error", content: err as string });
      setDashboardState("default");
    }
  }

  async function copyToClipboard() {
    await writeText(pylonCode!);
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
          {dashboardState == "loading"
            ? loadingView
            : dashboardState == "displaycode"
            ? codeView
            : buttonsView}
        </Row>
      </Space>
    </div>
  );
}

export default Dashboard;
