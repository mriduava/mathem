import React, { useState } from 'react'
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

const Footer = (props) => {

    const [aboutModal, setAboutModal] = useState(false)
    const [contacUsModal, setContactUsModal] = useState(false)

    const toggleAbout = () => setAboutModal(!aboutModal)
    const toggleContactUs = () => setContactUsModal(!contacUsModal)

    return (
        <footer className="container-fluid">
            <Row className="foot-wave">
                <svg className="mriduwave" viewBox="-8.229 769.591 1921.848 310.409">
                    <path fill="rgba(219,219,219,1)" stroke="rgba(191,191,191,1)" strokeWidth="1px" strokeLinejoin="miter" strokeLinecap="butt" 
                        strokeMiterlimit="4" shapeRendering="auto" id="mriduwave" 
                        d="M 601.6828002929688 780.1812744140625 C 735.0966796875 771.4804077148438 782.5015258789063 899.0936889648438 
                        924.6163330078125 922.296142578125 C 1066.731079101563 945.4985961914063 1170.142211914063 809.184326171875 
                        1355.761474609375 899.0936889648438 C 1541.380737304688 989.0030517578125 1624.58935546875 777.2809448242188 
                        1754.102905273438 780.1812744140625 C 1883.616455078125 783.0816040039063 1913.619506835938 838.4907836914063 
                        1913.619506835938 838.4907836914063 L 1913.619506835938 1080 L -5.802525997161865 1080 C -5.802525997161865 1080 
                        -11.2615270614624 920.1119384765625 -5.802525997161865 858.4894409179688 C 2.320242404937744 800.4833984375 
                        61.2871208190918 771.875 107.7700347900391 769.590576171875 C 169.1837615966797 769.590576171875 163.7371673583984 
                        835.2869873046875 314.5528869628906 858.4894409179688 C 465.3685913085938 881.69189453125 468.2689208984375 
                        788.8821411132813 601.6828002929688 780.1812744140625 Z">
                    </path>
                </svg>
                <Col cs="12" className="text-light p-3 text-center" style={{backgroundColor: '#294360'}}>
                <div className="about-mathem">
                    <Button style={{background: 'rgba(52, 52, 52, 0)', border: 'none'}} onClick={toggleAbout} className="footer-button">About</Button>
                    <Modal isOpen={aboutModal} toggle={toggleAbout} className="about-us">
                        <ModalHeader toggle={toggleAbout}>About mathem</ModalHeader>
                        <ModalBody>
                            Mathem is a website where you can compare prices of food, drinks and more from CityGross, Willys and Mathem.
                            <br></br><br></br>This site is created by Maruf, Martin, Anton and Hampus.
                        </ModalBody>
                        <ModalFooter>
                            <Button style={{color: 'rgba(219,219,219,1)'}} onClick={toggleAbout}>Close</Button>
                        </ModalFooter>
                        </Modal>
                </div>
                <div className="contact-us">
                    <Button style={{background: 'rgba(52, 52, 52, 0)', border: 'none'}} onClick={toggleContactUs} className="footer-button">Contact us</Button>
                    <Modal isOpen={contacUsModal} toggle={toggleContactUs} className="contact-us">
                        <ModalHeader toggle={toggleContactUs}>Contact us</ModalHeader>
                        <ModalBody>
                            Email: mathemLund@mathem.se
                            <br></br>
                            Phone: 0742857991
                        </ModalBody>
                        <ModalFooter>
                            <Button style={{color: 'rgba(219,219,219,1)'}} onClick={toggleContactUs}>Close</Button>
                        </ModalFooter>
                    </Modal>
                </div>
                    &copy; 2020 MATHEM
                </Col>
                
            </Row>
            
        </footer>
    )
}

export default Footer