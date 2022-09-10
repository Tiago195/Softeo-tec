import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import instance from '../axios';
import Context from './myContext';
import getTotalValue from '../utils/getTotalValue';
import getPartialValue from '../utils/getPartialValue';

const innitStateSearchBar = {
  email: '',
  gt: new Date().toLocaleDateString('en-CA'),
  lt: new Date(new Date().getFullYear(), 11, 31).toLocaleDateString('en-CA'),
};

const innitSateInstallment = {
  name: '',
  service: '',
  month: '',
  isPaid: '',
};

export default function Provider({ children }) {
  const [user, setUser] = useState([]);
  const [searchBarState, setSearchBarState] = useState(innitStateSearchBar);
  const [isViewModal, setIsViewModal] = useState(false);
  const [isViewModalInfo, setIsViewModalInfo] = useState(false);
  const [installment, setInstallment] = useState(innitSateInstallment);
  const [currency, setCurrency] = useState({ totalValue: 0, value: 0 });

  const [typeModal, setTypeModal] = useState('user');

  const getAllUser = async (parameter = '') => {
    const { data } = await instance.get(`/user/${parameter}`);
    setUser(data);
    setCurrency({
      totalValue: getTotalValue(data),
      value: getPartialValue(data),
    });
    return data;
  };

  useEffect(() => {
    getAllUser(`?gt=${searchBarState.gt}&lt=${searchBarState.lt}`);
  }, []);

  const handleChangeSearchBar = ({ target }) => {
    setSearchBarState(old => ({ ...old, [target.name]: target.value }));
  };

  const store = {
    user, setUser,
    searchBar: {
      state: searchBarState,
      handleChange: handleChangeSearchBar,
      getAllUser
    },
    currency, setCurrency,
    modal: { isViewModal, setIsViewModal },
    infoModal: { isViewModalInfo, setIsViewModalInfo },
    type: {
      state: typeModal,
      handleChange: setTypeModal
    },
    installment, setInstallment
  };

  return (
    <Context.Provider value={store}>
      {children}
    </Context.Provider>
  );
}
