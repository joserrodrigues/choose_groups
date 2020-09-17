import React from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Row,
  Col,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,  
} from "@fortawesome/free-solid-svg-icons";
import CustomButton from "../../Component/Button/CustomButton";


const NoticeController = (props) => {

    const goToPage = () => {
        window.location.href = "http://www.fiap.com.br";
        // window.location.href("http://www.fiap.com.br");
    }
  return (
    <div>
      <Modal isOpen={true} className="enterModal userInfo">
        <ModalHeader>Bem-vindo ao Choose Group do Startup One</ModalHeader>
        <ModalBody>
          <div className="titleModal">
            <Row>
              <Col style={{ marginTop: "20px" }}>
                A data para se cadastrar nos grupos já passou.
              </Col>
            </Row>
            <Row>
              <Col style={{ marginTop: "20px" }}>
                Caso você não tenha escolhido um grupo, será realizado um
                sorteio com outras pessoas do seu curso que também não se
                inscreveram para a formação do grupo.
              </Col>
            </Row>
            <Row>
              <Col style={{ marginTop: "20px" }}>
                O sorteio será realizado no dia {" "}
                <span style={{ fontWeight: "bold", color: "#ED145B" }}>
                   08/06/2020.
                </span>
              </Col>
            </Row>
          </div>
        </ModalBody>
        <ModalFooter>
          <CustomButton
            icon={faPaperPlane}
            text="OK"
            onClick={() => goToPage()}
          />
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default NoticeController;;