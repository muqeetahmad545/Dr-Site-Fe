import React, { useEffect, useState } from "react";
import { Form, Row, Col, Select, TimePicker } from "antd";
import type { ProfileSetupProps } from "../../types/profile";

const { Option } = Select;

const Avaibilty: React.FC<ProfileSetupProps> = ({ formData, setFormData }) => {
  const [form] = Form.useForm();
  const [timeSlots, setTimeSlots] = useState<string[]>(formData.available_times || []);

  // Load form values from parent on mount
  useEffect(() => {
    form.setFieldsValue(formData);
  }, [formData, form]);

  // Handle change in form fields
  const handleValuesChange = (_: any, allValues: any) => {
    setFormData((prev: any) => ({
      ...prev,
      ...allValues,
      available_times: timeSlots, // Sync separately maintained time slots
    }));
  };

  // Handle adding a new time slot
  const handleAddTime = (value: any) => {
    if (value) {
      const timeString = value.format("HH:mm");
      if (!timeSlots.includes(timeString)) {
        const updated = [...timeSlots, timeString];
        setTimeSlots(updated);
        setFormData((prev: any) => ({
          ...prev,
          available_times: updated,
        }));
        form.setFieldsValue({ available_times: updated });
      }
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onValuesChange={handleValuesChange}
      initialValues={formData}
    >
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            label="Available Days"
            name="available_days"
            rules={[{ required: true, message: "Please select available days" }]}
          >
            <Select mode="multiple" placeholder="Select days" style={{ width: "100%" }}>
              <Option value="monday">Monday</Option>
              <Option value="tuesday">Tuesday</Option>
              <Option value="wednesday">Wednesday</Option>
              <Option value="thursday">Thursday</Option>
              <Option value="friday">Friday</Option>
              <Option value="saturday">Saturday</Option>
              <Option value="sunday">Sunday</Option>
            </Select>
          </Form.Item>

          <div
            style={{
              display: "flex",
              gap: "16px",
              alignItems: "flex-start",
              marginBottom: "16px",
            }}
          >
            <div style={{ flex: 1 }}>
              <Form.Item label="Add Time Slot" style={{ marginBottom: 0 }}>
                <TimePicker
                  format="HH:mm"
                  onChange={handleAddTime}
                  placeholder="Select time"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </div>

            <div style={{ flex: 1 }}>
              <Form.Item
                label="Available Times"
                name="available_times"
                rules={[
                  {
                    required: true,
                    message: "Please add at least one time",
                  },
                ]}
                style={{ marginBottom: 0 }}
              >
                <Select
                  mode="tags"
                  value={timeSlots}
                  open={false}
                  style={{ width: "100%" }}
                  placeholder="Selected time slots"
                />
              </Form.Item>
            </div>
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default Avaibilty;
