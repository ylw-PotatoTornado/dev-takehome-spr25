import "./globals.css";

export const metadata = {
  title: "Crisis Corner",
  description: "Your direction in times of crisis.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
