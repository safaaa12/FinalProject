import { Card } from 'react-bootstrap';

export default function ContentCard({ content }) {
    return (
        <Card className='mb-3'>
            <Card.Body>
                <Card.Title>{content.title}</Card.Title>
                {content.type === 'Recipe' && (
                        <Card.Text>
                            מצרכים:
                            <br />
                            {content.products}
                            <br />
                            המתכון  :  <br />
                            {content.text}
                        </Card.Text>
                    )}
                {content.type === 'Article' && (
                        <Card.Text>
                           {content.text}
                        </Card.Text>
                    )}
                <Card.Footer>
                מאת: {content.tzunaiName}
                </Card.Footer>
            </Card.Body>
        </Card>
    );
};