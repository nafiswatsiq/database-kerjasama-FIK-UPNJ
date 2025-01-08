import React, { useState, useEffect } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextareaInput from "@/Components/TextareaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Button, Input, Textarea, Typography } from "@material-tailwind/react";
import Swal from "sweetalert2";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";
import { GrFormNextLink } from "react-icons/gr";
import { FaPlus } from "react-icons/fa";

export default function Create({
    jenis_kerjasama,
    kriteria_mitra,
    jenis_kegiatan,
    durasi_kerjasama,
}) {
    const { data, setData, post, processing, errors, reset, progress } =
        useForm({
            nama_mitra: "",
            logo: "",
            tentang_mitra: "",
            bidang_kerjasama: "",
            jenis_kerjasama: "",
            no_pks_fik: "",
            no_pks_mitra: "",
            kriteria_mitra: "",
            asal_mitra: "",
            pic_fik: "",
            jabatan_pic_fik: "",
            pic_mitra: "",
            jabatan_pic_mitra: "",
            lokasi: "",
            hari_tanggal: "",
            waktu_kerjasama_mulai: "",
            waktu_kerjasama_selesai: "",
            pasals: [],
            isi_pasal: [],
        });

    // Fungsi untuk submit data
    const submit = (e) => {
        e.preventDefault();
        setData("pasals", pasals); // Pastikan pasals ada di dalam data
        post(route("mitra.store"), {
            onError: () => {
                Swal.fire({
                    title: "Error!",
                    text: "Data gagal disimpan",
                    icon: "error",
                });
            },
            onSuccess: () => {
                Swal.fire({
                    title: "Success!",
                    text: "Data berhasil disimpan",
                    icon: "success",
                });
            },
        });
    };

    // PASAL
    const [formData, setFormData] = useState({
        page: 1, // Untuk melacak halaman saat ini
        pasals: [
            {
                id: 1,
                judul_pasal: "",
                isi_pasals: [{ id: 1, isi: "" }],
            },
        ],
    });

    const [pasals, setPasals] = useState([
        {
            id: 1,
            judul_pasal: "",
            isi_pasals: [{ id: 1, isi: "" }],
        },
    ]);

    const handleAddPasal = () => {
        setPasals([
            ...pasals,
            {
                id: pasals.length + 1,
                judul_pasal: "",
                isi_pasals: [{ id: 1, isi: "" }],
            },
        ]);
    };

    const handleAddIsiPasal = (pasalId) => {
        setPasals(
            pasals.map((pasal) =>
                pasal.id === pasalId
                    ? {
                          ...pasal,
                          isi_pasals: [
                              ...pasal.isi_pasals,
                              { id: pasal.isi_pasals.length + 1, isi: "" },
                          ],
                      }
                    : pasal
            )
        );
    };

    const handleChangePasalTitle = (pasalId, value) => {
        setPasals(
            pasals.map((pasal) =>
                pasal.id === pasalId ? { ...pasal, judul_pasal: value } : pasal
            )
        );
    };

    const handleChangeIsiPasal = (pasalId, isiId, value) => {
        setPasals(
            pasals.map((pasal) =>
                pasal.id === pasalId
                    ? {
                          ...pasal,
                          isi_pasals: pasal.isi_pasals.map((isi) =>
                              isi.id === isiId ? { ...isi, isi: value } : isi
                          ),
                      }
                    : pasal
            )
        );
    };

    // END PASAL

    // Navigasi antar halaman form
    const handleNext = () => {
        const maxPage = 3; // Tentukan jumlah maksimal halaman
        setFormData((prevData) => ({
            ...prevData,
            page: Math.min(prevData.page + 1, maxPage),
        }));
    };

    const handleBack = () => {
        setFormData((prevData) => ({
            ...prevData,
            page: Math.max(prevData.page - 1, 1),
        }));
    };

    // Simpan dan ambil data dari localStorage
    useEffect(() => {
        const savedData = localStorage.getItem("formData");
        if (savedData) {
            setFormData(JSON.parse(savedData));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("formData", JSON.stringify(formData));
    }, [formData]);

    useEffect(() => {
        setData("pasals", pasals);
    }, [pasals]);

    const renderPage = () => {
        // Render halaman berdasarkan page
        switch (formData.page) {
            case 1:
                return (
                    <AuthenticatedLayout>
                        <Head title="New Entry" />
                        <div className="py-10">
                            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col gap-y-8">
                                <div className="overflow-hidden">
                                    <div className="border-b-2 pb-4 border-gray-500 flex items-center">
                                        <Link href={route("dashboard")}>
                                            <ArrowLeftCircleIcon className="h-10 w-10 text-orange-700" />
                                        </Link>
                                        <h1 className="font-medium text-xl ml-4">
                                            INPUT DATA PKS
                                        </h1>
                                    </div>
                                </div>
                                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                                    <Typography
                                        color="gray"
                                        className="px-6 pt-6 font-normal text-lg"
                                    >
                                        Form Pengisian Mitra Kerjasama
                                    </Typography>
                                    <div className="flex justify-center gap-10">
                                        <div className="flex flex-col items-center gap-3">
                                            <button
                                                onClick={handleBack}
                                                className="bg-orange-700 text-xl  rounded-full w-10 h-10 flex items-center justify-center border-2 border-black font-bold text-white"
                                            >
                                                1
                                            </button>
                                            <h1>data mitra</h1>
                                        </div>
                                        <div className="flex flex-col items-center gap-3">
                                            <button
                                                onClick={handleNext}
                                                className="bg-white text-xl  rounded-full w-10 h-10 flex items-center justify-center border-2 border-black font-bold text-orange-700"
                                            >
                                                2
                                            </button>
                                            <h1>perjanjian kerjasama</h1>
                                        </div>
                                    </div>
                                    <form onSubmit={submit} className="p-6">
                                        <div className="flex items-center">
                                            <InputLabel
                                                htmlFor="nama_mitra"
                                                value="Nama Mitra"
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
                                        <div className="flex items-center mt-3">
                                            <InputLabel
                                                htmlFor="logo"
                                                value="Upload Logo"
                                                className="w-44 text-lg"
                                            />
                                            <div className="flex-auto">
                                                <label htmlFor="logo">
                                                    <p className="text-sm text-gray-500 p-4 border border-dashed rounded-lg border-gray-500">
                                                        {data.logo
                                                            ? data.logo.name
                                                            : "upload logo"}
                                                    </p>
                                                </label>
                                                <TextInput
                                                    id="logo"
                                                    type="file"
                                                    name="logo"
                                                    className="mt-1 block w-full px-4 py-2"
                                                    isFocused={false}
                                                    onChange={(e) =>
                                                        setData(
                                                            "logo",
                                                            e.target.files[0]
                                                        )
                                                    }
                                                />
                                                {progress && (
                                                    <progress
                                                        value={
                                                            progress.percentage
                                                        }
                                                        max="100"
                                                    >
                                                        {progress.percentage}%
                                                    </progress>
                                                )}
                                                <InputError
                                                    message={errors.logo}
                                                    className="mt-2"
                                                />
                                                <InputError
                                                    message={
                                                        errors.nama_instansi
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex items-start mt-3">
                                            <InputLabel
                                                htmlFor="tentang_mitra"
                                                value="Tentang Mitra"
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
                                                    message={
                                                        errors.tentang_mitra
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex items-start mt-3">
                                            <InputLabel
                                                htmlFor="bidang_kerjasama"
                                                value="Bidang Kerjasama"
                                                className="w-44 text-lg mt-2"
                                            />
                                            <div className="flex-auto">
                                                <TextInput
                                                    id="bidang_kerjasama"
                                                    type="text"
                                                    name="bidang_kerjasama"
                                                    value={
                                                        data.bidang_kerjasama
                                                    }
                                                    className="mt-1 block w-full px-4 py-2"
                                                    isFocused={false}
                                                    onChange={(e) =>
                                                        setData(
                                                            "bidang_kerjasama",
                                                            e.target.value
                                                        )
                                                    }
                                                />

                                                <InputError
                                                    message={
                                                        errors.bidang_kerjasama
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex items-center mt-3">
                                            <InputLabel
                                                htmlFor="jenis_kerjasama"
                                                value="Jenis Kerjasama"
                                                className="w-44 text-lg"
                                            />
                                            <div className="flex-auto">
                                                <SelectInput
                                                    id="jenis_kerjasama"
                                                    name="jenis_kerjasama"
                                                    value={data.jenis_kerjasama}
                                                    className="mt-1 block w-full"
                                                    autoComplete="off"
                                                    onChange={(e) =>
                                                        setData(
                                                            "jenis_kerjasama",
                                                            e.target.value
                                                        )
                                                    }
                                                    options={[
                                                        {
                                                            value: "",
                                                            label: "Pilih Jenis Kerjasama",
                                                        },
                                                        ...jenis_kerjasama.map(
                                                            (item) => ({
                                                                value: item.id,
                                                                label: item.jenis_kerjasama,
                                                            })
                                                        ),
                                                    ]}
                                                />

                                                <InputError
                                                    message={
                                                        errors.jenis_kerjasama
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex items-center mt-3">
                                            <InputLabel
                                                htmlFor="no_pks_fik"
                                                value="No PKS FIK"
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
                                                value="No PKS Mitra"
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
                                                    message={
                                                        errors.no_pks_mitra
                                                    }
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
                                                            value: "",
                                                            label: "Pilih Kriteria Mitra",
                                                        },
                                                        ...kriteria_mitra.map(
                                                            (item) => ({
                                                                value: item.id,
                                                                label: item.kriteria_mitra,
                                                            })
                                                        ),
                                                    ]}
                                                />

                                                <InputError
                                                    message={
                                                        errors.kriteria_mitra
                                                    }
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
                                        <div className="flex items-center mt-3">
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
                                                    value={data.pic_fik}
                                                    className="mt-1 block w-full px-4 py-2"
                                                    isFocused={false}
                                                    onChange={(e) =>
                                                        setData(
                                                            "pic_fik",
                                                            e.target.value
                                                        )
                                                    }
                                                />

                                                <InputError
                                                    message={errors.pic_fik}
                                                    className="mt-2"
                                                />
                                            </div>
                                            <p className="px-10">jabatan</p>
                                            <div className="flex-auto">
                                                {/* <InputLabel
                                                    htmlFor="jabatan"
                                                    value="Jabatan"
                                                    className="w-44 text-lg"
                                                /> */}
                                                <TextInput
                                                    id="jabatan_pic_fik"
                                                    type="text"
                                                    name="jabatan_pic_fik"
                                                    value={data.jabatan_pic_fik}
                                                    className="mt-1 block w-full px-4 py-2"
                                                    isFocused={false}
                                                    onChange={(e) =>
                                                        setData(
                                                            "jabatan_pic_fik",
                                                            e.target.value
                                                        )
                                                    }
                                                />

                                                <InputError
                                                    message={
                                                        errors.jabatan_pic_fik
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex items-center mt-3">
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
                                                    value={data.pic_mitra}
                                                    className="mt-1 block w-full px-4 py-2"
                                                    isFocused={false}
                                                    onChange={(e) =>
                                                        setData(
                                                            "pic_mitra",
                                                            e.target.value
                                                        )
                                                    }
                                                />

                                                <InputError
                                                    message={errors.pic_mitra}
                                                    className="mt-2"
                                                />
                                            </div>
                                            <p className="px-10">jabatan</p>
                                            <div className="flex-auto">
                                                <TextInput
                                                    id="jabatan_pic_mitra"
                                                    type="text"
                                                    name="jabatan_pic_mitra"
                                                    value={
                                                        data.jabatan_pic_mitra
                                                    }
                                                    className="mt-1 block w-full px-4 py-2"
                                                    isFocused={false}
                                                    onChange={(e) =>
                                                        setData(
                                                            "jabatan_pic_mitra",
                                                            e.target.value
                                                        )
                                                    }
                                                />

                                                <InputError
                                                    message={
                                                        errors.jabatan_pic_mitra
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex items-center mt-3">
                                            <InputLabel
                                                htmlFor="lokasi"
                                                value="Lokasi"
                                                className="w-44 text-lg"
                                            />
                                            <div className="flex-auto">
                                                <TextInput
                                                    id="lokasi"
                                                    type="text"
                                                    name="lokasi"
                                                    value={data.lokasi}
                                                    className="mt-1 block w-full px-4 py-2"
                                                    autoComplete="off"
                                                    isFocused={false}
                                                    onChange={(e) =>
                                                        setData(
                                                            "lokasi",
                                                            e.target.value
                                                        )
                                                    }
                                                />

                                                <InputError
                                                    message={errors.lokasi}
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex items-center mt-3">
                                            <InputLabel
                                                htmlFor="hari_tanggal"
                                                value="Hari, tanggal"
                                                className="w-44 text-lg"
                                            />
                                            <div className="flex-auto">
                                                <TextInput
                                                    id="hari_tanggal"
                                                    type="date"
                                                    name="hari_tanggal"
                                                    value={data.hari_tanggal}
                                                    className="mt-1 block w-full px-4 py-2"
                                                    autoComplete="off"
                                                    isFocused={false}
                                                    onChange={(e) =>
                                                        setData(
                                                            "hari_tanggal",
                                                            e.target.value
                                                        )
                                                    }
                                                />

                                                <InputError
                                                    message={
                                                        errors.hari_tanggal
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex items-center mt-3">
                                            <InputLabel
                                                htmlFor="waktu_kerjasama"
                                                value="Waktu Kerjsama"
                                                className="w-44 text-lg"
                                            />
                                            <div className="flex-auto">
                                                <TextInput
                                                    id="waktu_kerjasama_mulai"
                                                    type="date"
                                                    name="waktu_kerjasama_mulai"
                                                    value={
                                                        data.waktu_kerjasama_mulai
                                                    }
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
                                                    message={
                                                        errors.waktu_kerjasama_mulai
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                            <p className="px-10">s.d</p>
                                            <div className="flex-auto">
                                                <TextInput
                                                    id="waktu_kerjasama_selesai"
                                                    type="date"
                                                    name="waktu_kerjasama_selesai"
                                                    value={
                                                        data.waktu_kerjasama_selesai
                                                    }
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
                                                    message={
                                                        errors.waktu_kerjasama_selesai
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex justify-center mt-4">
                                            <button
                                                onClick={handleNext}
                                                className="bg-orange-700 rounded-full flex justify-center items-center p-4"
                                            >
                                                <GrFormNextLink
                                                    className=" text-white text-xl"
                                                    width={40}
                                                />
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </AuthenticatedLayout>
                );
            case 2:
                return (
                    <AuthenticatedLayout>
                        <div className="py-10">
                            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col gap-y-8">
                                <div className="overflow-hidden">
                                    <div className="border-b-2 pb-4 border-gray-500 flex items-center">
                                        <Link href={route("dashboard")}>
                                            <ArrowLeftCircleIcon className="h-10 w-10 text-orange-700" />
                                        </Link>
                                        <h1 className="font-medium text-xl ml-4">
                                            INPUT DATA PKS
                                        </h1>
                                    </div>
                                </div>
                                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                                    <Typography
                                        color="gray"
                                        className="px-6 pt-6 font-normal text-lg"
                                    >
                                        Form Pengisian Mitra Kerjasama
                                    </Typography>
                                    <div className="flex justify-center gap-10">
                                        <div className="flex flex-col items-center gap-3">
                                            <button
                                                onClick={handleBack}
                                                className="bg-white text-xl  rounded-full w-10 h-10 flex items-center justify-center border-2 border-black font-bold text-orange-700"
                                            >
                                                1
                                            </button>
                                            <h1>data mitra</h1>
                                        </div>
                                        <div className="flex flex-col items-center gap-3">
                                            <button
                                                onClick={handleNext}
                                                className="bg-orange-700 text-xl  rounded-full w-10 h-10 flex items-center justify-center border-2 border-black font-bold text-white"
                                            >
                                                2
                                            </button>
                                            <h1>perjanjian kerjasama</h1>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        {pasals.map((pasal) => (
                                            <div
                                                id={`pasal-${pasal.id}`}
                                                key={pasal.id}
                                                className="mb-8"
                                            >
                                                <div className="px-6">
                                                    <div className="flex items-center justify-between gap-6">
                                                        <h1 className="text-nowrap">
                                                            Pasal {pasal.id}
                                                        </h1>
                                                        <hr className="my-8 px-20 border-black w-full" />
                                                        <button
                                                            type="button"
                                                            onClick={(event) =>
                                                                handleAddPasal(
                                                                    event
                                                                )
                                                            }
                                                            className="bg-green-400 text-white rounded-full px-8 py-2"
                                                        >
                                                            <FaPlus />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <label
                                                        htmlFor={`judul_pasal_${pasal.id}`}
                                                        className="w-44 text-lg"
                                                    >
                                                        Judul Pasal
                                                    </label>
                                                    <div className="flex-auto">
                                                        <input
                                                            id={`judul_pasal_${pasal.id}`}
                                                            type="text"
                                                            name={`judul_pasal_${pasal.id}`}
                                                            value={
                                                                pasal.judul_pasal
                                                            }
                                                            onChange={(e) =>
                                                                handleChangePasalTitle(
                                                                    pasal.id,
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="mt-1 block w-full px-4 py-2"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="px-6 mt-4 flex items-center gap-4">
                                                    <h1>Isi Pasal</h1>
                                                    <button
                                                        type="button"
                                                        onClick={(event) =>
                                                            handleAddIsiPasal(
                                                                pasal.id,
                                                                event
                                                            )
                                                        }
                                                        className="bg-green-400 text-white rounded-full px-4 py-2"
                                                    >
                                                        <FaPlus />
                                                    </button>
                                                </div>
                                                <div className="px-14">
                                                    {pasal.isi_pasals.map(
                                                        (isi) => (
                                                            <div
                                                                className="flex items-center"
                                                                key={`${pasal.id}-${isi.id}`}
                                                            >
                                                                <label
                                                                    htmlFor={`isi_${pasal.id}_${isi.id}`}
                                                                    className="w-44 text-lg"
                                                                >
                                                                    {isi.id}.
                                                                </label>
                                                                <div className="flex-auto">
                                                                    <input
                                                                        id={`isi_${pasal.id}_${isi.id}`}
                                                                        type="text"
                                                                        name={`isi_${pasal.id}_${isi.id}`}
                                                                        value={
                                                                            isi.isi
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            handleChangeIsiPasal(
                                                                                pasal.id,
                                                                                isi.id,
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                        className="mt-1 block w-full px-4 py-2"
                                                                    />
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        ))}

                                        <div className="flex justify-center">
                                            <button
                                                type="button"
                                                onClick={handleBack}
                                                className="bg-orange-700 w-fit rounded-full flex rotate-180 justify-center items-center p-4"
                                            >
                                                <GrFormNextLink
                                                    className=" text-white text-xl"
                                                    width={40}
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </AuthenticatedLayout>
                );
        }
    };
    return (
        <form onSubmit={submit} className="p-6">
            {/* Render Input Berdasarkan Halaman */}
            {renderPage()}

            {/* Navigasi Antar Halaman */}
            <div className="flex justify-between mt-4">
                {formData.page > 1 && (
                    <div className="fixed bottom-12 right-12 z-20">
                        <div className="flex justify-center mb-4">
                            <Button
                                color="orange"
                                className="px-10"
                                disabled={processing}
                                type="submit"
                            >
                                SUBMIT
                            </Button>
                        </div>
                    </div>
                )}
                {formData.page < 3 ? (
                    <></>
                ) : (
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-green-500 px-4 py-2 rounded"
                    >
                        Submit
                    </button>
                )}
            </div>
        </form>
    );
}
