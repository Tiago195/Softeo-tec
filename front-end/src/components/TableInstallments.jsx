import React, { useContext } from 'react';
import contextGlobal from '../Context/myContext';
import { Table } from 'react-bootstrap';
import formaterCurrency from '../utils/formaterCurrency';

export default function TableInstallments() {
  const { user } = useContext(contextGlobal);
  // console.log(user);
  return (
    <Table>
      <thead>
        <tr>
          <th>Cliente</th>
          <th>Valor a pagar</th>
          <th>Parcela</th>
        </tr>
      </thead>
      <tbody>
        {user.map(el => el.installments.map(installment => (
          <tr key={installment.id + installment.month}>
            <td>{el.name}</td>
            <td>{formaterCurrency(installment.value)}</td>
            <td>{installment.month}</td>
          </tr>
        )))}
      </tbody>
    </Table>
  );
}
