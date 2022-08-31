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

export default function Provider({ children }) {
  const [user, setUser] = useState([]);
  const [searchBarState, setSearchBarState] = useState(innitStateSearchBar);

  const value = user.reduce((a, b) => a + +b.installments.reduce((a, b) => +a + +b.value, 0), 0);
  const currency = formaterCurrency(value);

  const getAllUser = (parameter = '') => {
    instance.get(`/user/${parameter}`)
      .then(({ data }) => setUser(data));
  };

  useEffect(getAllUser, []);

  const handleChange = ({ target }) => {
    setSearchBarState(old => ({ ...old, [target.name]: target.value }));
  };

  const store = {
    user,
    searchBar: {
      state: searchBarState,
      handleChange,
      getAllUser
    },
    currency
  };

  return (
    <Context.Provider value={store}>
      {children}
    </Context.Provider>
  );
}
