import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import bcrypt from 'bcryptjs'

export interface IUser {
    id: string;
    username: string;
    email: string;
    password: string;
}

export interface ISignUp extends Omit<IUser, 'id'> {
    confirmPassword: string;
}

export interface ISignIn extends Omit<IUser, 'username'|'id'> {}

export interface IUserState {
    users: Record<string, IUser>;
    user: IUser | null;
    isAuthenticated: boolean;
}

const initialState: IUserState = {
    users: {
        '1708805665104': {
            id: '1708805665104',
            username: 'Jorge Parker',
            email: 'jorge@gmail.com',
            password: '$2a$10$ZluosyDYiWHHM18sIcVi3Oj8eLgsAK4wqtpPZpUuyvrcn1Rhi2XKW'
        },
        '1708805715007': {
            id: '1708805715007',
            username: 'Jorge Parker',
            email: 'jorge2@gmail.com',
            password: '$2a$10$9KuI2rhaVRr/LctTOBM5bu6.2lzGoMljnBfkH7iFiKihvZ7hxwONS'
        },
        '1708805746933': {
            id: '1708805746933',
            username: 'Andrew',
            email: 'andrew@gmail.com',
            password: '$2a$10$CHsUVoMOYyTmrKquFstineUBwP9rUvIxaPfmfU/oycvWfZvyodmVe'
        },
        '1708805856396': {
            id: '1708805856396',
            username: 'Alina',
            email: 'alina@gmail.com',
            password: '$2a$10$p92Xfx4HdZ2n4xJbkGPZweyNjk3cpnTeP9..j60qhCgyvk2sKwWo6'
        },
        '1708805934619': {
            id: '1708805934619',
            username: 'Kristina Smith',
            email: 'kristina@gmail.com',
            password: '$2a$10$W/Py/QkdCtbESBQrJ2fP/.X0nrBO9dg7za0TMEZJltTqMLHK1wX6u'
        },
        '1708805962786': {
            id: '1708805962786',
            username: 'Jacob Parker',
            email: 'jacob@gmail.com',
            password: '$2a$10$nUyuHM6ARJ/B5uaEroRfU.JziHGRWEZ/8v99iYpDk.QlEega3hKC6'
        }
    },
    user: null,
    isAuthenticated: false,
};

export const signUp = createAsyncThunk(
    'auth/signUp',
    async (user: ISignUp, thunkAPI) => {
        const { username, email, password, confirmPassword } = user;
        if (password !== confirmPassword) {
            return thunkAPI.rejectWithValue('Passwords do not match');
        }

        const state = thunkAPI.getState() as { auth: IUserState };

        const doesEmailExist = Object.values(state.auth.users).some(
            (existingUser: IUser) => existingUser.email === email
        );
        if (doesEmailExist) {
            return thunkAPI.rejectWithValue('Email already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const id = Date.now().toString();
        return {id, username, email, password: hashedPassword };
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        signIn: (state, action: PayloadAction<ISignIn>) => {
            const user = Object.values(state.users).find(
                (user) => user.email === action.payload.email
            );

            if (user && bcrypt.compareSync(action.payload.password, user.password)) {
                state.isAuthenticated = true;
                state.user = user;
            }
        },
        signOut: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(signUp.fulfilled, (state, action: PayloadAction<IUser>) => {
            state.users[action.payload.id] = action.payload; // add user to the dictionary
            state.isAuthenticated = true;
            state.user = action.payload;
        });
        builder.addCase(signUp.rejected, (_state, action) => {
            console.error(action.payload);
            console.error('Sign up failed with error:', action.error.message);
        });
    },
});

export const { signIn, signOut} = authSlice.actions;

export default authSlice.reducer;