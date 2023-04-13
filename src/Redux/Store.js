import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice(
    {
        name: 'store',
        initialState: {
            isSideBarOpen: false,
            users: [],
            userId: null,
            userNickName: null,
            userEmail: null,
            subscribedGroups: [],
            ownedGroups: []
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
        },
    }
);
export const {  changeSideBarState, changeUsersState, changeUserEmail, changeUserId, changeUserNickName, changeOwnedGroups, changeSubscribedGroups } = slice.actions;

export const sideBarStore = state => state.store.isSideBarOpen;

export const usersStore = state => state.store.users;

export const userId = state => state.store.userId;

export const userEmail = state => state.store.userEmail;

export const userNickName = state => state.store.userNickName;

export const userOwnedGroups = state => state.store.ownedGroups;

export const userSubscribedGroups = state => state.store.subscribedGroups;

export default slice.reducer;