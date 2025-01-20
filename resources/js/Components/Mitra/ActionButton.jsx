export default function ActionButton({ content }) {
    return (
        <button 
        className="bg-green-600 hover:bg-green-700 transition-transform  px-10 py-[10px] text-white rounded-xl m-2 uppercase font-normal text-xs w-full mx-4">
            {content}
        </button>
    );
}
