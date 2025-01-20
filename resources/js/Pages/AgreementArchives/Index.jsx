import { Table } from "@/Components/AgreementArchives/Table";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";
import { Head, Link } from "@inertiajs/react";

export default function Index({ mitraId, agreementArchives }) {
    return (
        <AuthenticatedLayout>
            <Head title="Agreement Archives" />

            <div className="py-10">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col gap-y-8">
                    <div className="overflow-hidden">
                        <div className="border-b-2 pb-4 border-gray-500 flex items-center">
                            <Link href={route("mitra.detail", mitraId)}>
                                <ArrowLeftCircleIcon className="h-10 w-10 text-orange-700 mr-4" />
                            </Link>
                            <h1 className="font-medium text-xl">
                                Implemntation Agreement Gallery
                            </h1>
                        </div>
                    </div>
                    <div className="bg-white shadow-sm sm:rounded-lg">
                        <Table
                            agreementArchives={agreementArchives}
                            mitraId={mitraId}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
