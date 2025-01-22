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
import axios from "axios";

export default function Index({
    kriteria_mitra,
    jenis_kegiatan,
    durasi_kerjasama,
    jenis_kerjasama,
}) {
    const { data, setData, post, processing, patch, errors, reset } = useForm({
        kriteria_mitra: "",
        jenis_kegiatan: "",
        durasi_kerjasama: "",
        jenis_kerjasama: "",
    });
    const [swalShown, setSwalShown] = useState(false);

    const parameter = [
        "kriteria_mitra",
        "jenis_kegiatan",
        "durasi_kerjasama",
        "jenis_kerjasama",
    ];

    const [showInput, setShowInput] = useState(null);

    const handleShowInput = (param) => {
        setShowInput((prev) => (prev === param ? null : param)); // Toggle input
    };

    // Kriteria Mitra
    const submit = (e) => {
        e.preventDefault();

        post(route("list-master.kriteria_mitra_store"), {
            onSuccess: () => {
                Swal.fire({
                    title: "Success!",
                    text: "Data berhasil disimpan",
                    didOpen: () => setSwalShown(true),
                    didClose: () => setSwalShown(false),
                });
            },
            onFinish: () => {
                reset("kriteria_mitra");
            },
        });
    };

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

    const [activeId, setActiveId] = useState(null); // Simpan ID aktif

    const handleToggleCheckbox = (id) => {
        setActiveId((prev) => (prev === id ? null : id)); // Toggle ID aktif
    };

    const handleCheckboxChange = async (id, isChecked) => {
        console.log(id,isChecked);
        try {
            const response = await axios.post(
                `/dashboard/list-master/kriteria_mitra/peringkat/${id}`,
                {
                    kriteria_mitra_qs: isChecked ? "ya" : "tidak",
                }
            );
            window.location.reload();
            Swal.fire({
                title: "Success!",
                text: "Berhasil diperbarui",
                didOpen: () => setSwalShown(true),
                didClose: () => setSwalShown(false),
            });
        } catch (error) {
            if (error.response) {
                console.error("Server Error:", error.response.data);
            } else if (error.request) {
                console.error("No response from server:", error.request);
            } else {
                console.error("Axios configuration error:", error.message);
            }
        }
    };

    // Jenis Kegiatan
    const submitJenisKegiatan = (e) => {
        e.preventDefault();

        post(route("list-master.jenis_kegiatan_store"), {
            onSuccess: () => {
                Swal.fire({
                    title: "Success!",
                    text: "Data berhasil disimpan",
                    didOpen: () => setSwalShown(true),
                    didClose: () => setSwalShown(false),
                });
            },
            onFinish: () => {
                reset("jenis_kegiatan");
            },
        });
    };

    const handleDeleteJenisKegiatan = (id) => {
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
                post(route("list-master.jenis_kegiatan_destroy", id), {
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

    // Durasi Kerjasama
    const submitDurasiKerjasama = (e) => {
        e.preventDefault();

        post(route("list-master.durasi_kerjasama_store"), {
            onSuccess: () => {
                Swal.fire({
                    title: "Success!",
                    text: "Data berhasil disimpan",
                    didOpen: () => setSwalShown(true),
                    didClose: () => setSwalShown(false),
                });
            },
            onFinish: () => {
                reset("durasi_kerjasama");
            },
        });
    };

    const handleDeleteDurasiKerjasama = (id) => {
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
                post(route("list-master.durasi_kerjasama_destroy", id), {
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

    // Jenis Kerjasama
    const submitJenisKerjasama = (e) => {
        e.preventDefault();

        post(route("list-master.jenis_kerjasama_store"), {
            onSuccess: () => {
                Swal.fire({
                    title: "Success!",
                    text: "Data berhasil disimpan",
                    didOpen: () => setSwalShown(true),
                    didClose: () => setSwalShown(false),
                });
            },
            onFinish: () => {
                reset("jenis_kerjasama");
            },
        });
    };

    const handleDeleteJenisKerjasama = (id) => {
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
                post(route("list-master.jenis_kerjasama_destroy", id), {
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
                                        handleShowInput("kriteria_mitra")
                                    }
                                />
                            </div>
                            {showInput === "kriteria_mitra" && (
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
                                {kriteria_mitra.map((data, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col gap-4"
                                    >
                                        <div className="flex items-center gap-4">
                                            <h1 className="border-2 w-1/2 shadow-md border-gray-400 p-2 rounded-lg">
                                                {data.kriteria_mitra}
                                            </h1>
                                            <Link
                                                href={route(
                                                    "list-master.kriteria_mitra_edit",
                                                    data.id
                                                )}
                                            >
                                                <FiEdit className="text-3xl text-blue-400 cursor-pointer" />
                                            </Link>

                                            <FaRegTrashAlt
                                                className="text-3xl text-red-500 cursor-pointer"
                                                onClick={() =>
                                                    handleDelete(data.id)
                                                }
                                            />
                                            <div className="flex items-center gap-4">
                                                <FaRegQuestionCircle
                                                    className="text-3xl text-yellow-400 cursor-pointer"
                                                    onClick={() =>
                                                        handleToggleCheckbox(
                                                            data.id
                                                        )
                                                    }
                                                />{" "}
                                                {activeId === data.id && (
                                                    <div className="bg-white border-2 rounded-lg p-3 mt-2">
                                                        <form className="flex items-center gap-3">
                                                            <input
                                                                type="checkbox"
                                                                checked={
                                                                    data.peringkat ===
                                                                    "ya"
                                                                }
                                                                id={`checkbox-${data.id}`}
                                                                onChange={(e) =>
                                                                    handleCheckboxChange(
                                                                        data.id,
                                                                        e.target
                                                                            .checked
                                                                    )
                                                                }
                                                            />
                                                            <label
                                                                htmlFor={`checkbox-${data.id}`}
                                                            >
                                                                QS/WORLDS
                                                            </label>
                                                        </form>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Jenis Kegiatan */}
                        <div className="flex items-center gap-4">
                            <h1 className="font-bold text-2xl">
                                Jenis Kegiatan
                            </h1>
                            <CiCirclePlus
                                className="text-3xl text-green-500 cursor-pointer"
                                onClick={() =>
                                    handleShowInput("jenis_kegiatan")
                                }
                            />
                        </div>
                        {showInput === "jenis_kegiatan" && (
                            <div className="shadow-lg border-2 ml-4 border-gray-400 w-1/2 px-10 py-4 h-fit rounded-lg mt-4">
                                <form
                                    onSubmit={submitJenisKegiatan}
                                    className="flex items-center gap-2 justify-center"
                                >
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="Nama">Nama</label>
                                        <input
                                            type="text"
                                            name="jenis_kegiatan"
                                            value={data.jenis_kegiatan}
                                            onChange={(e) =>
                                                setData(
                                                    "jenis_kegiatan",
                                                    e.target.value
                                                )
                                            }
                                            className="w-96 border-2 p-2 rounded-lg"
                                        />

                                        {errors.jenis_kegiatan && (
                                            <div className="text-red-500 text-sm">
                                                {errors.jenis_kegiatan}
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
                            {jenis_kegiatan.map((data, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col gap-4"
                                >
                                    <div className="flex items-center gap-4">
                                        <h1 className="border-2 w-1/2 shadow-md border-gray-400 p-2 rounded-lg">
                                            {data.jenis_kegiatan}
                                        </h1>
                                        <Link
                                            href={route(
                                                "list-master.jenis_kegiatan_edit",
                                                data.id
                                            )}
                                        >
                                            <FiEdit className="text-3xl text-blue-400 cursor-pointer" />
                                        </Link>

                                        <FaRegTrashAlt
                                            className="text-3xl text-red-500 cursor-pointer"
                                            onClick={() =>
                                                handleDeleteJenisKegiatan(
                                                    data.id
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Durasi Kerjasama */}
                        <div className="flex items-center gap-4">
                            <h1 className="font-bold text-2xl">
                                Durasi Kerjasama
                            </h1>
                            <CiCirclePlus
                                className="text-3xl text-green-500 cursor-pointer"
                                onClick={() =>
                                    handleShowInput("durasi_kerjasama")
                                }
                            />
                        </div>
                        {showInput === "durasi_kerjasama" && (
                            <div className="shadow-lg border-2 ml-4 border-gray-400 w-1/2 px-10 py-4 h-fit rounded-lg mt-4">
                                <form
                                    onSubmit={submitDurasiKerjasama}
                                    className="flex items-center gap-2 justify-center"
                                >
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="Nama">Nama</label>
                                        <input
                                            type="text"
                                            name="durasi_kerjasama"
                                            value={data.durasi_kerjasama}
                                            onChange={(e) =>
                                                setData(
                                                    "durasi_kerjasama",
                                                    e.target.value
                                                )
                                            }
                                            className="w-96 border-2 p-2 rounded-lg"
                                        />

                                        {errors.durasi_kerjasama && (
                                            <div className="text-red-500 text-sm">
                                                {errors.durasi_kerjasama}
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
                            {durasi_kerjasama.map((data, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col gap-4"
                                >
                                    <div className="flex items-center gap-4">
                                        <h1 className="border-2 w-1/2 shadow-md border-gray-400 p-2 rounded-lg">
                                            {data.durasi_kerjasama}
                                        </h1>
                                        <Link
                                            href={route(
                                                "list-master.durasi_kerjasama_edit",
                                                data.id
                                            )}
                                        >
                                            <FiEdit className="text-3xl text-blue-400 cursor-pointer" />
                                        </Link>

                                        <FaRegTrashAlt
                                            className="text-3xl text-red-500 cursor-pointer"
                                            onClick={() =>
                                                handleDeleteDurasiKerjasama(
                                                    data.id
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Jenis Kerjasama */}
                        <div className="flex items-center gap-4">
                            <h1 className="font-bold text-2xl">
                                Jenis Kerjasama
                            </h1>
                            <CiCirclePlus
                                className="text-3xl text-green-500 cursor-pointer"
                                onClick={() =>
                                    handleShowInput("jenis_kerjasama")
                                }
                            />
                        </div>
                        {showInput === "jenis_kerjasama" && (
                            <div className="shadow-lg border-2 ml-4 border-gray-400 w-1/2 px-10 py-4 h-fit rounded-lg mt-4">
                                <form
                                    onSubmit={submitJenisKerjasama}
                                    className="flex items-center gap-2 justify-center"
                                >
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="Nama">Nama</label>
                                        <input
                                            type="text"
                                            name="jenis_kerjasama"
                                            value={data.jenis_kerjasama}
                                            onChange={(e) =>
                                                setData(
                                                    "jenis_kerjasama",
                                                    e.target.value
                                                )
                                            }
                                            className="w-96 border-2 p-2 rounded-lg"
                                        />

                                        {errors.jenis_kerjasama && (
                                            <div className="text-red-500 text-sm">
                                                {errors.jenis_kerjasama}
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
                            {jenis_kerjasama.map((data, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col gap-4"
                                >
                                    <div className="flex items-center gap-4">
                                        <h1 className="border-2 w-1/2 shadow-md border-gray-400 p-2 rounded-lg">
                                            {data.jenis_kerjasama}
                                        </h1>
                                        <Link
                                            href={route(
                                                "list-master.jenis_kerjasama_edit",
                                                data.id
                                            )}
                                        >
                                            <FiEdit className="text-3xl text-blue-400 cursor-pointer" />
                                        </Link>

                                        <FaRegTrashAlt
                                            className="text-3xl text-red-500 cursor-pointer"
                                            onClick={() =>
                                                handleDeleteJenisKerjasama(
                                                    data.id
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
