import styles from "./style.module.scss";

import { EquippedItem } from "../EquipedItem";
import { useModalStore } from "@/store/modal";

export function Equipments(props: {
  equips: Equipment[];
  onClick?: (i: Item) => void;
}) {
  const modalStore = useModalStore();
  const inventorySlots: (Equipment | { id: string })[] = props.equips;
  if (inventorySlots.length < 4) {
    const remainingSlots = 4 - inventorySlots.length;
    for (let index = 0; index < remainingSlots; index++) {
      inventorySlots.push({ id: `empty-${index}` });
    }
  }

  return (
    <div className={styles.inventoryContainer}>
      {props.equips?.map((equip) => (
        <EquippedItem
          key={equip.id}
          equip={equip}
          onClick={() => {
            modalStore.setInventoryItem({
              open: true,
              selectedItem: equip,
            });
          }}
        />
      ))}
    </div>
  );
}
