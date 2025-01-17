import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { Button, Checkbox } from "@material-tailwind/react";
import { useState } from "react";
import Swal from "sweetalert2";

export default function EditKriteriaMitra({ datas }) {
    const { data, setData, post, processing, patch, errors, reset } = useForm({
        kriteria_mitra: datas.kriteria_mitra,
    });
    const [swalShown, setSwalShown] = useState(false);

    const submit = (e) => {
        e.preventDefault();

        patch(route("list-master.kriteria_mitra_update", datas.id));

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
                            <h1 className="font-medium text-xl">Edit User</h1>
                        </div>
                    </div>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <form onSubmit={submit} className="p-6">
                            <div className="flex items-center">
                                <InputLabel
                                    htmlFor="name"
                                    value="Nama"
                                    className="w-2/12 text-lg"
                                />
                                <div className="flex-auto">
                                    <TextInput
                                        id="kriteria_mitra"
                                        type="text"
                                        name="kriteria_mitra"
                                        value={data.kriteria_mitra}
                                        className="mt-1 block w-full px-4 py-2"
                                        autoComplete="kriteria_mitra"
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData(
                                                "kriteria_mitra",
                                                e.target.value
                                            )
                                        }
                                    />

                                    <InputError
                                        message={errors.kriteria_mitra}
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
