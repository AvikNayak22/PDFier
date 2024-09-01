const Footer = () => {
  return (
    <footer className="flex items-center justify-center h-20 bg-slate-200">
      <h1 className="text-md text-gray-500 sm:text-center dark:text-gray-400">
        &copy; {new Date().getFullYear()}
        <a
          href="https://github.com/AvikNayak22/PDFier"
          target="_blank"
          className="hover:underline"
        >
          PDFier™
        </a>
        . All Rights Reserved.
      </h1>
    </footer>
  );
};

export default Footer;
