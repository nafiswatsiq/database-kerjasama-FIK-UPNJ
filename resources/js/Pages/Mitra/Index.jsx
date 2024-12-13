import { Chart } from '@/Components/Dashboard/Chart';
import { Gallery } from '@/Components/Dashboard/Gallery';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from '@heroicons/react/24/solid';
import { Head, Link, usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import { Table } from './Utils/Table';
import { DocumentArrowDownIcon } from '@heroicons/react/24/outline';

export default function Index({ agreementArchives, mitra, totalAgreement, activeAgreement, inactiveAgreement, documentNull, seriesBidangKerjasama, galleries }) {
    const user = usePage().props.auth.user;
    const date = new Date();
    console.log(agreementArchives);

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="py-10">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col gap-y-8">
                    <div className="overflow-hidden">
                        <div className="border-b-2 pb-4 border-gray-500 flex items-center">
                            <Link href={route('dashboard')}>
                                <ArrowLeftCircleIcon className="h-10 w-10 text-orange-700" />
                            </Link>     
                            <h1 className="font-medium text-xl uppercase ml-4">{mitra.nama_instansi}</h1>
                        </div>
                    </div>
                    <div className='my-6 grid grid-cols-1 gap-y-4'>
                        <div className='grid grid-cols-4'>
                            <div className="font-medium">Deskripsi Instansi</div>
                            <div className='col-span-3'>: {mitra.deskripsi_instansi}</div>
                        </div>
                        <div className='grid grid-cols-4'>
                            <div className="font-medium">No. PKS </div>
                            <div className='col-span-3'>
                                <ul className='list-decimal ml-4'>
                                    <li>{mitra.no_pks_pihak_1}</li>
                                    <li>{mitra.no_pks_pihak_2}</li>
                                </ul>
                            </div>
                        </div>
                        <div className='grid grid-cols-4'>
                            <div className="font-medium">Pihak yang bertanggung Jawab</div>
                            <div className='col-span-3'>
                                <ul className='list-decimal ml-4'>
                                    <li>{mitra.pihak_1}</li>
                                    <li>{mitra.pihak_2}</li>
                                </ul>
                            </div>
                        </div>
                        <div className='grid grid-cols-4'>
                            <div className="font-medium">Ruang Lingkup</div>
                            <div className='col-span-3'>: {mitra.ruang_lingkup_kerjasama}</div>
                        </div>
                        <div className='grid grid-cols-4'>
                            <div className="font-medium">Waktu Kerjsama</div>
                            <div className='col-span-3'>
                                <p>: {mitra.waktu_kerjasama_mulai} - {mitra.waktu_kerjasama_selesai}</p>
                            </div>
                        </div>
                        <div className='grid grid-cols-4'>
                            <div className="font-medium">Dokumen PKS</div>
                            <div className='col-span-3 w-full'>
                                {mitra.dokumen_pks ? (
                                    <a href={route('mitra.download', mitra.dokumen_pks)} >
                                        <p className="text-sm text-gray-500 p-4 border border-dashed rounded-lg border-gray-500 flex justify-between">
                                            Download Dokumen {mitra.dokumen_pks} <DocumentArrowDownIcon className="h-6 w-6 text-gray-500" />
                                        </p>
                                    </a>
                                ) : (
                                    <p>: Belum ada dokumen PKS</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-6">
                        <Link href={route('agreementarchives.index', mitra.id)} className="overflow-hidden bg-white sm:rounded-2xl shadow-lg">
                            <div className="p-4 text-gray-900">
                                <div className="flex">
                                    <div className="flex-auto">
                                        <p>Total IA</p>
                                        <p className="font-semibold text-3xl mt-3">{totalAgreement}</p>
                                    </div>
                                    <div>
                                        <div className="bg-[#E5E4FF] p-3 rounded-3xl">
                                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path opacity="0.4" d="M34.9999 36.6667H4.99988C4.31654 36.6667 3.74988 36.1 3.74988 35.4167C3.74988 34.7333 4.31654 34.1667 4.99988 34.1667H34.9999C35.6832 34.1667 36.2499 34.7333 36.2499 35.4167C36.2499 36.1 35.6832 36.6667 34.9999 36.6667Z" fill="#8280FF"/>
                                                <path opacity="0.4" d="M31.7 5.8C28.4666 2.56667 25.3 2.48333 21.9833 5.8L19.9666 7.81667C19.8 7.98333 19.7333 8.25 19.8 8.48333C21.0666 12.9 24.6 16.4333 29.0166 17.7C29.0833 17.7167 29.15 17.7333 29.2166 17.7333C29.4 17.7333 29.5666 17.6667 29.7 17.5333L31.7 15.5167C33.35 13.8833 34.15 12.3 34.15 10.7C34.1666 9.05 33.3666 7.45 31.7 5.8Z" fill="#8280FF"/>
                                                <path d="M26.0166 19.2167C25.5333 18.9833 25.0666 18.75 24.6166 18.4833C24.25 18.2667 23.9 18.0333 23.55 17.7833C23.2666 17.6 22.9333 17.3333 22.6166 17.0667C22.5833 17.05 22.4666 16.95 22.3333 16.8167C21.7833 16.35 21.1666 15.75 20.6166 15.0833C20.5666 15.05 20.4833 14.9333 20.3666 14.7833C20.2 14.5833 19.9166 14.25 19.6666 13.8667C19.4666 13.6167 19.2333 13.25 19.0166 12.8833C18.75 12.4333 18.5166 11.9833 18.2833 11.5167C18.05 11.0167 17.8666 10.5333 17.7 10.0833L7.2333 20.55C7.01663 20.7667 6.81663 21.1833 6.76663 21.4667L5.86663 27.85C5.69996 28.9833 6.01663 30.05 6.71663 30.7667C7.31663 31.35 8.14996 31.6667 9.04996 31.6667C9.24996 31.6667 9.44996 31.65 9.64996 31.6167L16.05 30.7167C16.35 30.6667 16.7666 30.4667 16.9666 30.25L27.4333 19.7833C26.9666 19.6167 26.5166 19.4333 26.0166 19.2167Z" fill="#8280FF"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <p className="">Up from last year</p>
                                </div>
                            </div>
                        </Link>
                        <Link href={route('agreementarchives.index', mitra.id) + '?filter=active&page=1'} className="overflow-hidden bg-white sm:rounded-2xl shadow-lg">
                            <div className="p-4 text-gray-900">
                                <div className="flex">
                                    <div className="flex-auto">
                                        <p>Active Agreement</p>
                                        <p className="font-semibold text-3xl mt-3">{activeAgreement}</p>
                                    </div>
                                    <div>
                                        <div className="bg-[#D9F7E8] p-3 rounded-3xl">
                                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path opacity="0.4" d="M34.1666 16.9833H29.35C25.4 16.9833 22.1833 13.7667 22.1833 9.81667V5C22.1833 4.08334 21.4333 3.33334 20.5166 3.33334H13.45C8.31663 3.33334 4.16663 6.66667 4.16663 12.6167V27.3833C4.16663 33.3333 8.31663 36.6667 13.45 36.6667H26.55C31.6833 36.6667 35.8333 33.3333 35.8333 27.3833V18.65C35.8333 17.7333 35.0833 16.9833 34.1666 16.9833Z" fill="#4AD991"/>
                                                <path d="M26.3335 3.68333C25.6501 3 24.4668 3.46667 24.4668 4.41667V10.2333C24.4668 12.6667 26.5335 14.6833 29.0501 14.6833C30.6335 14.7 32.8335 14.7 34.7168 14.7C35.6668 14.7 36.1668 13.5833 35.5001 12.9167C33.1001 10.5 28.8001 6.15 26.3335 3.68333Z" fill="#4AD991"/>
                                                <path d="M22.5 22.9167H12.5C11.8167 22.9167 11.25 22.35 11.25 21.6667C11.25 20.9833 11.8167 20.4167 12.5 20.4167H22.5C23.1833 20.4167 23.75 20.9833 23.75 21.6667C23.75 22.35 23.1833 22.9167 22.5 22.9167Z" fill="#4AD991"/>
                                                <path d="M19.1667 29.5833H12.5C11.8167 29.5833 11.25 29.0167 11.25 28.3333C11.25 27.65 11.8167 27.0833 12.5 27.0833H19.1667C19.85 27.0833 20.4167 27.65 20.4167 28.3333C20.4167 29.0167 19.85 29.5833 19.1667 29.5833Z" fill="#4AD991"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <p className="">From a total of {totalAgreement}</p>
                                </div>
                            </div>
                        </Link>
                        <Link href={route('agreementarchives.index', mitra.id) + '?filter=no-document&page=1'} className="overflow-hidden bg-white sm:rounded-2xl shadow-lg">
                            <div className="p-4 text-gray-900">
                                <div className="flex">
                                    <div className="flex-auto">
                                    <p>Butuh Tindakan</p>
                                    <p className="font-semibold text-3xl mt-3">{documentNull}</p>
                                    </div>
                                    <div>
                                        <div className="bg-[#fec43d4c] p-3 rounded-3xl">
                                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path opacity="0.4" d="M34.1666 16.9833H29.35C25.4 16.9833 22.1833 13.7667 22.1833 9.81667V5C22.1833 4.08334 21.4333 3.33334 20.5166 3.33334H13.45C8.31663 3.33334 4.16663 6.66667 4.16663 12.6167V27.3833C4.16663 33.3333 8.31663 36.6667 13.45 36.6667H26.55C31.6833 36.6667 35.8333 33.3333 35.8333 27.3833V18.65C35.8333 17.7333 35.0833 16.9833 34.1666 16.9833Z" fill="#fcb205"/>
                                                <path d="M26.3335 3.68333C25.6501 3 24.4668 3.46667 24.4668 4.41667V10.2333C24.4668 12.6667 26.5335 14.6833 29.0501 14.6833C30.6335 14.7 32.8335 14.7 34.7168 14.7C35.6668 14.7 36.1668 13.5833 35.5001 12.9167C33.1001 10.5 28.8001 6.15 26.3335 3.68333Z" fill="#fcb205"/>
                                                <path d="M22.5 22.9167H12.5C11.8167 22.9167 11.25 22.35 11.25 21.6667C11.25 20.9833 11.8167 20.4167 12.5 20.4167H22.5C23.1833 20.4167 23.75 20.9833 23.75 21.6667C23.75 22.35 23.1833 22.9167 22.5 22.9167Z" fill="#fcb205"/>
                                                <path d="M19.1667 29.5833H12.5C11.8167 29.5833 11.25 29.0167 11.25 28.3333C11.25 27.65 11.8167 27.0833 12.5 27.0833H19.1667C19.85 27.0833 20.4167 27.65 20.4167 28.3333C20.4167 29.0167 19.85 29.5833 19.1667 29.5833Z" fill="#fcb205"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <p className="">Last Updated {format(date, 'dd MMMM yyyy')}</p>
                                </div>
                            </div>
                        </Link>
                        <div className="overflow-hidden bg-white sm:rounded-2xl shadow-lg">
                            <div className="p-4 text-gray-900">
                                <Chart 
                                    label={['Pendidikan', 'Pelatihan', 'Abdimas']} 
                                    series={Object.values(seriesBidangKerjasama)}
                                    />
                            </div>
                        </div>
                        {/* {user.is_admin ? (
                            <Link href={route('users.index')} className="overflow-hidden bg-white sm:rounded-2xl shadow-lg">
                                <div className="p-4 text-gray-900">
                                    <div className="flex">
                                        <div className="flex-auto">
                                            <p>User Registered</p>
                                            <p className="font-semibold text-3xl mt-3">{userRegistered}</p>
                                        </div>
                                        <div>
                                            <div className="bg-[#FFF3D6] p-3 rounded-3xl">
                                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path opacity="0.4" d="M14.9999 3.33334C10.6333 3.33334 7.08325 6.88334 7.08325 11.25C7.08325 15.5333 10.4333 19 14.7999 19.15C14.9333 19.1333 15.0666 19.1333 15.1666 19.15C15.1999 19.15 15.2166 19.15 15.2499 19.15C15.2666 19.15 15.2666 19.15 15.2833 19.15C19.5499 19 22.8999 15.5333 22.9166 11.25C22.9166 6.88334 19.3666 3.33334 14.9999 3.33334Z" fill="#FEC53D"/>
                                                    <path d="M23.4666 23.5833C18.8166 20.4833 11.2333 20.4833 6.54994 23.5833C4.43327 25 3.2666 26.9167 3.2666 28.9667C3.2666 31.0167 4.43327 32.9167 6.53327 34.3167C8.8666 35.8833 11.9333 36.6667 14.9999 36.6667C18.0666 36.6667 21.1333 35.8833 23.4666 34.3167C25.5666 32.9 26.7333 31 26.7333 28.9333C26.7166 26.8833 25.5666 24.9833 23.4666 23.5833Z" fill="#FEC53D"/>
                                                    <path opacity="0.4" d="M33.3166 12.2333C33.5833 15.4667 31.2833 18.3 28.0999 18.6833C28.0833 18.6833 28.0833 18.6833 28.0666 18.6833H28.0166C27.9166 18.6833 27.8166 18.6833 27.7333 18.7167C26.1166 18.8 24.6333 18.2833 23.5166 17.3333C25.2333 15.8 26.2166 13.5 26.0166 11C25.8999 9.65 25.4333 8.41667 24.7333 7.36667C25.3666 7.05 26.0999 6.85 26.8499 6.78333C30.1166 6.5 33.0333 8.93333 33.3166 12.2333Z" fill="#FEC53D"/>
                                                    <path d="M36.65 27.65C36.5166 29.2667 35.4833 30.6667 33.75 31.6167C32.0833 32.5333 29.9833 32.9667 27.9 32.9167C29.1 31.8333 29.8 30.4833 29.9333 29.05C30.1 26.9833 29.1167 25 27.15 23.4167C26.0333 22.5333 24.7333 21.8333 23.3167 21.3167C27 20.25 31.6333 20.9667 34.4833 23.2667C36.0167 24.5 36.8 26.05 36.65 27.65Z" fill="#FEC53D"/>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <p className="">Last Updated {format(date, 'dd MMMM yyyy')}</p>
                                    </div>
                                </div>
                            </Link>
                        ) : null} */}
                    </div>

                    <div className="overflow-hidden">
                        <div className="border-t-2 py-4 border-gray-500 flex justify-between items-center">
                            <h1 className="font-medium text-xl uppercase">Recent Implentation Agreement</h1>
                            <Link href={route('agreementarchives.index', mitra.id)}>
                                <ArrowRightCircleIcon className="h-10 w-10 text-orange-700" />
                            </Link>
                        </div>
                    </div>
                    <div className="">
                        <Table mitraId={mitra.id} agreementArchives={agreementArchives}/>
                    </div>

                    <div className="overflow-hidden">
                        <div className="border-t-2 py-4 border-gray-500">
                            <h1 className="font-medium text-xl uppercase">Gallery</h1>
                        </div>
                    </div>
                    <div>
                        <Gallery data={galleries}/>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
