import React from 'react';
import {
    Col,
    Row,
    Carousel,
} from 'antd';

import { withTranslation } from 'react-i18next';

import PageContainer from '../../components/container';
import img1 from '../../../assets/images/segueLinha.jpg';
import img2 from '../../../assets/images/segway.jpg';
import img3 from '../../../assets/images/plotter.jpg';
import img4 from '../../../assets/images/guitar.jpg';
import img5 from '../../../assets/images/cubeSolver.jpg';
import img6 from '../../../assets/images/08_05-2.png';
import img7 from '../../../assets/images/10_10-1.jpg';
import img8 from '../../../assets/images/12_09-2.png';
import img9 from '../../../assets/images/19_09-1.png';


const MediasPage = () => (
    <>
        <PageContainer
            onBack={null}
            title="Projeto destaque"
        >
            <Row>
                <Col span={24}>
                    <Carousel autoplay>
                        <div>
                            <img
                                align="middle"
                                style={{
                                    margin: 'auto',
                                    height: '70vh',
                                }}
                                src={img1}
                                alt="Logo Quiz"
                            />
                        </div>
                        <div>
                            <img
                                align="middle"
                                style={{
                                    margin: 'auto',
                                    height: '70vh',
                                }}
                                src={img2}
                                alt="Logo Quiz"
                            />
                        </div>
                        <div>
                            <img
                                align="middle"
                                style={{
                                    margin: 'auto',
                                    height: '70vh',
                                }}
                                src={img3}
                                alt="Logo Quiz"
                            />
                        </div>
                        <div>
                            <img
                                align="middle"
                                style={{
                                    margin: 'auto',
                                    height: '70vh',
                                }}
                                src={img4}
                                alt="Logo Quiz"
                            />
                        </div>
                        <div>
                            <img
                                align="middle"
                                style={{
                                    margin: 'auto',
                                    height: '70vh',
                                }}
                                src={img5}
                                alt="Logo Quiz"
                            />
                        </div>
                        <div>
                            <img
                                align="middle"
                                style={{
                                    margin: 'auto',
                                    height: '70vh',
                                }}
                                src={img6}
                                alt="Logo Quiz"
                            />
                        </div>
                        <div>
                            <img
                                align="middle"
                                style={{
                                    margin: 'auto',
                                    height: '70vh',
                                }}
                                src={img7}
                                alt="Logo Quiz"
                            />
                        </div>
                        <div>
                            <img
                                align="middle"
                                style={{
                                    margin: 'auto',
                                    height: '70vh',
                                }}
                                src={img8}
                                alt="Logo Quiz"
                            />
                        </div>
                        <div>
                            <img
                                align="middle"
                                style={{
                                    margin: 'auto',
                                    height: '70vh',
                                }}
                                src={img9}
                                alt="Logo Quiz"
                            />
                        </div>
                    </Carousel>
                </Col>
            </Row>
        </PageContainer>
    </>
);

export default withTranslation('common')(MediasPage);
