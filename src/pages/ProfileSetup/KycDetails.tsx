import React, { useEffect, useState } from "react";
import { Form, Input, Row, Col, Checkbox, Button, message } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import type { ProfileSetupProps } from "../../types/profile";
import FileUploader from "../../components/FileUploader";
import { PrimaryButton } from "../../components/PrimaryButton";

const KycDetails: React.FC<ProfileSetupProps> = ({
  form,
  formData,
  setFormData,
}) => {
  // const [form] = Form.useForm();
  const [showInsuranceFields, setShowInsuranceFields] = useState<boolean>(
    !!formData.insuranceCheckbox
  );

  useEffect(() => {
    form.setFieldsValue(formData);
  }, [formData, form]);

  const handleValuesChange = (_: any, allValues: any) => {
    setFormData((prev: any) => ({
      ...prev,
      ...allValues,
    }));
    setShowInsuranceFields(!!allValues.insuranceCheckbox);
  };

  const handleInsuranceDocumentFileUpload =
    (index: number) =>
    async ({ file, onSuccess }: any) => {
      if (!file) {
        message.error("No file selected");
        return;
      }

      const isValidFile =
        file.type.startsWith("application/") || file.type.startsWith("image/");
      if (!isValidFile) {
        message.error("Only document or image files are allowed!");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;

        const updatedInsurance = [...(form.getFieldValue("insurance") || [])];
        updatedInsurance[index] = {
          ...updatedInsurance[index],
          insurance_document: base64String,
        };

        form.setFieldsValue({ insurance: updatedInsurance });

        setFormData((prev: any) => ({
          ...prev,
          insurance: updatedInsurance,
        }));

        onSuccess?.("ok");
      };

      reader.onerror = () => {
        message.error("Failed to read file");
      };

      reader.readAsDataURL(file);
    };
  return (
    <Form
      form={form}
      layout="vertical"
      onValuesChange={handleValuesChange}
      initialValues={formData}
    >
      <Form.Item name="insuranceCheckbox" valuePropName="checked">
        <Checkbox>Do you have insurance coverage?</Checkbox>
      </Form.Item>

      {showInsuranceFields && (
        <Form.List name="insurance">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name }, index) => (
                <div
                  key={key}
                  style={{
                    border: "1px solid #f0f0f0",
                    padding: 16,
                    marginBottom: 16,
                    borderRadius: 8,
                  }}
                >
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name={[name, "insurance_company"]}
                        label="Insurance Company"
                        rules={[
                          { required: true, message: "Enter company name" },
                        ]}
                      >
                        <Input placeholder="Company Name" />
                      </Form.Item>
                    </Col>

                    <Col span={12}>
                      <Form.Item
                        name={[name, "insurance_number"]}
                        label="Insurance Number"
                        rules={[
                          { required: true, message: "Enter insurance number" },
                        ]}
                      >
                        <Input placeholder="Insurance Number" />
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Form.Item label="Insurance Document">
                        {form.getFieldValue([
                          "insurance",
                          index,
                          "insurance_document",
                        ]) ? (
                          <img
                            src={form.getFieldValue([
                              "insurance",
                              index,
                              "insurance_document",
                            ])}
                            alt="Insurance Document"
                            style={{
                              maxWidth: "100%",
                              maxHeight: "150px",
                              marginBottom: 8,
                            }}
                          />
                        ) : (
                          <p>No document uploaded</p>
                        )}
                        <FileUploader
                          name="file"
                          multiple={false}
                          customRequest={handleInsuranceDocumentFileUpload(
                            index
                          )}
                          maxCount={1}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Button
                    danger
                    type="text"
                    icon={<MinusCircleOutlined />}
                    onClick={() => remove(name)}
                  >
                    Remove
                  </Button>
                </div>
              ))}

              <Form.Item>
                <PrimaryButton
                  type="dashed"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                  block
                >
                  Add Insurance
                </PrimaryButton>
              </Form.Item>
            </>
          )}
        </Form.List>
      )}
    </Form>
  );
};

export default KycDetails;
