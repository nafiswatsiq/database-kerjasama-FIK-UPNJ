import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { Button, Checkbox } from "@material-tailwind/react";
import { useState } from "react";
import Swal from "sweetalert2";

export default function EditAsalKerjasama({ datas }) {
    const { data, setData, post, processing, patch, errors, reset } = useForm({
        asal_kerjasama: datas.asal_kerjasama,
    });

    const [swalShown, setSwalShown] = useState(false);

    const submit = (e) => {
        e.preventDefault();

        patch(route("list-master.asal_kerjasama_update", datas.id));

        Swal.fire({
            title: "Success!",
            text: "Data berhasil diubah",
            didOpen: () => setSwalShown(true),
            didClose: () => setSwalShown(false),
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Add New User" />

            <div className="py-10">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col gap-y-8">
                    <div className="overflow-hidden">
                        <div className="border-b-2 pb-4 border-gray-500">
                            <h1 className="font-medium text-xl">
                                Edit Jenis Kerjasama
                            </h1>
                        </div>
                    </div>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <form onSubmit={submit} className="p-6">
                            <div className="flex items-center">
                                <InputLabel
                                    htmlFor="asal_kerjasama"
                                    value="Asal Kerjasama"
                                    className="w-2/12 text-lg"
                                />
                                <div className="flex-auto">
                                    <TextInput
                                        id="asal_kerjasama"
                                        type="text"
                                        name="asal_kerjasama"
                                        value={data.asal_kerjasama}
                                        className="mt-1 block w-full px-4 py-2"
                                        autoComplete="asal_kerjasama"
                                        isFocused={true}
                                        onChange={(e) => {
                                            setData(
                                                "asal_kerjasama",
                                                e.target.value
                                            );
                                        }}
                                    />
                                    <InputError
                                        message={errors.asal_kerjasama}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="mt-4 flex justify-end">
                                <Button
                                    color="green"
                                    className="px-10"
                                    disabled={processing}
                                    type="submit"
                                >
                                    Save
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
