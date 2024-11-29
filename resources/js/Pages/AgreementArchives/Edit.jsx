import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import SelectInput from '@/Components/SelectInput';
import TextareaInput from '@/Components/TextareaInput';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { ArrowLeftCircleIcon } from '@heroicons/react/24/solid';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button, Input, Textarea, Typography } from '@material-tailwind/react';
import { useState } from 'react';
import Swal from 'sweetalert2';

export default function Edit({ mitraId, agreementArchive }) {
    const { data, setData, post, processing, errors, reset, progress } = useForm({
        nama_instansi: agreementArchive.nama_instansi,
        nama_kegiatan: agreementArchive.nama_kegiatan,
        no_ia_pihak_1: agreementArchive.no_ia_pihak_1,
        no_ia_pihak_2: agreementArchive.no_ia_pihak_2,
        pihak_1: agreementArchive.pihak_1,
        pihak_2: agreementArchive.pihak_2,
        bidang_kerjasama: agreementArchive.bidang_kerjasama,
        durasi_kerjasama: agreementArchive.durasi_kerjasama,
        waktu_kerjasama_mulai: agreementArchive.waktu_kerjasama_mulai,
        waktu_kerjasama_selesai: agreementArchive.waktu_kerjasama_selesai,
        dokumen_kerjasama: null,
        dokumentasi: []
    });
    const [swalShown, setSwalShown] = useState(false)

    const handleFileChange = (e) => {
        setData('dokumentasi', Array.from(e.target.files));
    };
  
    const submit = (e) => {
        e.preventDefault();

        post(route('agreementarchives.update', [agreementArchive.id]), {
            onError: () => {
                Swal.fire({
                    title: 'Error!',
                    text: 'Data gagal diubah',
                    icon: 'error',
                    didOpen: () => setSwalShown(true),
                    didClose: () => setSwalShown(false),
                })
            },
            onSuccess: () => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Data berhasil diubah',
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
                            <Link href={route('agreementarchives.index', mitraId)}>
                                <ArrowLeftCircleIcon className="h-10 w-10 text-orange-700 mr-4" />
                            </Link>
                            <h1 className="font-medium text-xl">Edit</h1>
                        </div>
                    </div>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <Typography color="gray" className="px-6 pt-6 font-normal text-lg">Form Edit Rekap Kerjasama Baru</Typography>
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
                                <InputLabel htmlFor="nama_kegiatan" value="Deskripsi Kegiatan" className='w-44 text-lg mt-2'/>
                                <div className="flex-auto">
                                  <TextareaInput
                                      id="nama_kegiatan"
                                      type="text"
                                      name="nama_kegiatan"
                                      value={data.nama_kegiatan}
                                      className="mt-1 block w-full px-4 py-2"
                                      isFocused={false}
                                      onChange={(e) => setData('nama_kegiatan', e.target.value)}
                                  />

                                  <InputError message={errors.nama_kegiatan} className="mt-2" />
                                </div>
                            </div>
                            <div className="flex items-center mt-3">
                                <InputLabel htmlFor="no_ia_pihak_1" value="No. IA Pihak 1" className='w-44 text-lg'/>
                                <div className="flex-auto">
                                  <TextInput
                                      id="no_ia_pihak_1"
                                      type="text"
                                      name="no_ia_pihak_1"
                                      value={data.no_ia_pihak_1}
                                      className="mt-1 block w-full px-4 py-2"
                                      autoComplete="off"
                                      isFocused={false}
                                      onChange={(e) => setData('no_ia_pihak_1', e.target.value)}
                                  />

                                  <InputError message={errors.no_ia_pihak_1} className="mt-2" />
                                </div>
                            </div>
                            <div className="flex items-center mt-3">
                                <InputLabel htmlFor="no_ia_pihak_2" value="No. IA Pihak 2" className='w-44 text-lg'/>
                                <div className="flex-auto">
                                  <TextInput
                                      id="no_ia_pihak_2"
                                      type="text"
                                      name="no_ia_pihak_2"
                                      value={data.no_ia_pihak_2}
                                      className="mt-1 block w-full px-4 py-2"
                                      autoComplete="off"
                                      isFocused={false}
                                      onChange={(e) => setData('no_ia_pihak_2', e.target.value)}
                                  />

                                  <InputError message={errors.no_ia_pihak_2} className="mt-2" />
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
                                <InputLabel htmlFor="bidang_kerjasama" value="Bidang Kerjasama" className='w-44 text-lg'/>
                                <div className="flex-auto">
                                    <SelectInput
                                        id="bidang_kerjasama"
                                        name="bidang_kerjasama"
                                        value={data.bidang_kerjasama}
                                        className="mt-1 block w-full"
                                        autoComplete="off"
                                        onChange={(e) => setData('bidang_kerjasama', e.target.value)}
                                        options={[
                                            { value: 'Pendidikan', label: 'Pendidikan' },
                                            { value: 'Pelatihan', label: 'Pelatihan' },
                                            { value: 'Abdimas', label: 'Abdimas' },
                                        ]}
                                    />

                                  <InputError message={errors.bidang_kerjasama} className="mt-2" />
                                </div>
                            </div>
                            <div className="flex items-center mt-3">
                                <InputLabel htmlFor="durasi_kerjasama" value="Durasi Kerjsama" className='w-44 text-lg'/>
                                <div className="flex-auto">
                                  <TextInput
                                      id="durasi_kerjasama"
                                      type="text"
                                      name="durasi_kerjasama"
                                      value={data.durasi_kerjasama}
                                      className="mt-1 block w-full px-4 py-2"
                                      isFocused={false}
                                      onChange={(e) => setData('durasi_kerjasama', e.target.value)}
                                  />

                                  <InputError message={errors.durasi_kerjasama} className="mt-2" />
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
                                <InputLabel value="Dokumen I.A" className='w-44 text-lg'/>
                                <div className="flex-auto">
                                    <label htmlFor="dokumen_kerjasama">
                                        <p className="text-sm text-gray-500 p-4 border border-dashed rounded-lg border-gray-500">
                                            {agreementArchive.dokumen_kerjasama ? agreementArchive.dokumen_kerjasama : 'upload dokumen kerjasama'}
                                        </p>
                                    </label>
                                  <TextInput
                                      id="dokumen_kerjasama"
                                      type="file"
                                      name="dokumen_kerjasama"
                                      className="mt-1 block w-full px-4 py-2"
                                      isFocused={false}
                                      onChange={(e) => setData('dokumen_kerjasama', e.target.files[0])}
                                  />
                                    {progress && (
                                    <progress value={progress.percentage} max="100">
                                        {progress.percentage}%
                                    </progress>
                                    )}
                                  <InputError message={errors.dokumen_kerjasama} className="mt-2" />
                                </div>
                            </div>
                            <div className="flex items-center mt-3">
                                <InputLabel value="Dokumentasi" className='w-44 text-lg'/>
                                <div className="flex-auto">
                                    <label for="dokumentasi">
                                        <p className="text-sm text-gray-500 p-4 border border-dashed rounded-lg border-gray-500">upload dokumentasi</p>
                                        <ul className="list-disc list-inside">
                                            {data.dokumentasi.map((file, index) => (
                                                <li key={index}>{file.name}</li>
                                            ))}
                                        </ul>
                                    </label>
                                  <TextInput
                                      id="dokumentasi"
                                      type="file"
                                      name="dokumentasi"
                                      className="mt-1 block w-full px-4 py-2"
                                      isFocused={false}
                                      multiple
                                      onChange={handleFileChange}
                                  />
                                    {progress && (
                                    <progress value={progress.percentage} max="100">
                                        {progress.percentage}%
                                    </progress>
                                    )}
                                  <InputError message={errors.dokumentasi} className="mt-2" />
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