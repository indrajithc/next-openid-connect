"use client"
import { useSaleorAuthContext, useSaleorExternalAuth } from "@saleor/auth-sdk/react";
import { ExternalProvider } from "@saleor/auth-sdk";
import Link from "next/link";
import { gql, useQuery } from "@apollo/client";

const saleorApiUrl = "https://store-tevnzhdd.saleor.cloud/graphql/";


export default function Home() {
  const {
    loading: isLoadingCurrentUser,
    error,
    data,
  } = useQuery(gql`
    query CurrentUser {
      me {
        id
        email
        firstName
        lastName
      }
    }
  `);
 
  return <div>Something went wrong</div>;
}
