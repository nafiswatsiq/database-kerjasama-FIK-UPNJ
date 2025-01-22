import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";
import { Breadcrumbs, Button } from "@material-tailwind/react";
import Placeholder from "@/Components/Placeholder";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import Swal from "sweetalert2";

import { useState } from "react";

export default function InputLaporanIa({
    agreementArchive,
    mitra,
    logKegiatans,
}) {
    const { data, setData, post, errors, processing } = useForm({
        tanggal_kegiatan: "",
        hasil_kegiatan: "",
        nip: "",
        log_kegiatan_id: "",
    });
    const [swalShown, setSwalShown] = useState(false);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        post(
            route("agreementarchives.storeLapIa", [
                mitra.id,
                agreementArchive.id,
            ]),
            {
                onError: () => {
                    Swal.fire({
                        icon: "error",
                        title: "Terjadi kesalahan",
                        text: "Gagal menyimpan data",
                        didOpen: () => setSwalShown(true),
                        didClose: () => setSwalShown(false),
                    });
                },
                onSuccess: () => {
                    Swal.fire({
                        icon: "success",
                        title: "Berhasil",
                        text: "Data berhasil disimpan",
                        didOpen: () => setSwalShown(true),
                        didClose: () => setSwalShown(false),
                    });
                },
            }
        );
    };
    return (
        <AuthenticatedLayout>
            <Head title="Input Laporan IA" />
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
                        <Link
                            href={route("agreementarchives.logKegiatan", [
                                mitra.id,
                                agreementArchive.id,
                            ])}
                            className="opacity-60
                            "
                        >
                            Log Kegiatan
                        </Link>
                        <p>Input Laporan IA</p>
                    </Breadcrumbs>

                    <div className="overflow-hidden">
                        <div className="border-b-2 pb-4 border-gray-300 flex items-center">
                            <Link
                                href={route("agreementarchives.logKegiatan", [
                                    mitra.id,
                                    agreementArchive.id,
                                ])}
                            >
                                <ArrowLeftCircleIcon className="h-10 w-10 text-orange-700 mr-4" />
                            </Link>
                            <h1 className="font-medium text-xl">
                                Input Laporan IA
                            </h1>
                        </div>
                    </div>
                    <div className="overflow-hidden">
                        <form onSubmit={onSubmitHandler} className="py-6 pl-10">
                            <Placeholder
                                content="Nama Mitra"
                                value={mitra.nama_mitra}
                            />
                            <Placeholder
                                content="No PKS Mitra"
                                value={mitra.no_pks_mitra}
                            />
                            <Placeholder
                                content="Nama Kegiatan"
                                value={agreementArchive.nama_kegiatan}
                            />
                            <Placeholder
                                content="No IA"
                                value={agreementArchive.no_ia}
                            />
                            <Placeholder
                                content="Waktu Kegiatan"
                                value={[
                                    agreementArchive.durasi_kerjasama,
                                    agreementArchive.tahun_ajaran_1,
                                    agreementArchive.tahun_ajaran_2,
                                ].join(" ")}
                            />
                            <div className="flex items-center">
                                <InputLabel
                                    htmlFor="tanggal_kegiatan"
                                    value="Tanggal Kegiatan"
                                    className="w-44 text-lg"
                                />
                                <div className="flex-auto">
                                    <TextInput
                                        id="tanggal_kegiatan"
                                        type="date"
                                        name="tanggal_kegiatan"
                                        value={data.tanggal_kegiatan}
                                        className="block w-full px-4 text-black"
                                        isFocused={false}
                                        onChange={(e) =>
                                            setData(
                                                "tanggal_kegiatan",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.tanggal_kegiatan}
                                        style="mt-1"
                                    />
                                </div>
                            </div>
                            <TextInput
                                name="log_kegiatan_id"
                                value={data.log_kegiatan_id}
                                hidden
                            />
                            <div className="flex items-center mt-2">
                                <InputLabel
                                    htmlFor="jenis_kerjasama"
                                    value="Ruang Linkgup"
                                    className="w-44 text-lg"
                                />
                                <div className="flex-auto">
                                    <TextInput
                                        id="jenis_kerjasama"
                                        type="text"
                                        name="jenis_kerjasama"
                                        value={mitra.jenis_kerjasama}
                                        disabled
                                        className="mt-1 block w-full px-4 py-2 text-black disabled:opacity-50"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center mt-2">
                                <InputLabel
                                    htmlFor="hasil_kegiatan"
                                    value="Hasil Pelaksanaan"
                                    className="w-44 text-lg"
                                />
                                <div className="flex-auto">
                                    <TextInput
                                        id="hasil_kegiatan"
                                        type="text"
                                        name="hasil_kegiatan"
                                        value={data.hasil_kegiatan}
                                        className="mt-1 block w-full px-4 py-2 text-black"
                                        isFocused={false}
                                        onChange={(e) =>
                                            setData(
                                                "hasil_kegiatan",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.hasil_kegiatan}
                                        style="mt-1"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center mt-2">
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
                                        value={
                                            agreementArchive.ringkasan_luaran
                                        }
                                        disabled
                                        className="mt-1 block w-full px-4 py-2 text-black disabled:opacity-50"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 justify-center items-center">
                                <div className="flex items-center mt-2">
                                    <InputLabel
                                        htmlFor="pic_mitra"
                                        value="PIC Mitra"
                                        className="w-44 text-lg"
                                    />
                                    <div className="flex-auto">
                                        <TextInput
                                            id="pic_mitra"
                                            type="text"
                                            name="pic_mitra"
                                            value={mitra.pic_mitra}
                                            disabled
                                            className="mt-1 block w-full px-4 py-2 text-black disabled:opacity-50"
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center mt-2">
                                    <InputLabel
                                        htmlFor="jabatan_pic_mitra"
                                        value="Jabatan"
                                        className="w-44 text-lg text-center"
                                    />
                                    <div className="flex-auto">
                                        <TextInput
                                            id="jabatan_pic_mitra"
                                            type="text"
                                            name="jabatan_pic_mitra"
                                            value={mitra.jabatan_pic_mitra}
                                            disabled
                                            className="mt-1 block w-full px-4 py-2 text-black disabled:opacity-50"
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center mt-2">
                                    <InputLabel
                                        htmlFor="pic_fik"
                                        value="PIC FIK"
                                        className="w-44 text-lg"
                                    />
                                    <div className="flex-auto">
                                        <TextInput
                                            id="pic_fik"
                                            type="text"
                                            name="pic_fik"
                                            value={mitra.pic_fik}
                                            disabled
                                            className="mt-1 block w-full px-4 py-2 text-black disabled:opacity-50"
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center mt-2">
                                    <InputLabel
                                        htmlFor="jabatan_pic_fik"
                                        value="Jabatan"
                                        className="w-44 text-lg text-center"
                                    />
                                    <div className="flex-auto">
                                        <TextInput
                                            id="jabatan_pic_fik"
                                            type="text"
                                            name="jabatan_pic_fik"
                                            value={mitra.jabatan_pic_fik}
                                            disabled
                                            className="mt-1 block w-full px-4 py-2 text-black disabled:opacity-50"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center mt-2 w-1/2">
                                <InputLabel
                                    htmlFor="nip"
                                    value="NIP"
                                    className="w-44 text-lg"
                                />
                                <div className="flex-auto">
                                    <TextInput
                                        id="nip"
                                        type="text"
                                        name="nip"
                                        value={data.nip}
                                        className="block w-full px-4 text-black"
                                        isFocused={false}
                                        onChange={(e) =>
                                            setData("nip", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.nip}
                                        style="mt-1"
                                    />
                                </div>
                            </div>
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
