import { ExternalProvider, SaleorExternalAuth } from "@saleor/auth-sdk";
import { createSaleorExternalAuthHandler } from "@saleor/auth-sdk/next";

const externalAuth = new SaleorExternalAuth("https://store-tevnzhdd.saleor.cloud/graphql/", ExternalProvider.OpenIDConnect);

export default createSaleorExternalAuthHandler(externalAuth);