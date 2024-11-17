import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { ACard } from "../service/cardsService";

interface ChildComponentProps {
  cardToGuess: ACard;
  cardsGuessed: ACard[];
}

export default function ResultTable({
  cardToGuess,
  cardsGuessed,
}: ChildComponentProps) {
  const isRightValue = (value: string, property: string) => {
    // Split the property string by '.' to handle nested properties
    const keys = property.split(".") as (keyof ACard)[];

    let currentValue: any = cardToGuess;
    // Traverse the nested properties
    for (let key of keys) {
      console.log(key);
      console.log(currentValue);
      currentValue = currentValue![key];
    }
    console.log(currentValue);
    console.log(value);
    // Compare the final value to the desired value
    return currentValue === value;
  };

  return (
    <Table
      className="custom-table"
      aria-label="Example static collection table"
    >
      <TableHeader>
        <TableColumn>NOM</TableColumn>
        <TableColumn>FACTION</TableColumn>
        <TableColumn>COUT MANA MAIN</TableColumn>
        <TableColumn>COUT MANA RESERVE</TableColumn>
        <TableColumn>FORET</TableColumn>
        <TableColumn>MONTAGNE</TableColumn>
        <TableColumn>OCEAN</TableColumn>
      </TableHeader>
      <TableBody>
        {cardsGuessed.map((cardToGuess, index) => (
          <TableRow key={`guessed-${index}`}>
            <TableCell>{cardToGuess?.name}</TableCell>
            <TableCell
              className={`${
                isRightValue(cardToGuess?.mainFaction.name, "mainFaction.name")
                  ? "bg-green-500"
                  : "bg-red-500"
              } rounded-md`}
            >
              {cardToGuess?.mainFaction.name}
            </TableCell>
            <TableCell
              className={`${
                isRightValue(
                  cardToGuess?.elements.MAIN_COST,
                  "elements.MAIN_COST",
                )
                  ? "bg-green-500"
                  : "bg-red-500"
              } rounded-md`}
            >
              {cardToGuess?.elements.MAIN_COST}
            </TableCell>
            <TableCell
              className={`${
                isRightValue(
                  cardToGuess?.elements.RECALL_COST,
                  "elements.RECALL_COST",
                )
                  ? "bg-green-500"
                  : "bg-red-500"
              } rounded-md`}
            >
              {cardToGuess?.elements.RECALL_COST}
            </TableCell>
            <TableCell
              className={`${
                isRightValue(
                  cardToGuess?.elements.FOREST_POWER,
                  "elements.FOREST_POWER",
                )
                  ? "bg-green-500"
                  : "bg-red-500"
              } rounded-md`}
            >
              {cardToGuess?.elements.FOREST_POWER}
            </TableCell>
            <TableCell
              className={`${
                isRightValue(
                  cardToGuess?.elements.MOUNTAIN_POWER,
                  "elements.MOUNTAIN_POWER",
                )
                  ? "bg-green-500"
                  : "bg-red-500"
              } rounded-md`}
            >
              {cardToGuess?.elements.MOUNTAIN_POWER}
            </TableCell>
            <TableCell
              className={`${
                isRightValue(
                  cardToGuess?.elements.OCEAN_POWER,
                  "elements.OCEAN_POWER",
                )
                  ? "bg-green-500"
                  : "bg-red-500"
              } rounded-md`}
            >
              {cardToGuess?.elements.OCEAN_POWER}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
