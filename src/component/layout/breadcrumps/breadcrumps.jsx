import React from 'react';
import './breadcrumps.scss';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';

const Breadcrumbs = ({ items }) => {
  const breadcrumbItems = items.map((item, index) => ({
    title: item.href && !item.active
      ? <Link to={item.href}>{item.label}</Link>
      : item.label,
  }));

  return (
    <div className='container'>
      <Breadcrumb className='breadcrumps-wrap' items={breadcrumbItems} />
    </div>
  );
};

export default Breadcrumbs;