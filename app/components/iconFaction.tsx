import { Image } from "@nextui-org/react";

export enum Faction {
  AX,
  OR,
  MU,
  LY,
  YZ,
  BR,
}

interface ChildComponentProps {
  factionRef: string;
}
function getImageFromId(faction: Faction) {}

export default function IconFaction({ factionRef }: ChildComponentProps) {
  // eslint-disable-next-line jsx-a11y/alt-text
  return <Image width={25} src={`/factions/${factionRef}_icon.png`} />;
}
