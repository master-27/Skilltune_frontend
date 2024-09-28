const Loader = () => {
    return (
        <div className="fixed inset-0 flex justify-center items-center backdrop-blur-md bg-black bg-opacity-30 z-50">
            <div className="w-16 h-16 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin opacity-70"></div>
        </div>
    );
};

export default Loader;
