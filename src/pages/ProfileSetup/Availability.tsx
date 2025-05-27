import React, { useEffect, useState } from "react";
import { Form, Input, Select } from "antd";
import type { ProfileSetupProps } from "../../types/profile";
import dayjs from "dayjs";

const { Option } = Select;

const Availability: React.FC<ProfileSetupProps> = ({
  form,
  formData,
  setFormData,
}) => {
  const [availability, setAvailability] = useState<Record<string, string[]>>(
    formData.doctor_availabilities || {}
  );

  const [selectedDays, setSelectedDays] = useState<string[]>(
    Object.keys(formData.doctor_availabilities || {})
  );

  useEffect(() => {
    form.setFieldsValue({
      ...formData,
      doctor_availabilities: availability,
    });
  }, [formData, availability, form]);

  const handleValuesChange = (_: any, allValues: any) => {
    setFormData((prev: any) => ({
      ...prev,
      ...allValues,
    }));
  };

  const generateTimeSlots = (
    start: string,
    end: string,
    interval: number
  ): string[] => {
    const startTime = dayjs(start, "HH:mm");
    const endTime = dayjs(end, "HH:mm");
    const times: string[] = [];
    let current = startTime;
    while (current.isBefore(endTime)) {
      times.push(current.format("HH:mm"));
      current = current.add(interval, "minute");
    }
    return times;
  };

  const updateAvailability = (newAvailability: Record<string, string[]>) => {
    setAvailability(newAvailability);
    form.setFieldsValue({ doctor_availabilities: newAvailability });
    setFormData((prev: any) => ({
      ...prev,
      doctor_availabilities: newAvailability,
    }));
  };

  const addTimeSlotString = (day: string, timeStr: string) => {
    const current = availability[day] || [];
    if (!current.includes(timeStr)) {
      const updated = [...current, timeStr].sort();
      const newAvailability = { ...availability, [day]: updated };
      updateAvailability(newAvailability);
    }
  };

  const removeTimeSlot = (day: string, time: string) => {
    const current = availability[day] || [];
    const updated = current.filter((t) => t !== time);
    let newAvailability = { ...availability };
    if (updated.length > 0) {
      newAvailability[day] = updated;
    } else {
      delete newAvailability[day];
    }
    updateAvailability(newAvailability);
  };

  const handleDayChange = (days: string[]) => {
    setSelectedDays(days);

    const newAvailability = { ...availability };
    Object.keys(newAvailability).forEach((day) => {
      if (!days.includes(day)) {
        delete newAvailability[day];
      }
    });

    updateAvailability(newAvailability);

    form.setFieldsValue({
      doctor_availabilities: newAvailability,
    });

    setFormData((prev: any) => ({
      ...prev,
      doctor_availabilities: newAvailability,
      doctor_availabilities_list: days,
    }));
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={formData}
      onValuesChange={handleValuesChange}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Form.Item
          label="IMC Number"
          name="imc"
          rules={[{ required: true, message: "IMC Number is required" }]}
        >
          <Input size="large" placeholder="Enter IMC number" />
        </Form.Item>

        <Form.Item
          label="Specialization"
          name="specialization"
          rules={[{ required: true, message: "Specialization is required" }]}
        >
          <Input size="large" placeholder="e.g. Cardiologist" />
        </Form.Item>
      </div>

      <div className="mt-6 bg-white border rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">
          Set Your Weekly Availability
        </h2>

        <Form.Item
          label="Available Days"
          name="doctor_availabilities_list"
          rules={[{ required: true, message: "Please select available days" }]}
        >
          <Select
            mode="multiple"
            placeholder="Select available days"
            value={selectedDays}
            onChange={handleDayChange}
            size="large"
          >
            {[
              "monday",
              "tuesday",
              "wednesday",
              "thursday",
              "friday",
              "saturday",
              "sunday",
            ].map((day) => (
              <Option key={day} value={day}>
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {selectedDays.map((day) => (
          <div key={day} className="mt-6 border-t pt-4">
            <h3 className="text-lg font-semibold capitalize mb-2">{day}</h3>

            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
              {generateTimeSlots("00:00", "23:00", 30).map((time) => {
                const isSelected = availability[day]?.includes(time);
                return (
                  <button
                    key={time}
                    type="button"
                    onClick={() =>
                      isSelected
                        ? removeTimeSlot(day, time)
                        : addTimeSlotString(day, time)
                    }
                    className={`text-sm rounded px-3 py-1 border font-medium transition ${
                      isSelected
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
                    }`}
                  >
                    {time}
                  </button>
                );
              })}
            </div>

            {(!availability[day] || availability[day].length === 0) && (
              <p className="text-gray-400 text-sm mt-2">
                No slots selected yet
              </p>
            )}
          </div>
        ))}
      </div>
    </Form>
  );
};

export default Availability;
