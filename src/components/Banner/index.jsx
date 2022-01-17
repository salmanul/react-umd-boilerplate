import React from 'react';
import {Row, Col} from 'antd';

import deptPublicWorks from '../../images/dept-public-works.png';

export const Banner = ({ibmsLogo})=>(
    <Row className='App__banner'>
      <Col md={4} flex={1}>
        <img className="App__banner-logo" alt='ibms' src={ibmsLogo}/>
      </Col>
      <Col md={4} push={0}>
      </Col>
      <Col md={4}>
        <img className="App__banner-logo" alt="dept-public-works" src={deptPublicWorks}/>
      </Col>
    </Row>
)