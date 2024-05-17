import React, { useState } from 'react';
import "./styles.css";
import axios from 'axios';
import Card from 'react-bootstrap/Card';

const Articles = () => {
  const [articles, setArticles] = useState(null);
  const [recipes, setRecipes] = useState(null);

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
            <div>
              {articles.map((article, index) => (
                <Card className='mb-3'>
                  <Card.Body>
                    <Card.Title>{article.title}</Card.Title>
                    <Card.Text>
                      {article.text}
                    </Card.Text>
                  </Card.Body>
                </Card>
              ))}
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
            <div>
              {recipes.map((recipe, index) => (
                <Card className='mb-3'>
                  <Card.Body>
                    <Card.Title>{recipe.title}</Card.Title>
                    <Card.Text>
                      מצרכים:
                      <br></br>
                      {recipe.products}
                      <br></br>
                      <br></br>
                      מתכון:
                      <br></br>
                      {recipe.text}
                    </Card.Text>
                  </Card.Body>
                </Card>
              ))}
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