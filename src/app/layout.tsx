import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Summer STEM Camp | Livingstone College",
    template: "%s | Livingstone College STEM"
  },
  description: "Join the Livingstone College Summer STEM Camp. A free one-week science and technology program for middle and high school students, designed to inspire the next generation of innovators.",
  keywords: ["STEM", "Camp", "Livingstone College", "Robotics", "VR", "Chemistry", "Salisbury", "Science", "Education"],
  authors: [{ name: "Livingstone College" }],
  openGraph: {
    title: "Summer STEM Camp | Livingstone College",
    description: "A free one-week science and technology program for middle and high school students, designed to inspire the next generation of innovators.",
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
