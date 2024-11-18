import {
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import styles from "./footer.module.css";

export default function Footer() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div
      className={`${styles.footerBorder} background-color-black z-50 text-color-white  justify-between h-16 content-center flex-wrap hidden md:flex`}
    >
      <div className="grow basis-0 flex justify-center	flex-wrap content-center h-full	">
        <Link
          className="text-color-white cursor-pointer underline"
          onClick={onOpen}
        >
          Informations
        </Link>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex  gap-1">Information</ModalHeader>

                <ModalBody>
                  <p>
                    Ce site est un projet indépendant et n’a aucun lien,
                    affiliation, approbation ou partenariat avec Equinox. Tous
                    les contenus, y compris les images, logos et autres éléments
                    visuels utilisés sur ce site, sont la propriété exclusive de
                    Equinox ou de leurs ayants droit respectifs.
                  </p>
                </ModalBody>
                <ModalFooter>Contact : paul.souille85@gmail.com</ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>

        <div></div>
      </div>
      <div className="h-full  flex-wrap content-center	">
        Made with ❤️ by
        <Link
          target="_blank"
          className="ml-1 text-color-white underline"
          href="https://paulsouille.fr"
        >
          Paul
        </Link>
      </div>
      <div className="grow basis-0	flex	justify-center flex-wrap content-center h-full">
        <div>v{process.env.NEXT_PUBLIC_VERSION}</div>
      </div>
    </div>
  );
}
