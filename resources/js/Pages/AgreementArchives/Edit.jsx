import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import SelectInput from '@/Components/SelectInput';
import TextareaInput from '@/Components/TextareaInput';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Button, Input, Textarea, Typography } from '@material-tailwind/react';

export default function Edit({ agreementArchive }) {
    const { data, setData, patch, processing, errors, reset, progress } = useForm({
        namaInstansi: agreementArchive.nama_instansi,
        deskripsiKerjasama: agreementArchive.deskripsi_kerjasama,
        bidangKerjasama: agreementArchive.bidang_kerjasama,
        kriteriaMitra: agreementArchive.kriteria_mitra,
        asalMitra: agreementArchive.asal_mitra,
        durasiKerjasama: agreementArchive.durasi_kerjasama,
        waktuKerjasamaMulai: agreementArchive.waktu_kerjasama_mulai,
        waktuKerjasamaSelesai: agreementArchive.waktu_kerjasama_selesai,
        dokumenKerjasama: null,
        dokumentasi: []
    });

    const handleFileChange = (e) => {
        setData('dokumentasi', Array.from(e.target.files));
    };
  
    const submit = (e) => {
        e.preventDefault();

        patch(route('agreementarchives.update', agreementArchive.id));
    }

    return (
        <AuthenticatedLayout>
            <Head title="New Entry" />

            <div className="py-10">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col gap-y-8">
                    <div className="overflow-hidden">
                        <div className="border-b-2 pb-4 border-gray-500">
                            <h1 className="font-medium text-xl">Edit</h1>
                        </div>
                    </div>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <Typography color="gray" className="px-6 pt-6 font-normal text-lg">Form Edit Rekap Kerjasama Baru</Typography>
                        <form onSubmit={submit} className="p-6">
                            <div className="flex items-center">
                                <InputLabel htmlFor="namaInstansi" value="Nama Instansi" className='w-44 text-lg'/>
                                <div className="flex-auto">
                                  <TextInput
                                      id="namaInstansi"
                                      type="text"
                                      name="namaInstansi"
                                      value={data.namaInstansi}
                                      className="mt-1 block w-full px-4 py-2"
                                      autoComplete="username"
                                      isFocused={true}
                                      onChange={(e) => setData('namaInstansi', e.target.value)}
                                  />

                                  <InputError message={errors.namaInstansi} className="mt-2" />
                                </div>
                            </div>
                            <div className="flex items-start mt-3">
                                <InputLabel htmlFor="deskripsiKerjasama" value="Deskripsi Kerjasama" className='w-44 text-lg mt-2'/>
                                <div className="flex-auto">
                                  <TextareaInput
                                      id="deskripsiKerjasama"
                                      type="text"
                                      name="deskripsiKerjasama"
                                      value={data.deskripsiKerjasama}
                                      className="mt-1 block w-full px-4 py-2"
                                      isFocused={false}
                                      onChange={(e) => setData('deskripsiKerjasama', e.target.value)}
                                  />

                                  <InputError message={errors.deskripsiKerjasama} className="mt-2" />
                                </div>
                            </div>
                            <div className="flex items-center mt-3">
                                <InputLabel htmlFor="bidangKerjasama" value="Bidang Kerjasama" className='w-44 text-lg'/>
                                <div className="flex-auto">
                                    <SelectInput
                                        id="bidangKerjasama"
                                        name="bidangKerjasama"
                                        value={data.bidangKerjasama}
                                        className="mt-1 block w-full"
                                        autoComplete="off"
                                        onChange={(e) => setData('bidangKerjasama', e.target.value)}
                                        options={[
                                            { value: 'Pendidikan', label: 'Pendidikan' },
                                            { value: 'Pelatihan', label: 'Pelatihan' },
                                            { value: 'Abdimas', label: 'Abdimas' },
                                        ]}
                                    />

                                  <InputError message={errors.bidangKerjasama} className="mt-2" />
                                </div>
                            </div>
                            <div className="flex items-center mt-3">
                                <InputLabel htmlFor="kriteriaMitra" value="Kriteria Mitra" className='w-44 text-lg'/>
                                <div className="flex-auto">
                                    <SelectInput
                                        id="kriteriaMitra"
                                        name="kriteriaMitra"
                                        value={data.kriteriaMitra}
                                        className="mt-1 block w-full"
                                        autoComplete="off"
                                        onChange={(e) => setData('kriteriaMitra', e.target.value)}
                                        options={[
                                            { value: 'Perguruan Tinggi Negeri', label: 'Perguruan Tinggi Negeri' },
                                            { value: 'Perguruan Tinggi Swasta', label: 'Perguruan Tinggi Swasta' },
                                            { value: 'Dunia Industri/Dunia Usaha', label: 'Dunia Industri/Dunia Usaha' },
                                            { value: 'Pemerintahan', label: 'Pemerintahan' },
                                        ]}
                                    />

                                  <InputError message={errors.kriteriaMitra} className="mt-2" />
                                </div>
                            </div>
                            <div className="flex items-center mt-3">
                                <InputLabel htmlFor="asalMitra" value="Asal Mitra" className='w-44 text-lg'/>
                                <div className="flex-auto">
                                    <SelectInput
                                        id="asalMitra"
                                        name="asalMitra"
                                        value={data.asalMitra}
                                        className="mt-1 block w-full"
                                        autoComplete="off"
                                        onChange={(e) => setData('asalMitra', e.target.value)}
                                        options={[
                                            { value: 'Domestic', label: 'Domestic' },
                                            { value: 'International', label: 'International' },
                                        ]}
                                    />

                                  <InputError message={errors.asalMitra} className="mt-2" />
                                </div>
                            </div>
                            <div className="flex items-center mt-3">
                                <InputLabel htmlFor="durasiKerjasama" value="Durasi Kerjsama" className='w-44 text-lg'/>
                                <div className="flex-auto">
                                  <TextInput
                                      id="durasiKerjasama"
                                      type="text"
                                      name="durasiKerjasama"
                                      value={data.durasiKerjasama}
                                      className="mt-1 block w-full px-4 py-2"
                                      isFocused={false}
                                      onChange={(e) => setData('durasiKerjasama', e.target.value)}
                                  />

                                  <InputError message={errors.durasiKerjasama} className="mt-2" />
                                </div>
                            </div>
                            <div className="flex items-center mt-3">
                                <InputLabel htmlFor="waktuKerjasama" value="Waktu Kerjsama" className='w-44 text-lg'/>
                                <div className="flex-auto">
                                  <TextInput
                                      id="waktuKerjasamaMulai"
                                      type="date"
                                      name="waktuKerjasamaMulai"
                                      value={data.waktuKerjasamaMulai}
                                      className="mt-1 block w-full px-4 py-2"
                                      isFocused={false}
                                      onChange={(e) => setData('waktuKerjasamaMulai', e.target.value)}
                                  />

                                  <InputError message={errors.waktuKerjasamaMulai} className="mt-2" />
                                </div>
                                <p className="px-10">s.d</p>
                                <div className="flex-auto">
                                  <TextInput
                                      id="waktuKerjasamaSelesai"
                                      type="date"
                                      name="waktuKerjasamaSelesai"
                                      value={data.waktuKerjasamaSelesai}
                                      className="mt-1 block w-full px-4 py-2"
                                      isFocused={false}
                                      onChange={(e) => setData('waktuKerjasamaSelesai', e.target.value)}
                                  />

                                  <InputError message={errors.waktuKerjasamaSelesai} className="mt-2" />
                                </div>
                            </div>
                            <div className="flex items-center mt-3">
                                <InputLabel value="Dokumen Kerjasama" className='w-44 text-lg'/>
                                <div className="flex-auto">
                                    <label htmlFor="dokumenKerjasama">
                                        <p className="text-sm text-gray-500 p-4 border border-dashed rounded-lg border-gray-500">
                                            {data.dokumenKerjasama ? data.dokumenKerjasama.name : 'upload dokumen kerjasama'}
                                        </p>
                                    </label>
                                  <TextInput
                                      id="dokumenKerjasama"
                                      type="file"
                                      name="dokumenKerjasama"
                                      className="mt-1 block w-full px-4 py-2"
                                      isFocused={false}
                                      onChange={(e) => setData('dokumenKerjasama', e.target.files[0])}
                                  />
                                    {progress && (
                                    <progress value={progress.percentage} max="100">
                                        {progress.percentage}%
                                    </progress>
                                    )}
                                  <InputError message={errors.DokumenKerjasama} className="mt-2" />
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