import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import styled from 'styled-components';
import { projectFirestore } from '../firebase/config';

const Home = () => {
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsPending(false);
    projectFirestore
      .collection('cooking-recipes')
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          setError('No recipes to load');
          setIsPending(false);
        } else {
          let results = [];
          snapshot.docs.forEach((doc) => {
            results.push({ id: doc.id, ...doc.data() });
          });
          setData(results);
        }
      });
  }, []);

  return (
    <Wrapper>
      {data.map((item) => (
        <Card key={item.id} {...item} />
      ))}
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 80%;
  margin: 0 auto;
  gap: 30px;
  margin-top: 100px;
`;
