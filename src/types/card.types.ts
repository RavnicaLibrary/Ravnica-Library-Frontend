// src/types/card.types.ts
export type Card = {
    id: string;
    name: string;
    image_uris?: {
        small?: string;
        normal?: string;
        large?: string;
        png?: string;
        art_crop?: string;
        border_crop?: string;
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

export type CardSearchResponse = {
    cards: Card[];
    total_cards: number;
    has_more: boolean;
};