import { ExternalProvider, SaleorExternalAuth } from "@saleor/auth-sdk";
import {  createSaleorExternalAuthHandler } from "@saleor/auth-sdk/next";

import { decodeToken } from "@/authConfig";

const externalAuth = new SaleorExternalAuth("https://store-tevnzhdd.saleor.cloud/graphql/", ExternalProvider.OpenIDConnect);

const handler = async (request) => {

  const { searchParams } = new URL(request.url);
  const state = searchParams.get("state");
  const code = searchParams.get("code");
  const query = {
    code,
    state
  }


  const nexResponse = await decodeToken(request);
 
console.log({nexResponse});

  const callback = createSaleorExternalAuthHandler(externalAuth)
console.log({ callback})

const res = {
  setHeader : (...args) => console.log({args}),
  redirect : (...args) => console.log({r: args})
}

  const response = await callback({ query }, res);;
  console.log({response});

  return Response.json({ nexResponse });
}

export { handler as GET, handler as POST };