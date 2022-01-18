import React from 'react';
import {Row, Col} from 'antd';


export const Banner = ({ibmsLogo, bannerContent, dpwLogo})=>(
    <Row className='App__banner'>
      <Col md={4} flex={1}>
        <img className="App__banner-logo" alt='ibms' src={ibmsLogo}/>
      </Col>
      <Col md={4} push={0}>
          {bannerContent}
      </Col>
      <Col md={4}>
        <img className="App__banner-logo" alt="dept-public-works" src={dpwLogo}/>
      </Col>
    </Row>
)