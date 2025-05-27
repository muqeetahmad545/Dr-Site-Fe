import React, { useEffect } from "react";
import { Form, Input, Row, Col, Button, message } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import type { ProfileSetupProps } from "../../types/profile";
import { PrimaryButton } from "../../components/PrimaryButton";
import FileUploader from "../../components/FileUploader";
import {
  decryptBase64,
  encryptBase64,
  SECRET_KEY,
  type EncryptedResult,
} from "../../helper/Crypto";

const EducationDetails: React.FC<ProfileSetupProps> = ({
  form,
  formData,
  setFormData,
}) => {
  useEffect(() => {
    form.setFieldsValue(formData);
  }, [formData, form]);

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

        try {
          const encrypted = encryptBase64(base64String, SECRET_KEY);

          const updatedEducation = [...(form.getFieldValue("education") || [])];
          updatedEducation[index] = {
            ...updatedEducation[index],
            degree_document: encrypted,
          };

          form.setFieldValue("education", updatedEducation);
          setFormData((prev: any) => ({
            ...prev,
            education: updatedEducation,
          }));
          onSuccess?.("ok");
        } catch (err) {
          console.error("Encryption failed:", err);
          message.error("Failed to encrypt file");
        }
      };

      reader.onerror = () => {
        message.error("Failed to read file");
      };

      reader.readAsDataURL(file);
    };

  const decryptDocument = (encrypted: EncryptedResult) =>
    decryptBase64(encrypted.data, encrypted.iv, SECRET_KEY);
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
                        <Form.Item
                          name={[name, "degree_document"]}
                          rules={[
                            {
                              required: true,
                              message: "Please upload the degree document",
                            },
                          ]}
                          style={{ display: "none" }}
                        >
                          <Input />
                        </Form.Item>

                        <Form.Item label="Degree Document" required>
                          {(() => {
                            const encrypted = form.getFieldValue([
                              "education",
                              index,
                              "degree_document",
                            ]) as EncryptedResult;

                            let decrypted: any | undefined;
                            if (encrypted?.data && encrypted?.iv) {
                              try {
                                decrypted = decryptDocument(encrypted);
                              } catch (err) {
                                console.error("Decryption failed:", err);
                              }
                            }

                            if (encrypted && decrypted) {
                              if (
                                decrypted.startsWith("data:application/pdf")
                              ) {
                                return (
                                  <PrimaryButton
                                    style={{ margin: 10 }}
                                    onClick={() => {
                                      const win = window.open();
                                      if (win) {
                                        win.document.write(
                                          `<iframe src="${decrypted}" frameborder="0" style="width:100%;height:100vh;" allowfullscreen></iframe>`
                                        );
                                      }
                                    }}
                                  >
                                    View PDF Document
                                  </PrimaryButton>
                                );
                              } else {
                                return (
                                  <img
                                    src={decrypted}
                                    alt="Degree Document"
                                    style={{
                                      maxWidth: "100%",
                                      maxHeight: 150,
                                      marginBottom: 8,
                                      padding: 10,
                                      border: "1px solid #ccc",
                                    }}
                                  />
                                );
                              }
                            } else {
                              return <p>No document uploaded</p>;
                            }
                          })()}

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
