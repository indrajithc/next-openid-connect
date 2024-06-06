"use client";

export default function Home() {
  const handleSignOut = async () => {
    // Construct the Azure AD B2C sign-out URL
    const azureSignOutUrl = `https://${
      process.env.NEXT_PUBLIC_AZURE_AD_B2C_TENANT_NAME
    }.b2clogin.com/${
      process.env.NEXT_PUBLIC_AZURE_AD_B2C_TENANT_NAME
    }.onmicrosoft.com/${
      process.env.NEXT_PUBLIC_AZURE_AD_B2C_PRIMARY_USER_FLOW
    }/oauth2/v2.0/logout?post_logout_redirect_uri=${encodeURIComponent(
      process.env.NEXT_PUBLIC_NEXTAUTH_URL + "/en/login"
    )}`;
    // Sign out from NextAuth session first
    // Redirect to Azure AD B2C sign-out URL to clear Azure session
    window.location.href = azureSignOutUrl;
  };

  return (
    <main>
      <button className="signout-btn" onClick={handleSignOut}>
        Sign out
      </button>{" "}
    </main>
  );
}
