import React, { useState } from "react";
import { Upload, CheckCircle, AlertCircle } from "lucide-react";
import { router, useForm, usePage } from "@inertiajs/react";

export default function UploadButton({ content, agrementId }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState(null);

    const handleFileSelect = (event) => {
        const fileInput = event.target;
        if (fileInput.files.length > 0) {
            setSelectedFile(fileInput.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setUploadStatus("error");
            return;
        }

        setIsUploading(true);
        setUploadStatus(null);

        // Simulasi upload dengan timeout
        try {
            // Di sini Anda akan mengganti kode ini dengan actual API call
            // post(route("aggreement.update.dokumen_kerjasama", selectedFile));
            router.post(
                route("aggreement.update.dokumen_kerjasama", agrementId),
                {
                    dokumen_kerjasama: selectedFile,
                }
            );

            // Simulasi API call
            await new Promise((resolve) => setTimeout(resolve, 2000));

            setUploadStatus("success");
            setSelectedFile(null);
        } catch (error) {
            setUploadStatus("error");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="mx-auto w-full">
            <div className="">
                <input
                    type="file"
                    id="document-upload"
                    className="hidden"
                    onChange={handleFileSelect}
                    accept=".pdf,.doc,.docx"
                />

                <div className="flex flex-col items-center gap-3">
                    {selectedFile && (
                        <div className="text-sm text-gray-600">
                            File terpilih: {selectedFile.name}
                        </div>
                    )}

                    <label
                        htmlFor="document-upload"
                        className="w-full bg-green-600 text-white py-2 px-4 rounded-md text-center cursor-pointer hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                    >
                        <Upload size={20} />
                        {content}
                    </label>

                    {selectedFile && (
                        <button
                            onClick={handleUpload}
                            disabled={isUploading}
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors disabled:bg-gray-400"
                        >
                            {isUploading ? "Mengupload..." : "Kirim Dokumen"}
                        </button>
                    )}
                </div>

                {uploadStatus && (
                    <div
                        className={`flex items-center gap-2 justify-center ${
                            uploadStatus === "success"
                                ? "text-green-600"
                                : "text-red-600"
                        }`}
                    >
                        {uploadStatus === "success" ? (
                            <>
                                <CheckCircle size={20} />
                                <span>Upload berhasil!</span>
                            </>
                        ) : (
                            <>
                                <AlertCircle size={20} />
                                <span>Upload gagal. Silakan coba lagi.</span>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
