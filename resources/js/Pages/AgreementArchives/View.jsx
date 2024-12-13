import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import SelectInput from '@/Components/SelectInput';
import TextareaInput from '@/Components/TextareaInput';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { DocumentArrowDownIcon, EyeIcon } from '@heroicons/react/24/outline';
import { ArrowLeftCircleIcon } from '@heroicons/react/24/solid';
import { Head, Link, useForm } from '@inertiajs/react';
import { Breadcrumbs, Button, Input, Textarea, Typography } from '@material-tailwind/react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import React from 'react';

export default function Edit({ mitraId, agreementArchive }) {
    const { data } = useForm({
        nama_instansi: agreementArchive.nama_instansi,
        nama_kegiatan: agreementArchive.nama_kegiatan,
        no_ia_pihak_1: agreementArchive.no_ia_pihak_1,
        no_ia_pihak_2: agreementArchive.no_ia_pihak_2,
        pihak1: agreementArchive.pihak_1,
        pihak2: agreementArchive.pihak_2,
        bidang_kerjasama: agreementArchive.bidang_kerjasama,
        durasi_kerjasama: agreementArchive.durasi_kerjasama,
        waktu_kerjasama_mulai: agreementArchive.waktu_kerjasama_mulai,
        waktu_kerjasama_selesai: agreementArchive.waktu_kerjasama_selesai,
        dokumen_kerjasama: agreementArchive.dokumen_kerjasama,
        dokumen_laporan: agreementArchive.dokumen_laporan,
        dokumentasi: agreementArchive.documentations,
    });
    const [viewDokumenKerjasama, setViewDokumenKerjasama] = React.useState(false)
    const [viewDokumenLaporan, setViewDokumenLaporan] = React.useState(false)

    const handleViewDokumenKerjasama = () => {
        const view = viewDokumenKerjasama === false ? true : false;
        setViewDokumenKerjasama(view)
    }
    const handleViewDokumenLaporan = () => {
        const view = viewDokumenLaporan === false ? true : false;
        setViewDokumenLaporan(view)
    }

    return (
        <AuthenticatedLayout>
            <Head title={data.nama_instansi} />

            <div className="py-10">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col gap-y-8">
                    <Breadcrumbs className="bg-transparent px-0">
                      <Link href={route('dashboard')} className="opacity-60">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                        </svg>
                      </Link>
                      <Link href='' className="opacity-60">
                        <span>Agreement Archives</span>
                      </Link>
                      <a href="#">{data.nama_instansi}</a>
                    </Breadcrumbs>
                    <div className="overflow-hidden">
                        <div className="border-b-2 pb-4 border-gray-500 flex items-center">
                            <Link href={route('agreementarchives.index', mitraId)}>
                                <ArrowLeftCircleIcon className="h-10 w-10 text-orange-700 mr-4" />
                            </Link>
                            <h1 className="font-medium text-xl">{data.nama_instansi}</h1>
                        </div>
                    </div>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex items-center">
                                <InputLabel htmlFor="nama_instansi" value="Nama Instansi" className='w-44 text-lg'/>
                                <div className="flex-auto">
                                  <TextInput
                                      disabled
                                      id="nama_instansi"
                                      type="text"
                                      name="nama_instansi"
                                      value={data.nama_instansi}
                                      className="mt-1 block w-full px-4 py-2"
                                      autoComplete="username"
                                  />
                                </div>
                            </div>
                            <div className="flex items-start mt-3">
                                <InputLabel htmlFor="nama_kegiatan" value="Deskripsi Kerjasama" className='w-44 text-lg mt-2'/>
                                <div className="flex-auto">
                                  <TextareaInput
                                      disabled
                                      id="nama_kegiatan"
                                      type="text"
                                      name="nama_kegiatan"
                                      value={data.nama_kegiatan}
                                      className="mt-1 block w-full px-4 py-2"
                                  />
                                </div>
                            </div>
                            <div className="flex items-center mt-3">
                                <InputLabel htmlFor="no_ia_pihak_1" value="No. IA Pihak 1" className='w-44 text-lg'/>
                                <div className="flex-auto">
                                  <TextInput
                                      disabled
                                      id="no_ia_pihak_1"
                                      type="text"
                                      name="no_ia_pihak_1"
                                      value={data.no_ia_pihak_1}
                                      className="mt-1 block w-full px-4 py-2"
                                  />
                                </div>
                            </div>
                            <div className="flex items-center mt-3">
                                <InputLabel htmlFor="no_ia_pihak_2" value="No. IA Pihak 1" className='w-44 text-lg'/>
                                <div className="flex-auto">
                                  <TextInput
                                      disabled
                                      id="no_ia_pihak_2"
                                      type="text"
                                      name="no_ia_pihak_2"
                                      value={data.no_ia_pihak_2}
                                      className="mt-1 block w-full px-4 py-2"
                                  />
                                </div>
                            </div>
                            <div className="flex items-center mt-3">
                                <InputLabel htmlFor="pihak1" value="Pihak 1" className='w-44 text-lg'/>
                                <div className="flex-auto">
                                  <TextInput
                                      disabled
                                      id="pihak1"
                                      type="text"
                                      name="pihak1"
                                      value={data.pihak1}
                                      className="mt-1 block w-full px-4 py-2"
                                  />
                                </div>
                            </div>
                            <div className="flex items-center mt-3">
                                <InputLabel htmlFor="pihak2" value="Pihak 2" className='w-44 text-lg'/>
                                <div className="flex-auto">
                                  <TextInput
                                      disabled
                                      id="pihak2"
                                      type="text"
                                      name="pihak2"
                                      value={data.pihak2}
                                      className="mt-1 block w-full px-4 py-2"
                                  />
                                </div>
                            </div>
                            <div className="flex items-center mt-3">
                                <InputLabel htmlFor="bidang_kerjasama" value="Bidang Kerjasama" className='w-44 text-lg'/>
                                <div className="flex-auto">
                                    <SelectInput
                                        disabled
                                        id="bidang_kerjasama"
                                        name="bidang_kerjasama"
                                        value={data.bidang_kerjasama}
                                        className="mt-1 block w-full"
                                        autoComplete="off"
                                        options={[
                                            { value: 'Pendidikan', label: 'Pendidikan' },
                                            { value: 'Pelatihan', label: 'Pelatihan' },
                                            { value: 'Abdimas', label: 'Abdimas' },
                                        ]}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center mt-3">
                                <InputLabel htmlFor="durasi_kerjasama" value="Durasi Kerjsama" className='w-44 text-lg'/>
                                <div className="flex-auto">
                                  <TextInput
                                      disabled
                                      id="durasi_kerjasama"
                                      type="text"
                                      name="durasi_kerjasama"
                                      value={data.durasi_kerjasama}
                                      className="mt-1 block w-full px-4 py-2"
                                  />
                                </div>
                            </div>
                            <div className="flex items-center mt-3">
                                <InputLabel htmlFor="waktuKerjasama" value="Waktu Kerjsama" className='w-44 text-lg'/>
                                <div className="flex-auto">
                                  <TextInput
                                      disabled
                                      id="waktu_kerjasama_mulai"
                                      type="date"
                                      name="waktu_kerjasama_mulai"
                                      value={data.waktu_kerjasama_mulai}
                                      className="mt-1 block w-full px-4 py-2"
                                  />

                                </div>
                                <p className="px-10">s.d</p>
                                <div className="flex-auto">
                                  <TextInput
                                      disabled
                                      id="waktu_kerjasama_selesai"
                                      type="date"
                                      name="waktu_kerjasama_selesai"
                                      value={data.waktu_kerjasama_selesai}
                                      className="mt-1 block w-full px-4 py-2"
                                  />
                                </div>
                            </div>
                            <div className="flex items-center mt-3">
                                <InputLabel value="Dokumen I.A" className='w-44 text-lg'/>
                                <div className="flex-auto">
                                    <label htmlFor="dokumen_kerjasama">
                                        {data.dokumen_kerjasama ? (
                                            <div className='text-sm text-gray-500 p-4 border border-dashed rounded-lg border-gray-500 flex justify-between'>
                                                <a href={route('agreementarchives.download', data.dokumen_kerjasama)} >
                                                    <p className="flex">
                                                        Download Dokumen {data.dokumen_kerjasama} <DocumentArrowDownIcon className="h-6 w-6 text-gray-500" />
                                                    </p>
                                                </a>
                                                <div className='flex gap-x-3 cursor-pointer' onClick={() => handleViewDokumenKerjasama()}>
                                                    Lihat <EyeIcon className="h-6 w-6 text-gray-500" />
                                                </div>
                                            </div>
                                        ) : (
                                          <p className="text-sm text-gray-500 p-4 border border-dashed rounded-lg border-gray-500 flex justify-between">
                                              Tidak ada dokumen kerjasama
                                          </p>
                                        )}
                                    </label>
                                </div>
                            </div>
                            {data.dokumen_kerjasama ? (
                                <div className={viewDokumenKerjasama === true ? 'relative max-h-[50vh] overflow-scroll h-full' : 'relative max-h-[50vh] overflow-scroll h-0'}>
                                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                                        <Viewer fileUrl={route().t.url + '/storage/' +data.dokumen_kerjasama} />
                                    </Worker>
                                </div>
                            ): null}
                            <div className="flex items-center mt-3">
                                <InputLabel value="Dokumen Laporan" className='w-44 text-lg'/>
                                <div className="flex-auto">
                                    <label htmlFor="dokumen_laporan">
                                        {data.dokumen_laporan ? (
                                            <div className='text-sm text-gray-500 p-4 border border-dashed rounded-lg border-gray-500 flex justify-between'>
                                                <a href={route('agreementarchives.download', data.dokumen_laporan)} >
                                                    <p className="flex">
                                                        Download Dokumen {data.dokumen_laporan} <DocumentArrowDownIcon className="h-6 w-6 text-gray-500" />
                                                    </p>
                                                </a>
                                                <div className='flex gap-x-3 cursor-pointer' onClick={() => handleViewDokumenLaporan()}>
                                                    Lihat <EyeIcon className="h-6 w-6 text-gray-500" />
                                                </div>
                                            </div>
                                        ) : (
                                          <p className="text-sm text-gray-500 p-4 border border-dashed rounded-lg border-gray-500 flex justify-between">
                                              Tidak ada dokumen Laporan
                                          </p>
                                        )}
                                    </label>
                                </div>
                            </div>
                            {data.dokumen_laporan ? (
                                <div className={viewDokumenLaporan === true ? 'relative max-h-[50vh] overflow-scroll h-full' : 'relative max-h-[50vh] overflow-scroll h-0'}>
                                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                                        <Viewer fileUrl={route().t.url + '/storage/' +data.dokumen_laporan} />
                                    </Worker>
                                </div>
                            ): null}
                            <div className="mt-3 border-t-2">
                                <Typography className="mt-3 font-semibold text-gray-700">Dokumentasi</Typography>
                                
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 mt-6">
                                  {data.dokumentasi.map(({ path }, index) => (
                                    <div key={index} className="shadow-xl rounded-xl border">
                                      <img
                                        className="h-40 w-full max-w-full rounded-lg object-cover object-center"
                                        src={`/storage/${path}`}
                                        alt="gallery-photo"
                                      />
                                    </div>
                                  ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}