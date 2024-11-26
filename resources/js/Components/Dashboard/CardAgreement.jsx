import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Link } from "@inertiajs/react";
import { Chip } from "@material-tailwind/react";

export default function CardAgreement({ data }) {
  console.log(data);
  return (
    <Link href={route('mitra.detail', data.id)}>
      <div className="p-5 border rounded-xl shadow bg-white">
        <p className="font-medium text-xl">{data.nama_instansi}</p>
        <div className="flex gap-x-2 mt-3">
          <div className="bg-blue-50 text-blue-900 rounded-md px-3 py-1 text-xs font-medium">
            <p>{data.asal_mitra}</p>
          </div>
          <div className="bg-blue-700 text-white rounded-md px-3 py-1 text-xs font-medium">
            <p>{data.kriteria_mitra}</p>
          </div>
        </div>
        <div className="my-4 text-sm text-gray-600">
          {data.deskripsi_instansi.length > 30 ? `${data.deskripsi_instansi.substring(0, 30)}...` : data.deskripsi_instansi}
        </div>
        <div className="text-blue-900 hover:underline mt-3 text-sm flex gap-x-3 items-center">
          Lebih lanjut
          <ArrowRightIcon className="h-4 w-4" />
        </div>
      </div>
    </Link>
  )
}