import {Navbar,Nav,Form} from 'react-bootstrap'
import Link from 'next/link'
const HeaderComponent =({currentUser})=>{
return (
    <Navbar bg="dark" variant="dark">
    <Navbar.Brand ><Link href="/"><a>Navbar</a></Link></Navbar.Brand>
    <Nav className="mr-auto">
    </Nav>
    <Form inline>
    {!currentUser?<Nav.Link><Link href="/auth/signin"><a>SignIn</a></Link></Nav.Link>:null}
    {!currentUser?<Nav.Link><Link href="/auth/signup"><a>SignUp</a></Link></Nav.Link>:null}
    {currentUser?<Nav.Link><Link href="/auth/signout"><a>SignOut</a></Link></Nav.Link>:null }
    </Form>
    </Navbar>)
}
export default HeaderComponent