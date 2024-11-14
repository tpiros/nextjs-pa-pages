import Navbar from './navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="bg-gray-200 container mx-auto p-8 rounded-lg shadow-2xl">
        {children}
      </main>
    </>
  );
}
