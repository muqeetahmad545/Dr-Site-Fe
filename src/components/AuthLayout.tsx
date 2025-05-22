import { Row, Col } from "antd";

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={{ height: "100vh", backgroundColor: "#f0f2f5" }}>
      <Row justify="center" align="middle" style={{ height: "100%" }}>
        <Col xs={22} sm={18} md={14} lg={10} xl={8} xxl={6}>
          {children}
        </Col>
      </Row>
    </div>
  );
};
