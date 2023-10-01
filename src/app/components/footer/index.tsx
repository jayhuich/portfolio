import * as React from "react";

export default function Footer() {
  return (
    <footer>
      <div className="container mt-4 mx-auto text-center text-xs">
        <span className="font-bold mr-2">Copyright @jayhuich -</span> &#169;{" "}
        {new Date().getFullYear()} All Rights Reserved
      </div>
    </footer>
  );
}
