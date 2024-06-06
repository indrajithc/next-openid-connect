// authConfig.js 
 
 
import { ConfidentialClientApplication, LogLevel } from "@azure/msal-node";
 
const azureSignOutUrl = `https://${process.env.NEXT_PUBLIC_AZURE_AD_B2C_TENANT_NAME
    }.b2clogin.com/${process.env.NEXT_PUBLIC_AZURE_AD_B2C_TENANT_NAME
    }.onmicrosoft.com/${process.env.NEXT_PUBLIC_AZURE_AD_B2C_PRIMARY_USER_FLOW
    }/oauth2/v2.0/logout?post_logout_redirect_uri=${encodeURIComponent(
        process.env.NEXT_PUBLIC_NEXTAUTH_URL
    )}`;
 
const authorityDomain = `https://${process.env.NEXT_PUBLIC_AZURE_AD_B2C_TENANT_NAME
    }.b2clogin.com`;
 
//<ms_docref_configure_msal>
/**
 * Confidential Client Application Configuration
 */
const confidentialClientConfig = {
    auth: {
        clientId: process.env.AZURE_AD_B2C_CLIENT_ID,
        authority: azureSignOutUrl,
        clientSecret: process.env.AZURE_AD_B2C_CLIENT_SECRET,
        knownAuthorities: [authorityDomain], //This must be an array
        redirectUri: process.env.NEXTAUTH_URL,
        validateAuthority: false
    },
    system: {
        loggerOptions: {
            loggerCallback(loglevelIn, message, containsPii) {
                console.log(message);
            },
            piiLoggingEnabled: false,
            logLevel: LogLevel.Verbose,
        }
    }
};
 
 
const confidentialClientApplication = new ConfidentialClientApplication(confidentialClientConfig);
 
 
const authCodeRequest = {
    redirectUri: confidentialClientConfig.auth.redirectUri + "/api/auth/callback/azure-ad-b2c",
    // redirectUri: "https%3A%2F%2Ff455-202-191-67-226.ngrok-free.app%2Fapi%2Fauth%2Fcallback%2Fazure-ad-b2c"
};
 
 
export const getAuthCode = async (authority, scopes, state) => {
 
    // prepare the request
    console.log("Fetching Authorization code")
    authCodeRequest.authority = authority;
    authCodeRequest.scopes = scopes;
    authCodeRequest.state = state;
 
    //Each time you fetch Authorization code, update the relevant authority in the tokenRequest configuration
    // tokenRequest.authority = authority;
 
    // request an authorization code to exchange for a token
    const response = await confidentialClientApplication.getAuthCodeUrl(authCodeRequest)
 
 
    return response;
}
 
 
export const decodeToken = async (request) => {
 
    const signInPolicyAuthority = `https://${process.env.NEXT_PUBLIC_AZURE_AD_B2C_TENANT_NAME}.b2clogin.com/${process.env.NEXT_PUBLIC_AZURE_AD_B2C_TENANT_NAME}.onmicrosoft.com/${process.env.NEXT_PUBLIC_AZURE_AD_B2C_PRIMARY_USER_FLOW}`;
 
    authCodeRequest.authority = signInPolicyAuthority;
 
    const { searchParams } = new URL(request.url);
    const state = searchParams.get("state");
    // const clientInfo = searchParams.get("client_info");
    const code = searchParams.get("code");
    //   const state = searchParams.get("state");
    console.log("----------------------------",{ state,  code});
 
 
    if (state === "login") {
        //prepare the request for authentication
        authCodeRequest.code = code;
        authCodeRequest.scopes = "openid profile email offline_access";
 
        
        console.log({
            authCodeRequest
        })
        const response =
            await confidentialClientApplication
                .acquireTokenByCode(authCodeRequest);
        return response;
    }
 
}
 
export default confidentialClientApplication;
 
 