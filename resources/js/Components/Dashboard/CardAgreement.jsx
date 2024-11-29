import { ArrowRightIcon, DocumentArrowDownIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Link, router } from "@inertiajs/react";
import { Chip } from "@material-tailwind/react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function CardAgreement({ data }) {
  
  const deleteSwal = (id) => {
    withReactContent(Swal).fire({
      title: 'Anda yakin?',
      text: 'Anda tidak akan dapat memulihkan data ini!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, hapus!',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Dihapus!',
          text: 'Data telah dihapus.',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        })

        router.delete(route('mitra.delete', id), {
          preserveState: true,
        })
      }
    })
  }

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
        <div className="flex justify-between items-center">
          <div className="text-blue-900 hover:underline mt-3 text-sm flex gap-x-3 items-center">
            Lebih lanjut
            <ArrowRightIcon className="h-4 w-4" />
          </div>
          <div className="flex gap-2">
            {/* <Link href={route('mitra.download', data.dokumen_pks)}>
              <DocumentArrowDownIcon className="h-5 w-5 text-green-500" />
            </Link> */}
            <Link href={route('mitra.edit', data.id)}>
              <PencilSquareIcon className="h-5 w-5 text-blue-800" />
            </Link>
            <Link onClick={() => deleteSwal(data.id)} as="button" className="sticky z-50">
              <TrashIcon className="h-5 w-5 text-red-800" />
            </Link>
          </div>
        </div>
      </div>
    </Link>
  )
}