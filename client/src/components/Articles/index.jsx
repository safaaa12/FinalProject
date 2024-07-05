import React, { useState } from 'react';
import "./styles.css";
import axios from 'axios';
import { Button, Card } from 'react-bootstrap';
import { FaHeart } from "react-icons/fa";
import ContentMap from "./contentMap";
import { Form } from "react-bootstrap";


const Articles = () => {
  const [articles, setArticles] = useState(null);
  const [recipes, setRecipes] = useState(null);
  const [favouriteContents, setFavouriteContents] = useState([]);
  const [recipesShowOnlyFavourites, setRecipesShowOnlyFavourites] = useState(false);
  const [articlesShowOnlyFavourites, setArticlesShowOnlyFavourites] = useState(false);

  React.useEffect(() => {
    axios
      .post('http://localhost:3000/api/user/favorites/list', { id: localStorage.getItem("id") })
      .then((res) => {
        setFavouriteContents(res.data.favouriteContents)
      })
      .catch((err) => {
        console.log('Error: ' + err)
      })
  }, [setFavouriteContents])

  React.useEffect(() => {
    axios
      .get('http://localhost:3000/api/articles/list')
      .then((res) => {
        setArticles(res.data.articles)
      })
      .catch((err) => {
        console.log('Error: ' + err)
      })
  }, [setArticles])

  React.useEffect(() => {
    axios
      .get('http://localhost:3000/api/recipes/list')
      .then((res) => {
        setRecipes(res.data.recipes)
      })
      .catch((err) => {
        console.log('Error: ' + err)
      })
  }, [setRecipes])

  return (
    <>
      {articles != null ?
        (
          <>
            <h1>הכתבות שלנו</h1>
            <Form.Check
              style={{ display: 'inline-block' }}
              type="switch"
              checked={articlesShowOnlyFavourites}
              label="הצג רק את הכתבות המועדפות שלי"
              onClick={() => setArticlesShowOnlyFavourites(!articlesShowOnlyFavourites)}
            />
            <div>
              <ContentMap contents={articles}
                favouriteContents={favouriteContents} onlyFavourites={articlesShowOnlyFavourites} />
            </div>
          </>
        )
        : (<>
          <h1>אין כתבות עדיין...</h1>
        </>)}
      {recipes != null ?
        (
          <>
            <h1>המתכונים שלנו</h1>
            <Form.Check
              style={{ display: 'inline-block' }}
              type="switch"
              checked={recipesShowOnlyFavourites}
              label="הצג רק את המתכונים המועדפים שלי"
              onClick={() => setRecipesShowOnlyFavourites(!recipesShowOnlyFavourites)}
            />
            <div>
              <ContentMap contents={articles}
                favouriteContents={favouriteContents} onlyFavourites={recipesShowOnlyFavourites} />
            </div>
          </>
        )
        : (<>
          <h1>אין מתכונים עדיין...</h1>
        </>)}
    </>
  );
};

export default Articles;