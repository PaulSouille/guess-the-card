import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { debounce } from "lodash";
import { Key, useCallback, useEffect, useState } from "react";
import { ACard, getCardById } from "../service/cardsService";
import IconFaction from "./iconFaction";
import { LoadingIcon } from "./icons/loading";
import { SearchIcon } from "./icons/search-icon";
interface ChildComponentProps {
  onUserSelectCard: (card: ACard) => void;
  cards: ACard[];
  placeholder: string;
  cardsGuessed: ACard[];
}

function isCardGuessed(cardsGuessed: ACard[], card: ACard) {
  return cardsGuessed.some((cardGuessed) => cardGuessed.name === card.name);
}

export default function SearchBar({
  onUserSelectCard,
  cards,
  placeholder,
  cardsGuessed,
}: ChildComponentProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filteredItems, setFilteredItems] = useState<ACard[]>([]);
  const resetFilter = (cardToRemove: ACard) => {
    const cardsReset = cards
      .filter((card) => !isCardGuessed([...cardsGuessed, cardToRemove], card))
      .slice(0, 10);
    setFilteredItems(cardsReset);
  };
  useEffect(() => {
    if (cards.length !== 0 && filteredItems.length === 0) {
      setFilteredItems(cards.slice(0, 10));
    }
  }, [cards, filteredItems]);

  const handleSearch = (searchValue: string) => {
    setIsLoading(true);
    const filtered = cards
      .filter(
        (card) =>
          card.name.toLowerCase().includes(searchValue.toLowerCase()) &&
          !isCardGuessed(cardsGuessed, card),
      )
      .slice(0, 10);
    setFilteredItems(filtered);
    setIsLoading(false);
  };

  const handleSelect = (cardId: Key | null) => {
    if (!cardId) return;
    setIsLoading(true);
    const card = getCardById(cardId.toString());
    onUserSelectCard(card);

    setIsLoading(false);
    resetFilter(card);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetValue = useCallback(
    debounce((value: string) => {
      handleSearch(value);
    }, 500),
    [cards, cardsGuessed], // Removed handleSearch from dependencies as it doesn't change
  );

  return (
    <div className="flex   content-center	justify-center 	mb-5">
      <Autocomplete
        onSelectionChange={handleSelect}
        aria-label="test"
        defaultItems={filteredItems}
        onValueChange={debouncedSetValue}
        placeholder={placeholder}
        endContent={isLoading && <LoadingIcon />}
        startContent={<SearchIcon className="text-xl" />}
      >
        {(card) => (
          <AutocompleteItem textValue={card.name} key={card.id}>
            <div className="flex content-center ">
              <IconFaction factionRef={card.mainFaction.reference} />
              <div className="flex ml-5 content-center flex-wrap">
                {card.name}
                <div className="flex gap-2 ml-3 items-center">
                  <div className=" flex items-center justify-center rounded-full text-neutral-0 text-shadow-lg shadow-black w-6 h-6 sm-bold-caps bg-cost-hand">
                    {card.elements.MAIN_COST}
                  </div>
                  <div className="flex items-center justify-center rounded-full text-neutral-0 text-shadow-lg shadow-black w-6 h-6 sm-bold-caps bg-cost-recall mr-1">
                    {card.elements.RECALL_COST}
                  </div>
                  <div className="flex items-center  justify-center rounded-full text-neutral-0 text-shadow-lg shadow-black w-6 h-4 xs-bold-caps bg-forest">
                    {card.elements.FOREST_POWER}
                  </div>
                  <div className="flex items-center justify-center rounded-full text-neutral-0 text-shadow-lg shadow-black w-6 h-4 xs-bold-caps bg-moutain">
                    {card.elements.MOUNTAIN_POWER}
                  </div>
                  <div className="flex items-center justify-center rounded-full text-neutral-0 text-shadow-lg shadow-black w-6 h-4 xs-bold-caps bg-ocean">
                    {card.elements.OCEAN_POWER}
                  </div>
                </div>
              </div>
            </div>
          </AutocompleteItem>
        )}
      </Autocomplete>
    </div>
  );
}

// import { useEffect } from "react";

// interface ChildComponentProps {
//   onUserSelectCard: (card: ACard) => void;
//   cards: ACard[];
//   placeholder: string;
//   cardsGuessed: ACard[];
// }

// function isCardGuessed(cardsGuessed: ACard[], card: ACard) {
//   return cardsGuessed.some((cardGuessed) => cardGuessed.name === card.name);
// }

// export default function SearchBar({
//   onUserSelectCard,
//   cards,
//   placeholder,
//   cardsGuessed,
// }: ChildComponentProps) {
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [filteredItems, setFilteredItems] = useState<ACard[]>([]);

//   // Initialize filtered items if cards are available
//   useEffect(() => {
//     if (cards.length !== 0 && filteredItems.length === 0) {
//       setFilteredItems(cards.slice(0, 10));
//     }
//   }, [cards, filteredItems]);

//   const handleSearch = (searchValue: string) => {
//     setIsLoading(true);
//     const filtered = cards
//       .filter(
//         (card) =>
//           card.name.toLowerCase().includes(searchValue.toLowerCase()) &&
//           !isCardGuessed(cardsGuessed, card),
//       )
//       .slice(0, 10);
//     setFilteredItems(filtered);
//     setIsLoading(false);
//   };

//   const handleSelect = (cardId: Key | null) => {
//     if (!cardId) return;
//     setIsLoading(true);
//     const card = getCardById(cardId.toString());
//     if (card) {
//       onUserSelectCard(card);
//     }
//     setIsLoading(false);
//   };

//   const debouncedSetValue = useCallback(
//     debounce((value: string) => {
//       handleSearch(value);
//     }, 1000),
//     [cards, cardsGuessed], // Removed handleSearch from dependencies as it doesn't change
//   );

//   return (
//     <div className="flex content-center justify-center mb-5">
//       <Autocomplete
//         onSelectionChange={handleSelect}
//         aria-label="Card Search"
//         items={filteredItems} // Controlled items list
//         onValueChange={debouncedSetValue}
//         placeholder={placeholder}
//         endContent={isLoading && <LoadingIcon />}
//         startContent={<SearchIcon className="text-xl" />}
//       >
//         {(card) => (
//           <AutocompleteItem textValue={card.name} key={card.id}>
//             <div className="flex content-center">
//               <IconFaction factionRef={card.mainFaction.reference} />
//               <div className="flex ml-5 content-center flex-wrap">
//                 {card.name}
//                 <div className="flex gap-2 ml-3 items-center">
//                   <div className="flex items-center justify-center rounded-full text-neutral-0 text-shadow-lg shadow-black w-6 h-6 sm-bold-caps bg-cost-hand">
//                     {card.elements.MAIN_COST}
//                   </div>
//                   <div className="flex items-center justify-center rounded-full text-neutral-0 text-shadow-lg shadow-black w-6 h-6 sm-bold-caps bg-cost-recall mr-1">
//                     {card.elements.RECALL_COST}
//                   </div>
//                   <div className="flex items-center justify-center rounded-full text-neutral-0 text-shadow-lg shadow-black w-6 h-4 xs-bold-caps bg-forest">
//                     {card.elements.FOREST_POWER}
//                   </div>
//                   <div className="flex items-center justify-center rounded-full text-neutral-0 text-shadow-lg shadow-black w-6 h-4 xs-bold-caps bg-mountain">
//                     {card.elements.MOUNTAIN_POWER}
//                   </div>
//                   <div className="flex items-center justify-center rounded-full text-neutral-0 text-shadow-lg shadow-black w-6 h-4 xs-bold-caps bg-ocean">
//                     {card.elements.OCEAN_POWER}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </AutocompleteItem>
//         )}
//       </Autocomplete>
//     </div>
//   );
// }
