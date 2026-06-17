import { SignInButton } from "@clerk/nextjs";
import React from "react";

const SignIn = () => {
  return (
    <SignInButton mode="modal">
      <button className="text-md font-semibold text-black hover:text-lightColor hover cursor-pointer hoverEffect">
        LogIn
      </button>
    </SignInButton>
  );
};

export default SignIn;
