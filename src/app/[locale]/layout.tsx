"use client"
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { createSaleorAuthClient } from "@saleor/auth-sdk";
import { SaleorAuthProvider, useAuthChange } from "@saleor/auth-sdk/react";

const saleorApiUrl = "https://store-tevnzhdd.saleor.cloud/graphql/";

// Saleor Client
const saleorAuthClient = createSaleorAuthClient({ saleorApiUrl });

// Apollo Client
const httpLink = createHttpLink({
  uri: saleorApiUrl,
  fetch: saleorAuthClient.fetchWithAuth,
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useAuthChange({
    saleorApiUrl,
    onSignedOut: () => apolloClient.resetStore(),
    onSignedIn: () => {
      apolloClient.refetchQueries({ include: "all" });
    },
  });

  return (
    <SaleorAuthProvider client={saleorAuthClient}>
      <ApolloProvider client={apolloClient}>
     {children}
      </ApolloProvider>
    </SaleorAuthProvider>
  );
}