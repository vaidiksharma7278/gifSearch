import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import Link from 'next/link'

import { useAuth } from 'src/context/AuthContext'
import { useRouter } from 'next/router'

export default function NavbarComp  ()  {
  const { user, logout } = useAuth()
  const router = useRouter()

  return (
    <Navbar>
      <Container>
         <Link href="/" passHref>
           <Navbar.Brand> Gif Searcher</Navbar.Brand>
         </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
       <Navbar.Collapse id="basic-navbar-nav">
           <Nav className="me-auto">
            {user ? (
              <div>
                 <Nav.Link
                  onClick={() => {
                    logout()
                router.push('/login')
                  }}
                >
                  Logout
                 </Nav.Link>
               </div>
             ) : (
              <>
               <Link href="/signup" passHref>

                  signup
                 </Link>
                <Link href="/login" passHref>
                   login
                 </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
       </Container>
     </Navbar>
  
  
  );
       
    
}


