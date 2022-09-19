import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { projectFirestore } from '../firebase/config';

const Details = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsPending(false);
    projectFirestore
      .collection('cooking-recipes')
      .doc(id)
      .get()
      .then((doc) => {
        setData(doc.data());
      });
  }, [id]);

  return (
    <Wrapper>
      {isPending && <p>Loading...</p>}
      {error && <p>Something went wrong!</p>}
      {data && (
        <Container>
          <h2 className='page-title'>{data.title}</h2>
          <p>Takes {data.cookingTime} to cook.</p>
          <ul>
            {data.ingredients.map((ing) => (
              <p key={ing}>- {ing}</p>
            ))}
          </ul>
          <h4 className='method'>{data.method}</h4>
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
`;

const Container = styled.div`
  background-color: #fff;
  text-align: center;
  padding: 50px;
`;

const Title = styled.h2`
  margin: 20px;
`;
