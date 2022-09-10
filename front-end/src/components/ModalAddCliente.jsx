import React, { useEffect, useState, useContext } from 'react';
import { Button, Form, Row } from 'react-bootstrap';
import instance from '../axios';
import contextGlobal from '../Context/myContext';
import style from '../styles/ModalAddCliente.module.css';
import formaterCurrency from '../utils/formaterCurrency';
import { Formik } from 'formik';
import * as yup from 'yup';
import translation from '../utils/translation';

yup.setLocale(translation);

const schemas = {
  user: yup.object().shape({
    name: yup.string().min(2).required(),
    email: yup.string().email().required(),
    totalValue: yup.number().min(20).required(),
    phoneNumber: yup.string().min(11).max(11).required(),
    service: yup.string().required(),
    qtyInstallments: yup.string().required()
  }),
  installment: yup.object().shape({
    userId: yup.number().required(),
    totalValue: yup.number().min(20).required(),
    qtyInstallments: yup.string().required(),
    service: yup.string().required(),
  })
};

const innitValues = {
  user: {
    totalValue: 20,
    qtyInstallments: 1,
    name: '',
    email: '',
    phoneNumber: '',
    service: ''
  },
  installment: {
    userId: 1,
    totalValue: 20,
    qtyInstallments: 1,
    service: ''
  }
};

export default function ModalAddCliente({ type = 'user' }) {
  const { modal, searchBar, user } = useContext(contextGlobal);
  const [userId, setUserId] = useState(user[0]?.id || 1);

  const submit = async (values, { resetForm }) => {
    const payload = type === 'user' ? values : {
      userId,
      totalValue: values.totalValue,
      qtyInstallments: values.qtyInstallments,
      service: values.service
    };
    await instance.post(`/${type}/create`, payload);
    await searchBar.getAllUser();

    resetForm();
    modal.setIsViewModal(!modal.isViewModal);
  };

  useEffect(() => () => { }, []);

  return (
    <Formik
      validationSchema={schemas[type]}
      initialValues={innitValues[type]}
      enableReinitialize
      onSubmit={submit}
    >
      {({
        handleSubmit,
        handleChange,
        handleReset,
        values,
        errors,
      }) => (
        <Form noValidate onSubmit={handleSubmit} className={`${style.form_container} ${style.form_gap}`}>
          {
            type === 'user' ?
              (
                <>
                  <Form.Group className="position-relative">
                    <Form.Label>Nome do cliente</Form.Label>
                    <Form.Control

                      isValid={!errors.name}
                      isInvalid={!!errors.name}
                      value={values.name}
                      name="name"
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type='invalid' tooltip>{errors.name?.replace('name', 'Nome')}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="position-relative">
                    <Form.Label>Numero de telefone</Form.Label>
                    <Form.Control isInvalid={!!errors.phoneNumber} isValid={!errors.phoneNumber} value={values.phoneNumber} name="phoneNumber" onChange={handleChange} />
                    <Form.Control.Feedback type='invalid' tooltip>{errors.phoneNumber?.replace('phoneNumber', 'Numero de telefone')}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="position-relative">
                    <Form.Label>Email</Form.Label>
                    <Form.Control isInvalid={!!errors.email} type="email" isValid={!errors.email} required value={values.email} name="email" onChange={handleChange} />
                    <Form.Control.Feedback type='invalid' tooltip>{errors.email?.replace('email', 'Email')}</Form.Control.Feedback>
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
          <Form.Group className="position-relative">
            <Form.Label>Procedimento</Form.Label>
            <Form.Control as="textarea" style={{ minHeight: '50px', height: 'fit-content' }} isInvalid={!!errors.service} isValid={!errors.service} required value={values.service} name="service" onChange={handleChange} />
            <Form.Control.Feedback type='invalid' tooltip>{errors.service?.replace('service', 'Procedimento')}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="position-relative">
            <Form.Label>Valor total a pagar</Form.Label>
            <Form.Control isInvalid={!!errors.totalValue} isValid={!errors.totalValue} required value={values.totalValue} type="number" name="totalValue" onChange={handleChange} />
            <Form.Control.Feedback type='invalid' tooltip>{errors.totalValue?.replace('totalValue', 'O Valor total')}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="position-relative">
            <Form.Label>Parcelas</Form.Label>
            <Form.Select isInvalid={!!errors.qtyInstallments} isValid={!errors.qtyInstallments} value={values.qtyInstallments} onChange={handleChange} name="qtyInstallments">
              <option value="1">1x sem juros - {formaterCurrency(values.totalValue / 1)}</option>
              <option value="2">2x sem juros - {formaterCurrency(values.totalValue / 2)}</option>
              <option value="3">3x sem juros - {formaterCurrency(values.totalValue / 3)}</option>
              <option value="4">4x sem juros - {formaterCurrency(values.totalValue / 4)}</option>
              <option value="5">5x sem juros - {formaterCurrency(values.totalValue / 5)}</option>
            </Form.Select>
          </Form.Group>
          <Row className={style.group_button}>
            <Button onClick={() => { handleReset(); modal.setIsViewModal(!modal.isViewModal); }} variant="outline-secondary" size="sm" type="button" >
              Cancelar
            </Button>
            <Button size="sm" type="submit" >
              Criar
            </Button>
          </Row>
        </Form>
      )
      }
    </Formik >

  );
}
