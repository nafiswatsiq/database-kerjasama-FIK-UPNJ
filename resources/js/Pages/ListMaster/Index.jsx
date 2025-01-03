import { TableUsers } from "@/Components/Users/TableUsers";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Button, Select, Option, Alert } from "@material-tailwind/react";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import { CiCirclePlus } from "react-icons/ci";
import { FaRegQuestionCircle } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Index({ datas }) {
    const { data, setData, post, processing, patch, errors, reset } = useForm({
        kriteria_mitra: "",
    });
    const [showInput, setShowInput] = useState(false);
    const [swalShown, setSwalShown] = useState(false);
    const [editData, setEditData] = useState(null);

    const submit = (e) => {
        e.preventDefault();

        post(route("list-master.kriteria_mitra_store"), {
            onFinish: () => {
                reset("kriteria_mitra");
            },
        });

        Swal.fire({
            title: "Success!",
            text: "Data berhasil disimpan",
            didOpen: () => setSwalShown(true),
            didClose: () => setSwalShown(false),
        });
    };

    // Fungsi untuk menghapus data
    const handleDelete = (id) => {
        Swal.fire({
            title: "Apakah Anda yakin?",
            text: "Data yang dihapus tidak dapat dikembalikan!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Ya, hapus!",
        }).then((result) => {
            if (result.isConfirmed) {
                post(route("list-master.kriteria_mitra_destroy", id), {
                    onSuccess: () => {
                        Swal.fire(
                            "Dihapus!",
                            "Data berhasil dihapus.",
                            "success"
                        );
                    },
                });
            }
        });
    };

    const handleEdit = (data) => {
        setEditData({
            id: data.id,
            kriteria_mitra: data.kriteria_mitra,
        });
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        patch(
            route("list-master.kriteria_mitra_update", editData.id),
            {
                kriteria_mitra: editData.kriteria_mitra,
            },
            {
                onSuccess: () => {
                    Swal.fire({
                        title: "Success!",
                        text: "Data berhasil diperbarui",
                        icon: "success",
                    });
                    setEditData(null);
                    window.location.reload();
                },
                onError: (errors) => {
                    Swal.fire({
                        title: "Error!",
                        text:
                            errors.kriteria_mitra ||
                            "Terjadi kesalahan saat memperbarui data",
                        icon: "error",
                    });
                },
            }
        );
    };
    return (
        <AuthenticatedLayout>
            <Head title="List Master" />

            <div className="py-10">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col gap-y-8">
                    <div className="overflow-hidden">
                        <div className="border-b-2 pb-4 border-gray-500">
                            <h1 className="font-medium text-xl">List Master</h1>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div>
                            <div className="flex items-center gap-4">
                                <h1 className="font-bold text-2xl">
                                    Kriteria Mitra
                                </h1>
                                <CiCirclePlus
                                    className="text-3xl text-green-500 cursor-pointer"
                                    onClick={() =>
                                        setShowInput((prev) => !prev)
                                    }
                                />
                            </div>
                            {showInput && (
                                <div className="shadow-lg border-2 ml-4 border-gray-400 w-1/2 px-10 py-4 h-fit rounded-lg mt-4">
                                    <form
                                        onSubmit={submit}
                                        className="flex items-center gap-2 justify-center"
                                    >
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="Nama">Nama</label>
                                            <input
                                                type="text"
                                                name="kriteria_mitra"
                                                value={data.kriteria_mitra}
                                                onChange={(e) =>
                                                    setData(
                                                        "kriteria_mitra",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-96 border-2 p-2 rounded-lg"
                                            />

                                            {errors.kriteria_mitra && (
                                                <div className="text-red-500 text-sm">
                                                    {errors.kriteria_mitra}
                                                </div>
                                            )}
                                        </div>
                                        <button
                                            type="submit"
                                            className="bg-green-500 h-fit mt-[1.7rem] text-white px-4 py-2 rounded-lg"
                                            disabled={processing}
                                        >
                                            Konfirmasi
                                        </button>
                                    </form>
                                </div>
                            )}
                            <div className="flex ml-4 mt-2 flex-col gap-4 w-full">
                                {datas.map((data, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col gap-4"
                                    >
                                        <div className="flex items-center gap-4">
                                            <h1 className="border-2 w-1/2 shadow-md border-gray-400 p-2 rounded-lg">
                                                {data.kriteria_mitra}
                                            </h1>
                                            <FiEdit
                                                className="text-3xl text-blue-400 cursor-pointer"
                                                onClick={() => handleEdit(data)}
                                            />
                                            <FaRegTrashAlt
                                                className="text-3xl text-red-500 cursor-pointer"
                                                onClick={() =>
                                                    handleDelete(data.id)
                                                }
                                            />
                                            <FaRegQuestionCircle className="text-3xl text-yellow-400" />
                                        </div>
                                        {editData &&
                                            editData.id === data.id && (
                                                <form
                                                    onSubmit={handleEditSubmit}
                                                    className="shadow-lg border-2 border-gray-400 w-1/2 px-10 py-4 rounded-lg mt-4"
                                                >
                                                    <div className="flex flex-col gap-2">
                                                        <label>Nama</label>
                                                        <input
                                                            type="text"
                                                            name="kriteria_mitra"
                                                            value={
                                                                editData.kriteria_mitra
                                                            }
                                                            onChange={(e) =>
                                                                setEditData({
                                                                    ...editData,
                                                                    kriteria_mitra:
                                                                        e.target
                                                                            .value,
                                                                })
                                                            }
                                                            className="w-96 border-2 p-2 rounded-lg"
                                                        />
                                                    </div>
                                                    <div className="mt-4">
                                                        <button
                                                            type="submit"
                                                            className="bg-green-500 text-white px-4 py-2 rounded-lg"
                                                        >
                                                            Simpan
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="bg-gray-500 text-white px-4 py-2 rounded-lg ml-4"
                                                            onClick={() =>
                                                                setEditData(
                                                                    null
                                                                )
                                                            }
                                                        >
                                                            Batal
                                                        </button>
                                                    </div>
                                                </form>
                                            )}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h1 className="font-bold text-2xl">
                                Jenis Kegiatan
                            </h1>
                            <div className="flex ml-4 mt-2 flex-col gap-4 w-full">
                                <div className="flex items-center gap-4">
                                    <h1 className="border-2 w-1/2 shadow-md border-gray-400 p-2 rounded-lg">
                                        Perguruan Tinggi Negeri
                                    </h1>
                                    <CiCirclePlus className="text-3xl text-green-500" />
                                    <FiEdit className="text-3xl text-blue-400" />
                                    <FaRegTrashAlt className="text-3xl text-red-500" />
                                    <FaRegQuestionCircle className="text-3xl text-yellow-400" />
                                </div>
                                <div className="flex items-center gap-4">
                                    <h1 className="border-2 w-1/2 shadow-md border-gray-400 p-2 rounded-lg">
                                        Perguruan Tinggi Negeri
                                    </h1>
                                    <CiCirclePlus className="text-3xl text-green-500" />
                                    <FiEdit className="text-3xl text-blue-400" />
                                    <FaRegTrashAlt className="text-3xl text-red-500" />
                                    <FaRegQuestionCircle className="text-3xl text-yellow-400" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <h1 className="font-bold text-2xl">
                                Durasi Kerjasama
                            </h1>
                            <div className="flex ml-4 mt-2 flex-col gap-4 w-full">
                                <div className="flex items-center gap-4">
                                    <h1 className="border-2 w-1/2 shadow-md border-gray-400 p-2 rounded-lg">
                                        Perguruan Tinggi Negeri
                                    </h1>
                                    <CiCirclePlus className="text-3xl text-green-500" />
                                    <FiEdit className="text-3xl text-blue-400" />
                                    <FaRegTrashAlt className="text-3xl text-red-500" />
                                    <FaRegQuestionCircle className="text-3xl text-yellow-400" />
                                </div>
                                <div className="flex items-center gap-4">
                                    <h1 className="border-2 w-1/2 shadow-md border-gray-400 p-2 rounded-lg">
                                        Perguruan Tinggi Negeri
                                    </h1>
                                    <CiCirclePlus className="text-3xl text-green-500" />
                                    <FiEdit className="text-3xl text-blue-400" />
                                    <FaRegTrashAlt className="text-3xl text-red-500" />
                                    <FaRegQuestionCircle className="text-3xl text-yellow-400" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <h1 className="font-bold text-2xl">
                                Jenis Kerjasama
                            </h1>
                            <div className="flex ml-4 mt-2 flex-col gap-4 w-full">
                                <div className="flex items-center gap-4">
                                    <h1 className="border-2 w-1/2 shadow-md border-gray-400 p-2 rounded-lg">
                                        Perguruan Tinggi Negeri
                                    </h1>
                                    <CiCirclePlus className="text-3xl text-green-500" />
                                    <FiEdit className="text-3xl text-blue-400" />
                                    <FaRegTrashAlt className="text-3xl text-red-500" />
                                    <FaRegQuestionCircle className="text-3xl text-yellow-400" />
                                </div>
                                <div className="flex items-center gap-4">
                                    <h1 className="border-2 w-1/2 shadow-md border-gray-400 p-2 rounded-lg">
                                        Perguruan Tinggi Negeri
                                    </h1>
                                    <CiCirclePlus className="text-3xl text-green-500" />
                                    <FiEdit className="text-3xl text-blue-400" />
                                    <FaRegTrashAlt className="text-3xl text-red-500" />
                                    <FaRegQuestionCircle className="text-3xl text-yellow-400" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
