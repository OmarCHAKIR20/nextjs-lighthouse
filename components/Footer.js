import Image from "next/image";

const Footer = ({style}) => {
  return (
    <footer className={style.footer}>
      <a
        href="https://vercel.com?utm_source=learn&&utm_campaign=core-web-vitals"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by
        <span className={style.logo}>
          <Image
            src="/vercel.svg"
            alt="Vercel Logo"
            width={72}
            height={16}
            priority
          />
        </span>
      </a>
    </footer>
  );
};

export default Footer;
