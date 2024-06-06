import { NextResponse } from "next/server"

const handler = ( request)=> {
  console.log({c: request})
return  NextResponse.json(
  {
    "issuer": "https://adb2ctesttenantdemo.b2clogin.com/cbbf06ad-c088-4fb3-9309-260630ff77d6/v2.0/",
    "authorization_endpoint": "https://adb2ctesttenantdemo.b2clogin.com/adb2ctesttenantdemo.onmicrosoft.com/b2c_1a_signup_signin/oauth2/v2.0/authorize",
    "token_endpoint": "https://adb2ctesttenantdemo.b2clogin.com/adb2ctesttenantdemo.onmicrosoft.com/b2c_1a_signup_signin/oauth2/v2.0/token",
    "end_session_endpoint": "https://adb2ctesttenantdemo.b2clogin.com/adb2ctesttenantdemo.onmicrosoft.com/b2c_1a_signup_signin/oauth2/v2.0/logout",
    "jwks_uri": "https://adb2ctesttenantdemo.b2clogin.com/adb2ctesttenantdemo.onmicrosoft.com/b2c_1a_signup_signin/discovery/v2.0/keys",
    // "userinfo_endpoint": "https://adb2ctesttenantdemo.b2clogin.com/adb2ctesttenantdemo.onmicrosoft.com/b2c_1a_signup_signin/openid/v2.0/userinfo",
    "userinfo_endpoint": "https://62bd-202-191-67-226.ngrok-free.app/api/test/userinfo",
    "response_modes_supported": [
      "query",
      "fragment",
      "form_post"
    ],
    "response_types_supported": [
      "code",
      "code id_token",
      "code token",
      "code id_token token",
      "id_token",
      "id_token token",
      "token",
      "token id_token"
    ],
    "scopes_supported": [
      "openid"
    ],
    "subject_types_supported": [
      "pairwise"
    ],
    "id_token_signing_alg_values_supported": [
      "RS256"
    ],
    "token_endpoint_auth_methods_supported": [
      "client_secret_post",
      "client_secret_basic"
    ],
    "claims_supported": [
      "name",
      "given_name",
      "family_name",
      "email",
      "sub",
      "idp",
      "tid",
      "extension_gender",
      "cellPhone",
      "iss",
      "iat",
      "exp",
      "aud",
      "acr",
      "nonce",
      "auth_time"
    ]
  }
)

}

export { handler as GET, handler as POST };