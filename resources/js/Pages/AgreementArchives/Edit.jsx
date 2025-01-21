import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextareaInput from "@/Components/TextareaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";
import { Head, Link, useForm } from "@inertiajs/react";
import { Button, Input, Textarea, Typography } from "@material-tailwind/react";
import { useState } from "react";
import Swal from "sweetalert2";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import React from "react";
import { EyeIcon } from "@heroicons/react/24/outline";

export default function Edit({
    mitraId,
    agreementArchive,
    durasi,
    jenisKegiatan,
}) {
    const { data, setData, post, processing, errors, reset, progress } =
        useForm({
            nama_instansi: agreementArchive.nama_instansi,
            nama_kegiatan: agreementArchive.nama_kegiatan,
            deskripsi_kegiatan: agreementArchive.deskripsi_kegiatan,
            no_ia: agreementArchive.no_ia,
            jenis_kegiatan: agreementArchive.jenis_kegiatan,
            pihak_1: agreementArchive.pihak_1,
            pihak_2: agreementArchive.pihak_2,
            jabatan_pihak_1: agreementArchive.jabatan_pihak_1,
            jabatan_pihak_2: agreementArchive.jabatan_pihak_2,
            durasi_kerjasama: agreementArchive.durasi_kerjasama,
            waktu_kerjasama_mulai: agreementArchive.waktu_kerjasama_mulai,
            waktu_kerjasama_selesai: agreementArchive.waktu_kerjasama_selesai,
            tahun_ajaran: agreementArchive.tahun_ajaran,
            tahun_ajaran1: agreementArchive.tahun_ajaran_1,
            tahun_ajaran2: agreementArchive.tahun_ajaran_2,
            bentuk_kegiatan: agreementArchive.bentuk_kegiatan,
            ringkasan_luaran: agreementArchive.ringkasan_luaran,
            dokumen_kerjasama: null,
            dokumen_laporan: null,
            dokumentasi: [],
        });
    const [swalShown, setSwalShown] = useState(false);
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

    const handleFileChange = (e) => {
        setData("dokumentasi", Array.from(e.target.files));
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("agreementarchives.update", [agreementArchive.id]), {
            onError: () => {
                Swal.fire({
                    title: "Error!",
                    text: "Data gagal diubah",
                    icon: "error",
                    didOpen: () => setSwalShown(true),
                    didClose: () => setSwalShown(false),
                });
            },
            onSuccess: () => {
                Swal.fire({
                    title: "Success!",
                    text: "Data berhasil diubah",
                    didOpen: () => setSwalShown(true),
                    didClose: () => setSwalShown(false),
                });
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="New Entry" />

            <div className="py-10">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col gap-y-8">
                    <div className="overflow-hidden">
                        <div className="border-b-2 pb-4 border-gray-500 flex items-center">
                            <Link href={route("mitra.detail", mitraId)}>
                                <ArrowLeftCircleIcon className="h-10 w-10 text-orange-700 mr-4" />
                            </Link>
                            <h1 className="font-medium text-xl">Edit</h1>
                        </div>
                    </div>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <Typography
                            color="gray"
                            className="px-6 pt-6 font-normal text-lg"
                        >
                            Form Edit Implementation Agreemnet
                        </Typography>
                        <form onSubmit={submit} className="p-6">
                            <div className="flex items-center">
                                <InputLabel
                                    htmlFor="nama_kegiatan"
                                    value="Nama Kegiatan"
                                    className="w-44 text-lg"
                                />
                                <div className="flex-auto">
                                    <TextInput
                                        id="nama_kegiatan"
                                        type="text"
                                        name="nama_kegiatan"
                                        value={data.nama_kegiatan}
                                        className="mt-1 block w-full px-4 py-2"
                                        isFocused={true}
                                        autoComplete="off"
                                        onChange={(e) =>
                                            setData(
                                                "nama_kegiatan",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.nama_kegiatan}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="flex items-start mt-3">
                                <InputLabel
                                    htmlFor="deskripsi_kegiatan"
                                    value="Deskripsi Singkat"
                                    className="w-44 text-lg mt-2"
                                />
                                <div className="flex-auto">
                                    <TextareaInput
                                        id="deskripsi_kegiatan"
                                        type="text"
                                        name="deskripsi_kegiatan"
                                        value={data.deskripsi_kegiatan}
                                        className="mt-1 block w-full px-4 py-2"
                                        isFocused={false}
                                        onChange={(e) =>
                                            setData(
                                                "deskripsi_kegiatan",
                                                e.target.value
                                            )
                                        }
                                    />

                                    <InputError
                                        message={errors.deskripsi_kegiatan}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center mt-3">
                                <InputLabel
                                    htmlFor="no_ia"
                                    value="No. IA"
                                    className="w-44 text-lg"
                                />
                                <div className="flex-auto">
                                    <TextInput
                                        id="no_ia"
                                        type="text"
                                        name="no_ia"
                                        value={data.no_ia}
                                        className="mt-1 block w-full px-4 py-2"
                                        autoComplete="off"
                                        isFocused={false}
                                        onChange={(e) =>
                                            setData("no_ia", e.target.value)
                                        }
                                    />

                                    <InputError
                                        message={errors.no_ia}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center mt-3">
                                <InputLabel
                                    htmlFor="waktuKerjasama"
                                    value="Tanggal Awal"
                                    className="w-44 text-lg"
                                />
                                <div className="flex-auto">
                                    <TextInput
                                        id="waktu_kerjasama_mulai"
                                        type="date"
                                        name="waktu_kerjasama_mulai"
                                        value={data.waktu_kerjasama_mulai}
                                        className="mt-1 block w-full px-4 py-2"
                                        isFocused={false}
                                        onChange={(e) =>
                                            setData(
                                                "waktu_kerjasama_mulai",
                                                e.target.value
                                            )
                                        }
                                    />

                                    <InputError
                                        message={errors.waktu_kerjasama_mulai}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center mt-3">
                                <InputLabel
                                    htmlFor="waktuKerjasama"
                                    value="Tanggal Akhir"
                                    className="w-44 text-lg"
                                />
                                <div className="flex-auto">
                                    <TextInput
                                        id="waktu_kerjasama_selesai"
                                        type="date"
                                        name="waktu_kerjasama_selesai"
                                        value={data.waktu_kerjasama_selesai}
                                        className="mt-1 block w-full px-4 py-2"
                                        isFocused={false}
                                        onChange={(e) =>
                                            setData(
                                                "waktu_kerjasama_selesai",
                                                e.target.value
                                            )
                                        }
                                    />

                                    <InputError
                                        message={errors.waktu_kerjasama_selesai}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center mt-3">
                                <InputLabel
                                    htmlFor="durasi_kerjasama"
                                    value="Durasi Kerjsama"
                                    className="w-44 text-lg"
                                />
                                <div className="flex-auto">
                                    <SelectInput
                                        id="durasi_kerjasama"
                                        name="durasi_kerjasama"
                                        value={data.durasi_kerjasama}
                                        className="mt-1 block w-full"
                                        autoComplete="off"
                                        onChange={(e) =>
                                            setData(
                                                "durasi_kerjasama",
                                                e.target.value
                                            )
                                        }
                                        options={durasi}
                                    />

                                    <InputError
                                        message={errors.durasi_kerjasama}
                                        className="mt-2"
                                    />
                                </div>
                                <InputLabel
                                    htmlFor="tahunAjaran"
                                    value="T.A"
                                    className="w-auto mx-2 text-lg"
                                />
                                <div className="flex-auto">
                                    <TextInput
                                        id="tahun_ajaran"
                                        type="text"
                                        placeholder="Ganjil/Genap"
                                        name="tahun_ajaran"
                                        value={data.tahun_ajaran}
                                        className="mt-1 block w-full px-4 py-2"
                                        isFocused={false}
                                        onChange={(e) =>
                                            setData(
                                                "tahun_ajaran",
                                                e.target.value
                                            )
                                        }
                                    />

                                    <InputError
                                        message={errors.tahun_ajaran}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="ml-1">
                                    <div className="flex w-fit">
                                        <TextInput
                                            id="tahun_ajaran1"
                                            type="text"
                                            placeholder="2024"
                                            name="tahun_ajaran1"
                                            value={data.tahun_ajaran1}
                                            className="mt-1 block w-full px-4 py-2"
                                            isFocused={false}
                                            onChange={(e) =>
                                                setData(
                                                    "tahun_ajaran1",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <div className="flex items-center text-lg mx-1">
                                            /
                                        </div>
                                        <InputError
                                            message={errors.tahun_ajaran1}
                                            className="mt-2"
                                        />
                                        <TextInput
                                            id="tahun_ajaran2"
                                            type="text"
                                            placeholder="2025"
                                            name="tahun_ajaran2"
                                            value={data.tahun_ajaran2}
                                            className="mt-1 block w-full px-4 py-2"
                                            isFocused={false}
                                            onChange={(e) =>
                                                setData(
                                                    "tahun_ajaran2",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.tahun_ajaran2}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center mt-3">
                                <InputLabel
                                    htmlFor="jenis_kerjasama"
                                    value="Jenis Kegiatan"
                                    className="w-44 text-lg"
                                />
                                <div className="flex-auto">
                                    <SelectInput
                                        id="jenis_kegiatan"
                                        name="jenis_kegiatan"
                                        value={data.jenis_kegiatan}
                                        className="mt-1 block w-full"
                                        autoComplete="off"
                                        onChange={(e) =>
                                            setData(
                                                "jenis_kegiatan",
                                                e.target.value
                                            )
                                        }
                                        options={jenisKegiatan}
                                    />

                                    <InputError
                                        message={errors.jenis_kegiatan}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center mt-3">
                                <InputLabel
                                    htmlFor="pihak_1"
                                    value="PIC Pihak 1"
                                    className="w-44 text-lg"
                                />
                                <div className="flex-auto">
                                    <TextInput
                                        id="pihak_1"
                                        type="text"
                                        name="pihak_1"
                                        value={data.pihak_1}
                                        className="mt-1 block w-full px-4 py-2"
                                        autoComplete="off"
                                        isFocused={false}
                                        onChange={(e) =>
                                            setData("pihak_1", e.target.value)
                                        }
                                    />

                                    <InputError
                                        message={errors.pihak_1}
                                        className="mt-2"
                                    />
                                </div>
                                <InputLabel
                                    htmlFor="jabatan_pihak_1"
                                    value="Jabatan"
                                    className="w-auto mx-2 text-lg"
                                />
                                <div className="flex-auto">
                                    <TextInput
                                        id="jabatan_pihak_1"
                                        type="text"
                                        name="jabatan_pihak_1"
                                        value={data.jabatan_pihak_1}
                                        className="mt-1 block w-full px-4 py-2"
                                        autoComplete="off"
                                        isFocused={false}
                                        onChange={(e) =>
                                            setData(
                                                "jabatan_pihak_1",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.jabatan_pihak_1}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center mt-3">
                                <InputLabel
                                    htmlFor="pihak_2"
                                    value="PIC Pihak 2"
                                    className="w-44 text-lg"
                                />
                                <div className="flex-auto">
                                    <TextInput
                                        id="pihak_2"
                                        type="text"
                                        name="pihak_2"
                                        value={data.pihak_2}
                                        className="mt-1 block w-full px-4 py-2"
                                        autoComplete="off"
                                        isFocused={false}
                                        onChange={(e) =>
                                            setData("pihak_2", e.target.value)
                                        }
                                    />

                                    <InputError
                                        message={errors.pihak_2}
                                        className="mt-2"
                                    />
                                </div>
                                <InputLabel
                                    htmlFor="jabatan_pihak_2"
                                    value="Jabatan"
                                    className="w-auto mx-2 text-lg"
                                />
                                <div className="flex-auto">
                                    <TextInput
                                        id="jabatan_pihak_2"
                                        type="text"
                                        name="jabatan_pihak_2"
                                        value={data.jabatan_pihak_2}
                                        className="mt-1 block w-full px-4 py-2"
                                        autoComplete="off"
                                        isFocused={false}
                                        onChange={(e) =>
                                            setData(
                                                "jabatan_pihak_2",
                                                e.target.value
                                            )
                                        }
                                    />

                                    <InputError
                                        message={errors.jabatan_pihak_2}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center mt-3">
                                <InputLabel
                                    htmlFor="bentuk_kegiatan"
                                    value="Bentuk Kegiatan"
                                    className="w-44 text-lg"
                                />
                                <div className="flex-auto">
                                    <TextInput
                                        id="bentuk_kegiatan"
                                        type="text"
                                        name="bentuk_kegiatan"
                                        value={data.bentuk_kegiatan}
                                        className="mt-1 block w-full px-4 py-2"
                                        isFocused={false}
                                        onChange={(e) =>
                                            setData(
                                                "bentuk_kegiatan",
                                                e.target.value
                                            )
                                        }
                                    />

                                    <InputError
                                        message={errors.bentuk_kegiatan}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center mt-3">
                                <InputLabel
                                    htmlFor="ringkasan_luaran"
                                    value="Ringkasan Luaran"
                                    className="w-44 text-lg"
                                />
                                <div className="flex-auto">
                                    <TextInput
                                        id="ringkasan_luaran"
                                        type="text"
                                        name="ringkasan_luaran"
                                        value={data.ringkasan_luaran}
                                        className="mt-1 block w-full px-4 py-2"
                                        isFocused={false}
                                        onChange={(e) =>
                                            setData(
                                                "ringkasan_luaran",
                                                e.target.value
                                            )
                                        }
                                    />

                                    <InputError
                                        message={errors.ringkasan_luaran}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            {/* <div className="flex items-center mt-3">
                                <InputLabel
                                    value="Dokumen I.A"
                                    className="w-44 text-lg"
                                />
                                <div className="flex-auto">
                                    <label htmlFor="dokumen_kerjasama">
                                        <p className="text-sm text-gray-500 p-4 border border-dashed rounded-l-lg border-r-0 border-gray-500">
                                            {agreementArchive.dokumen_kerjasama
                                                ? agreementArchive.dokumen_kerjasama
                                                : "upload dokumen kerjasama"}
                                        </p>
                                    </label>
                                    <TextInput
                                        id="dokumen_kerjasama"
                                        type="file"
                                        name="dokumen_kerjasama"
                                        className="mt-1 block w-full px-4 py-2"
                                        isFocused={false}
                                        onChange={(e) =>
                                            setData(
                                                "dokumen_kerjasama",
                                                e.target.files[0]
                                            )
                                        }
                                    />
                                    {progress && (
                                        <progress
                                            value={progress.percentage}
                                            max="100"
                                        >
                                            {progress.percentage}%
                                        </progress>
                                    )}
                                    <InputError
                                        message={errors.dokumen_kerjasama}
                                        className="mt-2"
                                    />
                                </div>
                                <div
                                    className="flex gap-x-3 cursor-pointer text-sm text-gray-500 p-3.5 border border-dashed border-l-0 rounded-r-lg border-gray-500"
                                    onClick={() => handleViewDokumenKerjasama()}
                                >
                                    Lihat{" "}
                                    <EyeIcon className="h-6 w-6 text-gray-500" />
                                </div>
                            </div>
                            {agreementArchive.dokumen_kerjasama ? (
                                <div
                                    className={
                                        viewDokumenKerjasama === true
                                            ? "relative max-h-[50vh] overflow-scroll h-full"
                                            : "relative max-h-[50vh] overflow-scroll h-0"
                                    }
                                >
                                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                                        <Viewer
                                            fileUrl={
                                                route().t.url +
                                                "/storage/" +
                                                agreementArchive.dokumen_kerjasama
                                            }
                                        />
                                    </Worker>
                                </div>
                            ) : null}
                            <div className="flex items-center mt-3">
                                <InputLabel
                                    value="Dokumen Laporan"
                                    className="w-44 text-lg"
                                />
                                <div className="flex-auto">
                                    <label htmlFor="dokumen_laporan">
                                        <p className="text-sm text-gray-500 p-4 border border-dashed rounded-l-lg border-r-0 border-gray-500">
                                            {agreementArchive.dokumen_laporan
                                                ? agreementArchive.dokumen_laporan
                                                : "upload dokumen laporan"}
                                        </p>
                                    </label>
                                    <TextInput
                                        id="dokumen_laporan"
                                        type="file"
                                        name="dokumen_laporan"
                                        className="mt-1 block w-full px-4 py-2"
                                        isFocused={false}
                                        onChange={(e) =>
                                            setData(
                                                "dokumen_laporan",
                                                e.target.files[0]
                                            )
                                        }
                                    />
                                    {progress && (
                                        <progress
                                            value={progress.percentage}
                                            max="100"
                                        >
                                            {progress.percentage}%
                                        </progress>
                                    )}
                                    <InputError
                                        message={errors.dokumen_laporan}
                                        className="mt-2"
                                    />
                                </div>
                                <div
                                    className="flex gap-x-3 cursor-pointer text-sm text-gray-500 p-3.5 border border-dashed border-l-0 rounded-r-lg border-gray-500"
                                    onClick={() => handleViewDokumenLaporan()}
                                >
                                    Lihat{" "}
                                    <EyeIcon className="h-6 w-6 text-gray-500" />
                                </div>
                            </div>
                            {agreementArchive.dokumen_laporan ? (
                                <div
                                    className={
                                        viewDokumenLaporan === true
                                            ? "relative max-h-[50vh] overflow-scroll h-full"
                                            : "relative max-h-[50vh] overflow-scroll h-0"
                                    }
                                >
                                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                                        <Viewer
                                            fileUrl={
                                                route().t.url +
                                                "/storage/" +
                                                agreementArchive.dokumen_laporan
                                            }
                                        />
                                    </Worker>
                                </div>
                            ) : null}
                            <div className="flex items-center mt-3">
                                <InputLabel
                                    value="Dokumentasi"
                                    className="w-44 text-lg"
                                />
                                <div className="flex-auto">
                                    <label for="dokumentasi">
                                        <p className="text-sm text-gray-500 p-4 border border-dashed rounded-lg border-gray-500">
                                            upload dokumentasi
                                        </p>
                                        <ul className="list-disc list-inside">
                                            {data.dokumentasi.map(
                                                (file, index) => (
                                                    <li key={index}>
                                                        {file.name}
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </label>
                                    <TextInput
                                        id="dokumentasi"
                                        type="file"
                                        name="dokumentasi"
                                        className="mt-1 block w-full px-4 py-2"
                                        isFocused={false}
                                        multiple
                                        onChange={handleFileChange}
                                    />
                                    {progress && (
                                        <progress
                                            value={progress.percentage}
                                            max="100"
                                        >
                                            {progress.percentage}%
                                        </progress>
                                    )}
                                    <InputError
                                        message={errors.dokumentasi}
                                        className="mt-2"
                                    />
                                </div>
                            </div> */}
                            <div className="mt-4 flex justify-end">
                                <Button
                                    color="green"
                                    className="px-10"
                                    disabled={processing}
                                    type="submit"
                                >
                                    Save
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
