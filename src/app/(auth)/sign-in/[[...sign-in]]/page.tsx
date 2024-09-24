import { SignIn } from "@clerk/nextjs";
import React from "react";

function SigninPage() {
  return (
    <main className="auth-page">
      <SignIn />
    </main>
  );
}

export default SigninPage;
