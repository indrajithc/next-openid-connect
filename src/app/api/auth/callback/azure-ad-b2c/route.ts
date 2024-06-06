import { ExternalProvider, SaleorExternalAuth } from "@saleor/auth-sdk";
import {  createSaleorExternalAuthHandler } from "@saleor/auth-sdk/next";

import { decodeToken } from "@/authConfig";
import { NextResponse } from "next/server";

const externalAuth = new SaleorExternalAuth("https://store-tevnzhdd.saleor.cloud/graphql/", ExternalProvider.OpenIDConnect);



async function fetchUserInfo(bearerToken) {
const url = 'https://adb2ctesttenantdemo.b2clogin.com/adb2ctesttenantdemo.onmicrosoft.com/b2c_1a_signup_signin/openid/v2.0/userinfo';

    const headers = {
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json'
    };

    console.log({headers});

    try {
        const response = await fetch(url, { method: 'GET', headers: headers });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log({data});
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}


function parseJwt (token) {
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

const handler = async (request) => {

  const { searchParams } = new URL(request.url);
  const state = searchParams.get("state");
  const code = searchParams.get("code");
  const query = {
    code,
    state
  }


const url = 'https://adb2ctesttenantdemo.b2clogin.com/adb2ctesttenantdemo.onmicrosoft.com/B2C_1A_signup_signin/oauth2/v2.0/token';
const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
};

const body = new URLSearchParams({
    'grant_type': 'authorization_code',
    'client_id': process.env.AZURE_AD_B2C_CLIENT_ID,
    'scope': 'openid profile email offline_access',
    'code':code, 
    'redirect_uri': 'https://9217-202-191-67-226.ngrok-free.app/api/auth/callback/azure-ad-b2c',
    'client_secret': process.env.AZURE_AD_B2C_CLIENT_SECRET
});

const response = await
fetch(url, {
    method: 'POST',
    headers: headers,
    body: body
});


const data = await response.json();
console.log({data});



const id_token = data?.id_token;

//   const nexResponse = await decodeToken(request);
 
// console.log({nexResponse});

//   const callback = createSaleorExternalAuthHandler(externalAuth)
// console.log({ callback})

// const res = {
//   setHeader : (...args) => console.log({args}),
//   redirect : (...args) => console.log({r: args})
// }

//   const response = await callback({ query }, res);;
//   console.log({response});

const infoResponse = await fetchUserInfo(id_token);

  return Response.json({ infoResponse  });
// <div>${JSON.stringify(parseJwt(id_token))}</div>
  return new NextResponse(
    `
    
    <br />
    <br />
    <br />
    <div>${JSON.stringify(infoResponse)}</div>
      
    `,
    { status: 200, headers: { 'content-type': 'text/html' } });
}

export { handler as GET, handler as POST };