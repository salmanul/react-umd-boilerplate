import React from 'react';
import {Row, Col} from 'antd';
import ibms from '../../images/ibms.png';
import deptPublicWorks from '../../images/dept-public-works.png';

export const Banner = ()=>(
    <Row className='App__banner'>
      <Col flex={1}>
        <img className="App__banner-logo" alt='ibms' src={ibms}/>
      </Col>
      <Col>
        <img className="App__banner-logo" alt="dept-public-works" src={deptPublicWorks}/>
      </Col>
    </Row>
)