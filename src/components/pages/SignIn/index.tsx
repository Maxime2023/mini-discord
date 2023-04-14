import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import CircularProgress from "@mui/material/CircularProgress";
import { Alert } from '@mui/material';
import { changeUserEmail, changeUserNickName, changeUserId, changeOwnedGroups, changeSubscribedGroups } from '../../../Redux/Store';
import axios from 'axios';

const theme = createTheme();

export default function SignInSide() {
    const [isLoading, setLoading] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        const apiUrl = 'https://ynov-workplace.osc-fr1.scalingo.io/auth'
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email');
        const password = data.get('password');
        axios.post(`${apiUrl}`, {email, password})
        .then((response) => {
            const config = {
                headers: { Authorization: `Bearer ${response.data.token}` }
              };
            localStorage.setItem("token", response.data.token)
            axios.get(`${process.env.REACT_APP_API_URL}/users/1/info`, config)
            .then((user) => {
                const {email, id, nickname} = user.data
                dispatch(changeUserEmail(email));
                dispatch(changeUserId(id));
                dispatch(changeUserNickName(nickname));
                axios.get(`${process.env.REACT_APP_API_URL}/users/${id}`, config)
                .then((user) => {
                    setLoading(false);
                    const {ownedGroups, subscribedGroups} = user.data
                    dispatch(changeOwnedGroups(ownedGroups));
                    dispatch(changeSubscribedGroups(subscribedGroups));
                    navigate('/users')
                })
            })
        })
        .catch((err) => {
            setLoading(false)
            setError(true);
            console.log(err.message)
        } )
    };

    if (localStorage.getItem('token')) {
        navigate('/profile')
    }

    return (
        <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
                backgroundImage: 'url(https://source.unsplash.com/random)',
                backgroundRepeat: 'no-repeat',
                backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
                sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                Se connecter
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Addresse email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onFocus={() => setError(false)}
                />
                <TextField
                    margin="normal"
                    onFocus={() => setError(false)}
                    required
                    fullWidth
                    name="password"
                    label="Mot de passe"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, height: 40 }}
                >
              {isLoading ? (
                <CircularProgress style={{ color: "white" }} size={25} />
              ) : (
                "Se connecter"
              )}
                </Button>
                {error && <Alert severity="error">Invalid username or password</Alert>}
                <Grid container>
                    <Grid item>
                    <Link style={{cursor: 'pointer'}} variant="body2" onClick={() => navigate('/signUp')}>
                        {"Pas encore de compte? Inscrivez vous"}
                    </Link>
                    </Grid>
                </Grid>
                </Box>
            </Box>
            </Grid>
        </Grid>
        </ThemeProvider>
    );
}