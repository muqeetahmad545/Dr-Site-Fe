import { Table, Card, Tag } from "antd";
import { useNavigate } from "react-router-dom";
// import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { PrimaryButton } from "../../components/PrimaryButton";
import { useGetAdminsQuery } from "../../features/api/superAdmin/superAdminApi";
import { useEffect } from "react";

const Admin = () => {
  const { data: adminList, isLoading, refetch } = useGetAdminsQuery();

  useEffect(() => {
    refetch();
  }, []);
  const navigate = useNavigate();

  const handelAddAdmin = () => {
    navigate("../add-admin");
  };

  // const handelEditAppointment = (id: any) => {
  //   navigate(`../edit-admin/${id}`);
  // };

  const columns = [
    {
      title: "Name",
      key: "name",
      render: (record: any) => `${record.first_name} ${record.last_name}`,
    },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Gender", dataIndex: "gender", key: "gender" },
    { title: "Contact", dataIndex: "phone", key: "phone" },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: string) =>
        status === "active" ? (
          <Tag color="green">Active</Tag>
        ) : (
          <Tag color="red">Inactive</Tag>
        ),
    },
    // {
    //   title: "Actions",
    //   render: (_: any, _record: any) => (
    //     <>
    //       <EditOutlined
    //         // onClick={() => handelEditAppointment(record.id)}
    //         style={{ marginRight: 16, color: "#1890ff" }}
    //       />
    //       <DeleteOutlined
    //         // onClick={() => handelDeleteAppointment(record.id)}
    //         style={{ color: "#ff4d4f" }}
    //       />
    //     </>
    //   ),
    // },
  ];

  return (
    <Card
      className="Admin"
      title={
        <div className="flex items-center justify-between w-full">
          <span className="text-lg font-semibold">Admins</span>
          <div>
            <PrimaryButton onClick={handelAddAdmin}>Add Admin</PrimaryButton>
          </div>
        </div>
      }
    >
      <Table
        columns={columns}
        dataSource={adminList?.data || []}
        rowKey="id"
        loading={isLoading}
      />
    </Card>
  );
};

export default Admin;
