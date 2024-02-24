import React, {useEffect} from 'react';
import {Box, Button, Card, CardContent, TextField, Typography} from '@mui/material';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../state/store.ts";
import {signIn} from '../state/auth/authSlice.ts';
import {useNavigate} from 'react-router-dom';

const SignIn = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        dispatch(signIn({email, password}));
    };

    useEffect(() => {
        if (isAuthenticated) {
            setEmail('');
            setPassword('');
            navigate('/');
        }
    }, [isAuthenticated]);

    return (
        <Box sx={{width: '50%', margin: 'auto'}}>
            <Card variant={"elevation"}>
                <CardContent sx={{padding: 4}}>
                    <Typography variant="h4">Sign In</Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Sign In
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Box>

    );
}

export default SignIn;