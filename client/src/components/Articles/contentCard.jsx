import { Button, Card } from 'react-bootstrap';
import { FaHeart } from "react-icons/fa";
import axios from 'axios';


export default function ContentCard({ content, isFavourite }) {
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
                contentId: button.id
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
        <Card className='mb-3'>
            <Card.Body>
                <Card.Title>{content.title}
                    <br></br>
                    מאת: {content.tzunaiName}
                </Card.Title>
                <Card.Text>
                    {content.text}
                    <br></br>
                    <Button id={content._id} onClick={handleToggleFavorite}><FaHeart color={
                        isFavourite ? "red" : "white"} /><span> {content.heartCount}</span></Button>
                </Card.Text>
            </Card.Body>
        </Card>
    );
};