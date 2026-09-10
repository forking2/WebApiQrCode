interface DeleteQrCodeModalProps {
    qrCodeName: string;
    qrCodeId: string | number;
    onDelete: (id: string | number) => void;
    onClose: () => void;
}

const DeleteQrCodeModal = ({
                               qrCodeName,
                               qrCodeId,
                               onDelete,
                               onClose,
                           }: DeleteQrCodeModalProps) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">

                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900">
                        Видалення QR-коду
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        className="cursor-pointer text-2xl text-gray-400 hover:text-gray-600"
                    >
                        &times;
                    </button>
                </div>

                <div className="mt-5">
                    <p className="text-gray-600">
                        Ви впевнені, що хочете видалити QR-код?
                    </p>

                    <div className="mt-3 rounded-lg bg-gray-50 p-3">
                        <p className="text-sm text-gray-500">
                            QR-код:
                        </p>

                        <p className="mt-1 font-semibold text-gray-900 break-all">
                            {qrCodeName}
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                            ID: {qrCodeId}
                        </p>
                    </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="cursor-pointer rounded-lg bg-gray-100 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-200"
                    >
                        Скасувати
                    </button>

                    <button
                        type="button"
                        onClick={() => onDelete(qrCodeId)}
                        className="cursor-pointer rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-600"
                    >
                        Видалити
                    </button>
                </div>

            </div>
        </div>
    );
};

export default DeleteQrCodeModal;