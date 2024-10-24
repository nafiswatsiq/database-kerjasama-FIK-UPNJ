import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import SelectInput from '@/Components/SelectInput';
import TextareaInput from '@/Components/TextareaInput';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import { Head, Link, useForm } from '@inertiajs/react';
import { Breadcrumbs, Button, Input, Textarea, Typography } from '@material-tailwind/react';

export default function Edit({ agreementArchive }) {
    const { data } = useForm({
        namaInstansi: agreementArchive.nama_instansi,
        deskripsiKerjasama: agreementArchive.deskripsi_kerjasama,
        bidangKerjasama: agreementArchive.bidang_kerjasama,
        kriteriaMitra: agreementArchive.kriteria_mitra,
        asalMitra: agreementArchive.asal_mitra,
        durasiKerjasama: agreementArchive.durasi_kerjasama,
        waktuKerjasamaMulai: agreementArchive.waktu_kerjasama_mulai,
        waktuKerjasamaSelesai: agreementArchive.waktu_kerjasama_selesai,
        dokumenKerjasama: agreementArchive.dokumen_kerjasama,
        dokumentasi: agreementArchive.documentations,
    });

    return (
        <AuthenticatedLayout>
            <Head title={data.namaInstansi} />

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
                      <Link href={route('agreementarchives.index')} className="opacity-60">
                        <span>Agreement Archives</span>
                      </Link>
                      <a href="#">{data.namaInstansi}</a>
                    </Breadcrumbs>
                    <div className="overflow-hidden">
                        <div className="border-b-2 pb-4 border-gray-500">
                            <h1 className="font-medium text-xl">{data.namaInstansi}</h1>
                        </div>
                    </div>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex items-center">
                                <InputLabel htmlFor="namaInstansi" value="Nama Instansi" className='w-44 text-lg'/>
                                <div className="flex-auto">
                                  <TextInput
                                      disabled
                                      id="namaInstansi"
                                      type="text"
                                      name="namaInstansi"
                                      value={data.namaInstansi}
                                      className="mt-1 block w-full px-4 py-2"
                                      autoComplete="username"
                                  />
                                </div>
                            </div>
                            <div className="flex items-start mt-3">
                                <InputLabel htmlFor="deskripsiKerjasama" value="Deskripsi Kerjasama" className='w-44 text-lg mt-2'/>
                                <div className="flex-auto">
                                  <TextareaInput
                                      disabled
                                      id="deskripsiKerjasama"
                                      type="text"
                                      name="deskripsiKerjasama"
                                      value={data.deskripsiKerjasama}
                                      className="mt-1 block w-full px-4 py-2"
                                  />
                                </div>
                            </div>
                            <div className="flex items-center mt-3">
                                <InputLabel htmlFor="bidangKerjasama" value="Bidang Kerjasama" className='w-44 text-lg'/>
                                <div className="flex-auto">
                                    <SelectInput
                                        disabled
                                        id="bidangKerjasama"
                                        name="bidangKerjasama"
                                        value={data.bidangKerjasama}
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
                                <InputLabel htmlFor="kriteriaMitra" value="Kriteria Mitra" className='w-44 text-lg'/>
                                <div className="flex-auto">
                                    <SelectInput
                                        disabled
                                        id="kriteriaMitra"
                                        name="kriteriaMitra"
                                        value={data.kriteriaMitra}
                                        className="mt-1 block w-full"
                                        autoComplete="off"
                                        options={[
                                            { value: 'Perguruan Tinggi Negeri', label: 'Perguruan Tinggi Negeri' },
                                            { value: 'Perguruan Tinggi Swasta', label: 'Perguruan Tinggi Swasta' },
                                            { value: 'Dunia Industri/Dunia Usaha', label: 'Dunia Industri/Dunia Usaha' },
                                            { value: 'Pemerintahan', label: 'Pemerintahan' },
                                        ]}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center mt-3">
                                <InputLabel htmlFor="asalMitra" value="Asal Mitra" className='w-44 text-lg'/>
                                <div className="flex-auto">
                                    <SelectInput
                                        disabled
                                        id="asalMitra"
                                        name="asalMitra"
                                        value={data.asalMitra}
                                        className="mt-1 block w-full"
                                        autoComplete="off"
                                        options={[
                                            { value: 'Domestic', label: 'Domestic' },
                                            { value: 'International', label: 'International' },
                                        ]}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center mt-3">
                                <InputLabel htmlFor="durasiKerjasama" value="Durasi Kerjsama" className='w-44 text-lg'/>
                                <div className="flex-auto">
                                  <TextInput
                                      disabled
                                      id="durasiKerjasama"
                                      type="text"
                                      name="durasiKerjasama"
                                      value={data.durasiKerjasama}
                                      className="mt-1 block w-full px-4 py-2"
                                  />
                                </div>
                            </div>
                            <div className="flex items-center mt-3">
                                <InputLabel htmlFor="waktuKerjasama" value="Waktu Kerjsama" className='w-44 text-lg'/>
                                <div className="flex-auto">
                                  <TextInput
                                      disabled
                                      id="waktuKerjasamaMulai"
                                      type="date"
                                      name="waktuKerjasamaMulai"
                                      value={data.waktuKerjasamaMulai}
                                      className="mt-1 block w-full px-4 py-2"
                                  />

                                </div>
                                <p className="px-10">s.d</p>
                                <div className="flex-auto">
                                  <TextInput
                                      disabled
                                      id="waktuKerjasamaSelesai"
                                      type="date"
                                      name="waktuKerjasamaSelesai"
                                      value={data.waktuKerjasamaSelesai}
                                      className="mt-1 block w-full px-4 py-2"
                                  />
                                </div>
                            </div>
                            <div className="flex items-center mt-3">
                                <InputLabel value="Dokumen Kerjasama" className='w-44 text-lg'/>
                                <div className="flex-auto">
                                    <label htmlFor="dokumenKerjasama">
                                        {data.dokumenKerjasama ? (
                                            <a href={route('agreementarchives.download', data.dokumenKerjasama)} >
                                                <p className="text-sm text-gray-500 p-4 border border-dashed rounded-lg border-gray-500 flex justify-between">
                                                    Download Dokumen {data.dokumenKerjasama} <DocumentArrowDownIcon className="h-6 w-6 text-gray-500" />
                                                </p>
                                            </a>
                                        ) : (
                                          <p className="text-sm text-gray-500 p-4 border border-dashed rounded-lg border-gray-500 flex justify-between">
                                              Tidak ada dokumen kerjasama
                                          </p>
                                        )}
                                    </label>
                                </div>
                            </div>
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