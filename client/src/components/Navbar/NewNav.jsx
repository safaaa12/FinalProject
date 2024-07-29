import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import {
    FaBars, FaList, FaCommentAlt, FaShoppingCart, FaInfoCircle, FaTicketAlt, FaHome, FaLock, FaUser, FaNewspaper
} from "react-icons/fa";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const MyNav = ({ children }) => {
    // const [isOpen, setIsOpen] = useState(window.innerWidth < 1220 ? false : true);
    const navigate = useNavigate();

    const menuItem = [
        {
            path: "/",
            name: "בית",
            icon: <FaHome />
        },
        {
            path: "/Shopes",
            name: "חנויות",
            icon: <FaShoppingCart />
        },
        {
            path: "/coupons",
            name: "קופונים",
            icon: <FaTicketAlt />
        },
        {
            path: "/AboutUs",
            name: "עלינו",
            icon: <FaInfoCircle />
        },
        {
            path: "/ContactUs",
            name: "דבר איתנו",
            icon: <FaCommentAlt />
        },
    ];

    const isLoggedIn = localStorage.getItem('token');

    // Add the profile button to the menu when logged in
    if (isLoggedIn) {
        menuItem.push({
            path: "/Profile",
            name: "פרופיל",
            icon: <FaUser />
        });
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('isAdmin');
        localStorage.removeItem('email');
        navigate('/Login');
    };

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home">Smartshopping</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {menuItem.map((item, index) => (
                                <Nav.Link href={item.path} key={index} color="black" className="link" activeClassName="active-link">
                                    <div className="icon">{item.icon}</div>
                                    <div className="link_text">{item.name}</div>
                                </Nav.Link>
                            ))}
                            {isLoggedIn ? (
                                <>

                                    <Nav.Link href="/articles" color="black" className="link" activeClassName="active-link">
                                        <div className="icon"><FaNewspaper /></div>
                                        <div className="link_text">כתבות ומתכונים</div>
                                    </Nav.Link>

                                    <div className="link" onClick={handleLogout}>
                                        <div className="icon"><FaLock /></div>
                                        <div className="link_text">התנתק</div>
                                    </div>
                                </>
                            ) : (
                                <Nav.Link href="/Login" className="link" activeClassName="active-link">
                                    <div className="icon"><FaUser /></div>
                                    <div className="link_text">התחבר</div>
                                </Nav.Link>
                            )}

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className="container">
                <main>{children}</main>
            </div>
        </>
    );
}

export default MyNav;