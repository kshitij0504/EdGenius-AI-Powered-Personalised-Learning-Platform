import { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";
import getApi from "../helpers/API/getApi";
import postApi from "../helpers/API/postApi";

export default function AuthContextProvider({children}) {
    const ctxValue = {

    }

    return (
        <AuthContext.Provider value={ctxValue}>
            { children }
        </AuthContext.Provider>
    )
}