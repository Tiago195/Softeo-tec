import React, { useContext } from 'react';
import contextGlobal from '../Context/myContext';
import { Button, Table } from 'react-bootstrap';
import formaterCurrency from '../utils/formaterCurrency';

export default function TableInstallments() {
  const { user, searchBar: { state }, infoModal, setInstallment } = useContext(contextGlobal);
  const data = user.filter(el => el.name.toLowerCase().includes(state.name.toLowerCase()));

  const openModal = (installmentId, userId) => {
    infoModal.setIsViewModalInfo(true);
    // setInstallmentId({ installmentId, userId });
    const targetUser = user.find(el => el.id === userId);
    const target = targetUser?.installments.find(el => el.id === installmentId);
    const installment = { ...target, name: targetUser.name, phoneNumber: targetUser.phoneNumber, email: targetUser.email };
    setInstallment(installment);
  };

  return (
    <div style={{ overflow: 'auto' }}>
      <Table style={{ textAlign: 'center' }}>
        <thead>
          <tr>
            <th style={{ width: '33%' }}>Cliente</th>
            <th>Valor a pagar</th>
            <th>Parcela</th>
          </tr>
        </thead>
        <tbody>
          {data.map(user => user.installments.map(installment => (
            <tr key={installment.id + installment.month}>
              <td>
                <Button style={{ width: '100%' }} onClick={() => openModal(installment.id, user.id)} variant={installment.isPaid ? 'outline-success' : 'outline-danger'}>
                  {user.name}
                </Button>
              </td>
              <td>{formaterCurrency(installment.value)}</td>
              <td>{new Date(installment.month).toLocaleDateString('pt-br')}</td>
            </tr>
          )))}
        </tbody>
      </Table>
    </div >
  );
}
