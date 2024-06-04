import { ExternalProvider, SaleorExternalAuth } from "@saleor/auth-sdk";
import { createSaleorExternalAuthHandler } from "@saleor/auth-sdk/next";
import { NextResponse } from "next/server";

const externalAuth = new SaleorExternalAuth("https://store-tevnzhdd.saleor.cloud/graphql/", ExternalProvider.OpenIDConnect);

const handler = async (request) => {

  const { searchParams } = new URL(request.url);
  const state = searchParams.get("state");
  const code = searchParams.get("code");
  const query = {
    code,
    state
  }
  const callback = createSaleorExternalAuthHandler(externalAuth)
console.log({ callback})

  const response = await callback({ query }, {});;
  console.log({response});

  return response;
}

export { handler as GET, handler as POST };