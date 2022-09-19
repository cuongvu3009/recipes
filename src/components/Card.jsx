import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AiOutlineDelete } from 'react-icons/ai';
import { projectFirestore } from '../firebase/config';

const Card = ({ id, title, cookingTime, ingredients, method }) => {
  const handleDelete = () => {
    projectFirestore.collection('cooking-recipes').doc(id).delete();
  };
  return (
    <Wrapper>
      <h2>{title}</h2>
      <Time>{cookingTime} to make</Time>
      <p>{method}</p>

      <Button>
        <Link to={`/detail/${id}`} className='styledLink'>
          Cook this
        </Link>
      </Button>

      <Delete>
        <AiOutlineDelete size={20} onClick={handleDelete} />
      </Delete>
    </Wrapper>
  );
};

export default Card;

const Wrapper = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 200px;
  padding: 20px;
  gap: 5px;
  background-color: #fff;
  position: relative;
`;

const Time = styled.p`
  color: #999;
`;

const Button = styled.button`
  position: absolute;
  bottom: 15px;
  width: fit-content;
  padding: 10px;
  border-radius: 14px;
  cursor: pointer;
  align-self: center;
  margin-top: 5px;
  font-weight: bold;
`;

const Delete = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
`;
