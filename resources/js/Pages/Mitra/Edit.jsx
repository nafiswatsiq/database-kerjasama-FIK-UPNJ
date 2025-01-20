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

export default function Edit({ mitra }) {
    const { data, setData, post, processing, errors, reset, progress } =
        useForm({
            nama_mitra: mitra.nama_mitra,
            tentang_mitra: mitra.tentang_mitra,
            no_pks_fik: mitra.no_pks_fik,
            no_pks_mitra: mitra.no_pks_mitra,
            pic_fik: mitra.pic_fik,
            pic_mitra: mitra.pic_mitra,
            kriteria_mitra: mitra.kriteria_mitra,
            asal_mitra: mitra.asal_mitra,
            waktu_kerjasama_mulai: mitra.waktu_kerjasama_mulai,
            waktu_kerjasama_selesai: mitra.waktu_kerjasama_selesai,
            dokumen_pks: mitra.dokumen_pks,
            dokumen_name: mitra.dokumen_pks,
        });
    const [swalShown, setSwalShown] = useState(false);

    const handleFileChange = (e) => {
        setData("dokumen_name", data.dokumen_pks.name);
        console.log(data.dokumen_pks);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("mitra.update", mitra.id), {
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
                            <Link href={route("dashboard")}>
                                <ArrowLeftCircleIcon className="h-10 w-10 text-orange-700 mr-3  " />
                            </Link>
                            <h1 className="font-medium text-xl">Edit</h1>
                        </div>
                    </div>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <Typography
                            color="gray"
                            className="px-6 pt-6 font-normal text-lg"
                        >
                            Form Edit Rekap Kerjasama Baru
                        </Typography>
                        <form onSubmit={submit} className="p-6">
                            <div className="flex items-center">
                                <InputLabel
                                    htmlFor="nama_mitra"
                                    value="Nama Instansi"
                                    className="w-44 text-lg"
                                />
                                <div className="flex-auto">
                                    <TextInput
                                        id="nama_mitra"
                                        type="text"
                                        name="nama_mitra"
                                        value={data.nama_mitra}
                                        className="mt-1 block w-full px-4 py-2"
                                        autoComplete="username"
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData(
                                                "nama_mitra",
                                                e.target.value
                                            )
                                        }
                                    />

                                    <InputError
                                        message={errors.nama_mitra}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="flex items-start mt-3">
                                <InputLabel
                                    htmlFor="tentang_mitra"
                                    value="Deskripsi Instansi"
                                    className="w-44 text-lg mt-2"
                                />
                                <div className="flex-auto">
                                    <TextareaInput
                                        id="tentang_mitra"
                                        type="text"
                                        name="tentang_mitra"
                                        value={data.tentang_mitra}
                                        className="mt-1 block w-full px-4 py-2"
                                        isFocused={false}
                                        onChange={(e) =>
                                            setData(
                                                "tentang_mitra",
                                                e.target.value
                                            )
                                        }
                                    />

                                    <InputError
                                        message={errors.deskripsi_instansi}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center mt-3">
                                <InputLabel
                                    htmlFor="no_pks_fik"
                                    value="No PKS Pihak 1"
                                    className="w-44 text-lg"
                                />
                                <div className="flex-auto">
                                    <TextInput
                                        id="no_pks_fik"
                                        type="text"
                                        name="no_pks_fik"
                                        value={data.no_pks_fik}
                                        className="mt-1 block w-full px-4 py-2"
                                        autoComplete="off"
                                        isFocused={false}
                                        onChange={(e) =>
                                            setData(
                                                "no_pks_fik",
                                                e.target.value
                                            )
                                        }
                                    />

                                    <InputError
                                        message={errors.no_pks_fik}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center mt-3">
                                <InputLabel
                                    htmlFor="no_pks_mitra"
                                    value="No PKS Pihak 2"
                                    className="w-44 text-lg"
                                />
                                <div className="flex-auto">
                                    <TextInput
                                        id="no_pks_mitra"
                                        type="text"
                                        name="no_pks_mitra"
                                        value={data.no_pks_mitra}
                                        className="mt-1 block w-full px-4 py-2"
                                        autoComplete="off"
                                        isFocused={false}
                                        onChange={(e) =>
                                            setData(
                                                "no_pks_mitra",
                                                e.target.value
                                            )
                                        }
                                    />

                                    <InputError
                                        message={errors.no_pks_mitra}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center mt-3">
                                <InputLabel
                                    htmlFor="pic_fik"
                                    value="Pihak 1"
                                    className="w-44 text-lg"
                                />
                                <div className="flex-auto">
                                    <TextInput
                                        id="pic_fik"
                                        type="text"
                                        name="pic_fik"
                                        value={data.pic_fik}
                                        className="mt-1 block w-full px-4 py-2"
                                        autoComplete="off"
                                        isFocused={false}
                                        onChange={(e) =>
                                            setData("pic_fik", e.target.value)
                                        }
                                    />

                                    <InputError
                                        message={errors.pic_fik}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center mt-3">
                                <InputLabel
                                    htmlFor="pic_mitra"
                                    value="Pihak 2"
                                    className="w-44 text-lg"
                                />
                                <div className="flex-auto">
                                    <TextInput
                                        id="pic_mitra"
                                        type="text"
                                        name="pic_mitra"
                                        value={data.pic_mitra}
                                        className="mt-1 block w-full px-4 py-2"
                                        autoComplete="off"
                                        isFocused={false}
                                        onChange={(e) =>
                                            setData("pic_mitra", e.target.value)
                                        }
                                    />

                                    <InputError
                                        message={errors.pic_mitra}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center mt-3">
                                <InputLabel
                                    htmlFor="kriteria_mitra"
                                    value="Kriteria Mitra"
                                    className="w-44 text-lg"
                                />
                                <div className="flex-auto">
                                    <SelectInput
                                        id="kriteria_mitra"
                                        name="kriteria_mitra"
                                        value={data.kriteria_mitra}
                                        className="mt-1 block w-full"
                                        autoComplete="off"
                                        onChange={(e) =>
                                            setData(
                                                "kriteria_mitra",
                                                e.target.value
                                            )
                                        }
                                        options={[
                                            {
                                                value: "Perguruan Tinggi Negeri",
                                                label: "Perguruan Tinggi Negeri",
                                            },
                                            {
                                                value: "Perguruan Tinggi Swasta",
                                                label: "Perguruan Tinggi Swasta",
                                            },
                                            {
                                                value: "Dunia Industri/Dunia Usaha",
                                                label: "Dunia Industri/Dunia Usaha",
                                            },
                                            {
                                                value: "Pemerintahan",
                                                label: "Pemerintahan",
                                            },
                                            {
                                                value: "Perusahaan Multinasional",
                                                label: "Perusahaan Multinasional",
                                            },
                                            {
                                                value: "Perusahaan Teknologi",
                                                label: "Perusahaan Teknologi",
                                            },
                                            {
                                                value: "Perusahaan Startup",
                                                label: "Perusahaan Startup",
                                            },
                                            {
                                                value: "Organisasi Nirlaba",
                                                label: "Organisasi Nirlaba",
                                            },
                                            {
                                                value: "Lembaga Riset",
                                                label: "Lembaga Riset",
                                            },
                                            {
                                                value: "Lembaga Kebudayaan",
                                                label: "Lembaga Kebudayaan",
                                            },
                                        ]}
                                    />

                                    <InputError
                                        message={errors.kriteria_mitra}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center mt-3">
                                <InputLabel
                                    htmlFor="asal_mitra"
                                    value="Asal Mitra"
                                    className="w-44 text-lg"
                                />
                                <div className="flex-auto">
                                    <SelectInput
                                        id="asal_mitra"
                                        name="asal_mitra"
                                        value={data.asal_mitra}
                                        className="mt-1 block w-full"
                                        autoComplete="off"
                                        onChange={(e) =>
                                            setData(
                                                "asal_mitra",
                                                e.target.value
                                            )
                                        }
                                        options={[
                                            {
                                                value: "Domestik",
                                                label: "Domestik",
                                            },
                                            {
                                                value: "Internasional",
                                                label: "Internasional",
                                            },
                                        ]}
                                    />

                                    <InputError
                                        message={errors.asal_mitra}
                                        className="mt-2"
                                    />
                                </div>
                            </div>

                            {/* Ruang Lingkup sementara */}
                            {/* <div className="flex items-center mt-3">
                                <InputLabel
                                    htmlFor="ruang_lingkup_kerjasama"
                                    value="Ruang Lingkup Kerjasama"
                                    className="w-44 text-lg"
                                />
                                <div className="flex-auto">
                                    <TextInput
                                        id="ruang_lingkup_kerjasama"
                                        type="text"
                                        name="ruang_lingkup_kerjasama"
                                        value={data.ruang_lingkup_kerjasama}
                                        className="mt-1 block w-full px-4 py-2"
                                        autoComplete="off"
                                        isFocused={false}
                                        onChange={(e) =>
                                            setData(
                                                "ruang_lingkup_kerjasama",
                                                e.target.value
                                            )
                                        }
                                    />

                                    <InputError
                                        message={errors.ruang_lingkup_kerjasama}
                                        className="mt-2"
                                    />
                                </div>
                            </div> */}
                            <div className="flex items-center mt-3">
                                <InputLabel
                                    htmlFor="waktuKerjasama"
                                    value="Waktu Kerjsama"
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
                                <p className="px-10">s.d</p>
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
                                    value="Dokumen PKS"
                                    className="w-44 text-lg"
                                />
                                <div className="flex-auto">
                                    <label htmlFor="dokumen_pks">
                                        <p className="text-sm text-gray-500 p-4 border border-dashed rounded-lg border-gray-500">
                                            {data.dokumen_name
                                                ? data.dokumen_name
                                                : "upload dokumen PKS"}
                                        </p>
                                    </label>
                                    <TextInput
                                        id="dokumen_pks"
                                        type="file"
                                        name="dokumen_pks"
                                        className="mt-1 block w-full px-4 py-2"
                                        isFocused={false}
                                        onChange={(e) =>
                                            setData(
                                                "dokumen_pks",
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
                                        message={errors.dokumen_pks}
                                        className="mt-2"
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
