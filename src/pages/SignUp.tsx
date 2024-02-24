import {Box, Button, Card, CardContent, TextField, Typography} from "@mui/material";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {signUp} from "../state/auth/authSlice";
import {AppDispatch, RootState} from "../state/store.ts";
import {useNavigate} from "react-router-dom";

const SignUp = () => {
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        dispatch(signUp({username, email, password, confirmPassword}));
    };

    useEffect(() => {
        if (isAuthenticated) {
            setUsername('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            navigate('/sign-in');
        }
    }, [isAuthenticated]);

    return (
        <Box sx={{width: '50%', margin: 'auto'}}>
            <Card variant={"elevation"}>
                <CardContent sx={{padding: 4}}>
                    <Typography variant="h4">Sign Up</Typography>
                    <Box component="form" onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Name"
                            autoFocus
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                            }}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
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
                            label="Password"
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Confirm Password"
                            type="password"
                            id="confirm-password"
                            value={confirmPassword}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                            }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Sign Up
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    )
}

export default SignUp;