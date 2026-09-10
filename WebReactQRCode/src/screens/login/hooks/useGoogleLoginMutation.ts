import { useMutation } from "@tanstack/react-query";
import type { ILogin_Google} from "../types/ILogin.ts";
import { LoginService } from "../services/login.service.ts";
import { useNavigate } from "react-router";
import { useAuth } from "../../../context/AuthContext.tsx";
import { RouterEnum } from "../../../config/RouterEnum.ts";

export const UseGoogleLoginMutation = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    return useMutation({
        mutationKey: ["login-google-post"],
        mutationFn: (props: { data: ILogin_Google }) =>
            LoginService.google(props).then((res) => res.data),
        onSuccess: (data) => {
            login(data.token);
            navigate(RouterEnum.MAIN);
        },
    });
};