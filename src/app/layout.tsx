import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Summer STEM Camp | Livingstone College",
    template: "%s | Livingstone College STEM"
  },
  description: "Join the Livingstone College Summer STEM Camp. A free one-week science and technology camp for middle and high school students. Robotics, VR, chemistry, and more.",
  keywords: ["STEM", "Camp", "Livingstone College", "Robotics", "VR", "Chemistry", "Salisbury", "Science", "Education"],
  authors: [{ name: "Livingstone College" }],
  openGraph: {
    title: "Summer STEM Camp | Livingstone College",
    description: "A free one-week program for middle and high school students — hands-on experiences and mentoring.",
    url: "https://livingstonestem.org",
    siteName: "Livingstone College STEM Program",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-body bg-bg-base text-foreground antialiased min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
