import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import UploadButton from "@/Components/AgreementArchives/UploadButton";
import DownloadButton from "@/Components/AgreementArchives/DownloadButton";
import {
    ArrowLeftCircleIcon,
    TrashIcon,
    PlusIcon,
    CheckIcon,
} from "@heroicons/react/24/solid";
import { IoAlertCircleOutline } from "react-icons/io5";

import { Head, Link, useForm } from "@inertiajs/react";
import { Breadcrumbs, Button } from "@material-tailwind/react";
import Swal from "sweetalert2";
import { useEffect, useRef, useState } from "react";

export default function LogKegiatan({ mitra, agreementArchive, logKegiatans }) {
    const { data, setData, post, processing, errors } = useForm({
        kegiatans: [
            {
                nama_kegiatan: "",
                tanggal_kegiatan: "",
                dokumentasi: null,
            },
        ],
    });

    const handleKegiatanChange = (index, field, value) => {
        const updatedKegiatans = [...data.kegiatans];
        updatedKegiatans[index][field] = value;
        setData("kegiatans", updatedKegiatans);
    };

    const handleFileChange = (index, e) => {
        const dokumentasi = e.target.files[0];
        const updatedKegiatans = [...data.kegiatans];
        updatedKegiatans[index].dokumentasi = dokumentasi;
        setData("kegiatans", updatedKegiatans);
    };

    const addKegiatan = () => {
        setData("kegiatans", [
            ...data.kegiatans,
            {
                nama_kegiatan: "",
                tanggal_kegiatan: "",
                dokumentasi: null,
            },
        ]);
    };

    const removeKegiatan = (index) => {
        if (data.kegiatans.length === 1) {
            Swal.fire({
                title: "Error",
                text: "Kegiatan tidak boleh kosong",
                icon: "error",
            });
            return;
        }
        const updatedKegiatans = data.kegiatans.filter((_, i) => i !== index);
        setData("kegiatans", updatedKegiatans);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        data.kegiatans.forEach((kegiatan, index) => {
            formData.append(
                `kegiatans[${index}][nama_kegiatan]`,
                kegiatan.nama_kegiatan
            );
            formData.append(
                `kegiatans[${index}][tanggal_kegiatan]`,
                kegiatan.tanggal_kegiatan
            );
            if (kegiatan.dokumentasi) {
                formData.append(
                    `kegiatans[${index}][dokumentasi]`,
                    kegiatan.dokumentasi
                );
            }
        });

        post(
            route("agreementarchives.storeLogKegiatan", [
                mitra.id,
                agreementArchive.id,
            ]),
            {
                forceFormData: true,
                onSuccess: () => {
                    Swal.fire({
                        title: "Sukses",
                        text: "Log kegiatan berhasil disimpan",
                        icon: "success",
                    });
                },
                onError: () => {
                    Swal.fire({
                        title: "Error",
                        text: "Terjadi kesalahan saat menyimpan log kegiatan",
                        icon: "error",
                    });
                },
            }
        );
    };

    // useState(() => {
    //     const savedData = localStorage.getItem("logKegiatans");
    //     if (savedData) {
    //         setData("kegiatans", JSON.parse(savedData));
    //     }
    // });

    // useState(() => {
    //     if (logKegiatans.length > 0) {
    //         setData("kegiatans", logKegiatans);
    //     }
    // });

    return (
        <AuthenticatedLayout>
            <Head title="Log Kegiatan" />
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
                            href={route("mitra.detail", mitra.id)}
                            className="opacity-60"
                        >
                            <span>IA</span>
                        </Link>
                        <Link
                            href={route("agreementarchives.view", [
                                mitra.id,
                                agreementArchive.id,
                            ])}
                            className="opacity-60"
                        >
                            {agreementArchive.nama_kegiatan}
                        </Link>
                        <p>
                            <span>Log Kegiatan</span>
                        </p>
                    </Breadcrumbs>

                    <div className="overflow-hidden">
                        <div className="border-b-2 pb-4 border-gray-500 flex items-center">
                            <Link
                                href={route("agreementarchives.view", [
                                    mitra.id,
                                    agreementArchive.id,
                                ])}
                            >
                                <ArrowLeftCircleIcon className="h-10 w-10 text-orange-700 mr-4" />
                            </Link>
                            <h1 className="font-medium text-xl">
                                LOG KEGIATAN
                            </h1>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="py-4 px-5 ml-4"
                        >
                            {data.kegiatans.map((kegiatan, index) => (
                                <div key={index} className="my-4">
                                    <div className="flex items-center justify-between gap-2">
                                        <h3 className="text-nowrap">
                                            Tahapan {index + 1}
                                        </h3>
                                        <hr className="border-black border-[1px] w-full mx-10 p-0 rounded-full divide-x-2 border-dashed" />
                                        <button
                                            type="button"
                                            onClick={addKegiatan}
                                        >
                                            <PlusIcon className="h-6 w-6 text-green-500" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeKegiatan(index)
                                            }
                                        >
                                            <TrashIcon className="h-6 w-6 text-red-500" />
                                        </button>
                                    </div>

                                    <div className="flex flex-col gap-2 items-center px-3">
                                        <div className="flex gap-x-[28px] items-center w-full h-auto">
                                            <InputLabel
                                                htmlFor={`nama_kegiatan_${index}`}
                                                value="Nama Kegiatan"
                                            />
                                            <TextInput
                                                id={`nama_kegiatan_${index}`}
                                                type="text"
                                                value={kegiatan.nama_kegiatan}
                                                onChange={(e) =>
                                                    handleKegiatanChange(
                                                        index,
                                                        "nama_kegiatan",
                                                        e.target.value
                                                    )
                                                }
                                                className="mt-1 w-10/12 px-4 py-2 rounded-md"
                                            />
                                            <InputError
                                                message={errors.nama_kegiatan}
                                                className="mt-2"
                                            />
                                        </div>

                                        <div className="flex gap-x-4 items-center w-full h-auto">
                                            <InputLabel
                                                htmlFor={`tanggal_kegiatan_${index}`}
                                                value="Tanggal Kegiatan"
                                            />
                                            <TextInput
                                                id={`tanggal_kegiatan_${index}`}
                                                type="date"
                                                value={
                                                    kegiatan.tanggal_kegiatan
                                                }
                                                onChange={(e) =>
                                                    handleKegiatanChange(
                                                        index,
                                                        "tanggal_kegiatan",
                                                        e.target.value
                                                    )
                                                }
                                                className="mt-1 w-10/12 px-4 py-2 rounded-md"
                                            />
                                            <InputError
                                                message={
                                                    errors.tanggal_kegiatan
                                                }
                                                className="mt-2"
                                            />
                                        </div>

                                        <div className="flex gap-[40px] items-center w-full h-auto">
                                            <InputLabel
                                                htmlFor={`dokumentasi_${index}`}
                                                value="Dokumentasi"
                                            />
                                            <div className="flex-auto">
                                                <label
                                                    htmlFor={`dokumentasi_${index}`}
                                                >
                                                    <p className="text-sm w-[94%] text-black p-4 border border-solid text-center rounded-lg bg-white">
                                                        {kegiatan.dokumentasi
                                                            ? kegiatan
                                                                  .dokumentasi
                                                                  .name
                                                            : "Upload File"}
                                                    </p>
                                                </label>
                                                <input
                                                    type="file"
                                                    id={`dokumentasi_${index}`}
                                                    className="hidden"
                                                    onChange={(e) =>
                                                        handleFileChange(
                                                            index,
                                                            e
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div className="mt-6 flex justify-end">
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                >
                                    {processing ? "Menyimpan..." : "Simpan"}
                                </Button>
                            </div>
                        </form>
                    </div>
                    <div className="mt-52 ">
                        <h1 className="font-bold text-2xl border-b pb-2 border-black">
                            Laporan Kegiatan I.A
                        </h1>
                        <div className="flex flex-col gap-y-1 py-4">
                            <p className="font-bold text-base">
                                1. INPUT LAPORAN{" "}
                            </p>
                            {logKegiatans.laporan != null ? (
                                <Link className="flex gap-2 text-green-500 text-base items-center">
                                    <CheckIcon className="w-8 h-8 text-green-500" />
                                    Sudah Terlaksana
                                </Link>
                            ) : (
                                <Link
                                    className="flex gap-2 text-red-500 text-base items-center"
                                    href={route(
                                        "agreementarchives.logKegiatan.inputLapIa",
                                        [mitra.id, agreementArchive.id]
                                    )}
                                >
                                    <IoAlertCircleOutline className="w-8 flex h-8 text-red-500" />
                                    Belum Terlaksana
                                </Link>
                            )}
                        </div>
                        <div className="py-4">
                            <p className="font-bold text-base mb-4">
                                2. UNDUH LAPORAN{" "}
                            </p>
                            <DownloadButton
                                content="Download Draf Laporan"
                                link={route(
                                    "download-draft-laporan",
                                    agreementArchive.id
                                )}
                                className="w-1/3"
                            />
                            {/* <a
                                href={route(
                                    "download-draft-laporan",
                                    agreementArchive.id
                                )}
                                className="text-white bg-green-500 hover:bg-green-700 transition-transform py-3 px-10 text-center text-base rounded-full "
                            >
                                Donwload Draft Laporan
                            </a> */}
                        </div>
                        <div className="py-4">
                            <p className="font-bold text-base mb-4">
                                3. UNGGAH LAPORAN{" "}
                            </p>
                            <UploadButton
                                content="Unggah Laporan"
                                agrementId={agreementArchive.id}
                                // documentName={"dokumen_laporan"}
                                link={"aggreement.update.dokumen_laporan"}
                                className={"w-1/3"}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
