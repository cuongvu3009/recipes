import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { projectFirestore } from '../firebase/config';
import { AiFillEdit } from 'react-icons/ai';

const Details = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [clicked, setClicked] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsPending(false);
    projectFirestore
      .collection('cooking-recipes')
      .doc(id)
      .onSnapshot((doc) => {
        setData(doc.data());
      });
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    setClicked(!clicked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setClicked(!clicked);
    setNewTitle('');
    projectFirestore
      .collection('cooking-recipes')
      .doc(id)
      .update({ title: newTitle });
  };

  return (
    <Wrapper>
      {isPending && <p>Loading...</p>}
      {error && <p>Something went wrong!</p>}
      {data && (
        <Container>
          {clicked && (
            <input
              type='text'
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          )}
          <h2 className='page-title'>{data.title}</h2>
          <p>Takes {data.cookingTime} to cook.</p>
          <ul>
            {data.ingredients.map((ing) => (
              <p key={ing}>- {ing}</p>
            ))}
          </ul>
          <h4 className='method'>{data.method}</h4>

          {!clicked ? (
            <Edit onClick={handleUpdate}>
              <AiFillEdit />
              Edit title
            </Edit>
          ) : (
            <Edit onClick={handleSubmit}>Submit</Edit>
          )}
        </Container>
      )}
    </Wrapper>
  );
};

export default Details;

const Wrapper = styled.div`
  width: 60%;
  margin: 0 auto;
  margin-top: 100px;
  position: relative;
`;

const Container = styled.div`
  background-color: #fff;
  text-align: center;
  padding: 50px;
`;

const Title = styled.h2`
  margin: 20px;
`;

const Edit = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
`;
