import Link from 'next/link';
import SearchBar from "@/components/ui/searchbar";

async function handleSearchAction(query: string) {
  'use server'
  console.log('Searching for:', query);

  return;
}


export default function Home() {

  return (
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-20">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-5xl font-bold mb-4">Welcome to Ravnica Library</h1>
            <p className="text-xl mb-8">Your ultimate resource for Magic: The Gathering cards and deck building</p>
            <div className="flex justify-center gap-4">
              <Link href="/cards" className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                Browse Cards
              </Link>
              <Link href="/decks" className="bg-transparent hover:bg-white/10 border border-white text-white font-bold py-3 px-6 rounded-lg transition-colors">
                Build Decks
              </Link>
            </div>
            <div className="flex justify-center items-center mt-8">
              <SearchBar onSearchAction={handleSearchAction}/>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Explore the Multiverse</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Powerful Search</h3>
                <p className="text-gray-600">Find any card in the multiverse with our advanced search tools</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center text-green-800 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Deck Building</h3>
                <p className="text-gray-600">Create and share your deck ideas with our intuitive deck builder</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-800 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Community</h3>
                <p className="text-gray-600">Connect with other planeswalkers and share strategies</p>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Cards Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Featured Cards</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* This would eventually be populated from your API */}
              {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="h-48 bg-gray-200"></div>
                    <div className="p-4">
                      <h3 className="font-semibold">Card Name</h3>
                      <p className="text-sm text-gray-600">Card Type — Subtype</p>
                    </div>
                  </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/cards" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
                View All Cards
              </Link>
            </div>
          </div>
        </section>
      </main>
  );
}