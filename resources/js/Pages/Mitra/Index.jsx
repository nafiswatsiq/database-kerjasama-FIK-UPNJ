import { Chart } from "@/Components/Dashboard/Chart";
import { Gallery } from "@/Components/Dashboard/Gallery";
import { Button, Menu, MenuHandler, MenuItem, MenuList, Typography } from "@material-tailwind/react";
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
    seriesDurasiKerjasama
}) {
    const [filterChart, setFilterChart] = useState("jenisIA");
    const url = new URL(window.location.href);

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
                        <ActionButton content="Upload File PKS Bertandatangan " />
                        <a href={route("download-laporan-mitra", mitra.id)} className="w-full px-4">
                            <ActionButton content="Download Laporan Kerjasama Mitra" />
                        </a>
                        <ActionButton content="Donwload File PKS Bertandatangan" />
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
                                    dataSeries={[1,2]} 
                                    dataCategories={['Active','Inactive']} 
                                    horizontal={true}
                                    height={250}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="overflow-hidden">
                        <div className="border-t-2 py-4 border-gray-500 flex justify-between items-center">
                            <h1 className="font-medium text-xl uppercase">
                                Galeri I.A
                            </h1>
                            <Link
                                href={route(
                                    "agreementarchives.create",
                                    mitra.id
                                )}
                            >
                                <PlusIcon className="h-8 w-8  p-1 text-white rounded-full bg-green-700" />
                            </Link>
                        </div>
                    </div>
                    <div className="">
                        <Table
                            mitraId={mitra.id}
                            agreementArchives={agreementArchives}
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
