import { HeartTwoTone } from "@ant-design/icons";
import { Col, Row, Typography, Descriptions, Space } from "antd";

import "./About.css";
import * as bindings from "../../bindings";

const { Title, Text } = Typography;

interface AboutProps {
  logo?: string;
  appName?: string;
  guiVersion?: string;
  buildMetadata?: bindings.BuildMetadata;
  author?: string;
}

/**
 * View that displays software versions and other information.
 *
 * @param {AboutProps} props
 * @returns {*}
 */
function About(props: AboutProps): any {
  return (
    <div className="About">
      <Space
        direction="vertical"
        align="center"
        size="large"
        style={{ display: "flex" }}
      >
        <Row justify="space-around" align="middle">
          <Col span="flex">
            <img className="About-logo" src={props.logo} alt="logo" />
          </Col>
        </Row>

        <Row justify="space-around" align="middle">
          <Title>{props.appName}</Title>
        </Row>

        <Row justify="space-around" align="middle">
          <Descriptions column={1} bordered>
            <Descriptions.Item label="Core Version">
              {props.buildMetadata?.coreVersion}
            </Descriptions.Item>

            <Descriptions.Item label="GUI Version">
              {props.guiVersion}
            </Descriptions.Item>

            <Descriptions.Item label="Build Date">
              {props.buildMetadata?.buildTimestamp}
            </Descriptions.Item>

            <Descriptions.Item label="Commit ID">
              {props.buildMetadata?.commitId}
            </Descriptions.Item>
          </Descriptions>
        </Row>

        <Row justify="space-around" align="middle">
          <Text className="About-footer" strong keyboard>
            Made with <HeartTwoTone twoToneColor="magenta" /> by {props.author}
          </Text>
        </Row>
      </Space>
    </div>
  );
}

export default About;
