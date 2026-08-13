import '../styles/globals.css';
import Navbar from './components/Navbar';

export const metadata = {
  title: 'Solomough Vision Engine',
  description: 'From Vision to Reality — Web + Web3 + AI'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="min-h-screen p-6">{children}</main>
      </body>
    </html>
  );
}
