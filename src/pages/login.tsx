import { useSaleorAuthContext, useSaleorExternalAuth } from "@saleor/auth-sdk/react";
import { ExternalProvider } from "@saleor/auth-sdk";
import Link from "next/link";
import { gql, useQuery } from "@apollo/client";

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
  const { authURL, loading: isLoadingExternalAuth } = useSaleorExternalAuth({
    saleorURL: "https://store-tevnzhdd.saleor.cloud/graphql/",
    provider: ExternalProvider.OpenIDConnect,
    redirectURL: "http://localhost:3000z/api/auth/callback",
  });

  const { signOut } = useSaleorAuthContext();

  if (isLoadingExternalAuth || isLoadingCurrentUser) {
    return <div>Loading...</div>;
  }

  if (data?.me) {
    return (
      <div>
        {JSON.stringify(data)}
        <button onClick={() => signOut()}>Logout</button>
      </div>
    );
  }
  if (authURL) {
    return (
      <div>
        <Link href={authURL}>Login</Link>
      </div>
    );
  }
  return <div>Something went wrong</div>;
}