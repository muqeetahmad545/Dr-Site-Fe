import { Row, Col } from 'antd';

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#f0f2f5' }}>
      <Row justify="center" align="middle" style={{ height: '100%' }}>
        <Col>{children}</Col>
      </Row>
    </div>
  );
};
