// src/app/layout.js

import { AppProvider } from "../context";
import "../styles/globals.css";

export const metadata = {
  title: "Prayer Times App",
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
