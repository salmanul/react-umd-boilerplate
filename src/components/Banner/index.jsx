import React from 'react';
import {Row, Col} from 'antd';
import ibms from '../../images/ibms.png';
import deptPublicWorks from '../../images/dept-public-works.png';

export const Banner = ()=>(
    <Row className='App__banner'>
      <Col span={8}>
        <img className="App__banner-logo" alt='ibms' src={ibms}/>
      </Col>
      <Col span={5} offset={11}>
        <img className="App__banner-logo" alt="dept-public-works" src={deptPublicWorks}/>
      </Col>
    </Row>
)