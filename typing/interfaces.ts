export interface Card {
    "attack": number,
    "card_metadata_id": number,
    "created_at": Date,
    "defence": number,
    "description": string,
    "drop_chance_percentage": number,
    "max_allowed_in_circulation": number,
    "name": string,
    "pic": string | null,
    "rarity": number
}

export interface User {
    "background_pic": string | null,
    "balance": number,
    "created_at": Date,
    "display_name": string | null,
    "email_address": string,
    "profile_pic": string | null,
    "tagline": string | null,
    "user_id": string
}

export interface Pack {
    "card_metadata_id_within_1": number,
    "card_metadata_id_within_2": number,
    "card_metadata_id_within_3": number,
    "card_metadata_id_within_4": number,
    "card_metadata_id_within_5": number,
    "card_metadata_id_within_6": number,
    "card_metadata_id_within_7": number,
    "cost": number,
    "created_at": Date,
    "description": string,
    "max_allowed_open_packs": number,
    "name": string
    "num_packs_opened": number,
    "pack_id": string
}
