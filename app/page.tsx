// app/page.tsx
export default function Home() {
  return (
    <main className="bg-gray-100 min-h-screen">
      <div className="container mx-auto max-w-page py-section">
        <h1 className="text-4xl font-sans font-bold text-brand-primary text-center my-8">
          Welcome to No chase
        </h1>

        

        <section className="bg-card-pink p-8 rounded-card shadow-lg">
          <h2 className="text-2xl font-sans font-semibold text-brand-accent">
            No chase
          </h2>
          <p className="mt-4 text-gray-700">
            Anxious attatchment no more
          </p>
        </section>
      </div>
    </main>
  );
}