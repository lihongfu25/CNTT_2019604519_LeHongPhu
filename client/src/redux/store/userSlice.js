import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userId: "12312",
    fullName: "Lê Hồng Phú",
    email: "phulh@vmms.com.vn",
    phone: null,
    gender: null,
    date_of_birth: null,
    username: null,
    provinceCode: "30",
    districtCode: "295",
    wardCode: "10927",
    avatar: "images/a986302c6bb2e21c396a98aebf115ffe.png",
    roleId: "r0",
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
            state.phone = action.payload.phone;
            state.address = action.payload.address;
            state.gender = action.payload.gender;
            state.date_of_birth = action.payload.date_of_birth;
            state.avatar = action.payload.avatar;
            state.roleId = action.payload.roleId;
        },
        userLogout: (state) => {
            state.userId = null;
            state.fullName = "";
            state.email = "";
            state.phone = "";
            state.address = "";
            state.gender = null;
            state.date_of_birth = null;
            state.username = "";
            state.avatar = "images/a986302c6bb2e21c396a98aebf115ffe.png";
            state.roleId = "";
        },
    },
});
export const { userUpdateProfile, userLogout } = userSlice.actions;
export default userSlice.reducer;
