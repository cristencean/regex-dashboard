import type { Metadata } from "next";
  import React from "react";

import "./globals.css";
import ReduxProvider from "../store/ReduxProvider";

export const metadata: Metadata = {
  title: "Regex Dashboard",
  description: "Next.js dashboard that uses regex to extract expressions from text copies.",
};

const RootLayout: React.FC<{children: React.ReactNode}> = ({children}) => {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
};

export default RootLayout;
