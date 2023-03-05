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
 * The list of active transfers.
 *
 * @interface ActiveTransfersProps
 * @typedef {ActiveTransfersProps}
 */
interface ActiveTransfersProps {
  transfers?: TransferContainerProps[];
}

/**
 * Displays active file transfers.
 *
 * @param {ActiveTransfersProps} props
 * @returns {*}
 */
function ActiveTransfers(props: ActiveTransfersProps): any {
  if (props.transfers) {
    return (
      <div>
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          {props.transfers.map((props, _) => (
            <TransferContainer
              fileName={props.fileName}
              fileSize={props.fileSize}
              percent={props.percent}
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
