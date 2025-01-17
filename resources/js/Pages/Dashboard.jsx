import BarChart from "@/Components/Dashboard/BarChart";
import CardAgreement from "@/Components/Dashboard/CardAgreement";
import { Chart } from "@/Components/Dashboard/Chart";
import { Gallery } from "@/Components/Dashboard/Gallery";
import LineChart from "@/Components/Dashboard/LineChart";
import SelectInput from "@/Components/SelectInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    DocumentPlusIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { Head, Link, router, usePage } from "@inertiajs/react";
import {
    Button,
    Checkbox,
    Input,
    Menu,
    MenuHandler,
    MenuItem,
    MenuList,
    Option,
    Select,
    Typography,
} from "@material-tailwind/react";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import { IoFilter } from "react-icons/io5";

export default function Dashboard({
    mitra,
    totalMitra,
    activeMitra,
    inactiveMitra,
    totalAgreement,
    activeAgreement,
    inactiveAgreement,
    documentNull,
    userRegistered,
    seriesKriteriaMitra,
    seriesBidangKerjasama,
    seriesAsalMitra,
    galleries,
    kriteriaMitra,
    jenisKerjasama,
    years,
    seriesYears,
}) {
    const user = usePage().props.auth.user;
    const date = new Date();
    const [filterAsalMitra, setFilterAsalMitra] = useState("");
    const [filterKriteriaMitra, setFilterKriteriaMitra] = useState("");
    const [filterStatus, setFilterStatus] = useState("");

    // BARU
    const [showAsalMitraFilter, setShowAsalMitraFilter] = useState(false);
    const [selectedAsalMitra, setSelectedAsalMitra] = useState([]);
    const [selectedKriteriaMitra, setSelectedKriteriaMitra] = useState([]);
    const [selectedJenisKS, setSelectedJenisKS] = useState([]);
    const [selectedActive, setSelectedActive] = useState([]);
    const [selectedTahun, setSelectedTahun] = useState([]);
    const [filteredMitra, setFilteredMitra] = useState(mitra);
    const [filterChart, setFilterChart] = useState("kriteriaMitra");

    // Update URL with query parameters
    const updateURL = (queryParam, values) => {
        const url = new URL(window.location.href);
        if (values.length > 0) {
            url.searchParams.set(queryParam, values.join(","));
        } else {
            url.searchParams.delete(queryParam);
        }
        window.history.pushState({}, "", url.toString());
    };

    // Handle checkbox change
    const handleCheckboxChangeAsalMitra = (value) => {
        const updatedValues = selectedAsalMitra.includes(value)
            ? selectedAsalMitra.filter((item) => item !== value) // Uncheck: remove value
            : [...selectedAsalMitra, value]; // Check: add value

        setSelectedAsalMitra(updatedValues);

        // Update URL and filter data
        updateURL("asal_mitra", updatedValues);
        filterData(updatedValues);
    };

    // Handle checkbox change
    const handleCheckboxChangeKriteriaMitra = (value) => {
        const updatedValues = selectedKriteriaMitra.includes(value)
            ? selectedKriteriaMitra.filter((item) => item !== value) // Uncheck: remove value
            : [...selectedKriteriaMitra, value]; // Check: add value

        setSelectedKriteriaMitra(updatedValues);

        // Update URL and filter data
        updateURL("kriteria_mitra", updatedValues);
        filterData(updatedValues);
    };

    const handleCheckboxChangeJenisKS = (value) => {
        const updatedValues = selectedJenisKS.includes(value)
            ? selectedJenisKS.filter((item) => item !== value) // Uncheck: remove value
            : [...selectedJenisKS, value]; // Check: add value

        setSelectedJenisKS(updatedValues);

        // Update URL and filter data
        updateURL("jenis_ks", updatedValues);
        filterData(updatedValues);
    };

    const handleCheckboxChangeActive = (value) => {
        const updatedValues = selectedActive.includes(value)
            ? selectedActive.filter((item) => item !== value) // Uncheck: remove value
            : [...selectedActive, value]; // Check: add value

        setSelectedActive(updatedValues);

        // Update URL and filter data
        updateURL("active", updatedValues);
        filterData(updatedValues);
    };

    const handleCheckboxChangeTahun = (value) => {
        const updatedValues = selectedTahun.includes(value)
            ? selectedTahun.filter((item) => item !== value) // Uncheck: remove value
            : [...selectedTahun, value]; // Check: add value

        setSelectedTahun(updatedValues);

        // Update URL and filter data
        updateURL("tahun", updatedValues);
        filterData(updatedValues);
    };

    // Filter data based on selected filters
    const filterData = (filters) => {
        const params = route().params;
        
        if (params.length === 0) {
            setFilteredMitra(mitra); // Show all if no filter selected
        } else {
            // const filtered = mitra.filter((item) =>
            //     params.asal_mitra.includes(item.asal_mitra)
            // );

            // setFilteredMitra(filtered);
            const filtered = mitra.filter((item) => {
                const asalMitraMatch = params.asal_mitra
                    ? params.asal_mitra.split(",").includes(item.asal_mitra)
                    : true;
                const kriteriaMitraMatch = params.kriteria_mitra
                    ? params.kriteria_mitra.split(",").includes(item.kriteria_mitra)
                    : true;
                const jenisKSMatch = params.jenis_ks
                    ? params.jenis_ks.split(",").includes(item.jenis_kerjasama)
                    : true;
                const activeMatch = params.active
                    ? params.active.split(",").includes(item.active)
                    : true;
                const tahunMatch = params.tahun
                    ? params.tahun.split(",").includes(item.hari_tanggal.split("-")[0])
                    : true;
                return asalMitraMatch && kriteriaMitraMatch && jenisKSMatch && tahunMatch && activeMatch;
            });
            setFilteredMitra(filtered);
        }
    };

    useEffect(() => {
        // Initialize filter from URL
        const url = new URL(window.location.href);
        const urlAsalMitra = url.searchParams.get("asal_mitra");
        if (urlAsalMitra) {
            const filterValues = urlAsalMitra.split(",");
            setSelectedAsalMitra(filterValues);
            filterData(filterValues);
        }
    }, [mitra]);

    // BARU

    const handleFilterAsalMitra = (e) => {
        setFilterAsalMitra(e);

        router.get(
            route(route().current()),
            {
                asal_mitra: e,
                kriteria_mitra: filterKriteriaMitra,
                status: filterStatus,
            },
            {
                preserveState: true,
                replace: true,
                preserveScroll: true,
            }
        );
    };

    const handleFilterKriteriaMitra = (e) => {
        setFilterKriteriaMitra(e);
        
        router.get(
            route(route().current()),
            {
                asal_mitra: filterAsalMitra,
                kriteria_mitra: e,
                status: filterStatus,
            },
            {
                preserveState: true,
                replace: true,
                preserveScroll: true,
            }
        );
    };

    const handleFilterStatus = (e) => {
        setFilterStatus(e);

        router.get(
            route(route().current()),
            {
                asal_mitra: filterAsalMitra,
                kriteria_mitra: filterKriteriaMitra,
                status: e,
            },
            {
                preserveState: true,
                replace: true,
                preserveScroll: true,
            }
        );
    };

    const [query, setQuery] = useState("");
    const handleSearch = (e) => {
        setQuery(e);

        router.get(
            route(route().current()),
            {
                search: e,
            },
            {
                preserveState: true,
                replace: true,
                preserveScroll: true,
            }
        );
    };

    const [visible, setVisible] = useState(false);

    const toggleVisible = () => {
        setVisible(!visible);
    };

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="py-10">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col gap-y-8">
                    <div className="overflow-hidden">
                        <div className="border-b-2 pb-4 border-gray-500">
                            <h1 className="font-medium text-xl uppercase">
                                Dashboard
                            </h1>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 items-center">
                        <div className="flex gap-4">
                            <div className="col-span-4 w-[45%] bg-white sm:rounded-2xl shadow-lg">
                                <div className="px-5 pt-5">
                                    <Menu>
                                        <MenuHandler>
                                            <Button 
                                                className="bg-orange-500 w-80"
                                            >Filter</Button>
                                        </MenuHandler>
                                        <MenuList>
                                            <MenuItem
                                                onClick={() => setFilterChart("kriteriaMitra")}
                                            >
                                                Berdasarkan kriteria mitra
                                            </MenuItem>
                                            <MenuItem
                                                onClick={() => setFilterChart("activeMitra")}
                                            >
                                                Berdasarkan Aktif Inaktif
                                            </MenuItem>
                                            <MenuItem
                                                onClick={() => setFilterChart("asalMitra")}
                                            >
                                                Berdasarkan Asal
                                            </MenuItem>
                                            <MenuItem
                                                onClick={() => setFilterChart("yearMitra")}
                                            >
                                                Berdasarkan Tahun
                                            </MenuItem>
                                        </MenuList>
                                    </Menu>
                                </div>
                                {/* <div
                                    className="bg-orange-500 cursor-pointer w-80 h-10 m-4 rounded-lg flex justify-center items-center"
                                    onClick={toggleVisible}
                                >
                                    <h1 className="font-bold">Filter</h1>
                                </div>
                                {visible && (
                                    <div
                                        className="bg-white -mt-14 relative z-10 font-bold gap-2 text-sm shadow-lg w-80 h-fit py-4 m-4 rounded-lg flex flex-col justify-center "
                                        onClick={toggleVisible}
                                    >
                                        <p>Berdasarkan kriteria mitra</p>
                                        <p>Berdasarkan Aktif Inaktif</p>
                                        <p>Berdasarkan Asal</p>
                                        <p>Berdasarkan Tahun</p>
                                    </div>
                                )} */}
                                {filterChart === "kriteriaMitra" ? (
                                    <BarChart dataSeries={seriesKriteriaMitra} dataCategories={kriteriaMitra} horizontal={false}/>
                                ):filterChart === 'activeMitra' ? (
                                    <BarChart dataSeries={[activeMitra, inactiveMitra]} dataCategories={['Active', 'Inactive']} horizontal={true}/>
                                ):filterChart === 'asalMitra' ? (
                                    <BarChart dataSeries={seriesAsalMitra} dataCategories={['Domestik', 'Internasional']} horizontal={true}/>
                                ):filterChart === 'yearMitra' ? (
                                    <LineChart dataSeries={seriesYears} dataCategories={years}/>
                                ):null}
                            </div>
                            <div className="flex flex-col gap-2 ">
                                <div className="flex gap-2">
                                    {/* <div className="overflow-hidden bg-white sm:rounded-2xl h-fit shadow-lg border-2 border-gray-500 rounded-2xl">
                                <div className="grid grid-cols-2">
                                    <div className="p-5 text-center relative border-2 rounded-tl-2xl border-gray-700">
                                    <p className="text-green-400 absolute left-4 top-2">Aktif</p>
                                        <p className="font-bold text-green-400 text-4xl">
                                            {totalMitra}
                                        </p>
                                    </div>
                                    <div className=" p-5 text-center ">
                                        <p className="font-bold text-2xl">
                                            Total Mitra
                                        </p>
                                    </div>
                                    <div className="p-5 text-center border-2 border-gray-700 text-green-500">
                                        <p className="font-bold text-2xl">
                                            {activeMitra}
                                        </p>
                                        <p className="font-bold text-xl">
                                            Active
                                        </p>
                                    </div>
                                    <div className="p-5 text-center border-2 border-gray-700 text-red-500">
                                        <p className="font-bold text-2xl">
                                            {inactiveMitra}
                                        </p>
                                        <p className="font-bold text-xl">
                                            Inactive
                                        </p>
                                    </div>
                                </div>
                            </div> */}
                                    <div class="w-[50%] h-fit relative max-w-sm mx-auto bg-white rounded-lg shadow-lg p-4 grid grid-cols-2 gap-2">
                                        <div class="flex flex-col items-center justify-center border-r border-b border-gray-300 p-4">
                                            <p class="text-green-500 font-bold text-4xl">
                                                {activeMitra}
                                            </p>
                                            <p class="text-gray-700 font-medium text-sm mt-1">
                                                Aktif
                                            </p>
                                        </div>
                                        <div class="flex flex-col items-center justify-center border-b border-gray-300 p-4">
                                            <p class="text-red-500 font-bold text-4xl">
                                                {inactiveMitra}
                                            </p>
                                            <p class="text-gray-700 font-medium text-sm mt-1">
                                                Nonaktif
                                            </p>
                                        </div>
                                        <div class="flex flex-col items-center justify-center border-r border-gray-300 p-4">
                                            <p class="text-cyan-500 font-bold text-4xl">
                                                15
                                            </p>
                                            <p class="text-gray-700 font-medium text-sm mt-1 text-center">
                                                Berakhir 6 Bulan lagi
                                            </p>
                                        </div>
                                        <div class="flex flex-col items-center justify-center p-4">
                                            <p class="text-yellow-500 font-bold text-4xl">
                                                06
                                            </p>
                                            <p class="text-gray-700 font-medium text-sm mt-1 text-center">
                                                Berakhir 1 Tahun lagi
                                            </p>
                                        </div>
                                        <div class="absolute inset-0 flex items-center justify-center">
                                            <div class="w-24 h-24 bg-white rounded-full shadow-md flex flex-col items-center justify-center border border-gray-300">
                                                <p class="text-gray-700 font-medium text-sm">
                                                    Total
                                                </p>
                                                <p class="text-orange-500 font-bold text-4xl">
                                                    80
                                                </p>
                                                <p class="text-gray-700 font-medium text-sm">
                                                    PKS
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4 overflow-hidden h-fit p-4 bg-white sm:rounded-2xl shadow-lg">
                                        <div className="border-2 border-gray-700 text-nowrap text-sm w-full p-2 rounded-full">
                                            <p>Berdasarkan kriteria mitra</p>
                                        </div>
                                        <div className="p-4 text-gray-900">
                                            <Chart
                                                label={[
                                                    "Domestik",
                                                    "Internasional",
                                                ]}
                                                series={Object.values(
                                                    seriesAsalMitra
                                                )}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <button className="bg-green-400 border-2 border-gray-400 w-full h-fit py-2 text-white P-3 rounded-lg">
                                    DOWNLOAD REPORT DASHBOARD & KERJA SAMA
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className="border-b-2 pb-4 border-gray-500">
                            <h1 className="font-medium text-xl uppercase">
                                Galeri Kerjasama
                            </h1>
                        </div>
                                <Typography
                                    color="gray"
                                    className="font-medium mt-4"
                                >
                                    Urutkan Berdasarkan
                                </Typography>
                        <div className="flex justify-between mt-4">
                            <div className="flex gap-4 items-center">
                                <div className="w-auto">
                                    <Menu
                                        dismiss={{
                                            itemPress: false,
                                        }}
                                        >
                                        <MenuHandler>
                                            <Button
                                                className="mt-1 flex items-center gap-4 w-full text-left bg-gray-100 rounded-md shadow-md border border-gray-300 hover:bg-gray-200 text-black"
                                            >
                                            Asal Mitra
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
                                                    value="Domestik"
                                                    checked={selectedAsalMitra.includes(
                                                        "Domestik"
                                                    )}
                                                    onChange={() =>
                                                        handleCheckboxChangeAsalMitra(
                                                            "Domestik"
                                                        )
                                                    }
                                                    />
                                                    Domestik
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
                                                    value="Internasional"
                                                    checked={selectedAsalMitra.includes(
                                                        "Internasional"
                                                    )}
                                                    onChange={() =>
                                                        handleCheckboxChangeAsalMitra(
                                                            "Internasional"
                                                        )
                                                    }
                                                    />
                                                    Internasional
                                                </label>
                                            </MenuItem>
                                        </MenuList>
                                    </Menu>
                                </div>
                                <div className="w-auto">
                                    <Menu
                                        dismiss={{
                                            itemPress: false,
                                        }}
                                        >
                                        <MenuHandler>
                                            <Button
                                                className="mt-1 flex items-center gap-4 w-full text-left bg-gray-100 rounded-md shadow-md border border-gray-300 hover:bg-gray-200 text-black"
                                            >
                                            Kriteria Mitra
                                            <IoFilter />
                                            </Button>
                                        </MenuHandler>
                                        <MenuList>
                                            {kriteriaMitra.map((item) => (
                                                <MenuItem className="p-0">
                                                    <label
                                                        htmlFor={`item-${item}`}
                                                        className="flex cursor-pointer items-center gap-2 p-2"
                                                    >
                                                        <Checkbox
                                                        ripple={false}
                                                        id={`item-${item}`}
                                                        containerProps={{ className: "p-0" }}
                                                        className="hover:before:content-none"
                                                        value={item}
                                                        checked={selectedKriteriaMitra.includes(
                                                            item
                                                        )}
                                                        onChange={() =>
                                                            handleCheckboxChangeKriteriaMitra(
                                                                item
                                                            )
                                                        }
                                                        />
                                                        {item}
                                                    </label>
                                                </MenuItem>
                                            ))}
                                        </MenuList>
                                    </Menu>
                                </div>
                                <div className="w-auto">
                                    <Menu
                                        dismiss={{
                                            itemPress: false,
                                        }}
                                        >
                                        <MenuHandler>
                                            <Button
                                                className="mt-1 flex items-center gap-4 w-full text-left bg-gray-100 rounded-md shadow-md border border-gray-300 hover:bg-gray-200 text-black"
                                            >
                                            Jenis KS
                                            <IoFilter />
                                            </Button>
                                        </MenuHandler>
                                        <MenuList>
                                            {jenisKerjasama.map((item) => (
                                                <MenuItem className="p-0">
                                                    <label
                                                        htmlFor={`item-${item}`}
                                                        className="flex cursor-pointer items-center gap-2 p-2"
                                                    >
                                                        <Checkbox
                                                        ripple={false}
                                                        id={`item-${item}`}
                                                        containerProps={{ className: "p-0" }}
                                                        className="hover:before:content-none"
                                                        value={item}
                                                        checked={selectedJenisKS.includes(
                                                            item
                                                        )}
                                                        onChange={() =>
                                                            handleCheckboxChangeJenisKS(
                                                                item
                                                            )
                                                        }
                                                        />
                                                        {item}
                                                    </label>
                                                </MenuItem>
                                            ))}
                                        </MenuList>
                                    </Menu>
                                </div>
                                <div className="w-auto">
                                    <Menu
                                        dismiss={{
                                            itemPress: false,
                                        }}
                                        >
                                        <MenuHandler>
                                            <Button
                                                className="mt-1 flex items-center gap-4 w-full text-left bg-gray-100 rounded-md shadow-md border border-gray-300 hover:bg-gray-200 text-black"
                                            >
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
                                                    value="true"
                                                    checked={selectedActive.includes(
                                                        'true'
                                                    )}
                                                    onChange={() =>
                                                        handleCheckboxChangeActive(
                                                            'true'
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
                                                    value="false"
                                                    checked={selectedActive.includes(
                                                        'false'
                                                    )}
                                                    onChange={() =>
                                                        handleCheckboxChangeActive(
                                                            'false'
                                                        )
                                                    }
                                                    />
                                                    Inaktif
                                                </label>
                                            </MenuItem>
                                        </MenuList>
                                    </Menu>
                                </div>
                                <div className="w-auto">
                                    <Menu
                                        dismiss={{
                                            itemPress: false,
                                        }}
                                        >
                                        <MenuHandler>
                                            <Button
                                                className="mt-1 flex items-center gap-4 w-full text-left bg-gray-100 rounded-md shadow-md border border-gray-300 hover:bg-gray-200 text-black"
                                            >
                                            Tahun
                                            <IoFilter />
                                            </Button>
                                        </MenuHandler>
                                        <MenuList>
                                        {years.map((year) => (
                                            <MenuItem className="p-0" key={year}>
                                                <label
                                                    htmlFor={`item-${year}`}
                                                    className="flex cursor-pointer items-center gap-2 p-2"
                                                >
                                                    <Checkbox
                                                        ripple={false}
                                                        id={`item-${year}`}
                                                        containerProps={{ className: "p-0" }}
                                                        className="hover:before:content-none"
                                                        value={year.toString()}
                                                        checked={selectedTahun.includes(year.toString())}
                                                        onChange={() =>
                                                            handleCheckboxChangeTahun(year.toString())
                                                        }
                                                    />
                                                    {year}
                                                </label>
                                            </MenuItem>
                                        ))}
                                        </MenuList>
                                    </Menu>
                                </div>
                                {/* <div className="w-auto">
                                    <SelectInput
                                        label="Kriteria Mitra"
                                        value={filterKriteriaMitra}
                                        className="mt-1 block w-full"
                                        autoComplete="off"
                                        onChange={(e) =>
                                            handleFilterKriteriaMitra(
                                                e.target.value
                                            )
                                        }
                                        options={[
                                            { value: "", label: "Semua" },
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
                                </div>
                                <div className="w-auto">
                                    <SelectInput
                                        label="Status"
                                        value={filterStatus}
                                        className="mt-1 block w-full"
                                        autoComplete="off"
                                        onChange={(e) =>
                                            handleFilterStatus(e.target.value)
                                        }
                                        options={[
                                            { value: "", label: "Semua" },
                                            { value: "active", label: "Aktif" },
                                            {
                                                value: "inactive",
                                                label: "Inaktif",
                                            },
                                        ]}
                                    />
                                </div> */}
                                <div>
                                    <div className="w-full">
                                        <Input
                                            label="Search"
                                            name="search"
                                            value={query}
                                            onChange={(e) =>
                                                handleSearch(e.target.value)
                                            }
                                            icon={
                                                <MagnifyingGlassIcon className="h-6 w-6 text-gray-500" />
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                {user.is_admin ? (
                                    <Link href={route("mitra.create")}>
                                        <Button
                                            color="green"
                                            className="flex items-center gap-x-2 py-2 text-nowrap "
                                        >
                                            <DocumentPlusIcon className="h-6 w-6 text-white" />
                                            <span className="text-white">
                                                Tambah Mitra Baru
                                            </span>
                                        </Button>
                                    </Link>
                                ) : null}
                            </div>
                        </div>
                    </div>
                    {/* <div className="grid grid-cols-3 gap-6">
                        {mitra.map((item, index) => {
                            return (
                                <CardAgreement
                                    key={index}
                                    data={item}
                                    user={user}
                                />
                            );
                        })}
                    </div> */}
                    <div className="grid grid-cols-3 gap-6 mt-4">
                        {filteredMitra.map((item, index) => (
                            <CardAgreement
                                key={index}
                                data={item}
                                user={user}
                            />
                        ))}
                    </div>

                    {/* <div className="grid grid-cols-4 gap-6">
                        <Link href={route('agreementarchives.index')} className="overflow-hidden bg-white sm:rounded-2xl shadow-lg">
                            <div className="p-4 text-gray-900">
                                <div className="flex">
                                    <div className="flex-auto">
                                        <p>Total Agreement</p>
                                        <p className="font-semibold text-3xl mt-3">{totalAgreement}</p>
                                    </div>
                                    <div>
                                        <div className="bg-[#E5E4FF] p-3 rounded-3xl">
                                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path opacity="0.4" d="M34.9999 36.6667H4.99988C4.31654 36.6667 3.74988 36.1 3.74988 35.4167C3.74988 34.7333 4.31654 34.1667 4.99988 34.1667H34.9999C35.6832 34.1667 36.2499 34.7333 36.2499 35.4167C36.2499 36.1 35.6832 36.6667 34.9999 36.6667Z" fill="#8280FF"/>
                                                <path opacity="0.4" d="M31.7 5.8C28.4666 2.56667 25.3 2.48333 21.9833 5.8L19.9666 7.81667C19.8 7.98333 19.7333 8.25 19.8 8.48333C21.0666 12.9 24.6 16.4333 29.0166 17.7C29.0833 17.7167 29.15 17.7333 29.2166 17.7333C29.4 17.7333 29.5666 17.6667 29.7 17.5333L31.7 15.5167C33.35 13.8833 34.15 12.3 34.15 10.7C34.1666 9.05 33.3666 7.45 31.7 5.8Z" fill="#8280FF"/>
                                                <path d="M26.0166 19.2167C25.5333 18.9833 25.0666 18.75 24.6166 18.4833C24.25 18.2667 23.9 18.0333 23.55 17.7833C23.2666 17.6 22.9333 17.3333 22.6166 17.0667C22.5833 17.05 22.4666 16.95 22.3333 16.8167C21.7833 16.35 21.1666 15.75 20.6166 15.0833C20.5666 15.05 20.4833 14.9333 20.3666 14.7833C20.2 14.5833 19.9166 14.25 19.6666 13.8667C19.4666 13.6167 19.2333 13.25 19.0166 12.8833C18.75 12.4333 18.5166 11.9833 18.2833 11.5167C18.05 11.0167 17.8666 10.5333 17.7 10.0833L7.2333 20.55C7.01663 20.7667 6.81663 21.1833 6.76663 21.4667L5.86663 27.85C5.69996 28.9833 6.01663 30.05 6.71663 30.7667C7.31663 31.35 8.14996 31.6667 9.04996 31.6667C9.24996 31.6667 9.44996 31.65 9.64996 31.6167L16.05 30.7167C16.35 30.6667 16.7666 30.4667 16.9666 30.25L27.4333 19.7833C26.9666 19.6167 26.5166 19.4333 26.0166 19.2167Z" fill="#8280FF"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <p className="">Up from last year</p>
                                </div>
                            </div>
                        </Link>
                        <Link href={route('agreementarchives.index') + '?filter=active&page=1'} className="overflow-hidden bg-white sm:rounded-2xl shadow-lg">
                            <div className="p-4 text-gray-900">
                                <div className="flex">
                                    <div className="flex-auto">
                                        <p>Active Agreement</p>
                                        <p className="font-semibold text-3xl mt-3">{activeAgreement}</p>
                                    </div>
                                    <div>
                                        <div className="bg-[#D9F7E8] p-3 rounded-3xl">
                                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path opacity="0.4" d="M34.1666 16.9833H29.35C25.4 16.9833 22.1833 13.7667 22.1833 9.81667V5C22.1833 4.08334 21.4333 3.33334 20.5166 3.33334H13.45C8.31663 3.33334 4.16663 6.66667 4.16663 12.6167V27.3833C4.16663 33.3333 8.31663 36.6667 13.45 36.6667H26.55C31.6833 36.6667 35.8333 33.3333 35.8333 27.3833V18.65C35.8333 17.7333 35.0833 16.9833 34.1666 16.9833Z" fill="#4AD991"/>
                                                <path d="M26.3335 3.68333C25.6501 3 24.4668 3.46667 24.4668 4.41667V10.2333C24.4668 12.6667 26.5335 14.6833 29.0501 14.6833C30.6335 14.7 32.8335 14.7 34.7168 14.7C35.6668 14.7 36.1668 13.5833 35.5001 12.9167C33.1001 10.5 28.8001 6.15 26.3335 3.68333Z" fill="#4AD991"/>
                                                <path d="M22.5 22.9167H12.5C11.8167 22.9167 11.25 22.35 11.25 21.6667C11.25 20.9833 11.8167 20.4167 12.5 20.4167H22.5C23.1833 20.4167 23.75 20.9833 23.75 21.6667C23.75 22.35 23.1833 22.9167 22.5 22.9167Z" fill="#4AD991"/>
                                                <path d="M19.1667 29.5833H12.5C11.8167 29.5833 11.25 29.0167 11.25 28.3333C11.25 27.65 11.8167 27.0833 12.5 27.0833H19.1667C19.85 27.0833 20.4167 27.65 20.4167 28.3333C20.4167 29.0167 19.85 29.5833 19.1667 29.5833Z" fill="#4AD991"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <p className="">From a total of {totalAgreement}</p>
                                </div>
                            </div>
                        </Link>
                        <Link href={route('agreementarchives.index') + '?filter=inactive&page=1'} className="overflow-hidden bg-white sm:rounded-2xl shadow-lg">
                            <div className="p-4 text-gray-900">
                                <div className="flex">
                                    <div className="flex-auto">
                                    <p>Inactive Agreement</p>
                                    <p className="font-semibold text-3xl mt-3">{inactiveAgreement}</p>
                                    </div>
                                    <div>
                                        <div className="bg-[#D9F7E8] p-3 rounded-3xl">
                                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path opacity="0.4" d="M34.1666 16.9833H29.35C25.4 16.9833 22.1833 13.7667 22.1833 9.81667V5C22.1833 4.08334 21.4333 3.33334 20.5166 3.33334H13.45C8.31663 3.33334 4.16663 6.66667 4.16663 12.6167V27.3833C4.16663 33.3333 8.31663 36.6667 13.45 36.6667H26.55C31.6833 36.6667 35.8333 33.3333 35.8333 27.3833V18.65C35.8333 17.7333 35.0833 16.9833 34.1666 16.9833Z" fill="#4AD991"/>
                                                <path d="M26.3335 3.68333C25.6501 3 24.4668 3.46667 24.4668 4.41667V10.2333C24.4668 12.6667 26.5335 14.6833 29.0501 14.6833C30.6335 14.7 32.8335 14.7 34.7168 14.7C35.6668 14.7 36.1668 13.5833 35.5001 12.9167C33.1001 10.5 28.8001 6.15 26.3335 3.68333Z" fill="#4AD991"/>
                                                <path d="M22.5 22.9167H12.5C11.8167 22.9167 11.25 22.35 11.25 21.6667C11.25 20.9833 11.8167 20.4167 12.5 20.4167H22.5C23.1833 20.4167 23.75 20.9833 23.75 21.6667C23.75 22.35 23.1833 22.9167 22.5 22.9167Z" fill="#4AD991"/>
                                                <path d="M19.1667 29.5833H12.5C11.8167 29.5833 11.25 29.0167 11.25 28.3333C11.25 27.65 11.8167 27.0833 12.5 27.0833H19.1667C19.85 27.0833 20.4167 27.65 20.4167 28.3333C20.4167 29.0167 19.85 29.5833 19.1667 29.5833Z" fill="#4AD991"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <p className="">From a total of {totalAgreement}</p>
                                </div>
                            </div>
                        </Link>
                        <Link href={route('agreementarchives.index') + '?filter=no-document&page=1'} className="overflow-hidden bg-white sm:rounded-2xl shadow-lg">
                            <div className="p-4 text-gray-900">
                                <div className="flex">
                                    <div className="flex-auto">
                                    <p>No documents</p>
                                    <p className="font-semibold text-3xl mt-3">{documentNull}</p>
                                    </div>
                                    <div>
                                        <div className="bg-[#D9F7E8] p-3 rounded-3xl">
                                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path opacity="0.4" d="M34.1666 16.9833H29.35C25.4 16.9833 22.1833 13.7667 22.1833 9.81667V5C22.1833 4.08334 21.4333 3.33334 20.5166 3.33334H13.45C8.31663 3.33334 4.16663 6.66667 4.16663 12.6167V27.3833C4.16663 33.3333 8.31663 36.6667 13.45 36.6667H26.55C31.6833 36.6667 35.8333 33.3333 35.8333 27.3833V18.65C35.8333 17.7333 35.0833 16.9833 34.1666 16.9833Z" fill="#4AD991"/>
                                                <path d="M26.3335 3.68333C25.6501 3 24.4668 3.46667 24.4668 4.41667V10.2333C24.4668 12.6667 26.5335 14.6833 29.0501 14.6833C30.6335 14.7 32.8335 14.7 34.7168 14.7C35.6668 14.7 36.1668 13.5833 35.5001 12.9167C33.1001 10.5 28.8001 6.15 26.3335 3.68333Z" fill="#4AD991"/>
                                                <path d="M22.5 22.9167H12.5C11.8167 22.9167 11.25 22.35 11.25 21.6667C11.25 20.9833 11.8167 20.4167 12.5 20.4167H22.5C23.1833 20.4167 23.75 20.9833 23.75 21.6667C23.75 22.35 23.1833 22.9167 22.5 22.9167Z" fill="#4AD991"/>
                                                <path d="M19.1667 29.5833H12.5C11.8167 29.5833 11.25 29.0167 11.25 28.3333C11.25 27.65 11.8167 27.0833 12.5 27.0833H19.1667C19.85 27.0833 20.4167 27.65 20.4167 28.3333C20.4167 29.0167 19.85 29.5833 19.1667 29.5833Z" fill="#4AD991"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <p className="">From a total of {totalAgreement}</p>
                                </div>
                            </div>
                        </Link>
                        {user.is_admin ? (
                            <Link href={route('users.index')} className="overflow-hidden bg-white sm:rounded-2xl shadow-lg">
                                <div className="p-4 text-gray-900">
                                    <div className="flex">
                                        <div className="flex-auto">
                                            <p>User Registered</p>
                                            <p className="font-semibold text-3xl mt-3">{userRegistered}</p>
                                        </div>
                                        <div>
                                            <div className="bg-[#FFF3D6] p-3 rounded-3xl">
                                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path opacity="0.4" d="M14.9999 3.33334C10.6333 3.33334 7.08325 6.88334 7.08325 11.25C7.08325 15.5333 10.4333 19 14.7999 19.15C14.9333 19.1333 15.0666 19.1333 15.1666 19.15C15.1999 19.15 15.2166 19.15 15.2499 19.15C15.2666 19.15 15.2666 19.15 15.2833 19.15C19.5499 19 22.8999 15.5333 22.9166 11.25C22.9166 6.88334 19.3666 3.33334 14.9999 3.33334Z" fill="#FEC53D"/>
                                                    <path d="M23.4666 23.5833C18.8166 20.4833 11.2333 20.4833 6.54994 23.5833C4.43327 25 3.2666 26.9167 3.2666 28.9667C3.2666 31.0167 4.43327 32.9167 6.53327 34.3167C8.8666 35.8833 11.9333 36.6667 14.9999 36.6667C18.0666 36.6667 21.1333 35.8833 23.4666 34.3167C25.5666 32.9 26.7333 31 26.7333 28.9333C26.7166 26.8833 25.5666 24.9833 23.4666 23.5833Z" fill="#FEC53D"/>
                                                    <path opacity="0.4" d="M33.3166 12.2333C33.5833 15.4667 31.2833 18.3 28.0999 18.6833C28.0833 18.6833 28.0833 18.6833 28.0666 18.6833H28.0166C27.9166 18.6833 27.8166 18.6833 27.7333 18.7167C26.1166 18.8 24.6333 18.2833 23.5166 17.3333C25.2333 15.8 26.2166 13.5 26.0166 11C25.8999 9.65 25.4333 8.41667 24.7333 7.36667C25.3666 7.05 26.0999 6.85 26.8499 6.78333C30.1166 6.5 33.0333 8.93333 33.3166 12.2333Z" fill="#FEC53D"/>
                                                    <path d="M36.65 27.65C36.5166 29.2667 35.4833 30.6667 33.75 31.6167C32.0833 32.5333 29.9833 32.9667 27.9 32.9167C29.1 31.8333 29.8 30.4833 29.9333 29.05C30.1 26.9833 29.1167 25 27.15 23.4167C26.0333 22.5333 24.7333 21.8333 23.3167 21.3167C27 20.25 31.6333 20.9667 34.4833 23.2667C36.0167 24.5 36.8 26.05 36.65 27.65Z" fill="#FEC53D"/>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <p className="">Last Updated {format(date, 'dd MMMM yyyy')}</p>
                                    </div>
                                </div>
                            </Link>
                        ) : null}
                    </div> */}
                    {/*
                    <div className="overflow-hidden">
                        <div className="border-b-2 pb-4 border-gray-500">
                            <h1 className="font-medium text-xl uppercase">GRAPHICS</h1>
                        </div>
                    </div> */}
                    {/* <div className="grid grid-cols-3 gap-6">
                        <div className="overflow-hidden bg-white sm:rounded-2xl shadow-lg">
                            <div className="p-4 text-gray-900">
                                <Chart
                                    label={['PTN', 'PTS', 'DuDi', 'Pemerintahan', 'Perusahaan Multinasional', 'Perusahaan Teknologi', 'Perusahaan Startup', 'Organisasi Nirlaba', 'Lembaga Kesehatan', 'Lembaga Riset', 'Lembaga Kebudayaan']}
                                    series={Object.values(seriesKriteriaMitra)}
                                    />
                            </div>
                        </div>
                        <div className="overflow-hidden bg-white sm:rounded-2xl shadow-lg">
                            <div className="p-4 text-gray-900">
                                <Chart
                                    label={['Pendidikan', 'Pelatihan', 'Abdimas']}
                                    series={Object.values(seriesBidangKerjasama)}
                                    />
                            </div>
                        </div>
                        <div className="overflow-hidden bg-white sm:rounded-2xl shadow-lg">
                            <div className="p-4 text-gray-900">
                                <Chart
                                    label={['Domestik', 'Internasional']}
                                    series={Object.values(seriesAsalMitra)}
                                    />
                            </div>
                        </div>
                    </div> */}

                    {/* <div className="overflow-hidden">
                        <div className="border-b-2 pb-4 border-gray-500">
                            <h1 className="font-medium text-xl uppercase">Gallery</h1>
                        </div>
                    </div> */}
                    {/* <div>
                        <Gallery data={galleries}/>
                    </div> */}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
