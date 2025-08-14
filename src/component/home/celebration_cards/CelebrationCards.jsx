import React from 'react';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';

const CelebrationCards = ({ cards }) => {
  return (
    <Row gutter={[24, 30]}>
      {cards.map((card, index) => (
        <Col key={index} xs={12} sm={8} md={8} lg={6} xl={4}>
          <Link to = {`/category/${card?.slug}`}>
          <div className="common-cele-cards" data-aos="fade-up" data-aos-delay="60">
            <div className="img-wrapper">
              <img src={card.image} alt={card.title} />
            </div>
            <p>{card.title}</p>
          </div>
          </Link>
        </Col>
      ))}
    </Row>
  );
};

export default CelebrationCards;