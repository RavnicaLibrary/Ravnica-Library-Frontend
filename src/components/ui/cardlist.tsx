// components/CardList.jsx
import {JSX} from "react";

type Card = {
    id: string;
    name: string;
    imageUrl?: string;
    type: string;
    text?: string;
};

type CardListProps = {
    cards: Card[];
};


export default function CardList({ cards = [] }: CardListProps): JSX.Element {
    if (cards.length === 0) {
        return <p className="mt-4">No cards found. Try a different search term.</p>;
    }

    return (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {cards.map((card) => (
                <div
                    key={card.id}
                    className="border rounded-lg p-4 shadow hover:shadow-md transition-shadow"
                >
                    <h2 className="font-bold mb-2">{card.name}</h2>
                    {card.imageUrl && (
                        <img
                            src={card.imageUrl}
                            alt={card.name}
                            className="w-full h-auto rounded"
                        />
                    )}
                    <p className="mt-2 text-sm text-gray-600">{card.type}</p>
                    {card.text && <p className="mt-2 text-sm">{card.text}</p>}
                </div>
            ))}
        </div>
    );
}