import { Result } from "antd";
import { useNavigate } from "react-router-dom";
import { CenteredLayout } from "../components/CenteredLayout";
import { PrimaryButton } from "../components/PrimaryButton";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <CenteredLayout>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <PrimaryButton onClick={() => navigate("/")}>Back Home</PrimaryButton>
        }
      />
    </CenteredLayout>
  );
};
