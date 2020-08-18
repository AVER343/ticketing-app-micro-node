import axios from 'axios';
import buildClient from '../api/build-client/build-client';

const LandingPage = ({ currentUser }) => {
  // console.log(currentUser);
  // axios.get('/api/users/currentuser');
  console.log(currentUser);
  return currentUser?<h1>SignedIN</h1>:<h2>SignedOUT</h2>
};

LandingPage.getInitialProps = async (context) => {
  let buildClientaxios=buildClient(context)
 const {data} = await buildClientaxios({url:'/api/users/currentuser'})
 console.log(data)
 return data
};

export default LandingPage;
