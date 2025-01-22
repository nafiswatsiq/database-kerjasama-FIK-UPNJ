export default function DownloadButton({ className = "", content, link }) {
    return (
        <div className={className}>
            <a
                href={link}
                target="_blank"
                className={
                    "bg-green-600 hover:bg-green-700 transition-transform px-10 py-[10px] text-white rounded-xl m-2 uppercase font-normal text-xs text-center flex flex-wrap justify-center"
                }
            >
                {content}
            </a>
        </div>
    );
}
