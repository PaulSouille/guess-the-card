import axios from "axios";
import { cardsNoOof } from "../data/cards_no_oof";
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ALTERED_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});
export function findCards(): ACard[] {

  return cardsNoOof as ACard[];
}

export function getCardById(cardId : string): ACard{
  return findCards().find((card)=>{
    return card.id === cardId
  })!
}

export async function fetchRareCards(url: string, cards: ACard[]): Promise<ACard[]> {
  try {
    console.log("fetching"+url)
    const response = await apiClient.get(url);
    const data: CardCollectionResponse = response.data;

    const newCards = [...cards, ...data["hydra:member"]];
    if (data["hydra:view"]?.["hydra:next"]) {
      return fetchRareCards(data["hydra:view"]["hydra:next"], newCards);
    }

    return newCards;
  } catch (error) {
    console.error("Error fetching cards:", error);
    return cards; 
  }
}

export function getRandomCard(cards: ACard[]): ACard{
  return cards[Math.floor(Math.random() * cards.length)];

}

interface HydraCollection<T> {
  "@context": string;
  "@id": string;
  "@type": string;
  "hydra:totalItems": number;
  "hydra:member": T[];
  "hydra:view"?: HydraPartialCollectionView;
  "hydra:search"?: HydraIriTemplate;
}

interface HydraPartialCollectionView {
  "@id": string;
  "@type": string;
  "hydra:first"?: string;
  "hydra:last"?: string;
  "hydra:next"?: string;
}

interface HydraIriTemplate {
  "@type": string;
  "hydra:template": string;
  "hydra:variableRepresentation": string;
}

export interface ACard {
  "@id": string;
  "@type": string;
  reference: string;
  cardType: CardType;
  rarity: Rarity;
  cardProduct: CardProduct;
  imagePath: string;
  qrUrlDetail: string;
  id: string;
  mainFaction: Faction;
  name: string;
  elements: CardElements;
  collectorNumberFormatted: string;
}

interface CardType {
  "@id": string;
  "@type": string;
  reference: string;
  id: string;
  name: string;
}

interface Rarity {
  "@id": string;
  "@type": string;
  reference: string;
  id: string;
  name: string;
}

interface CardProduct {
  "@id": string;
  "@type": string;
  reference: string;
  name: string;
}

interface Faction {
  "@id": string;
  "@type": string;
  reference: string;
  color: string;
  id: string;
  name: string;
}

interface CardElements {
  MAIN_COST: string;
  RECALL_COST: string;
  OCEAN_POWER: string;
  MOUNTAIN_POWER: string;
  FOREST_POWER: string;
  MAIN_EFFECT: string;
}

type CardCollectionResponse = HydraCollection<ACard>;

