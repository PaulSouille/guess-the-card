"use client";

import { Image } from "@nextui-org/image";
import { Card, CardBody, useDisclosure } from "@nextui-org/react";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import ResultTable from "./components/resultTable";
import Searchbar from "./components/searchbar";
import VictoryModal from "./components/victoryModal";
import { ACard, findCards, getRandomCard } from "./service/cardsService";

const Home: NextPage = () => {
  const [cardToGuess, setCardToGuess] = useState<ACard | null>(null);
  const [cards, setCards] = useState<ACard[]>([]);
  const [searchbarPlaceholder, setSearchbarPlaceholder] = useState<string>("");
  const [cardsGuessed, setCardsGuessed] = useState<ACard[]>([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const victory = () => {
    onOpen();
  };

  const onUserSelectCard = (card: ACard) => {
    if (cardToGuess!.id === card.id) {
      victory();
    }
    setCardsGuessed(
      [...cardsGuessed, card].filter((card) => card != undefined),
    );
  };
  useEffect(() => {
    const fetchCards = findCards();
    setCards(fetchCards);

    if (fetchCards.length > 0) {
      const randomCard = getRandomCard(fetchCards);
      setCardToGuess(randomCard);
      setSearchbarPlaceholder(
        `${getRandomCard(fetchCards).name}, ${getRandomCard(fetchCards).name}, ${getRandomCard(fetchCards).name}`,
      );
    }
  }, []);
  return (
    <div>
      <VictoryModal
        card={cardToGuess!}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      ></VictoryModal>
      <Head>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center">
        <Image
          alt="background"
          src="https://altered-cms-prod-eu.s3.eu-west-3.amazonaws.com/wp-content/uploads/sites/2/2024/07/18130825/altered_homepage_cover_logo.png"
          width={700}
        ></Image>
        {cardToGuess?.name}
        <Card className="w-full justify-items-center self-center	">
          <CardBody className="p-5">
            <Searchbar
              cardsGuessed={cardsGuessed}
              placeholder={searchbarPlaceholder}
              cards={cards}
              onUserSelectCard={onUserSelectCard}
            ></Searchbar>

            <ResultTable
              cardToGuess={cardToGuess!}
              cardsGuessed={cardsGuessed}
            ></ResultTable>
          </CardBody>
        </Card>
      </main>
    </div>
  );
};

export default Home;
