import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice(
    {
        name: 'store',
        initialState: {
            isSideBarOpen: false,
            users: [],
            userId: "",
            userNickName: null,
            userEmail: null,
            subscribedGroups: [],
            ownedGroups: [],
            loggedUsers: [],
            socket: null
        },
        reducers: {
            changeSideBarState: (state, action) => {
              state.isSideBarOpen = action.payload;
            },
            changeUsersState: (state, action) => {
                state.users = action.payload;
            },
            changeUserId: (state, action) => {
                state.userId = action.payload;
            },
            changeUserNickName: (state, action) => {
                state.userNickName = action.payload;
            },
            changeUserEmail: (state, action) => {
                state.userEmail = action.payload;
            },
            changeOwnedGroups: (state, action) => {
                state.ownedGroups = action.payload;
            },
            changeSubscribedGroups: (state, action) => {
                state.subscribedGroups = action.payload;
            },
            changeLoggedUsers: (state, action) => {
                state.loggedUsers = action.payload;
            },
            changeSocket: (state, action) => {
                state.socket = action.payload;
            },
        },
    }
);
export const {  changeSideBarState, changeUsersState, changeUserEmail, changeUserId, changeUserNickName, changeOwnedGroups, changeSubscribedGroups, changeLoggedUsers, changeSocket } = slice.actions;

export const sideBarStore = state => state.store.isSideBarOpen;

export const usersStore = state => state.store.users;

export const userId = state => state.store.userId;

export const userEmail = state => state.store.userEmail;

export const userNickName = state => state.store.userNickName;

export const userOwnedGroups = state => state.store.ownedGroups;

export const userSubscribedGroups = state => state.store.subscribedGroups;

export const loggedUsers = state => state.store.loggedUsers;

export const socket = state => state.store.socket;

export default slice.reducer;