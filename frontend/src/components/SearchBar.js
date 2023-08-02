import React, { useState } from 'react';
import {
  MDBInputGroup,
  MDBBtn
} from 'mdb-react-ui-kit';



const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <>
      <MDBInputGroup className='mb-3'>
        <input className='form-control' placeholder="Introduza o lugar para qual deseja viajar" type='text' />
        <MDBBtn outline onClick={handleSearch}>Pesquisar</MDBBtn>
      </MDBInputGroup>
    </>
  );
};

export default SearchBar;
