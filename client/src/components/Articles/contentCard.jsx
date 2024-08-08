import { Button, Card } from 'react-bootstrap';
import { FaHeart } from "react-icons/fa";
import axios from 'axios';

export default function ContentCard({ content, isFavourite }) {
    const handleToggleFavorite = async (e) => {
        e.preventDefault();
        try {
            const button = e.target.matches("button") ? e.target : e.target.closest("button");
            const url = "http://localhost:3000/api/user/favorites/update";
            const res = await axios.post(url, {
                id: localStorage.getItem("id"),
                contentId: button.id
            });

            const diff = res.data.diff;
            let countObj = button.querySelector("span");
            countObj.innerText = parseInt(countObj.innerText) + diff;
            let heart = button.querySelector("path");
            heart.style.color = diff === 1 ? "red" : "white";
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <Card className='mb-3'>
            <Card.Body>
                <Card.Title>{content.title}<br />מאת: {content.tzunaiName}</Card.Title>
                <Card.Text>
                    {content.type === "Article" && content.text}
                    {content.type === "Recipe" && content.products && (
                        <>
                            <strong>מצרכים:</strong>
                            <br />
                            {content.products}
                        </>
                    )}
                    {content.type === "Recipe" && content.text && (
                        <>
                            <br />
                            <strong>המתכון:</strong>
                            <br />
                            {content.text}
                        </>
                    )}
                    <br />
                    {content.imagePath && <img src={`http://localhost:3000/${content.imagePath}`} alt={content.title} style={{ maxWidth: '100%', height: 'auto' }} />}
                    <br />
                    <Button id={content._id} onClick={handleToggleFavorite}>
                        <FaHeart color={isFavourite ? "red" : "white"} /><span> {content.heartCount}</span>
                    </Button>
                </Card.Text>
            </Card.Body>
        </Card>
    );
};
