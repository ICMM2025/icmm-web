import React from "react";

function Footer() {
  return (
    <div className="w-full sm:max-w-[700px] mx-auto  h-[60px] bg-m-line/25 p-2 flex justify-between items-center flex-col text-xs animate-fade-in-div">
      <div className="flex flex-col items-center">
        <p className="font-bold">
          <span className="font-normal">Contact us: </span>
          <a
            href="https://www.facebook.com/groups/IntaniaRunning"
            target="_blank"
            rel="noopener noreferrer"
            className="text-m-dark hover:underline"
          >
            Facebook (group) Intania Runner
          </a>
        </p>
      </div>
    </div>
  );
}

export default Footer;
