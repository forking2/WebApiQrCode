import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router";
import { useAuth } from "../../context/AuthContext.tsx";
import { useProfileQuery } from "../../hooks/useProfileQuery.ts";
import Loader from "../../components/Loader.tsx";
import { RouterEnum } from "../../config/RouterEnum.ts";
import {getImageUrl, SERVER_URL} from "../../config/api.config.ts";
import {useQrCodesQuery} from "../../hooks/useQrCodesQuery.ts";
import QRCode from "react-qr-code";
import {useQrCodeDeleteMutation} from "../../hooks/useQrCodeDeleteMutation.ts";
import DeleteQrCodeModal from "../../components/DeleteQrCodeModal.tsx";

const Profile = () => {
    const [deleteModal, setDeleteModal] = useState<{
        id: string | number;
        name: string;
    } | null>(null);

    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const { data: profile, isLoading, isError, error } = useProfileQuery();

    const { data: qrCodes, isError: qrError } = useQrCodesQuery();

    const { mutate: deleteQrCode } = useQrCodeDeleteMutation();

    console.log("qrCodes: ", qrCodes);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate(RouterEnum.LOGIN);
        }
    }, [isAuthenticated, navigate]);

    if (!isAuthenticated) return null;

    if (isLoading) return <Loader />;

    if (isError) {
        return (
            <p className="text-center text-red-500 mt-20">
                Помилка: {(error as Error).message}
            </p>
        );
    }

    if (!profile) return null;

    const imageUrl = getImageUrl(profile.image, 432);
    const fullName =
        [profile.lastName, profile.firstName].filter(Boolean).join(" ") || "Без імені";

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <div className="flex justify-center">
                <div className="w-full max-w-md p-8 space-y-6 bg-white border border-gray-200 rounded-2xl shadow-sm text-center">

                    <div className="w-28 h-28 mx-auto rounded-full bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center">
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt="Фото профілю"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <span className="text-xs text-gray-400">
                                Фото
                            </span>
                        )}
                    </div>

                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            {fullName}
                        </h1>

                        <p className="text-gray-500 mt-1">
                            {profile.email}
                        </p>
                    </div>

                    {profile.roles.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-2">
                            {profile.roles.map((role) => (
                                <span
                                    key={role}
                                    className="px-3 py-1 text-xs rounded-full bg-indigo-50 text-indigo-700"
                                >
                                    {role}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-10">

                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            Мої QR-коди
                        </h2>

                        <div className={"mt-2"}>
                            <Link to = {RouterEnum.QRCODE_CREATE}
                                  className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-60 text-white font-medium text-sm transition-all shadow-sm focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                            >
                                {"Додати QR-код"}
                            </Link>
                        </div>


                        <p className="text-gray-500 mt-1">
                            Переглядайте свої QR-коди
                        </p>
                    </div>
                </div>

                {qrError && (
                    <p className="text-center text-red-500">
                        Не вдалося завантажити QR-коди
                    </p>
                )}

                {!qrError && qrCodes?.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        У вас ще немає QR-кодів
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {qrCodes?.map((qr) => {

                        const qrUrl =
                            `${SERVER_URL}/api/QrCodes/view/${qr.code}`;

                        return (
                            <div
                                key={qr.id}
                                className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5"
                            >
                                <div className="flex justify-center mb-5">
                                    <QRCode value={qrUrl}
                                            className="w-52 h-52" />
                                </div>

                                <h3 className="text-lg font-bold text-gray-900">
                                    {qr.name}
                                </h3>

                                <p className="text-sm text-gray-500 mt-1 break-all">
                                    {qr.targetUrl}
                                </p>

                                <div className="mt-4 space-y-2 text-sm">

                                    <div className="flex justify-between">
                                        <span className="text-gray-500">
                                            Створено:
                                        </span>

                                        <span className="font-medium">
                                            {qr.createdAt}
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-gray-500">
                                            Сканувань:
                                        </span>

                                        <span className="font-medium">
                                            {qr.scanCount}
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-gray-500">
                                            Статус:
                                        </span>

                                        <span
                                            className={
                                                qr.isActive
                                                    ? "text-green-600 font-medium"
                                                    : "text-red-600 font-medium"
                                            }
                                        >
                                            {qr.isActive
                                                ? "Активний"
                                                : "Неактивний"}
                                        </span>
                                    </div>

                                </div>

                                <a
                                    href={qrUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="block text-center mt-5 w-full py-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 font-medium"
                                >
                                    Перевірити QR
                                </a>

                                <div className="mt-4 flex justify-between gap-2">
                                    <Link to={RouterEnum.QRCODE_EDIT.replace(":id", qr.id.toString())} className="px-7 py-2.5 hover:bg-indigo-600 hover:shadow-2xl rounded-lg bg-indigo-600 text-white font-medium text-sm text-center">
                                        Редагувати
                                    </Link>

                                    <button
                                        onClick={() =>
                                            setDeleteModal({
                                                id: qr.id,
                                                name: qr.name,
                                            })
                                        }
                                        className="cursor-pointer px-7 py-2.5 rounded-lg bg-red-800 hover:bg-red-600 hover:shadow-2xl text-white font-medium text-sm text-center"
                                    >
                                        Delete
                                    </button>
                                </div>

                            </div>
                        );
                    })}

                </div>
            </div>

            {deleteModal && (
                <DeleteQrCodeModal
                    qrCodeName={deleteModal.name}
                    qrCodeId={deleteModal.id}
                    onDelete={(id) => {
                        deleteQrCode(id);
                        setDeleteModal(null);
                    }}
                    onClose={() => setDeleteModal(null)}
                />
            )}
        </div>
    );
};

export default Profile;