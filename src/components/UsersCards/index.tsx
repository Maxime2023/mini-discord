import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

interface User {
  "@id": string,
  "@type": string,
  id: number,
  email: string,
  nickname: string
}

interface UsersProps {
  users: User[] | null;
}

const UsersCard  = ({ users } : UsersProps) => {
  const navigate = useNavigate();
  return (
    <>
      { users?.map((user) => (
        <Card key={user.id} style={{ margin: "16px", cursor: "pointer" }} onClick={() => navigate(`/users/${user.id}`)} >
          <CardContent>
            <Typography variant="h5" component="h2">
              {user.nickname}
            </Typography>
            <Typography color="textSecondary">{user.email}</Typography>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default UsersCard;
