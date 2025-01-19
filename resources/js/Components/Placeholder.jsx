export default function Placeholder({ content, value }) {
    return (
        <div className="mb-4">
            <div className="flex gap-[70px]">
                <p className="w-28">{content}</p>
                <p>{value}</p>
            </div>
        </div>
    );
}
