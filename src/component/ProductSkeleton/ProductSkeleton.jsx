  
  import "./ProductSkeleton.scss";

  import {
  Col,
 
  Skeleton,
} from "antd"

 export  const ProductSkeleton = () => (
    <Col xs={24} sm={12} md={12} lg={6} xl={6}>
      <div style={{ padding: 12 }}>
        <Skeleton.Image active style={{ width: "100%", height: 300,marginBottom:10 }} />
        <Skeleton className="" active paragraph={{ rows: 2 }} />
      </div>
    </Col>
  );