import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import instance from '../axios';
import contextGlobal from '../Context/myContext';
import style from '../styles/ModalAddCliente.module.css';
import formaterCurrency from '../utils/formaterCurrency';

export default function ModalAddCliente({ type = 'user' }) {
  const { newCliente, modal, searchBar, user } = useContext(contextGlobal);
  const { state, handleChange } = newCliente;
  const [userId, setUserId] = useState(user[0].id);

  const onClick = async () => {
    const payload = type === 'user' ? state : {
      userId,
      totalValue: state.totalValue,
      qtyInstallments: state.qtyInstallments,
      service: state.service
    };
    await instance.post(`/${type}/create`, payload);
    await searchBar.getAllUser();
    modal.setIsViewModal(!modal.isViewModal);
  };

  return (
    <>
      <Form className={`${style.form_container} ${style.form_gap}`}>
        {
          type === 'user' ?
            (
              <>
                <Form.Group>
                  <Form.Label>Nome do cliente</Form.Label>
                  <Form.Control name="name" onChange={handleChange} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Numero de telefone</Form.Label>
                  <Form.Control name="phoneNumber" onChange={handleChange} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control name="email" onChange={handleChange} />
                </Form.Group>
              </>
            )
            : (
              <>
                <Form.Label>Nome do cliente</Form.Label>
                <Form.Select onChange={({ target }) => setUserId(target.value)}>
                  {user.map(el => (
                    <option key={el.id} value={el.id}>{el.name}</option>
                  ))}
                </Form.Select>
              </>
            )
        }
        <Row>
          <Form.Group as={Col}>
            <Form.Label>Procedimento</Form.Label>
            <Form.Control name="service" onChange={handleChange} />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Valor total a pagar</Form.Label>
            <Form.Control type="number" name="totalValue" onChange={handleChange} />
          </Form.Group>
        </Row>
        <Form.Group>
          <Form.Label>Parcelas</Form.Label>
          <Form.Select onChange={handleChange} name="qtyInstallments">
            <option value="1">1x sem juros - {formaterCurrency(state.totalValue / 1)}</option>
            <option value="2">2x sem juros - {formaterCurrency(state.totalValue / 2)}</option>
            <option value="3">3x sem juros - {formaterCurrency(state.totalValue / 3)}</option>
            <option value="4">4x sem juros - {formaterCurrency(state.totalValue / 4)}</option>
            <option value="5">5x sem juros - {formaterCurrency(state.totalValue / 5)}</option>
          </Form.Select>
        </Form.Group>
      </Form>
      <Row className={style.group_button}>
        <Button onClick={() => modal.setIsViewModal(!modal.isViewModal)} variant="secondary" as={Col} size="sm" type="button" >
          Cancelar
        </Button>
        <Button onClick={onClick} as={Col} size="sm" type="button" >
          Criar
        </Button>
      </Row>
    </>
  );
}
