import { Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: {
    default: "MediQueue – Learn Better. Achieve More.",
    template: "%s | MediQueue",
  },
  description:
    "Book expert tutors, attend live sessions, and achieve your academic goals with MediQueue.",
};

export default function RootLayout({ children }) {
  return (
    <html lang='en' className={`${plusJakarta.variable} h-full antialiased`}>
      <body className='min-h-full flex flex-col'>
        <Navbar />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
