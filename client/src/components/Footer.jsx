import React from "react";

const Footer = () => {
  return (
    <>
      <div className="flex items-center h-16 justify-center bg-slate-200">
        <hr className="border-[1px]" />
        <h1 className="text-center py-3 text-sm ">
          Made with ❤️ by{" "}
          <a
            className="text-bold underline text-blue-500"
            href="https://github.com/AvikNayak22"
          >
            AvikNayak22
          </a>
          .
        </h1>
      </div>
    </>
  );
};

export default Footer;
