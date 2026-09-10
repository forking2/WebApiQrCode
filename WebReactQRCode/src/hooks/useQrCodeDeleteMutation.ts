import { useMutation, useQueryClient  } from "@tanstack/react-query";
import { QrCodeService } from "../services/qrCode.service";

export const useQrCodeDeleteMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number | string) =>
            QrCodeService.delete(id).then((res) => res.data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["qrCodes"],
            });
        },
    });
};