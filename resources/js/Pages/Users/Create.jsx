import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Button, Checkbox } from '@material-tailwind/react';
import { useState } from 'react';
import Swal from 'sweetalert2';

export default function Create() {
    const { data, setData, post, processing, errors, reset } = useForm({
      name: '',
      jabatan: '',
      nip: '',
      password: '',
      is_admin: false
    });
    const [swalShown, setSwalShown] = useState(false)

    const submit = (e) => {
        e.preventDefault();

        post(route('users.store'), {
            onFinish: () => reset('password'),
        });

        Swal.fire({
            title: 'Success!',
            text: 'Data berhasil disimpan',
            didOpen: () => setSwalShown(true),
            didClose: () => setSwalShown(false),
        })
    }

    return (
        <AuthenticatedLayout>
            <Head title="Add New User" />

            <div className="py-10">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col gap-y-8">
                    <div className="overflow-hidden">
                        <div className="border-b-2 pb-4 border-gray-500">
                            <h1 className="font-medium text-xl">Add New User</h1>
                        </div>
                    </div>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <form onSubmit={submit} className="p-6">
                            <div className="flex items-center">
                                <InputLabel htmlFor="name" value="Nama" className='w-2/12 text-lg'/>
                                <div className="flex-auto">
                                  <TextInput
                                      id="name"
                                      type="text"
                                      name="name"
                                      value={data.name}
                                      className="mt-1 block w-full px-4 py-2"
                                      autoComplete="username"
                                      isFocused={true}
                                      onChange={(e) => setData('name', e.target.value)}
                                  />

                                  <InputError message={errors.name} className="mt-2" />
                                </div>
                            </div>
                            <div className="flex items-center mt-3">
                                <InputLabel htmlFor="jabatan" value="Jabatan User" className='w-2/12 text-lg'/>
                                <div className="flex-auto">
                                  <TextInput
                                      id="jabatan"
                                      type="text"
                                      name="jabatan"
                                      value={data.jabatan}
                                      className="mt-1 block w-full px-4 py-2"
                                      isFocused={false}
                                      onChange={(e) => setData('jabatan', e.target.value)}
                                  />

                                  <InputError message={errors.jabatan} className="mt-2" />
                                </div>
                            </div>
                            <div className="flex items-center mt-3">
                                <InputLabel htmlFor="nip" value="NIP" className='w-2/12 text-lg'/>
                                <div className="flex-auto">
                                  <TextInput
                                      id="nip"
                                      type="text"
                                      name="nip"
                                      value={data.nip}
                                      className="mt-1 block w-full px-4 py-2"
                                      isFocused={false}
                                      onChange={(e) => setData('nip', e.target.value)}
                                  />

                                  <InputError message={errors.nip} className="mt-2" />
                                </div>
                            </div>
                            <div className="flex items-center mt-3">
                                <InputLabel htmlFor="password" value="Password" className='w-2/12 text-lg'/>
                                <div className="flex-auto">
                                  <TextInput
                                      id="password"
                                      type="text"
                                      name="password"
                                      value={data.password}
                                      className="mt-1 block w-full px-4 py-2"
                                      isFocused={false}
                                      onChange={(e) => setData('password', e.target.value)}
                                  />

                                  <InputError message={errors.password} className="mt-2" />
                                </div>
                            </div>
                            <div className="mt-3 flex justify-end">
                              <Checkbox 
                                color="orange" 
                                label="Set this user as an admin?" 
                                name="is_admin" 
                                checked={data.is_admin}
                                onChange={(e) => setData('is_admin', e.target.checked)}
                                />
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
