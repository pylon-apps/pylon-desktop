import { HeartTwoTone } from "@ant-design/icons";
import { Col, Row, Typography, Descriptions, Space } from "antd";

import "./About.css";

const { Title, Text } = Typography;

interface AboutProps {
  logo?: string;
  appName?: string;
  coreVersion?: string;
  guiVersion?: string;
  buildDate?: string;
  author?: string;
}

function About(props: AboutProps) {
  return (
    <div>
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
              {props.coreVersion}
            </Descriptions.Item>
            <Descriptions.Item label="GUI Version">
              {props.guiVersion}
            </Descriptions.Item>
            <Descriptions.Item label="Build Date">
              {props.buildDate}
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
