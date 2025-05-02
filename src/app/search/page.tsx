'use client';

import {useEffect, useState} from 'react';
import {useSearchParams} from 'next/navigation';
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
    total_cards: number;
    has_more: boolean;
};

export default function SearchResultsPage() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || '';

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
                const response = await fetch(`http://localhost:8080/api/cards/search?q=${encodeURIComponent(query)}`);

                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }

                const data: CardSearchResponse = await response.json();
                console.log('API response:', data);

                setCards(data.cards);
                setTotalCards(data.total_cards);
            } catch (error) {
                console.error('Search failed:', error);
                setError(error instanceof Error ? error.message : 'Unknown error');
            } finally {
                setIsLoading(false);
            }
        }

        fetchResults();
    }, [query]);

    const handleCardClick = (card: Card) => {
        setSelectedCard(card);
        setIsModalOpen(true);
    };

    return (
        <main className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Search Results for: {query}</h1>
            {totalCards > 0 && (
                <p className="mb-4 text-gray-600">Found {totalCards} cards</p>
            )}

            {isLoading && <p className="mt-4">Loading...</p>}
            {error && <p className="mt-4 text-red-500">Error: {error}</p>}

            {!isLoading && !error && <CardGrid cards={cards} onCardClick={handleCardClick}/>}

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