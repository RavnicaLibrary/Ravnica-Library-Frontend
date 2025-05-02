import {Card} from '@/types';

type CardGridProps = {
    cards: Card[];
    onCardClick?: (card: Card) => void;
};

export default function CardGrid({cards, onCardClick}: CardGridProps) {
    if (cards.length === 0) {
        return <p className="mt-4">No cards found.</p>;
    }

    return (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {cards.map((card) => (
                <div
                    key={card.id}
                    className="border rounded-lg p-4 shadow hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => onCardClick && onCardClick(card)}
                >
                    <h2 className="font-bold mb-2">{card.name}</h2>
                    {card.image_uris?.normal && (
                        <img
                            src={card.image_uris.normal}
                            alt={card.name}
                            className="w-full h-auto rounded"
                        />
                    )}
                    <div className="mt-2 flex justify-between text-xs text-gray-500">
                        <span>{card.set_name}</span>
                        {card.prices?.usd && <span>${card.prices.usd}</span>}
                    </div>
                </div>
            ))}
        </div>
    );
}