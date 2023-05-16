import {
  Empty,
  Divider,
  Progress,
  Row,
  Col,
  Button,
  Space,
  Typography,
} from "antd";
import { useContext, useState, useEffect, useCallback } from "react";
import { AppContext } from "../../context";

import * as bindings from "../../bindings";
import "./ActiveTransfers.css";

const { Text } = Typography;

interface TransferContainerProps {
  fileName: string;
  fileSize: string;
  percent: number;
}

/**
 * Displays an individual file transfer's details.
 *
 * @param {TransferContainerProps} props
 * @returns {*}
 */
function TransferContainer(props: TransferContainerProps): any {
  return (
    <div className="TransferContainer">
      <Space size="large" direction="vertical" style={{ width: "100%" }}>
        <Row justify="space-between" align="middle">
          <Col span="flex" style={{ textAlign: "left" }}>
            <Text strong>{props.fileName}</Text>
          </Col>
          <Col span="flex">
            <Text type="secondary">{props.fileSize}</Text>
          </Col>
        </Row>

        <Row justify="space-between" align="middle">
          <Col span={20}>
            <Progress status="active" percent={props.percent} />
          </Col>
          <Col span="flex">
            <Button type="primary" danger>
              Cancel
            </Button>
          </Col>
        </Row>
      </Space>
      <Divider />
    </div>
  );
}

/**
 * Displays active file transfers.
 *
 * @param {ActiveTransfersProps} props
 * @returns {*}
 */
function ActiveTransfers(): any {
  const ctx = useContext(AppContext);

  if (ctx?.codes && ctx?.codes.length! > 0) {
    const [fileName, _setFileName] = useState("");
    const [fileSize, _setFileSize] = useState("");
    const [percent, setPercent] = useState(0);

    const tracker = useCallback(
      (_current: number, _total: number, percent: number) => {
        setPercent(percent);
      },
      []
    );

    useEffect(() => {
      ctx.codes.forEach((code) => {
        bindings.trackProgress(code, tracker);
        if (percent === 100) {
          ctx.deleteCode(code);
        }
      });
    }, [ctx.codes, tracker]);

    return (
      <div>
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          {ctx.codes.map(() => (
            <TransferContainer
              fileName={fileName}
              fileSize={fileSize}
              percent={percent}
            />
          ))}
        </Space>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={<span>No active transfers</span>}
      />
    </div>
  );
}

export default ActiveTransfers;
