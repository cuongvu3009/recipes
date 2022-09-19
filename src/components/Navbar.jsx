import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Navbar = () => {
  return (
    <Wrapper>
      <Link to='/' className='styledLink'>
        <Left>Cooking Ninja</Left>
      </Link>
      <Right>
        <label htmlFor=''>Search</label>
        <input type='text' />
        <Link className='styledLink' to='/new'>
          <Button>Create recipe</Button>
        </Link>
      </Right>
    </Wrapper>
  );
};

export default Navbar;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 50px;
  background-color: purple;
  color: white;
  font-weight: bold;
`;

const Left = styled.div``;

const Right = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 13px;
  border: none;
`;
