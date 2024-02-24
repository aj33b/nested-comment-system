import {Box, Button} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Outlet} from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import {useDispatch, useSelector} from "react-redux";
import {signOut} from "../state/auth/authSlice.ts";
import {AppDispatch, RootState} from "../state/store.ts";
import { useNavigate } from "react-router-dom";

export default function AppLayout() {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    return (
        <>
            <AppBar>
                <Toolbar variant={"dense"} sx={{display: "flex"}}>
                    <Typography onClick={() => navigate('/')} align={"left"} sx={{flexGrow: 1}} variant="h6" noWrap component="div">
                        Nested Comment System
                    </Typography>
                    {isAuthenticated ? (
                        <Button color="inherit" startIcon={<LogoutIcon/>} onClick={() => {
                            dispatch(signOut())
                        }}>Sign Out</Button>
                    ) : (
                        <>
                            <Button color="inherit" onClick={() => navigate('/sign-in')}>Sign In</Button>
                            <Button color="inherit" onClick={() => navigate('/sign-up')}>Sign Up</Button>
                        </>
                    )

                    }
                </Toolbar>
            </AppBar>
            <Box sx={{mt: 6}}>
                <Outlet/>
            </Box>
        </>
    );
}