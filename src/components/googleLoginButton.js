import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_CLIENT_ID } from "src/configs/googleClientId";

const GoogleLoginButton = ({callback}) => {
  return <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <GoogleButton callback={callback} />
  </GoogleOAuthProvider>
}

const GoogleButton = ({callback}) => {
  return <GoogleLogin
  onSuccess={callback}
  onError={callback}
  type={"icon"}
  shape={"circle"}
/>;
}

export default GoogleLoginButton;
