import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../redux/contacts/contactsSlice';
import './Filter.css';

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.selectfilter);

  const handleFilterChange = e => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <div className="Filter">
      <label>
        Filter contacts by name:
        <input type="text" value={filter} onChange={handleFilterChange} />
      </label>
    </div>
  );
};

export default Filter;
