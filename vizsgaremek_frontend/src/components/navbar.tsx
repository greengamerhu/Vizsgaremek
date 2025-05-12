
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

 function NavbarComp() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Nav className="me-auto">
            <Nav.Link href="#home">Menü</Nav.Link>
            <Nav.Link href="#features">Profil</Nav.Link>
            <Nav.Link href="#pricing">Kosár</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

    </>
  );
}

export default NavbarComp;