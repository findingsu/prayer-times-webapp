import { AppProvider } from "@/context";
import { NavBar } from "@/components";
import "../styles/globals.css";

export const metadata = {
  title: "Prayer Times App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AppProvider>
        <body>
          <NavBar />
          {children}
        </body>
      </AppProvider>
    </html>
  );
}
