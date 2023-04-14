
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import axios from "axios"


export default function ProfileComp({
  email,
  nickname,
  id,
  profileImageUrl,
}: any) {

  const navigate = useNavigate()
  const deleteAccount = () => {
    console.log(id)

    navigate('/signIn');
    const apiUrl = process.env.REACT_APP_API_URL;
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios.delete(`${apiUrl}/users/${id}`,  config).then((res) => {
      localStorage.clear()
    });
  }

  return (
    <Card>
      <CardContent>
        <Avatar alt={nickname} src={profileImageUrl}  />
        <Typography gutterBottom variant="h5" component="h2">
          {nickname}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Email: {email}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          ID: {id}
        </Typography>
      </CardContent>
      <CardActions >
        <Button endIcon={<DeleteIcon />} variant='contained' style={{backgroundColor: "tomato"}} onClick={() => deleteAccount()}>
          Supprimer mon compte
        </Button>
      </CardActions>
    </Card>
  );
}
