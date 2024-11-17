import { Image } from "@nextui-org/image";
import { Modal, ModalContent, ModalHeader } from "@nextui-org/react";
import { ACard } from "../service/cardsService";

interface ChildComponentProps {
  isOpen: boolean;
  onOpenChange: () => void;
  card: ACard;
}

export default function VictoryModal({
  card,
  isOpen,
  onOpenChange,
}: ChildComponentProps) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 flex-wrap content-center">
              🎉 Félicitations 🎉
            </ModalHeader>
            <h1 className="flex justify-center">{`Il s'agissait bien de : `}</h1>
            <Image
              className="px-10 py-5 flex justify-center rounded-sm"
              alt="background"
              src={card.imagePath}
            ></Image>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
