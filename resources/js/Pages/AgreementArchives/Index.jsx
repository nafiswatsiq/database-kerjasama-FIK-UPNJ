import { Table } from '@/Components/AgreementArchives/Table';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Index({ agreementArchives}) {
    return (
        <AuthenticatedLayout>
            <Head title="Agreement Archives" />

            <div className="py-10">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col gap-y-8">
                    <div className="overflow-hidden">
                        <div className="border-b-2 pb-4 border-gray-500">
                            <h1 className="font-medium text-xl">Agreement Archives</h1>
                        </div>
                    </div>
                    <div className="bg-white shadow-sm sm:rounded-lg">
                        <Table agreementArchives={agreementArchives}/>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}