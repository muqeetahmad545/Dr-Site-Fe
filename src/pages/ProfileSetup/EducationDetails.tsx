import React, { useEffect } from "react";
import { Form, Input, Row, Col, Button, message } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import type { ProfileSetupProps } from "../../types/profile";
import { PrimaryButton } from "../../components/PrimaryButton";
import FileUploader from "../../components/FileUploader";

const EducationDetails: React.FC<ProfileSetupProps> = ({
  form,
  formData,
  setFormData,
}) => {
  // Sync form with incoming formData
  useEffect(() => {
    form.setFieldsValue(formData);
  }, [formData, form]);

  // Upload handler that works per index in the education list
  const handleEducationDocumentFileUpload =
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

        const updatedEducation = [...(form.getFieldValue("education") || [])];
        updatedEducation[index] = {
          ...updatedEducation[index],
          degree_document: base64String,
        };

        form.setFieldValue("education", updatedEducation);
        setFormData((prev: any) => ({
          ...prev,
          education: updatedEducation,
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
      initialValues={formData}
      onValuesChange={(_, allValues) =>
        setFormData((prev: any) => ({ ...prev, ...allValues }))
      }
    >
      <Row gutter={16}>
        <Col span={24}>
          <Form.List name="education">
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
                          name={[name, "degree_name"]}
                          label="Degree Name"
                          rules={[
                            { required: true, message: "Enter degree name" },
                          ]}
                        >
                          <Input placeholder="e.g., MBBS" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          name={[name, "institution_name"]}
                          label="Institution Name"
                          rules={[
                            {
                              required: true,
                              message: "Enter institution name",
                            },
                          ]}
                        >
                          <Input placeholder="e.g., King Edward" />
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <Form.Item label="Degree Document">
                          {/* Check if the degree_document is available and show the image */}
                          {form.getFieldValue([
                            "education",
                            index,
                            "degree_document",
                          ]) ? (
                            <img
                              src={form.getFieldValue([
                                "education",
                                index,
                                "degree_document",
                              ])}
                              alt="Degree Document"
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
                            customRequest={handleEducationDocumentFileUpload(
                              index
                            )}
                            maxCount={1}
                          />
                        </Form.Item>
                      </Col>
                      <Col
                        span={4}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <Button
                          danger
                          type="text"
                          icon={<MinusCircleOutlined />}
                          onClick={() => remove(name)}
                        >
                          Remove
                        </Button>
                      </Col>
                    </Row>
                  </div>
                ))}
                <Form.Item>
                  <PrimaryButton
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                    block
                  >
                    Add Education
                  </PrimaryButton>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Col>
      </Row>
    </Form>
  );
};

export default EducationDetails;
