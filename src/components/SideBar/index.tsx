import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector, useDispatch } from "react-redux";
import { sideBarStore, changeSideBarState, userOwnedGroups, userSubscribedGroups } from "../../Redux/Store";
import GroupIcon from "@mui/icons-material/Group";
import { useEffect, useState } from "react";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DisplayNotification from "../DisplayNotification";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import Tooltip from '@mui/material/Tooltip';

type Anchor = "top" | "left" | "bottom" | "right";

type Group = {
    name: string
    '@id': string
}

export default function SideBar() {
  const isSideBarOpen = useSelector(sideBarStore);
  const [groups, setgroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const ownedGroups = useSelector(userOwnedGroups)
  const subscribedGroups = useSelector(userSubscribedGroups)

  useEffect(() => {
    setIsLoading(true);
    const apiUrl = process.env.REACT_APP_API_URL;
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios.get(`${apiUrl}/groups`, config).then((res) => {
      setgroups(res.data['hydra:member']);
      setIsLoading(false);
    });
  }, [isSideBarOpen]);

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      dispatch(changeSideBarState(open));
    };

    const deleteGroup = (event: any, groupId: string) => {
      console.log(groupId);
      event?.stopPropagation();
      const apiUrl = "https://ynov-workplace.osc-fr1.scalingo.io";
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };
      axios.delete(`${apiUrl}${groupId}`, config).then((res) => {
        setgroups([...groups.filter((item) => item['@id'] !== groupId)])
      });
    }

    const askSubscription = (event: any, groupId: any) => {
      console.log(groupId);
      event?.stopPropagation();
      console.log(groupId)
      const apiUrl = process.env.REACT_APP_API_URL;
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };
      axios.post(`${apiUrl}/group_requests`, {"targetGroup": groupId}, config).then((res) => {
        setOpen(true)
      });
    }

    const styleBtn = {display: 'flex', justifyContent: 'center', alignItems: 'center'}

    const handleGroups = (group: Group) => {
      if (!ownedGroups || !subscribedGroups) {
        return;
      }
      return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        {
          ownedGroups.includes(group['@id']) && <Tooltip title="Supprimer ce groupe"><ListItemButton style={styleBtn} onClick={(e) => deleteGroup(e, group['@id'])} ><ListItemIcon><DeleteIcon style={{color: "tomato", cursor: "pointer"}}/></ListItemIcon></ListItemButton></Tooltip>
        }
        {
          !subscribedGroups.includes(group['@id']) &&<Tooltip title="Demander à rejoindre ce groupe "><ListItemButton style={styleBtn} onClick={(e) => askSubscription(e, group['@id'])} ><ListItemIcon><PersonAddAlt1Icon style={{color: "#1876d1", cursor: "pointer"}}/></ListItemIcon></ListItemButton></Tooltip>
        } 
        {      
          subscribedGroups.includes(group['@id']) &&<Tooltip title="Créer un thread"><ListItemButton><ListItemIcon><AddCircleIcon onClick={() => navigate(`${group['@id'].replace('/api', "")}/threads`)} style={{color: "#1876d1", cursor: "pointer"}}/></ListItemIcon></ListItemButton></Tooltip>
        }
          </div>
      )
    
    }

    const listElements = () => {
        if (isLoading) {
            return (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '20px' }}>
                <CircularProgress />
              </Box>
            )
        }
        return (
            <List>
            {groups.map((group: Group, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton style={styleBtn} onClick={() => navigate(`${group['@id'].replace('/api', "")}`)}>
                  <ListItemIcon>
                    <WorkspacesIcon/>
                  </ListItemIcon>
                  <ListItemText primary={group.name.length > 25 ? group.name.slice(0,25) + "..." : group.name} />
                </ListItemButton>
                {handleGroups(group)}
              </ListItem>
            ))}
          </List>
        )
    }

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 650 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton disabled>
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary={"Les groupes"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{backgroundColor: '#1876d1', color: 'white'}} onClick={() => navigate('/create-group')} >
            <ListItemIcon>
              <GroupAddIcon sx={{color: 'white'}}/>
            </ListItemIcon>
            <ListItemText primary={"Créer un groupe"} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
        {listElements()}
    </Box>
  );

  return (
    <div>
      <React.Fragment key={"left"}>
      <DisplayNotification
        message="Votre demande a été envoyée."
        open={open}
        onClose={() => setOpen(false)}
      />
        <Drawer
          anchor={"left"}
          open={isSideBarOpen}
          onClose={toggleDrawer("left", false)}
        >
          { list("left")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
