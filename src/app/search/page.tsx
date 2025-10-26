'use client';

import {useEffect, useState} from 'react';
import {useSearchParams, useRouter} from 'next/navigation';
import CardGrid from "@/components/card/CardGrid";
import CardDetail from "@/components/card/CardDetail";

type Card = {
    id: string;
    name: string;
    image_uris?: {
        small?: string;
        normal?: string;
        large?: string;
    };
    mana_cost: string;
    oracle_text?: string;
    power?: string;
    toughness?: string;
    type_line: string;
    rarity: string;
    set: string;
    set_name: string;
    prices?: {
        usd?: string;
        usd_foil?: string;
        eur?: string;
        eur_foil?: string;
        tix?: string;
    };
};

type CardSearchResponse = {
    cards: Card[];
    data: Card[];
    total_cards: number;
    has_more: boolean;
};

export default function SearchResultsPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const query = searchParams.get('q') || '';
    const rawPage = parseInt(searchParams.get('page') || '1', 10);
    const page = Number.isNaN(rawPage) || rawPage < 1 ? 1 : rawPage;

    const [cards, setCards] = useState<Card[]>([]);
    const [totalCards, setTotalCards] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [selectedCard, setSelectedCard] = useState<Card | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        async function fetchResults() {
            if (!query) {
                setCards([]);
                setTotalCards(0);
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            setError(null);

            try {
                const PER_UI_PAGE = 25;
                // Global start index for UI page (0-based)
                const startIndex = (page - 1) * PER_UI_PAGE;

                // Scryfall pages hold 100 items (0-99,100-199,...), 1-based
                const scryPage = Math.floor(startIndex / 100) + 1;
                const offsetInScry = startIndex % 100;

                // Fetch first Scryfall page
                const resp1 = await fetch(`https://api.scryfall.com/cards/search?q=${encodeURIComponent(query)}&page=${scryPage}`);
                if (!resp1.ok) throw new Error(`Scryfall error: ${resp1.status}`);
                const json1: CardSearchResponse = await resp1.json();

                // Determine if we cross a Scryfall page boundary and need a second fetch
                const needSecond = offsetInScry + PER_UI_PAGE > (json1.data?.length ?? 0) && json1.has_more;

                let merged: Card[] = json1.data ?? [];

                if (needSecond) {
                    const resp2 = await fetch(`https://api.scryfall.com/cards/search?q=${encodeURIComponent(query)}&page=${scryPage + 1}`);
                    if (!resp2.ok) throw new Error(`Scryfall error: ${resp2.status}`);
                    const json2: CardSearchResponse = await resp2.json();
                    merged = merged.concat(json2.data ?? []);
                }

                // Slice the merged results to the UI page window
                const displayed = merged.slice(offsetInScry, offsetInScry + PER_UI_PAGE);
                setCards(displayed);
                // total_cards is available on the Scryfall response
                setTotalCards(json1.total_cards ?? 0);
            } catch (err) {
                console.error('Search failed:', err);
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setIsLoading(false);
            }
        }

        fetchResults();
    }, [query, page]);

    const handleCardClick = (card: Card) => {
        setSelectedCard(card);
        setIsModalOpen(true);
    };

    const PER_PAGE = 25;
    const totalPages = Math.max(1, Math.ceil(totalCards / PER_PAGE));

    const goToPage = (p: number) => {
        const safe = Math.max(1, Math.min(totalPages, p));
        router.push(`/search?q=${encodeURIComponent(query)}&page=${safe}`);
    };

    return (
        <main className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Search Results for: {query}</h1>

            {totalCards > 0 && (
                <p className="mb-2 text-gray-600">Found {totalCards} cards — showing up to {PER_PAGE} per page</p>
            )}

            {isLoading && <p className="mt-4">Loading...</p>}
            {error && <p className="mt-4 text-red-500">Error: {error}</p>}

            {!isLoading && !error && cards.length > 0 && (
                <>
                    <CardGrid cards={cards} onCardClick={handleCardClick}/>
                    <div className="flex items-center justify-center gap-2 mt-6">
                        <button
                            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                            onClick={() => goToPage(page - 1)}
                            disabled={page <= 1}
                        >
                            Prev
                        </button>

                        {Array.from({length: Math.min(5, totalPages)}, (_, i) => {
                            const start = Math.max(1, Math.min(page - 2, totalPages - 4));
                            const p = start + i;
                            return (
                                <button
                                    key={p}
                                    className={`px-3 py-1 rounded ${p === page ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
                                    onClick={() => goToPage(p)}
                                >
                                    {p}
                                </button>
                            );
                        })}

                        <button
                            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                            onClick={() => goToPage(page + 1)}
                            disabled={page >= totalPages}
                        >
                            Next
                        </button>
                    </div>

                    <p className="text-center text-sm text-gray-500 mt-2">Page {page} of {totalPages}</p>
                </>
            )}

            {!isLoading && !error && cards.length === 0 && (
                <p className="mt-4">No cards found for query. Try a different search term.</p>
            )}

            <CardDetail
                card={selectedCard}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </main>
    );
}