import React, { useState, useEffect } from 'react';
import "./styles.css";
import axios from 'axios';
import ContentMap from "./contentMap";
import { Form } from "react-bootstrap";

const Articles = () => {
  const [articles, setArticles] = useState(null);
  const [recipes, setRecipes] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/articles/list')
      .then((res) => {
        setArticles(res.data.articles)
      })
      .catch((err) => {
        console.log('Error: ' + err)
      })
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/recipes/list')
      .then((res) => {
        setRecipes(res.data.recipes)
      })
      .catch((err) => {
        console.log('Error: ' + err)
      })
  }, []);

  return (
    <>
      {articles != null ? (
        <>
          <h1>הכתבות שלנו</h1>
          <div>
            <ContentMap contents={articles} />
          </div>
        </>
      ) : (
        <>
          <h1>אין כתבות עדיין...</h1>
        </>
      )}
      {recipes != null ? (
        <>
          <h1>המתכונים שלנו</h1>
          <div>
            <ContentMap contents={recipes} />
          </div>
        </>
      ) : (
        <>
          <h1>אין מתכונים עדיין...</h1>
        </>
      )}
    </>
  );
};

export default Articles;
