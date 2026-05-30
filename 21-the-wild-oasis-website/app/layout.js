import Logo from "@/app/_components/Logo";
import Navigation from "@/app/_components/Navigation";
import Header from "@/app/_components/Header";

// importing font from google fonts, can also import local from next/font/local
import { Josefin_Sans } from "next/font/google";

// configuring the font with options since that's a function
const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
  // not necessarily since it's a font with variable font weight
  // weight:,
});

import "@/app/_styles/globals.css";

// export const metadata = { title: "The Wild Oasis" };
export const metadata = {
  title: {
    template: "%s | The Wild Oasis",
    default: "Welcome | The Wild Oasis",
  },
  description:
    "Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* using a font with josefin.className */}
      <body
        className={`antialiased bg-primary-950 text-primary-100 min-h-screen ${josefin.className} flex flex-col relative`}
      >
        <Header />
        <div className="flex-1 px-8 py-12 ">
          <main className="max-w-7xl mx-auto w-full">{children}</main>
        </div>
      </body>
    </html>
  );
}
