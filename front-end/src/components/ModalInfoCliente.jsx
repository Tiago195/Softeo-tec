import React from 'react';
import { useContext } from 'react';
import { Button, Container, Modal, Row } from 'react-bootstrap';
import instance from '../axios';
import contextGlobal from '../Context/myContext';

export default function ModalInfoCliente() {
  const { infoModal, installment, user, setUser } = useContext(contextGlobal);
  const { isViewModalInfo, setIsViewModalInfo } = infoModal;

  const changeIsPaid = async () => {
    await instance.patch(`/installment/paid/${installment.id}`);
    // const installment = { ...target, name: targetUser.name };
    setUser(old => {
      const findIndexUser = user.findIndex(el => el.id === installment.userId);
      const findIndexInstallment = user[findIndexUser].installments.findIndex(el => el.id === installment.id);

      // console.log(old[findIndexUser].installments[findIndexInstallment]);
      old[findIndexUser].installments[findIndexInstallment] = { ...old[findIndexUser].installments[findIndexInstallment], isPaid: true };
      return old;
    });
    // console.log(target);
    setIsViewModalInfo(false);
  };
  // console.log(user[0]);
  return (
    <Modal show={isViewModalInfo} onHide={() => setIsViewModalInfo(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Informações da parcela</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row><p>Cliente: {installment?.name}</p></Row>
          <Row><p>Telefone: {installment?.phoneNumber}</p></Row>
          <Row><p>E-mail: {installment?.email}</p></Row>
          <Row><p>Valor a pagar: {installment?.value}</p></Row>
          <Row><p>Data de vencimento: {new Date(installment?.month).toLocaleDateString('pt-br')}</p></Row>
          <Row><p>Está Pago: {installment?.isPaid ? 'Sim' : 'Não'}</p></Row>
          <Row><p>Procedimento: {installment?.service}</p></Row>
          {!installment?.isPaid && (
            <Row>
              <Button onClick={changeIsPaid} variant='success'>Declarar que o cliente pagou</Button>
            </Row>
          )}
        </Container>
      </Modal.Body>
    </Modal>
  );
}
