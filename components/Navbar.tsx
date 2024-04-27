import React from "react";
import { Button } from "./ui/button";
import LoginButton from "./login-button";

function Navbar() {
  return (
    <div className="hidden md:block px-3">
      <LoginButton>
        <Button
          variant="ghost"
          className="font-bold hover:text-orange-500 hover:bg-white"
        >
          Login
        </Button>
      </LoginButton>
    </div>
  );
}

export default Navbar;
