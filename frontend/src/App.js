import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from 'bootstrap';
import { Link, Routes, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Home from './components/home';
import Create from './components/create';
import Update from './components/update';
import List from './components/list';
import BookDetails from './components/BookDetails';
function App() {
  return (
    <div>
      <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#">BookStore</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to={"/"} className="nav-link">Home</Link>
            <NavDropdown title="Admin" id="basic-nav-dropdown">
              <NavDropdown.Item href="/create">Create Book</NavDropdown.Item>
              <NavDropdown.Item href="/list">
                Book List
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      <div className='container'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create' element={<Create />} />
          <Route path='/list' element={<List />} />
          <Route path='/edit/:id' element={<Update />} />
          <Route path='/bookdetails/:id' element={<BookDetails/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
