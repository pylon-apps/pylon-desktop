import { HeartTwoTone } from "@ant-design/icons";
import { Col, Row, Layout, Typography } from "antd";

import "./About.css";

const { Title, Text } = Typography;
const { Footer } = Layout;

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
    <div className="About">
      <Row justify="space-around" align="middle">
        <Col span={24}>
          <img className="About-logo" src={props.logo} alt="logo" />
        </Col>
      </Row>
      <Row justify="space-around" align="middle">
        <Title>{props.appName}</Title>
      </Row>
      <Row justify="space-around" align="middle">
        <Col span={24}>
          <Text strong>Core version: </Text>
          {props.coreVersion}
        </Col>
        <Col span={24}>
          <Text strong>GUI version: </Text>
          {props.guiVersion}
        </Col>
        <Col span={24}>
          <Text strong>Build date: </Text>
          {props.buildDate}
        </Col>
      </Row>
      <Footer>
        <Text strong keyboard>
          Made with <HeartTwoTone twoToneColor="magenta" /> by {props.author}
        </Text>
      </Footer>
    </div>
  );
}

export default About;
