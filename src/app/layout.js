// src/app/layout.js

import { AppProvider } from "../context";
import "../styles/globals.css";

export const metadata = {
  title: "Prayer Times App",
  description: "A Next.js app for prayer times",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
