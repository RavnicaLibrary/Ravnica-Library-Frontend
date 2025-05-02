'use client';

import {useEffect} from 'react';
import {Card} from '@/types';

type CardDetailProps = {
    card: Card | null;
    isOpen: boolean;
    onClose: () => void;
};

export default function CardDetail({card, isOpen, onClose}: CardDetailProps) {
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };

        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    if (!isOpen || !card) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
                <div className="p-6">
                    <div className="flex justify-between items-start">
                        <h2 className="text-2xl font-bold mb-4">{card.name}</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                            ✕
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Card Image */}
                        <div>
                            {card.image_uris?.normal && (
                                <img
                                    src={card.image_uris.normal}
                                    alt={card.name}
                                    className="w-full rounded-lg"
                                />
                            )}
                        </div>

                        {/* Card Details */}
                        <div>
                            <p className="text-gray-700 mb-2">{card.type_line}</p>
                            {card.mana_cost && (
                                <p className="mb-2">
                                    <span className="font-semibold">Mana Cost:</span> {card.mana_cost}
                                </p>
                            )}
                            {card.oracle_text && (
                                <div className="mb-4">
                                    <p className="font-semibold">Oracle Text:</p>
                                    <p className="whitespace-pre-line">{card.oracle_text}</p>
                                </div>
                            )}
                            {(card.power && card.toughness) && (
                                <p className="mb-2">
                                    <span className="font-semibold">P/T:</span> {card.power}/{card.toughness}
                                </p>
                            )}
                            <div className="mt-4 grid grid-cols-2 gap-2">
                                <p><span className="font-semibold">Set:</span> {card.set_name} ({card.set})</p>
                                <p><span className="font-semibold">Rarity:</span> {card.rarity}</p>
                            </div>

                            {/* Prices */}
                            {card.prices && Object.keys(card.prices).some(k => card.prices?.[k as keyof typeof card.prices]) && (
                                <div className="mt-4">
                                    <p className="font-semibold mb-2">Prices:</p>
                                    <div className="grid grid-cols-2 gap-2">
                                        {card.prices.usd && <p>USD: ${card.prices.usd}</p>}
                                        {card.prices.usd_foil && <p>USD Foil: ${card.prices.usd_foil}</p>}
                                        {card.prices.eur && <p>EUR: €{card.prices.eur}</p>}
                                        {card.prices.eur_foil && <p>EUR Foil: €{card.prices.eur_foil}</p>}
                                        {card.prices.tix && <p>MTGO: {card.prices.tix} tix</p>}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}