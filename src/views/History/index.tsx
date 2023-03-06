import { Empty, Divider, Progress, Row, Col, Space, Typography } from "antd";

import "./History.css";

const { Text } = Typography;

interface HistoryContainerProps {
  fileName: string;
  fileSize: string;
  percent: number;
}

/**
 * Displays a past file transfer's details.
 *
 * @param {HistoryContainerProps} props
 * @returns {*}
 */
function HistoryContainer(props: HistoryContainerProps): any {
  let status: "success" | "exception" = "exception";
  if (props.percent >= 100) {
    status = "success";
  }

  return (
    <div className="HistoryContainer">
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
          <Progress status={status} percent={props.percent} />
        </Row>
      </Space>
      <Divider />
    </div>
  );
}

/**
 * The list of past file transfers.
 *
 * @interface HistoryProps
 * @typedef {HistoryProps}
 */
interface HistoryProps {
  historyItems?: HistoryContainerProps[];
}

/**
 * Displays past file transfers.
 *
 * @param {HistoryProps} props
 * @returns {*}
 */
function History(props: HistoryProps): any {
  if (props.historyItems) {
    return (
      <div>
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          {props.historyItems.map((props, _) => (
            <HistoryContainer
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
        description={<span>No transfer history available</span>}
      />
    </div>
  );
}

export default History;
