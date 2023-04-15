import { useSelector } from "react-redux";
import { userOwnedGroups } from "../../Redux/Store";
import AccordionMember from "../AccordionMember";

export default function GroupsAccordion() {
  const ownedGroups = useSelector(userOwnedGroups);
  if (ownedGroups.length === 0) {
    return
  }
  return ownedGroups.map((row: any, i: number) => <AccordionMember row={row} i={i} />)
}
