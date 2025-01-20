import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextareaInput from "@/Components/TextareaInput";
import TextInput from "@/Components/TextInput";
import DownloadButton from "@/Components/AgreementArchives/DownloadButton";
// import UploadButton from "@/Components/AgreementArchives/UploadButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { DocumentArrowDownIcon, EyeIcon } from "@heroicons/react/24/outline";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";
import { Head, Link, useForm } from "@inertiajs/react";
import {
    Breadcrumbs,
    Button,
    Input,
    Textarea,
    Typography,
} from "@material-tailwind/react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import React from "react";

const drafIA = "../../../../dokumen/template_draft_ia.docx";

export default function Edit({ mitraId, agreementArchive }) {
    const { data } = useForm({
        nama_instansi: agreementArchive.nama_instansi,
        nama_kegiatan: agreementArchive.nama_kegiatan,
        deskripsi_kegiatan: agreementArchive.deskripsi_kegiatan,
        no_ia: agreementArchive.no_ia,
        pihak1: agreementArchive.pihak_1,
        pihak2: agreementArchive.pihak_2,
        jabatan_pihak1: agreementArchive.jabatan_pihak_1,
        jabatan_pihak2: agreementArchive.jabatan_pihak_2,
        bidang_kerjasama: agreementArchive.bidang_kerjasama,
        durasi_kerjasama: agreementArchive.durasi_kerjasama,
        waktu_kerjasama_mulai: agreementArchive.waktu_kerjasama_mulai,
        waktu_kerjasama_selesai: agreementArchive.waktu_kerjasama_selesai,
        dokumen_kerjasama: agreementArchive.dokumen_kerjasama,
        dokumen_laporan: agreementArchive.dokumen_laporan,
        dokumentasi: agreementArchive.documentations,
    });
    const [viewDokumenKerjasama, setViewDokumenKerjasama] =
        React.useState(false);
    const [viewDokumenLaporan, setViewDokumenLaporan] = React.useState(false);

    const handleViewDokumenKerjasama = () => {
        const view = viewDokumenKerjasama === false ? true : false;
        setViewDokumenKerjasama(view);
    };
    const handleViewDokumenLaporan = () => {
        const view = viewDokumenLaporan === false ? true : false;
        setViewDokumenLaporan(view);
    };
    const formatDate = (dateString) => {
        const date = new Date(dateString);

        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
    return (
        <AuthenticatedLayout>
            <Head title={data.nama_kegiatan} />

            <div className="py-10">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col gap-y-8">
                    <Breadcrumbs className="bg-transparent px-0">
                        <Link href={route("dashboard")} className="opacity-60">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                            </svg>
                        </Link>
                        <Link
                            href={route("mitra.detail", mitraId)}
                            className="opacity-60"
                        >
                            <span>IA</span>
                        </Link>
                        <a href="#">{data.nama_kegiatan}</a>
                    </Breadcrumbs>
                    <div className="overflow-hidden">
                        <div className="border-b-2 pb-4 border-gray-500 flex items-center">
                            <Link href={route("mitra.detail", mitraId)}>
                                <ArrowLeftCircleIcon className="h-10 w-10 text-orange-700 mr-4" />
                            </Link>
                            <h1 className="font-medium text-xl">
                                {data.nama_kegiatan}
                            </h1>
                        </div>
                    </div>
                    <div className="overflow-hidden sm:rounded-lg">
                        <div className="py-2">
                            {/* Section Informasi Kegiatan */}
                            <div className="my-1">
                                <div className="flex gap-x-4 items-baseline w-auto h-auto">
                                    <p className="text-[32px] font-bold">
                                        {data.nama_kegiatan}
                                    </p>
                                    <p className="text-base italic">
                                        {data.no_ia}
                                    </p>
                                </div>
                                <p className="italic text-base my-2">
                                    {formatDate(data.waktu_kerjasama_mulai) +
                                        " s/d " +
                                        formatDate(
                                            data.waktu_kerjasama_selesai
                                        )}
                                </p>
                                <div className="flex flex-row gap-x-2">
                                    <Typography
                                        variant="small"
                                        className="px-5 py-1 text-xs rounded-full bg-green-500 text-white border-black border-[1px]"
                                    >
                                        {data.durasi_kerjasama}
                                    </Typography>
                                    <Typography
                                        variant="small"
                                        className="px-5 py-1 text-xs rounded-full bg-white text-black border-black border-[1px]"
                                    >
                                        Kritieria IA
                                    </Typography>
                                    <Typography
                                        variant="small"
                                        className="px-5 py-1 text-xs rounded-full bg-green-500 text-white border-black border-[1px]"
                                    >
                                        Download Rekap IA
                                    </Typography>
                                </div>
                            </div>
                        </div>

                        {/* Deskripsi Kegiatan */}
                        <div className="py-2">
                            <h1 className="font-bold uppercase text-xl border-b-[1px] border-black pb-2">
                                Deskripsi Kegiatan
                            </h1>
                            <p className="ml-4 mt-2">
                                {data.deskripsi_kegiatan}
                            </p>
                        </div>

                        {/* PIC  */}
                        <div className="py-2">
                            <h1 className="font-bold uppercase text-xl border-b-[1px] border-black pb-2">
                                PIC Pihak-Pihak
                            </h1>
                            <p className="ml-4 mt-2">
                                {data.pihak1} | {data.jabatan_pihak1}
                            </p>
                            <p className="ml-4 mt-2">
                                {data.pihak2} | {data.jabatan_pihak2}
                            </p>
                        </div>

                        {/* Button */}
                        <div className="grid grid-cols-2">
                            <DownloadButton
                                content="Download Draft IA"
                                link={drafIA}
                            ></DownloadButton>
                            <DownloadButton content="Download Draf IA Bertanda tangan" />
                            <DownloadButton content="Upload Dokumen IA" />
                            <DownloadButton content="Download Laporan IA Bertanda tangan" />
                        </div>

                        <div className="py-2">
                            <h1 className="font-bold uppercase text-xl border-b-[1px] border-black pb-2">
                                Log Kegiatan
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
