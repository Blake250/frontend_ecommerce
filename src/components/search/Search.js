import React from 'react';
import styled from 'styled-components';
import { BiSearch } from 'react-icons/bi';

const Search = ({ value, onChange }) => {
  return (
    <Container>
      <SearchWrapper>
        <SearchIcon>
          <BiSearch size={15} />
        </SearchIcon>
        <SearchInput
          placeholder='Search products'
          type='text'
          name='search'
          value={value}
          onChange={onChange}
        />
      </SearchWrapper>
    </Container>
  );
};

export default Search;

const Container = styled.div`
width:100%;
height:100%;
`

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  justify-content:center;
 margin:12px;
  border-radius: 5px;
  width:280px;
    padding:7px;
  @media (max-width: 768px) {
    width:150px;
    padding:5px;
  }
`;

const SearchIcon = styled.span`
  padding: 0 10px; 
`;

const SearchInput = styled.input`
   width:90px;
    padding:5px;
 @media screen {
    width:90px;
    padding:5px;
  }

  cursor: pointer;
  flex: 1;
  height: 100%;
  border: none;
  outline: none;
padding-right:12px !important;
  ::placeholder {

    color: #999; 

    
  }
`;












