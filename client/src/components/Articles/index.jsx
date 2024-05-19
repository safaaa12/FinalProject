import React, { useState } from 'react';
import "./styles.css";
import axios from 'axios';
import { Button, Card } from 'react-bootstrap';
import { FaHeart } from "react-icons/fa";


const Articles = () => {
  const [articles, setArticles] = useState(null);
  const [recipes, setRecipes] = useState(null);
  const [favouriteArticles, setFavouriteArticles] = useState([]);


  React.useEffect(() => {
    axios
      .post('http://localhost:3000/api/user/favorites/list', { id: localStorage.getItem("id") })
      .then((res) => {
        setFavouriteArticles(res.data.favouriteArticles)
      })
      .catch((err) => {
        console.log('Error: ' + err)
      })
  }, [setFavouriteArticles])

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

  const handleToggleFavorite = async (e) => {
    e.preventDefault();
    try {
      console.log(e.target);
      let button = null;

      if (!e.target.matches("button"))
        button = e.target.closest("button");
      else
        button = e.target;

      const url = "http://localhost:3000/api/user/favorites/update";
      const res = await axios.post(url, {
        id: localStorage.getItem("id"),
        articleId: button.id
      });

      const diff = res.data.diff;
      let countObj = button.querySelector("span")
      countObj.innerText = parseInt(countObj.innerText) + diff;
      let heart = button.querySelector("path")
      heart.style.color = diff === 1 ? "red" : "white";
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
                    <Card.Title>{article.title}
                      <br></br>
                      מאת: {article.tzunaiName}
                    </Card.Title>
                    <Card.Text>
                      {article.text}
                      <br></br>
                      <Button id={article._id} onClick={handleToggleFavorite}><FaHeart color={
                        favouriteArticles && (
                          favouriteArticles.includes(article._id) ? "red" : "white")} /><span> {article.heartCount}</span></Button>
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