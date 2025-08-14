







import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const Loading = ({ children, isLoading }) => {
  return (
    <>
      {children ? (
        <>
          <Spin spinning={isLoading}>{children}</Spin>
        </>
      ) : (
        <div
          className="centerAbsolute"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spin size="large" />
        </div>
      )}
    </>
  );
};

export default Loading;
