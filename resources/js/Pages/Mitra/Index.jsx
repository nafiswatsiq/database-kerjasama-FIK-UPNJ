import { Chart } from "@/Components/Dashboard/Chart";
import { Gallery } from "@/Components/Dashboard/Gallery";
import { Button, Checkbox, Menu, MenuHandler, MenuItem, MenuList, Typography } from "@material-tailwind/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    ArrowLeftCircleIcon,
    ArrowRightCircleIcon,
    PlusIcon,
} from "@heroicons/react/24/solid";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { format } from "date-fns";
import { Table } from "./Utils/Table";
import { DocumentArrowDownIcon } from "@heroicons/react/24/outline";

import ActionButton from "@/Components/Mitra/ActionButton";
import BarChart from "@/Components/Dashboard/BarChart";
import LineChart from "@/Components/Dashboard/LineChart";
import { useState } from "react";
import axios from "axios";
import UploadButton from "./Utils/UploadButton";
import { IoFilter } from "react-icons/io5";

export default function Index({
    agreementArchives,
    mitra,
    totalAgreement,
    activeAgreement,
    inactiveAgreement,
    documentNull,
    seriesBidangKerjasama,
    galleries,
    seriesJenisKegiatan,
    seriesYears,
    seriesDurasiKerjasama,
    nullDocument,
    nullLaporan,
    jenisIa,
    durasi,
    tahun,
}) {
    const [filterChart, setFilterChart] = useState("jenisIA");
    const url = new URL(window.location.href);

    const [filteredAgrement, setFilteredAgrement] = useState(agreementArchives);
    const [searchAgrement, setSearchAgrement] = useState("");
    const [selectedJenisIa, setSelectedJenisIa] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState([]);
    const [selectedTahun, setSelectedTahun] = useState([]);
    const [selectedDurasi, setSelectedDurasi] = useState([]);

    // console.log(mitra);
    const user = usePage().props.auth.user;
    const date = new Date();
    // console.log(agreementArchives);
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

    const updateURL = (queryParam, values) => {
        const url = new URL(window.location.href);
        if (values.length > 0) {
            url.searchParams.set(queryParam, values.join(","));
        } else {
            url.searchParams.delete(queryParam);
        }
        window.history.pushState({}, "", url.toString());
    };

    const searchAgrementHandler = (e) => {
        const filteredData = agreementArchives.filter((agreement) => {
            return (
            agreement.nama_kegiatan.toLowerCase().includes(e.toLowerCase()) ||
            agreement.jenis_kegiatan.toLowerCase().includes(e.toLowerCase()) ||
            agreement.bentuk_kegiatan.toLowerCase().includes(e.toLowerCase())
            );
        });
        setSearchAgrement(e);
        setFilteredAgrement(filteredData);
    }

    const handleCheckboxChangeJenisIa = (value) => {
        const updatedValues = selectedJenisIa.includes(value)
            ? selectedJenisIa.filter((item) => item !== value) // Uncheck: remove value
            : [...selectedJenisIa, value]; // Check: add value

        setSelectedJenisIa(updatedValues);

        updateURL("jenis_ia", updatedValues);
        filterData();
    };

    const handleCheckboxChangeStatus = (value) => {
        const updatedValues = selectedStatus.includes(value)
            ? selectedStatus.filter((item) => item !== value) // Uncheck: remove value
            : [...selectedStatus, value]; // Check: add value

        setSelectedStatus(updatedValues);

        updateURL("status", updatedValues);
        filterData();
    };

    const handleCheckboxChangeTahun = (value) => {
        const updatedValues = selectedTahun.includes(value)
            ? selectedTahun.filter((item) => item !== value) // Uncheck: remove value
            : [...selectedTahun, value]; // Check: add value

        setSelectedTahun(updatedValues);

        updateURL("tahun", updatedValues);
        filterData();
    };

    const handleCheckboxChangeDurasi = (value) => {
        const updatedValues = selectedDurasi.includes(value)
            ? selectedDurasi.filter((item) => item !== value) // Uncheck: remove value
            : [...selectedDurasi, value]; // Check: add value

        setSelectedDurasi(updatedValues);

        updateURL("durasi", updatedValues);
        filterData();
    };

    const filterData = () => {
        const params = route().params;

        if (params.length === 0) {
            setFilteredAgrement(agreementArchives) // Show all if no filter selected
        } else {
            const filtered = agreementArchives.filter((agreement) => {
                const jenisIa = params.jenis_ia 
                    ? params.jenis_ia.split(",").includes(agreement.jenis_kegiatan)
                    : true;
                const status = params.status
                    ? params.status.split(",").includes(agreement.active)
                    : true;
                const tahun = params.tahun
                    ? params.tahun
                        .split(",")
                        .includes(agreement.waktu_kerjasama_mulai.split("-")[0])
                    : true;
                const durasi = params.durasi
                    ? params.durasi.split(",").includes(agreement.durasi_kerjasama)
                    : true;

                return (
                    jenisIa &&
                    status &&
                    tahun &&
                    durasi
                )
            })
            
            setFilteredAgrement(filtered)
        }
    }

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="py-10">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col gap-y-8">
                    <div className="overflow-hidden">
                        <div className="border-b-2 pb-4 border-gray-300 flex items-center">
                            <Link href={route("dashboard")}>
                                <ArrowLeftCircleIcon className="h-10 w-10 text-orange-700" />
                            </Link>
                            <h1 className="font-medium text-xl uppercase mx-4">
                                {mitra.nama_mitra}
                            </h1>
                            {mitra.waktu_kerjasama_mulai >
                            mitra.waktu_kerjasama_selesai ? (
                                <span className="w-8 h-8 border border-black px-3 py-1 rounded-full bg-red-50 text-red-500"></span>
                            ) : (
                                <span className="w-8 h-8 border border-black px-3 py-1 rounded-full bg-green-500 text-white">
                                    {" "}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Section Informasi Logo , nama */}
                    <div className="flex justify-start items-center gap-4">
                        <img
                            src={storageImage(mitra.logo)}
                            alt={mitra.nama_mitra}
                            className="w-28 h-auto rounded-full"
                        />
                        <div>
                            <h2 className="font-bold text-4xl">
                                {mitra.nama_mitra}
                            </h2>
                            <span className="italic text-base">
                                {formatDate(mitra.waktu_kerjasama_mulai)} s/d
                                {formatDate(mitra.waktu_kerjasama_selesai)}
                            </span>
                            <div className="flex mt-1 gap-2">
                                <Typography
                                    variant="small"
                                    className="bg-deep-purple-600 text-white border border-black rounded-full px-3 py-1 text-xs font-medium"
                                >
                                    {mitra.asal_mitra}
                                </Typography>
                                <Typography
                                    variant="small"
                                    className="bg-white text-black border border-black rounded-full px-3 py-1 text-xs font-medium"
                                >
                                    {mitra.kriteria_mitra}
                                </Typography>
                            </div>
                        </div>
                    </div>

                    {/* Section Nomor PKS , Pihak Bertanggung Jawab , Deskripsi , Jenis/Ruang Lingkup Sementara*/}
                    <div className="my-4">
                        {/* Nomor PKS */}
                        <div className="mb-5">
                            <h2 className="font-bold text-xl border-b border-black pb-2">
                                Nomor PKS
                            </h2>
                            <div className="ml-4 mt-1">
                                <p className="font-normal text-base">
                                    Pihak 1 : {mitra.no_pks_fik}
                                </p>
                                <p className="font-normal text-base">
                                    Pihak 2 : {mitra.no_pks_mitra}
                                </p>
                            </div>
                        </div>
                        {/* Penanggung Jawab */}
                        <div className="mb-5">
                            <h2 className="font-bold text-xl border-b border-black pb-2">
                                Penanggung Jawab
                            </h2>
                            <div className="ml-4 mt-1">
                                <p className="font-normal text-base">
                                    {mitra.pic_fik} | {mitra.jabatan_pic_fik}
                                </p>
                                <p className="font-normal text-base">
                                    {mitra.pic_mitra} |{" "}
                                    {mitra.jabatan_pic_mitra}
                                </p>
                            </div>
                        </div>
                        {/* Deskripsi */}
                        <div className="mb-5">
                            <h2 className="font-bold text-xl border-b border-black pb-2">
                                Deskripsi Tentang Mitra
                            </h2>
                            <div className="ml-4 mt-1">
                                <p className="font-normal text-base">
                                    {mitra.tentang_mitra}
                                </p>
                            </div>
                        </div>

                        {/* Jenis Kerjasama */}

                        <div className="mb-5">
                            <h2 className="font-bold text-xl border-b border-black pb-2">
                                Jenis / Ruang Lingkup Sementara
                            </h2>
                            <div className="ml-4 mt-1">
                                <p className="font-normal text-base">
                                    {mitra.jenis_kerjasama}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Section Button */}
                    <div className="grid grid-cols-2">
                        <a href={route("download-draft-pks", mitra.id)} className="w-full px-4">
                            <ActionButton content="Download Draft PKS"/>
                        </a>
                        <div className="w-full pl-4">
                            <UploadButton content="Upload File PKS Bertandatangan" mitraId={mitra.id} />
                        </div>
                        <a href={route("download-laporan-mitra", mitra.id)} className="w-full px-4">
                            <ActionButton content="Download Laporan Kerjasama Mitra" />
                        </a>
                        <a href={'/storage/'+mitra.dokumen_pks}>
                            <ActionButton content="Donwload File PKS Bertandatangan" />
                        </a>
                    </div>
                    <div className="flex flex-row gap-4">
                        <Link
                            href={route("agreementarchives.index", mitra.id)}
                            className="overflow-hidden bg-white sm:rounded-2xl shadow-lg w-3/12"
                        >
                            <div className="p-4 text-gray-900">
                                <div className="border p-3 rounded-xl border-gray-900">
                                    <p className="font-bold text-center text-lg">Status I.A</p>
                                    <div className="grid grid-cols-2">
                                        <div className=" text-green-600">
                                            <p className="text-center">Active</p>
                                            <p className="text-center font-semibold mt-1 text-lg">{activeAgreement}</p>
                                        </div>
                                        <div className="text-red-500">
                                            <p className="text-center">Inactive</p>
                                            <p className="text-center font-semibold mt-1 text-lg">{inactiveAgreement}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex mt-3">
                                    <div className="flex-auto flex justify-center">
                                        <p className="font-semibold text-3xl mt-3 text-center w-40 h-40 flex justify-center items-center rounded-full border-[20px] border-orange-500">
                                            {totalAgreement}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <div className="w-5/12 bg-white rounded-2xl shadow-lg p-4">
                            <Menu>
                                <MenuHandler>
                                    <Button
                                        className="w-full bg-white text-black border-2 border-black"    
                                    >Grafik Berdasarkan</Button>
                                </MenuHandler>
                                <MenuList>
                                    <MenuItem
                                        onClick={() => setFilterChart("jenisIA")}
                                    >Berdasarkan Jenis I.A</MenuItem>
                                    <MenuItem
                                        onClick={() => setFilterChart("tahun")}
                                    >Berdasarkan Tahun</MenuItem>
                                    <MenuItem
                                        onClick={() => setFilterChart("lamaKegiatan")}
                                    >Berdasarkan Lama Kegiatan</MenuItem>
                                </MenuList>
                            </Menu>
                            <div>
                                {filterChart === "jenisIA" ? (
                                    <BarChart
                                        dataSeries={seriesJenisKegiatan} 
                                        dataCategories={Object.keys(seriesJenisKegiatan)} 
                                        horizontal={false}
                                        height={250}
                                    />
                                ) : filterChart === "tahun" ? (
                                    <LineChart
                                        dataSeries={Object.values(seriesYears)} 
                                        dataCategories={Object.keys(seriesYears)} 
                                    />
                                ) : filterChart === "lamaKegiatan" ? (
                                    <Chart
                                        label={Object.keys(seriesDurasiKerjasama)}
                                        series={Object.values(seriesDurasiKerjasama)} 
                                        height={250}
                                    />
                                ) : null}
                            </div>
                        </div>
                        <div className="w-4/12 bg-white rounded-2xl shadow-lg p-4">
                            <p className="text-red-500 font-semibold text-lg text-center">I.A Perlu Tindakan</p>

                            <div>
                                <BarChart
                                    dataSeries={[nullDocument,nullLaporan]} 
                                    dataCategories={['Tanpa Dokumen','Tanpa Laporan']} 
                                    horizontal={true}
                                    height={250}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="overflow-hidden">
                        <div className="border-t-2 py-4 border-gray-500 flex justify-between items-center">
                            <Link href={route("agreementarchives.index", mitra.id)}>
                                <h1 className="font-medium text-xl uppercase">
                                    Galeri I.A
                                </h1>
                            </Link>
                            <Link
                                href={route(
                                    "agreementarchives.create",
                                    mitra.id
                                )}
                            >
                                <PlusIcon className="h-8 w-8  p-1 text-white rounded-full bg-green-700" />
                            </Link>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="grid grid-cols-4 gap-4">
                                <Menu
                                    dismiss={{
                                        itemPress: false,
                                    }}
                                    >
                                    <MenuHandler>
                                        <Button className="mt-1 flex text-wrap items-center gap-4 w-full text-left bg-gray-100 rounded-md shadow-md border border-gray-300 hover:bg-gray-200 text-black">
                                            Jenis I.A
                                            <IoFilter />
                                        </Button>
                                    </MenuHandler>
                                    <MenuList>
                                        {jenisIa.map((jenis) => (
                                            <MenuItem className="p-0">
                                            <label
                                                htmlFor={jenis}
                                                className="flex cursor-pointer items-center gap-2 p-2"
                                            >
                                                <Checkbox
                                                ripple={false}
                                                id={jenis}
                                                containerProps={{ className: "p-0" }}
                                                className="hover:before:content-none"
                                                checked={selectedJenisIa.includes(
                                                    jenis
                                                )}
                                                onChange={() =>
                                                    handleCheckboxChangeJenisIa(
                                                        jenis
                                                    )
                                                }
                                                />
                                                {jenis}
                                            </label>
                                            </MenuItem>
                                        ))}
                                    </MenuList>
                                </Menu>
                                <Menu
                                    dismiss={{
                                        itemPress: false,
                                    }}
                                    >
                                    <MenuHandler>
                                        <Button className="mt-1 flex items-center gap-4 w-full text-left bg-gray-100 rounded-md shadow-md border border-gray-300 hover:bg-gray-200 text-black">
                                            Status
                                            <IoFilter />
                                        </Button>
                                    </MenuHandler>
                                    <MenuList>
                                        <MenuItem className="p-0">
                                            <label
                                                htmlFor="item-1"
                                                className="flex cursor-pointer items-center gap-2 p-2"
                                            >
                                                <Checkbox
                                                ripple={false}
                                                id="item-1"
                                                containerProps={{ className: "p-0" }}
                                                className="hover:before:content-none"
                                                checked={selectedStatus.includes(
                                                    "true"
                                                )}
                                                onChange={() =>
                                                    handleCheckboxChangeStatus(
                                                        "true"
                                                    )
                                                }
                                                />
                                                Aktif
                                            </label>
                                        </MenuItem>
                                        <MenuItem className="p-0">
                                            <label
                                                htmlFor="item-2"
                                                className="flex cursor-pointer items-center gap-2 p-2"
                                            >
                                                <Checkbox
                                                ripple={false}
                                                id="item-2"
                                                containerProps={{ className: "p-0" }}
                                                className="hover:before:content-none"
                                                checked={selectedStatus.includes(
                                                    "false"
                                                )}
                                                onChange={() =>
                                                    handleCheckboxChangeStatus(
                                                        "false"
                                                    )
                                                }
                                                />
                                                Non Aktif
                                            </label>
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                                <Menu
                                    dismiss={{
                                        itemPress: false,
                                    }}
                                    >
                                    <MenuHandler>
                                        <Button className="mt-1 flex items-center gap-4 w-full text-left bg-gray-100 rounded-md shadow-md border border-gray-300 hover:bg-gray-200 text-black">
                                            Tahun
                                            <IoFilter />
                                        </Button>
                                    </MenuHandler>
                                    <MenuList>
                                        {tahun.map((tahunData) => (
                                            <MenuItem className="p-0">
                                            <label
                                                htmlFor={tahunData}
                                                className="flex cursor-pointer items-center gap-2 p-2"
                                            >
                                                <Checkbox
                                                ripple={false}
                                                id={tahunData}
                                                containerProps={{ className: "p-0" }}
                                                className="hover:before:content-none"
                                                checked={selectedTahun.includes(
                                                    tahunData
                                                )}
                                                onChange={() =>
                                                    handleCheckboxChangeTahun(
                                                        tahunData
                                                    )
                                                }
                                                />
                                                {tahunData}
                                            </label>
                                            </MenuItem>
                                        ))}
                                    </MenuList>
                                </Menu>
                                <Menu
                                    dismiss={{
                                        itemPress: false,
                                    }}
                                    >
                                    <MenuHandler>
                                        <Button className="mt-1 flex items-center gap-4 w-full text-left bg-gray-100 rounded-md shadow-md border border-gray-300 hover:bg-gray-200 text-black">
                                            Durasi
                                            <IoFilter />
                                        </Button>
                                    </MenuHandler>
                                    <MenuList>
                                        {durasi.map((durasiData) => (
                                            <MenuItem className="p-0">
                                            <label
                                                htmlFor={durasiData}
                                                className="flex cursor-pointer items-center gap-2 p-2"
                                            >
                                                <Checkbox
                                                ripple={false}
                                                id={durasiData}
                                                containerProps={{ className: "p-0" }}
                                                className="hover:before:content-none"
                                                checked={selectedDurasi.includes(
                                                    durasiData
                                                )}
                                                onChange={() =>
                                                    handleCheckboxChangeDurasi(
                                                        durasiData
                                                    )
                                                }
                                                />
                                                {durasiData}
                                            </label>
                                            </MenuItem>
                                        ))}
                                    </MenuList>
                                </Menu>
                            </div>
                            <div className="max-w-md w-full">
                                <input
                                    type="text"
                                    placeholder="Cari"
                                    className="w-full border-2 border-gray-500 rounded-md p-2"
                                    value={searchAgrement}
                                    onChange={(e) =>
                                        searchAgrementHandler(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex w-full">
                        <Table
                            mitraId={mitra.id}
                            agreementArchives={filteredAgrement}
                        />
                    </div>

                    <div className="overflow-hidden">
                        <div className="border-t-2 py-4 border-gray-500">
                            <h1 className="font-medium text-xl uppercase">
                                Gallery
                            </h1>
                        </div>
                    </div>
                    <div>
                        <Gallery data={galleries} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
