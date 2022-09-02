import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import instance from '../axios';
import formaterCurrency from '../utils/formaterCurrency';
import Context from './myContext';

const innitStateSearchBar = {
  name: '',
  gt: new Date().toLocaleDateString('en-CA'),
  lt: '',
};

const innitStateNewCliente = {
  totalValue: 0,
  qtyInstallments: 1,
  name: '',
  email: '',
  phoneNumber: '',
  service: ''
};

export default function Provider({ children }) {
  const [user, setUser] = useState([]);
  const [searchBarState, setSearchBarState] = useState(innitStateSearchBar);
  const [isViewModal, setIsViewModal] = useState(false);
  const [newClienteState, setNewClienteState] = useState(innitStateNewCliente);
  const [typeModal, setTypeModal] = useState('user');

  const value = user.reduce((a, b) => a + +b.installments.reduce((a, b) => +a + +b.value, 0), 0);
  const currency = formaterCurrency(value);

  const getAllUser = (parameter = '') => {
    instance.get(`/user/${parameter}`)
      .then(({ data }) => setUser(data));
  };

  useEffect(getAllUser, []);

  const handleChangeSearchBar = ({ target }) => {
    setSearchBarState(old => ({ ...old, [target.name]: target.value }));
  };

  const handleChangeNewCliente = ({ target }) => {
    setNewClienteState(old => ({ ...old, [target.name]: target.value }));
  };

  const store = {
    user,
    searchBar: {
      state: searchBarState,
      handleChange: handleChangeSearchBar,
      getAllUser
    },
    newCliente: {
      state: newClienteState,
      handleChange: handleChangeNewCliente
    },
    currency,
    modal: { isViewModal, setIsViewModal },
    type: {
      state: typeModal,
      handleChange: setTypeModal
    }
  };

  return (
    <Context.Provider value={store}>
      {children}
    </Context.Provider>
  );
}
