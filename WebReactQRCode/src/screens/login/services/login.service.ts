import instance from "../../../services/api/interceptors.api.ts";
import {postGoogleLoginUrl, postLoginUrl} from "../../../config/api.config.ts";
import type {ILogin, ILogin_Data, ILogin_Google} from "../types/ILogin.ts";

export const LoginService = {
    post: ({ data }: { data: ILogin_Data }) =>
        instance<ILogin>({
            url: postLoginUrl(),
            method: "POST",
            data,
        }),
    google: ({ data }: { data: ILogin_Google }) =>
        instance<ILogin>({
            url: postGoogleLoginUrl(),
            method: "POST",
            data,
        }),
};