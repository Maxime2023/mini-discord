import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSelector } from "react-redux";
import { userOwnedGroups } from "../../Redux/Store";
import { CircularProgress } from "@mui/material";
import AccordionMember from "../AccordionMember";
import axios from 'axios'

export default function GroupsAccordion() {
  const ownedGroups = useSelector(userOwnedGroups);
  console.log("ownedGroupsownedGroups", ownedGroups)
  if (ownedGroups.length === 0) {
    return
  }
  return ownedGroups.map((row: any, i: number) => <AccordionMember row={row} i={i} />)
}
