// import React, { useState } from "react";
// import { Steps, Button, message, Card } from "antd";
// import PersonalInfo from "./ProfileSetup/PersonalInfo";
// import AccountDetails from "./ProfileSetup/AccountDetails";
// import Avaibilty from "./ProfileSetup/Avaibilty";
// import { PrimaryButton } from "../components/PrimaryButton";
// import EducationDetails from "./ProfileSetup/EducationDetails";


// const { Step } = Steps;

// const steps = [
//   {
//     title: "Personal Info",
//     content: <PersonalInfo />,
//   },  
//   {
//     title: "Avaibilty",
//     content: <Avaibilty />,
//   },
//   {
//     title: "Education Details",
//     content: <EducationDetails />,
//   },
//   {
//     title: "Account Details",
//     content: <AccountDetails />,
//   },
// ];

// const ProfileSetup: React.FC = () => {
//   const [current, setCurrent] = useState(0);

//   const next = () => {
//     setCurrent(current + 1);
//   };

//   const prev = () => {
//     setCurrent(current - 1);
//   };

//   const handleFinish = () => {
//     message.success("Profile setup complete!");
//   };

//   return (
//     <Card title="Profile Setup" style={{ margin: "2rem" }}>
//       <Steps current={current} style={{ marginBottom: 24 }}>
//         {steps.map((item) => (
//           <Step key={item.title} title={item.title} />
//         ))}
//       </Steps>
//       <div style={{ minHeight: 200, padding: 24 }}>{steps[current].content}</div>
//       <div style={{ marginTop: 24, textAlign: "right" }}>
//         {current > 0 && (
//           <PrimaryButton style={{ margin: "0 8px" }} onClick={() => prev()}>
//             Previous
//           </PrimaryButton>
//         )}
//         {current < steps.length - 1 && (
//           <PrimaryButton onClick={() => next()}>
//             Next
//           </PrimaryButton>
//         )}
//         {current === steps.length - 1 && (
//           <PrimaryButton onClick={handleFinish}>
//             Finish
//           </PrimaryButton>
//         )}
//       </div>
//     </Card>
//   );
// };

// export default ProfileSetup;


import React, { useState } from "react";
import { Steps, message, Card } from "antd";
import PersonalInfo from "./ProfileSetup/PersonalInfo";
import AccountDetails from "./ProfileSetup/AccountDetails";
import Avaibilty from "./ProfileSetup/Avaibilty";
import EducationDetails from "./ProfileSetup/EducationDetails";
import { PrimaryButton } from "../components/PrimaryButton";
import { useUpdateProfileMutation } from "../features/api/auth/authAPI"; // Update path accordingly

const { Step } = Steps;

const ProfileSetup: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [formData, setFormData] = useState<any>({});
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const steps = [
    {
      title: "Personal Info",
      content: <PersonalInfo formData={formData} setFormData={setFormData} />,
    },
    {
      title: "Avaibilty",
      content: <Avaibilty formData={formData} setFormData={setFormData} />,
    },
    {
      title: "Education Details",
      content: <EducationDetails formData={formData} setFormData={setFormData} />,
    },
    {
      title: "Account Details",
      content: <AccountDetails formData={formData} setFormData={setFormData} />,
    },
  ];

  const next = () => setCurrent(current + 1);
  const prev = () => setCurrent(current - 1);

  const handleFinish = async () => {
    try {
      await updateProfile(formData).unwrap();
      message.success("Profile setup complete!");
    } catch (error) {
      console.error(error);
      message.error("Something went wrong while updating the profile.");
    }
  };

  return (
    <Card title="Profile Setup" style={{ margin: "2rem" }}>
      <Steps current={current} style={{ marginBottom: 24 }}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div style={{ minHeight: 200, padding: 24 }}>{steps[current].content}</div>
      <div style={{ marginTop: 24, textAlign: "right" }}>
        {current > 0 && (
          <PrimaryButton onClick={prev} style={{ marginRight: 8 }}>
            Previous
          </PrimaryButton>
        )}
        {current < steps.length - 1 && (
          <PrimaryButton onClick={next}>Next</PrimaryButton>
        )}
        {current === steps.length - 1 && (
          <PrimaryButton onClick={handleFinish} loading={isLoading}>
            Finish
          </PrimaryButton>
        )}
      </div>
    </Card>
  );
};

export default ProfileSetup;
