import React from 'react';
import { useContext } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import contextGlobal from '../Context/myContext';
import style from '../styles/SearchBar.module.css';

export default function SearchBar() {
  const { searchBar, currency, modal, type } = useContext(contextGlobal);
  const dates = `?gt=${searchBar.state.gt}&lt=${searchBar.state.lt}`;

  const openModalNewClient = () => {
    type.handleChange('user');
    modal.setIsViewModal(!modal.isViewModal);
  };

  const openModalNewService = () => {
    type.handleChange('installment');
    modal.setIsViewModal(!modal.isViewModal);
  };

  return (
    <Form className={`${style.form_container} ${style.form_gap}`}>
      <Form.Group>
        <Form.Label>Pesquisar</Form.Label>
        <Form.Control placeholder='Digite o nome do paciente' onChange={searchBar.handleChange} name='name' />
      </Form.Group>
      <Row className={style.form_gap}>
        <Form.Group as={Col}>
          <Form.Label>Data de inicio</Form.Label>
          <Form.Control value={searchBar.state.gt} type='date' onChange={searchBar.handleChange} name='gt' />
        </Form.Group>

        <Form.Group as={Col} >
          <Form.Label>Data final</Form.Label>
          <Form.Control value={searchBar.state.lt} type='date' onChange={searchBar.handleChange} name='lt' />
        </Form.Group>
      </Row>
      <Form.Text>
        Valor nesse periodo: <span style={{ color: '#5c940d' }}>{currency}</span>
      </Form.Text>
      <Button onClick={() => searchBar.getAllUser(dates)} variant="primary" type="button" className={style.btn_search}>
        Pesquisar
      </Button>
      <Row className={style.group_button}>
        <Button onClick={openModalNewClient} as={Col} size="sm" type="button" >
          novo cliente
        </Button>
        <Button onClick={openModalNewService} as={Col} size="sm" type="button" >
          novo tratamento
        </Button>
      </Row>
    </Form>
  );
}
