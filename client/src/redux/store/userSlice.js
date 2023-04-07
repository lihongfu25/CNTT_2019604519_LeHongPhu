import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userId: null,
    fullName: null,
    username: null,
    email: null,
    emailVerified: null,
    gender: null,
    dob: null,
    phoneNumber: null,
    photoUrl: null,
    provinceCode: null,
    districtCode: null,
    wardCode: null,
    created_at: null,
    updated_at: null,
    deleted_at: null,
    roleId: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        userUpdateProfile: (state, action) => {
            state.userId = action.payload.userId;
            state.fullName = action.payload.fullName;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.emailVerified = action.payload.emailVerified;
            state.gender = action.payload.gender;
            state.dob = action.payload.dob;
            state.phoneNumber = action.payload.phoneNumber;
            state.photoUrl = action.payload.photoUrl;
            state.provinceCode = action.payload.provinceCode;
            state.districtCode = action.payload.districtCode;
            state.wardCode = action.payload.wardCode;
            state.roleId = action.payload.roleId;
        },
        userLogout: (state) => {
            state.userId = null;
            state.fullName = null;
            state.username = null;
            state.email = null;
            state.emailVerified = null;
            state.gender = null;
            state.dob = null;
            state.phoneNumber = null;
            state.photoUrl = null;
            state.provinceCode = null;
            state.districtCode = null;
            state.wardCode = null;
            state.roleId = null;
        },
    },
});
export const { userUpdateProfile, userLogout } = userSlice.actions;
export default userSlice.reducer;
