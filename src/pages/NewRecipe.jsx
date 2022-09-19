import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { projectFirestore } from '../firebase/config';

const NewRecipe = () => {
  const [title, setTitle] = useState('');
  const [method, setMethod] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [newIngredient, setNewIngredient] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const ingredientInput = useRef(null);

  const navigate = useNavigate();

  const addIngredients = (e) => {
    e.preventDefault();
    const ing = newIngredient.trim();

    if (ing && !ingredients.includes(ing)) {
      setIngredients((prevItems) => [...prevItems, ing]);
    }

    setNewIngredient('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const doc = {
      title,
      method,
      cookingTime: cookingTime + ' minutes',
      ingredients,
    };

    try {
      await projectFirestore.collection('cooking-recipes').add(doc);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <Form action='' onSubmit={handleSubmit}>
        <h2>Add new recipe</h2>
        <label htmlFor=''>Recipe title</label>
        <input
          type='text'
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <label htmlFor=''>Recipe Ingredients</label>
        <div>
          <input
            type='text'
            onChange={(e) => setNewIngredient(e.target.value)}
            value={newIngredient}
            ref={ingredientInput}
          />
          <button onClick={addIngredients}>Add</button>

          {ingredients && ingredients.map((item) => <li>{item}</li>)}
        </div>
        <label htmlFor=''>Recipe Method</label>
        <input
          type='text'
          onChange={(e) => setMethod(e.target.value)}
          value={method}
        />
        <label htmlFor=''>Cooking time (minutes)</label>
        <input
          type='text'
          onChange={(e) => setCookingTime(e.target.value)}
          value={cookingTime}
        />
        <button type='submit'>Submit</button>
      </Form>
    </Wrapper>
  );
};

export default NewRecipe;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70vh;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #fff;
  border: 1px solid black;
  width: fit-content;
  padding: 30px;
`;
