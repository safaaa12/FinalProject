import { Card } from 'react-bootstrap';

export default function ContentCard({ content }) {
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
                </Card.Text>
            </Card.Body>
        </Card>
    );
};