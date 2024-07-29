import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    AuthErrorCodes,
    signOut,
    UserCredential,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";

interface User {
    uid: string;
    email: string | null;
    displayName: string | null;
}

export interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
}

interface RegisterData {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}

interface LoginData {
    email: string;
    password: string;
}

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
};

const handleAuthError = (error: unknown): string => {
    if (typeof error === "object" && error !== null && "code" in error) {
        const errorCode = (error as { code: string }).code;
        switch (errorCode) {
            case AuthErrorCodes.EMAIL_EXISTS:
                return "This email is already registered. Please use a different email or try logging in.";
            case AuthErrorCodes.INVALID_EMAIL:
                return "The email address is not valid. Please check and try again.";
            case AuthErrorCodes.WEAK_PASSWORD:
                return "The password is too weak. Please choose a stronger password.";
            case AuthErrorCodes.USER_DELETED:
                return "User not found. Please check your email or register a new account.";
            case AuthErrorCodes.INVALID_PASSWORD:
                return "Incorrect password. Please try again.";
            default:
                return `Authentication error: ${errorCode}`;
        }
    } else if (error instanceof Error) {
        return `An error occurred: ${error.message}`;
    } else {
        return "An unknown error occurred. Please try again later.";
    }
};

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async ({ firstname, lastname, email, password }: RegisterData, { rejectWithValue }) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await updateProfile(user, {
                displayName: `${firstname} ${lastname}`,
            });

            await setDoc(doc(db, "users", user.uid), {
                firstname,
                lastname,
                email,
            });

            return {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
            };
        } catch (error: unknown) {
            return rejectWithValue(handleAuthError(error));
        }
    }
);

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ email, password }: LoginData, { rejectWithValue }) => {
        try {
            const userCredential: UserCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;

            return {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
            };
        } catch (error: unknown) {
            return rejectWithValue(handleAuthError(error));
        }
    }
);

export const logoutUser = createAsyncThunk("auth/logoutUser", async (_, { rejectWithValue }) => {
    try {
        await signOut(auth);
    } catch (error) {
        return rejectWithValue(handleAuthError(error));
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        purgeAuth: (state) => {
            state.user = null;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                state.error = null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearError, purgeAuth } = authSlice.actions;
export default authSlice.reducer;
