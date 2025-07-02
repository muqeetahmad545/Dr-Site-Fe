import { useLocation, useNavigate } from "react-router-dom";
import {
  PlusOutlined,
  MinusCircleOutlined,
  EyeOutlined,
} from "@ant-design/icons";

import {
  Descriptions,
  Button,
  Card,
  Modal,
  Form,
  DatePicker,
  Input,
  message,
  Space,
  Row,
  Col,
  Table,
} from "antd";
import { useEffect, useState } from "react";
import { PrimaryButton } from "../../components/PrimaryButton";
import {
  useGenerateSickLeaveMutation,
  useGeneratePrescriptionMutation,
} from "../../features/api/doctor/doctorApi";
import type { Medication, Prescription, SickLeaveRequest } from "../../types";
import type { Dayjs } from "dayjs";
import { useParams } from "react-router-dom";
import { useGetAppointmentByIdQuery } from "../../features/api/doctor/doctorApi";
import jsPDF from "jspdf";

const AppointmentDetails = () => {
  const [sickLeaveForm] = Form.useForm();
  const [prescriptionForm] = Form.useForm();
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const patient = location.state?.patient;

  const [sickLeaveModalVisible, setSickLeaveModalVisible] = useState(false);
  const [startDate, setStartDate] = useState<Dayjs | null>(null);

  const [prescriptionModalVisible, setPrescriptionModalVisible] =
    useState(false);
  const [form] = Form.useForm();

  const [medications, setMedications] = useState([
    { name: "", dosage: "", frequency: "", duration: "", instructions: "" },
  ]);
  const [tests, setTests] = useState([""]);

  const [generateSickLeave, { isLoading }] = useGenerateSickLeaveMutation();
  const [generatePrescription, { isLoading: isPrescriptionLoading }] =
    useGeneratePrescriptionMutation();
  const { data, error, refetch } = useGetAppointmentByIdQuery(id!);
  const appointment = data?.data;
  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id]);

  // Disable dates in endDate before or equal to startDate
  const disabledEndDate = (current: any) => {
    if (!startDate) return false;
    return current && current <= startDate.endOf("day");
  };

  if (!patient) return <div>No appointment data found.</div>;

  const getErrorMessages = (errorFields: any[]) => {
    return errorFields.map((field) => field.errors.join(", ")).join("; ");
  };

  const handleSickLeaveSubmit = async () => {
    try {
      const values = await sickLeaveForm.validateFields();
      const res = await generateSickLeave({
        appointmentId: patient.id,
        age: patient.age,
        startDate: values.startDate.format("YYYY-MM-DD"),
        endDate: values.endDate.format("YYYY-MM-DD"),
        reason: values.reason,
      }).unwrap();

      message.success(res.message || "Sick leave generated successfully.");
      setSickLeaveModalVisible(false);
      form.resetFields();
    } catch (err: any) {
      if (err.errorFields) {
        console.log("err.errorFields", err.errorFields);
        const errorMessages = getErrorMessages(err.errorFields);
        message.error(`Please fix the following errors: ${errorMessages}`);
      } else {
        message.error(err?.data?.message || "Failed to generate sick leave.");
      }
    }
  };

  const handleCreatePrescription = async () => {
    try {
      const values = await prescriptionForm.validateFields();
      const payload: Prescription = {
        appointmentId: patient.id,
        notes: values.notes,
        age: patient.age,
        // pharmacy: patient.pharmacy, // from your patient data
        testsRecommended: tests.filter((t) => t.trim() !== ""),
        medications,
      };
      // Call API with the constructed payload
      const res = await generatePrescription(payload).unwrap();

      message.success(res.message || "Prescription generated successfully.");
      setPrescriptionModalVisible(false);
      form.resetFields();

      // Reset medications and tests to initial states
      setMedications([
        { name: "", dosage: "", frequency: "", duration: "", instructions: "" },
      ]);
      setTests([""]);
    } catch (err: any) {
      if (err.errorFields) {
        const errorMessages = getErrorMessages(err.errorFields);
        message.error(`Please fix the following errors: ${errorMessages}`);
      } else {
        message.error(err?.data?.message || "Failed to generate prescription.");
      }
    }
  };

  if (error || !appointment) return <div>Failed to load appointment.</div>;

  const generatePrescriptionPdfPreview = () => {
    if (!appointment || appointment.prescribed_Medicines?.length === 0) {
      message.warning("No prescription data available.");
      return;
    }
    const doc = new jsPDF();
    doc.setFontSize(16);
    const title = "Prescription Details";
    const pageWidth = doc.internal.pageSize.getWidth();
    const textWidth = doc.getTextWidth(title);
    const x = (pageWidth - textWidth) / 2;
    doc.setFontSize(16);
    doc.text(title, x, 20);
    doc.setFontSize(12);
    let y = 30;

    const { patient } = appointment;

    doc.text(
      `Patient Name: ${patient?.user?.first_name || ""} ${
        patient?.user?.last_name || ""
      }`,
      14,
      y
    );
    y += 8;
    doc.text(`Email: ${patient?.user?.email}`, 14, y);
    y += 8;
    doc.text(`Phone: ${patient?.user?.phone}`, 14, y);
    y += 8;
    doc.text(`Appointment Date: ${appointment.appointment_date}`, 14, y);
    y += 8;

    doc.setFontSize(14);
    doc.text("Doctor's Notes", 14, y);
    y += 8;
    doc.setFontSize(12);
    doc.text(appointment.notes || "N/A", 14, y);
    y += 12;

    appointment.prescribed_Medicines?.forEach((med, index) => {
      doc.text(`${index + 1}. Drug: ${med.drug_name}`, 14, y);
      y += 6;
      doc.text(`   Dosage: ${med.dosage}`, 14, y);
      y += 6;
      doc.text(`   Frequency: ${med.frequency}`, 14, y);
      y += 6;
      doc.text(`   Duration: ${med.duration}`, 14, y);
      y += 6;
      doc.text(`   Instructions: ${med.instructions}`, 14, y);
      y += 10;
    });

    const pdfBlob = doc.output("blob");
    const blobUrl = URL.createObjectURL(pdfBlob);
    window.open(blobUrl, "_blank");
  };
  const generateSickLeavePdfPreview = () => {
    if (!appointment || !appointment.sickLeaves) {
      message.warning("No sick leave data available.");
      return;
    }

    const sickLeaves = Array.isArray(appointment.sickLeaves)
      ? appointment.sickLeaves
      : [appointment.sickLeaves]; // wrap single object as array

    if (sickLeaves.length === 0) {
      message.warning("No sick leave data available.");
      return;
    }

    const doc = new jsPDF();

    doc.setFontSize(16);
    const title = "Sick Leave Details";
    const pageWidth = doc.internal.pageSize.getWidth();
    const textWidth = doc.getTextWidth(title);
    const x = (pageWidth - textWidth) / 2;
    doc.text(title, x, 20);

    doc.setFontSize(12);
    let y = 30;

    const { patient } = appointment;

    doc.text(
      `Patient Name: ${patient?.user?.first_name || ""} ${
        patient?.user?.last_name || ""
      }`,
      14,
      y
    );
    y += 8;
    doc.text(`Email: ${patient?.user?.email || "N/A"}`, 14, y);
    y += 8;
    doc.text(`Phone: ${patient?.user?.phone || "N/A"}`, 14, y);
    y += 8;
    doc.text(
      `Appointment Date: ${appointment.appointment_date || "N/A"}`,
      14,
      y
    );
    y += 12;

    sickLeaves.forEach((leave, index) => {
      doc.text(
        `${index + 1}. From: ${leave.startDate} To: ${leave.endDate}`,
        14,
        y
      );
      y += 6;
      doc.text(`   Reason: ${leave.reason}`, 14, y);
      y += 6;
      doc.text(`   Age: ${leave.age}`, 14, y);
      y += 10;
    });

    const pdfBlob = doc.output("blob");
    const blobUrl = URL.createObjectURL(pdfBlob);
    window.open(blobUrl, "_blank");
  };

  const prescriptionColumns = [
    {
      title: "Drug Name",
      dataIndex: "drug_name",
      key: "drug_name",
    },
    {
      title: "Dosage",
      dataIndex: "dosage",
      key: "dosage",
    },
    {
      title: "Frequency",
      dataIndex: "frequency",
      key: "frequency",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Instructions",
      dataIndex: "instructions",
      key: "instructions",
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <EyeOutlined
          style={{ fontSize: 18, color: "#1890ff", cursor: "pointer" }}
          onClick={generatePrescriptionPdfPreview}
        />
      ),
    },
  ];

  const sickLeaveColumns = [
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <EyeOutlined
          style={{ fontSize: 18, color: "#1890ff", cursor: "pointer" }}
          onClick={generateSickLeavePdfPreview}
        />
      ),
    },
  ];

  return (
    <Card
      title="Appointment Information"
      extra={<Button onClick={() => navigate(-1)}>Back</Button>}
    >
      <Descriptions bordered column={1} labelStyle={{ fontWeight: "bold" }}>
        <Descriptions.Item label="Patient Name">
          {patient.name}
        </Descriptions.Item>
        <Descriptions.Item label="Age">{patient.age}</Descriptions.Item>
        <Descriptions.Item label="Email">{patient.email}</Descriptions.Item>
        <Descriptions.Item label="Phone">{patient.phone}</Descriptions.Item>
        <Descriptions.Item label="Appointment Date">
          {patient.appointment_date}
        </Descriptions.Item>
        <Descriptions.Item label="Appointment Time">
          {patient.appointment_time}
        </Descriptions.Item>
        <Descriptions.Item label="Symptoms">
          {patient.symptoms}
        </Descriptions.Item>
        <Descriptions.Item label="Nearest Pharmacy">
          {patient.pharmacy}
        </Descriptions.Item>
      </Descriptions>
      <Space style={{ marginTop: 24 }} className="flex justify-end">
        <Button onClick={() => setPrescriptionModalVisible(true)}>
          Create Prescription
        </Button>
        <PrimaryButton onClick={() => setSickLeaveModalVisible(true)}>
          Generate Sick Leave
        </PrimaryButton>
      </Space>
      {/* Sick Leave Modal */}
      <Modal
        title="Generate Sick Leave"
        open={sickLeaveModalVisible}
        onCancel={() => {
          setSickLeaveModalVisible(false);
          form.resetFields();
        }}
        onOk={handleSickLeaveSubmit}
        okText="Generate"
        confirmLoading={isLoading}
        afterClose={() => sickLeaveForm.resetFields()}
      >
        <Form form={sickLeaveForm} layout="vertical">
          <Form.Item label="Email">
            <Input value={patient.email} disabled />
          </Form.Item>
          <Form.Item label="Email">
            <Input value={patient.age} disabled />
          </Form.Item>
          <Form.Item
            name="startDate"
            label="Start Date"
            rules={[{ required: true, message: "Please select start date" }]}
          >
            <DatePicker
              style={{ width: "100%" }}
              onChange={(date) => setStartDate(date)}
            />
          </Form.Item>

          <Form.Item
            name="endDate"
            label="End Date"
            dependencies={["startDate"]}
            rules={[
              { required: true, message: "Please select end date" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  const start = getFieldValue("startDate");
                  if (!value || !start) {
                    return Promise.resolve();
                  }
                  if (value.isAfter(start, "day")) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("End date must be greater than start date")
                  );
                },
              }),
            ]}
          >
            <DatePicker
              style={{ width: "100%" }}
              disabledDate={disabledEndDate}
            />
          </Form.Item>
          <Form.Item
            name="reason"
            label="Reason"
            rules={[{ required: true, message: "Please enter reason" }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>
      {/* Prescription Modal */}
      <Modal
        title="Generate Prescription"
        open={prescriptionModalVisible}
        onCancel={() => {
          setPrescriptionModalVisible(false);
          form.resetFields();
        }}
        onOk={handleCreatePrescription}
        okText="Generate"
        confirmLoading={isPrescriptionLoading}
        width={1000}
        afterClose={() => prescriptionForm.resetFields()}
      >
        <Form form={prescriptionForm} layout="vertical">
          <Form.Item label="Pharmacy">
            <Input value={patient.pharmacy} disabled />
          </Form.Item>
          <Form.Item label="Patient Email">
            <Input value={patient.email} disabled />
          </Form.Item>

          <Form.Item label="Medications">
            {medications.map((med, index) => (
              <Row
                gutter={12}
                key={index}
                align="middle"
                style={{ marginBottom: 12 }}
              >
                <Col span={5}>
                  <Form.Item
                    name={["medications", index, "name"]}
                    rules={[{ required: true, message: "Name is required" }]}
                  >
                    <Input
                      placeholder="Name"
                      value={med.name}
                      onChange={(e) => {
                        const updated = [...medications];
                        updated[index].name = e.target.value;
                        setMedications(updated);
                      }}
                    />
                  </Form.Item>
                </Col>

                <Col span={4}>
                  <Form.Item
                    name={["medications", index, "dosage"]}
                    rules={[{ required: true, message: "Dosage is required" }]}
                  >
                    <Input
                      placeholder="Dosage"
                      value={med.dosage}
                      onChange={(e) => {
                        const updated = [...medications];
                        updated[index].dosage = e.target.value;
                        setMedications(updated);
                      }}
                    />
                  </Form.Item>
                </Col>

                <Col span={4}>
                  <Form.Item
                    name={["medications", index, "frequency"]}
                    rules={[
                      { required: true, message: "Frequency is required" },
                    ]}
                  >
                    <Input
                      type="number"
                      min={1}
                      placeholder="Times per day"
                      value={med.frequency ? parseInt(med.frequency) : ""}
                      onChange={(e) => {
                        const numericValue = e.target.value;
                        const updated = [...medications];
                        updated[index].frequency = numericValue
                          ? `${numericValue} times per day`
                          : "";
                        setMedications(updated);
                      }}
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>

                <Col span={4}>
                  <Form.Item
                    name={["medications", index, "duration"]}
                    rules={[
                      { required: true, message: "duration are required" },
                    ]}
                  >
                    <Input
                      type="number"
                      min={1}
                      placeholder="Duration (in days)"
                      value={
                        med.duration ? med.duration.replace(/\D/g, "") : ""
                      }
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        const updated = [...medications];
                        updated[index].duration =
                          val && !isNaN(val)
                            ? `${val} day${val > 1 ? "s" : ""}`
                            : "";
                        setMedications(updated);
                      }}
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>

                <Col span={5}>
                  <Form.Item
                    name={["medications", index, "instructions"]}
                    rules={[
                      { required: true, message: "Instructions are required" },
                    ]}
                  >
                    <Input
                      placeholder="Instructions"
                      value={med.instructions}
                      onChange={(e) => {
                        const updated = [...medications];
                        updated[index].instructions = e.target.value;
                        setMedications(updated);
                      }}
                    />
                  </Form.Item>
                </Col>

                <Col span={2} className="flex items-center justify-center mb-6">
                  <MinusCircleOutlined
                    onClick={() => {
                      const updated = medications.filter((_, i) => i !== index);
                      setMedications(updated);
                    }}
                    style={{ color: "red", fontSize: 18 }}
                  />
                </Col>
              </Row>
            ))}

            <PrimaryButton
              type="dashed"
              onClick={() =>
                setMedications([
                  ...medications,
                  {
                    name: "",
                    dosage: "",
                    frequency: "",
                    duration: "",
                    instructions: "",
                  },
                ])
              }
              icon={<PlusOutlined />}
              block
            >
              Add Medication
            </PrimaryButton>
          </Form.Item>

          <Form.Item
            name="notes"
            label="Doctor's Notes"
            rules={[{ required: true, message: "Please enter notes" }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>

          {/* <Form.Item label="Tests Recommended">
            {tests.map((test, index) => (
              <Row
                gutter={12}
                key={index}
                align="middle"
                style={{ marginBottom: 8 }}
              >
                <Col span={22}>
                  <Input
                    placeholder="Test Name"
                    value={test}
                    onChange={(e) => {
                      const updated = [...tests];
                      updated[index] = e.target.value;
                      setTests(updated);
                    }}
                  />
                </Col>
                <Col span={2} className="flex items-center justify-center">
                  <MinusCircleOutlined
                    onClick={() => {
                      const updated = tests.filter((_, i) => i !== index);
                      setTests(updated);
                    }}
                    style={{ color: "red", fontSize: 18 }}
                  />
                </Col>
              </Row>
            ))}
            <PrimaryButton
              type="dashed"
              onClick={() => setTests([...tests, ""])}
              icon={<PlusOutlined />}
              block
            >
              Add Test
            </PrimaryButton>
          </Form.Item> */}
        </Form>
      </Modal>
      {/* Sick Leave Card */}
      <Card title="" style={{ marginTop: 24 }}>
        <Descriptions bordered column={1} labelStyle={{ fontWeight: "bold" }}>
          <Descriptions.Item label="Doctor Notes">
            {appointment.notes}
          </Descriptions.Item>
        </Descriptions>
        <Card title="Prescription Details" style={{ marginTop: 24 }}>
          <Table
            dataSource={
              Array.isArray(appointment?.prescribed_Medicines)
                ? appointment.prescribed_Medicines.map(
                    (med: Medication, index: number) => ({
                      key: index,
                      drug_name: med.drug_name,
                      dosage: med.dosage,
                      frequency: med.frequency,
                      duration: med.duration,
                      instructions: med.instructions,
                    })
                  )
                : []
            }
            columns={prescriptionColumns}
            pagination={false}
          />
        </Card>
      </Card>

      <Card title="Sick Leave Details" style={{ marginTop: 24 }}>
        <Table
          dataSource={
            Array.isArray(appointment?.sickLeaves)
              ? appointment.sickLeaves.map(
                  (leave: SickLeaveRequest, index: number) => ({
                    key: index,
                    startDate: leave.startDate,
                    endDate: leave.endDate,
                    reason: leave.reason,
                    age: leave.age,
                  })
                )
              : []
          }
          columns={sickLeaveColumns}
          pagination={false}
        />
      </Card>
    </Card>
  );
};

export default AppointmentDetails;
