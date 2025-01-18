import {
    ArrowRightIcon,
    DocumentArrowDownIcon,
    PencilSquareIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";
import { HiOutlineDocumentArrowDown } from "react-icons/hi2";

import { Link, router } from "@inertiajs/react";
import { Chip, Typography } from "@material-tailwind/react";
import { data } from "autoprefixer";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
export default function CardAgreement({ data, user }) {
    const storageImage = (path) => {
        return `/storage/${path.replace("public/", "")}`;
    };
    const formatDate = (dateString) => {
        const date = new Date(dateString);

        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
    const deleteSwal = (id) => {
        withReactContent(Swal)
            .fire({
                title: "Anda yakin?",
                text: "Anda tidak akan dapat memulihkan data ini!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Ya, hapus!",
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                cancelButtonText: "Batal",
            })
            .then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Dihapus!",
                        text: "Data telah dihapus.",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500,
                    });

                    router.delete(route("mitra.delete", id), {
                        preserveState: true,
                    });
                }
            });
    };

    return (
        <Link href={route("mitra.detail", data.id)}>
            <div className="p-5 border rounded-xl shadow bg-white">
                <div className="flex items-center">
                    <img
                        src={storageImage(data.logo)}
                        alt=""
                        className="w-[56px] h-auto rounded-full"
                    />
                    <p className="font-bold text-md mx-2">Nama Instansi</p>
                    <Typography
                        variant="small"
                        className="bg-red-500 text-white rounded-xl px-3 py-1 text-xs font-medium"
                    >
                        <p>{data.asal_mitra}</p>
                    </Typography>
                </div>
                <p className="text-red-400 italic text-xs py-1">
                    {formatDate(data.waktu_kerjasama_mulai)} -{" "}
                    {formatDate(data.waktu_kerjasama_selesai)}
                </p>
                <p className="font-medium text-xl">{data.nama_instansi}</p>
                <div className="flex gap-x-1 mt-3 items-center">
                    <Typography
                        variant="small"
                        className="text-gray-600 text-xs font-medium"
                    >
                        {new Date(data.waktu_kerjasama_selesai) > new Date() ? (
                            <span className="border px-3 py-1 rounded-xl bg-green-500 text-white">
                                Aktif
                            </span>
                        ) : (
                            <span className="border px-3 py-1 rounded-xl bg-red-50 text-red-500">
                                Non Aktif
                            </span>
                        )}
                    </Typography>
                    <Typography
                        variant="small"
                        className="bg-blue-700 text-white rounded-xl px-3 py-1 text-xs font-medium"
                    >
                        <p>{data.kriteria_mitra}</p>
                    </Typography>
                </div>
                <div className="my-4 text-sm text-gray-600 border-solid border-t-[1px] border-black pt-2">
                    {data.tentang_mitra.length > 30
                        ? `${data.tentang_mitra.substring(0, 30)}...`
                        : data.tentang_mitra}
                </div>
                <div className="flex justify-between items-center">
                    {user.is_admin ? (
                        <div className="flex gap-2">
                            <Link href={route("mitra.edit", data.id)}>
                                <HiOutlineDocumentArrowDown className="w-8 h-auto rounded-full p-1 text-green-500 border-solid border-[1px] border-gray-800" />
                            </Link>
                            <Link href={route("mitra.edit", data.id)}>
                                <PencilSquareIcon className="w-8 h-auto rounded-full p-1 text-blue-800 border-solid border-[1px] border-gray-800" />
                            </Link>
                            <Link
                                onClick={() => deleteSwal(data.id)}
                                as="button"
                                className="sticky z-50"
                            >
                                <TrashIcon className="w-8 h-auto rounded-full p-1 text-red-800 border-solid border-[1px] border-gray-800" />
                            </Link>
                        </div>
                    ) : null}
                    <div className="text-white text-sm items-center bg-orange-400 p-5 rounded-full shadow-bottom">
                        <ArrowRightIcon className="w-8 h-auto" />
                    </div>
                    {/* <Link href={route("mitra.download", data.dokumen_pks)}>
                        <DocumentArrowDownIcon className="h-5 w-5 text-green-500" />
                    </Link> */}
                </div>
            </div>
        </Link>
    );
}
