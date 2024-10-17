import React from "react";
import { Footer } from "flowbite-react";

const Footer1 = () => {
  return (
    <Footer container className="mx-auto">
      <Footer.Copyright href="#" by="Hotel™" year={2024} />
      <Footer.LinkGroup>
        <Footer.Link href="#">About</Footer.Link>
        <Footer.Link href="#">Privacy Policy</Footer.Link>
        <Footer.Link href="#">Licensing</Footer.Link>
        <Footer.Link href="#">Contact</Footer.Link>
      </Footer.LinkGroup>
    </Footer>
  );
};

export default Footer1;
