"use client";

import { Footer } from "flowbite-react";

export default function DefaultFooter() {
  return (
    <Footer container className="justify-self-end">
      <Footer.Copyright by="Flowbite™" href="#" year={2022} />
      <Footer.LinkGroup>
        <Footer.Link href="#">About</Footer.Link>
        <Footer.Link href="#">Privacy Policy</Footer.Link>
        <Footer.Link href="#">Licensing</Footer.Link>
        <Footer.Link href="#">Contact</Footer.Link>
      </Footer.LinkGroup>
    </Footer>
  );
}
