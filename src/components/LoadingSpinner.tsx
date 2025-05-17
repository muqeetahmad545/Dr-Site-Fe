import { Spin } from "antd";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
      <Spin size="large" />
    </div>
  );
};
export default LoadingSpinner;
