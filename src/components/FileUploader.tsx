import React from "react";
import { Upload } from "antd";
import type { UploadProps } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

interface FileUploaderProps extends UploadProps {
  label?: string;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  label,
  ...uploadProps
}) => {
  return (
    <div style={{ marginBottom: 16 }}>
      {label && <p style={{ fontWeight: 500, marginBottom: 8 }}>{label}</p>}
      <Dragger {...uploadProps} accept=".pdf,.png,.jpg,.jpeg">
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to upload</p>
        <p className="ant-upload-hint">
          Only PDF, JPG, or PNG files. Max 1 file.
        </p>
      </Dragger>
    </div>
  );
};

export default FileUploader;
