import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      {/* <img src="/logo.png" height="60" width="60" alt="The Wild Oasis logo" /> */}
      {/* First way of using Next.js Image */}
      {/* <Image src="/logo.png" height="60" width="60" alt="The Wild Oasis logo" /> */}
      {/* Second way of using Next.js Image - we can use imported image directly and then width and height are not mandatory */}
      {/* Also with this import we can add other properties like quality*/}
      <Image
        src={logo}
        height="60"
        width="60"
        alt="The Wild Oasis logo"
        quality={100}
      />
      <span className="text-xl font-semibold text-primary-100">
        The Wild Oasis
      </span>
    </Link>
  );
}

export default Logo;
