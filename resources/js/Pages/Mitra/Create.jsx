import React, { useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import SelectInput from '@/Components/SelectInput';
import TextareaInput from '@/Components/TextareaInput';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button, Input, Textarea, Typography } from '@material-tailwind/react';
import Swal from 'sweetalert2';
import { ArrowLeftCircleIcon } from '@heroicons/react/24/solid';

export default function Create() {
    const { data, setData, post, processing, errors, reset, progress } = useForm({
        nama_instansi: '',
        deskripsi_instansi: '',
        no_pks_pihak_1: '',
        no_pks_pihak_2: '',
        pihak_1: '',
        pihak_2: '',
        kriteria_mitra: '',
        asal_mitra: '',
        ruang_lingkup_kerjasama: '',
        waktu_kerjasama_mulai: '',
        waktu_kerjasama_selesai: '',
        dokumen_pks: null
    });
    const [swalShown, setSwalShown] = useState(false)

    const submit = (e) => {
        e.preventDefault();

        post(route('mitra.store'), {
            onError: () => {
                Swal.fire({
                    title: 'Error!',
                    text: 'Data gagal disimpan',
                    icon: 'error',
                    didOpen: () => setSwalShown(true),
                    didClose: () => setSwalShown(false),
                })
            },
            onSuccess: () => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Data berhasil disimpan',
                    didOpen: () => setSwalShown(true),
                    didClose: () => setSwalShown(false),
                })
            }
        });
    }

    return (
        <AuthenticatedLayout>
            <Head title="New Entry" />

            <div className="py-10">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col gap-y-8">
                    <div className="overflow-hidden">
                        <div className="border-b-2 pb-4 border-gray-500 flex items-center">
                            <Link href={route('dashboard')}>
                                <ArrowLeftCircleIcon className="h-10 w-10 text-orange-700" />
                            </Link>
                            <h1 className="font-medium text-xl ml-4">Tambah Mitra Baru</h1>
                        </div>
                    </div>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <Typography color="gray" className="px-6 pt-6 font-normal text-lg">Form Pengisian Mitra Kerjasama</Typography>
                        <form onSubmit={submit} className="p-6">
                            <div className="flex items-center">
                                <InputLabel htmlFor="nama_instansi" value="Nama Instansi" className='w-44 text-lg'/>
                                <div className="flex-auto">
                                  <TextInput
                                      id="nama_instansi"
                                      type="text"
                                      name="nama_instansi"
                                      value={data.nama_instansi}
                                      className="mt-1 block w-full px-4 py-2"
                                      autoComplete="username"
                                      isFocused={true}
                                      onChange={(e) => setData('nama_instansi', e.target.value)}
                                  />

                                  <InputError message={errors.nama_instansi} className="mt-2" />
                                </div>
                            </div>
                            <div className="flex items-start mt-3">
                                <InputLabel htmlFor="deskripsi_instansi" value="Deskripsi Instansi" className='w-44 text-lg mt-2'/>
                                <div className="flex-auto">
                                  <TextareaInput
                                      id="deskripsi_instansi"
                                      type="text"
                                      name="deskripsi_instansi"
                                      value={data.deskripsi_instansi}
                                      className="mt-1 block w-full px-4 py-2"
                                      isFocused={false}
                                      onChange={(e) => setData('deskripsi_instansi', e.target.value)}
                                  />

                                  <InputError message={errors.deskripsi_instansi} className="mt-2" />
                                </div>
                            </div>
                            <div className="flex items-center mt-3">
                                <InputLabel htmlFor="no_pks_pihak_1" value="No PKS Pihak 1" className='w-44 text-lg'/>
                                <div className="flex-auto">
                                  <TextInput
                                      id="no_pks_pihak_1"
                                      type="text"
                                      name="no_pks_pihak_1"
                                      value={data.no_pks_pihak_1}
                                      className="mt-1 block w-full px-4 py-2"
                                      autoComplete="off"
                                      isFocused={false}
                                      onChange={(e) => setData('no_pks_pihak_1', e.target.value)}
                                  />

                                  <InputError message={errors.no_pks_pihak_1} className="mt-2" />
                                </div>
                            </div>
                            <div className="flex items-center mt-3">
                                <InputLabel htmlFor="no_pks_pihak_2" value="No PKS Pihak 2" className='w-44 text-lg'/>
                                <div className="flex-auto">
                                  <TextInput
                                      id="no_pks_pihak_2"
                                      type="text"
                                      name="no_pks_pihak_2"
                                      value={data.no_pks_pihak_2}
                                      className="mt-1 block w-full px-4 py-2"
                                      autoComplete="off"
                                      isFocused={false}
                                      onChange={(e) => setData('no_pks_pihak_2', e.target.value)}
                                  />

                                  <InputError message={errors.no_pks_pihak_2} className="mt-2" />
                                </div>
                            </div>
                            <div className="flex items-center mt-3">
                                <InputLabel htmlFor="pihak_1" value="Pihak 1" className='w-44 text-lg'/>
                                <div className="flex-auto">
                                  <TextInput
                                      id="pihak_1"
                                      type="text"
                                      name="pihak_1"
                                      value={data.pihak_1}
                                      className="mt-1 block w-full px-4 py-2"
                                      autoComplete="off"
                                      isFocused={false}
                                      onChange={(e) => setData('pihak_1', e.target.value)}
                                  />

                                  <InputError message={errors.pihak_1} className="mt-2" />
                                </div>
                            </div>
                            <div className="flex items-center mt-3">
                                <InputLabel htmlFor="pihak_2" value="Pihak 2" className='w-44 text-lg'/>
                                <div className="flex-auto">
                                  <TextInput
                                      id="pihak_2"
                                      type="text"
                                      name="pihak_2"
                                      value={data.pihak_2}
                                      className="mt-1 block w-full px-4 py-2"
                                      autoComplete="off"
                                      isFocused={false}
                                      onChange={(e) => setData('pihak_2', e.target.value)}
                                  />

                                  <InputError message={errors.pihak_2} className="mt-2" />
                                </div>
                            </div>
                            <div className="flex items-center mt-3">
                                <InputLabel htmlFor="kriteria_mitra" value="Kriteria Mitra" className='w-44 text-lg'/>
                                <div className="flex-auto">
                                    <SelectInput
                                        id="kriteria_mitra"
                                        name="kriteria_mitra"
                                        value={data.kriteria_mitra}
                                        className="mt-1 block w-full"
                                        autoComplete="off"
                                        onChange={(e) => setData('kriteria_mitra', e.target.value)}
                                        options={[
                                            { value: 'Perguruan Tinggi Negeri', label: 'Perguruan Tinggi Negeri' },
                                            { value: 'Perguruan Tinggi Swasta', label: 'Perguruan Tinggi Swasta' },
                                            { value: 'Dunia Industri/Dunia Usaha', label: 'Dunia Industri/Dunia Usaha' },
                                            { value: 'Pemerintahan', label: 'Pemerintahan' },
                                            { value: 'Perusahaan Multinasional', label: 'Perusahaan Multinasional' },
                                            { value: 'Perusahaan Teknologi', label: 'Perusahaan Teknologi' },
                                            { value: 'Perusahaan Startup', label: 'Perusahaan Startup' },
                                            { value: 'Organisasi Nirlaba', label: 'Organisasi Nirlaba' },
                                            { value: 'Lembaga Riset', label: 'Lembaga Riset' },
                                            { value: 'Lembaga Kebudayaan', label: 'Lembaga Kebudayaan' },
                                        ]}
                                    />

                                  <InputError message={errors.kriteria_mitra} className="mt-2" />
                                </div>
                            </div>
                            <div className="flex items-center mt-3">
                                <InputLabel htmlFor="asal_mitra" value="Asal Mitra" className='w-44 text-lg'/>
                                <div className="flex-auto">
                                    <SelectInput
                                        id="asal_mitra"
                                        name="asal_mitra"
                                        value={data.asal_mitra}
                                        className="mt-1 block w-full"
                                        autoComplete="off"
                                        onChange={(e) => setData('asal_mitra', e.target.value)}
                                        options={[
                                            { value: 'Domestik', label: 'Domestik' },
                                            { value: 'Internasional', label: 'Internasional' },
                                        ]}
                                    />

                                  <InputError message={errors.asal_mitra} className="mt-2" />
                                </div>
                            </div>
                            <div className="flex items-center mt-3">
                                <InputLabel htmlFor="ruang_lingkup_kerjasama" value="Ruang Lingkup Kerjasama" className='w-44 text-lg'/>
                                <div className="flex-auto">
                                  <TextInput
                                      id="ruang_lingkup_kerjasama"
                                      type="text"
                                      name="ruang_lingkup_kerjasama"
                                      value={data.ruang_lingkup_kerjasama}
                                      className="mt-1 block w-full px-4 py-2"
                                      autoComplete="off"
                                      isFocused={false}
                                      onChange={(e) => setData('ruang_lingkup_kerjasama', e.target.value)}
                                  />

                                  <InputError message={errors.ruang_lingkup_kerjasama} className="mt-2" />
                                </div>
                            </div>
                            <div className="flex items-center mt-3">
                                <InputLabel htmlFor="waktuKerjasama" value="Waktu Kerjsama" className='w-44 text-lg'/>
                                <div className="flex-auto">
                                  <TextInput
                                      id="waktu_kerjasama_mulai"
                                      type="date"
                                      name="waktu_kerjasama_mulai"
                                      value={data.waktu_kerjasama_mulai}
                                      className="mt-1 block w-full px-4 py-2"
                                      isFocused={false}
                                      onChange={(e) => setData('waktu_kerjasama_mulai', e.target.value)}
                                  />

                                  <InputError message={errors.waktu_kerjasama_mulai} className="mt-2" />
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
                                      onChange={(e) => setData('waktu_kerjasama_selesai', e.target.value)}
                                  />

                                  <InputError message={errors.waktu_kerjasama_selesai} className="mt-2" />
                                </div>
                            </div>
                            <div className="flex items-center mt-3">
                                <InputLabel value="Dokumen PKS" className='w-44 text-lg'/>
                                <div className="flex-auto">
                                    <label htmlFor="dokumen_pks">
                                        <p className="text-sm text-gray-500 p-4 border border-dashed rounded-lg border-gray-500">
                                            {data.dokumen_pks ? data.dokumen_pks.name : 'upload dokumen PKS'}
                                        </p>
                                    </label>
                                  <TextInput
                                      id="dokumen_pks"
                                      type="file"
                                      name="dokumen_pks"
                                      className="mt-1 block w-full px-4 py-2"
                                      isFocused={false}
                                      onChange={(e) => setData('dokumen_pks', e.target.files[0])}
                                  />
                                    {progress && (
                                    <progress value={progress.percentage} max="100">
                                        {progress.percentage}%
                                    </progress>
                                    )}
                                  <InputError message={errors.dokumen_pks} className="mt-2" />
                                </div>
                            </div>
                            <div className="mt-4 flex justify-end">
                              <Button color="green" className="px-10" disabled={processing} type="submit">Save</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}