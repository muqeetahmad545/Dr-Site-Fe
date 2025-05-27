import React, { useEffect, useState } from "react";
import { Form, Input, Row, Col, Checkbox, Button, message } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import type { ProfileSetupProps } from "../../types/profile";
import FileUploader from "../../components/FileUploader";
import { PrimaryButton } from "../../components/PrimaryButton";
import {
  encryptBase64,
  decryptBase64,
  SECRET_KEY,
  type EncryptedResult,
} from "../../helper/Crypto";

const KycDetails: React.FC<ProfileSetupProps> = ({
  form,
  formData,
  setFormData,
}) => {
  const [showInsuranceFields, setShowInsuranceFields] = useState<boolean>(
    !!formData.insuranceCheckbox
  );

  useEffect(() => {
    form.setFieldsValue(formData);
    setShowInsuranceFields(!!formData.insuranceCheckbox);
  }, [formData, form]);

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

        try {
          const encrypted = encryptBase64(base64String, SECRET_KEY);

          const updatedInsurance = [...(form.getFieldValue("insurance") || [])];
          updatedInsurance[index] = {
            ...updatedInsurance[index],
            insurance_document: encrypted,
          };

          form.setFieldValue("insurance", updatedInsurance);
          setFormData((prev: any) => ({
            ...prev,
            insurance: updatedInsurance,
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
      onValuesChange={(_, allValues) =>
        setFormData((prev: any) => ({ ...prev, ...allValues }))
      }
      initialValues={formData}
    >
      <Form.Item name="insuranceCheckbox" valuePropName="checked">
        <Checkbox
          onChange={(e) => {
            setShowInsuranceFields(e.target.checked);
            if (!e.target.checked) {
              form.setFieldValue("insurance", []);
              setFormData((prev: any) => ({
                ...prev,
                insurance: [],
              }));
            }
          }}
        >
          Do you have insurance coverage?
        </Checkbox>
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
                      {/* Corrected name path */}
                      <Form.Item
                        name={[name, "insurance_document"]}
                        label="Insurance Document"
                        rules={[
                          {
                            required: true,
                            message: "Please upload an insurance document",
                          },
                        ]}
                      >
                        <div>
                          {(() => {
                            const encrypted = form.getFieldValue([
                              "insurance",
                              index,
                              "insurance_document",
                            ]) as EncryptedResult;
                            let decrypted: any | undefined;
                            if (encrypted?.data && encrypted?.iv) {
                              try {
                                decrypted = decryptDocument(encrypted);
                              } catch (err) {
                                console.error("Decryption failed:", err);
                              }
                            }
                            return (
                              <>
                                {decrypted ? (
                                  decrypted.startsWith(
                                    "data:application/pdf"
                                  ) ? (
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
                                  ) : (
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
                                  )
                                ) : (
                                  <div className="text-gray-400">
                                    No document uploaded
                                  </div>
                                )}

                                <FileUploader
                                  name="file"
                                  multiple={false}
                                  customRequest={handleInsuranceDocumentFileUpload(
                                    index
                                  )}
                                  maxCount={1}
                                />
                              </>
                            );
                          })()}
                        </div>
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
