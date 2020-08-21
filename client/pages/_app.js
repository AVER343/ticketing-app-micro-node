import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client/build-client';
import HeaderComponent from '../header/header';
const appComponent=({ Component, ComponentProps }) => {
  return <div>
          <HeaderComponent {...ComponentProps}/>
            <Component {...ComponentProps} />
          </div>;
};
appComponent.getInitialProps = async (context) => {
  let buildClientaxios=buildClient(context.ctx)
 const {data} = await buildClientaxios({url:'/api/users/currentuser'})
 let ComponentProps
 if(context.Component.getInitialProps)
 {
   ComponentProps=await  context.Component.getInitialProps(context.ctx)
 }
 return {
   ComponentProps,
   currentUser:data.currentUser
 }
};
export default appComponent
