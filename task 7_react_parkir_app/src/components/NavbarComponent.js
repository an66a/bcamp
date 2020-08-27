import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Container
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDesktop, faTicketAlt, faUser } from '@fortawesome/free-solid-svg-icons'


const NavbarComponent = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);


  return (
    <div>
      <Navbar className='mb-3' dark color='dark' expand="md">
<Container>
<NavbarBrand href="/">Parkir App</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/"><FontAwesomeIcon icon={faDesktop} /> Dashboard</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/ticket"><FontAwesomeIcon icon={faTicketAlt} /> Ticket Generator</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
              <FontAwesomeIcon icon={faUser} /> Akun
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem onClick={() => props.handleLogout()}>
                  Keluar
                </DropdownItem>             
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <NavbarText>Admin</NavbarText>          
        </Collapse>      
</Container>
</Navbar>
      
    </div>
  );
}

export default NavbarComponent;