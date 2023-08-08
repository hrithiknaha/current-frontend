const SearchEntity = ({ handleSubmit, setQuery }) => {
    return (
        <form className="flex gap-4 items-center justify-between py-8 rounded w-3/4" onSubmit={handleSubmit}>
            <input
                type="text"
                id="query"
                name="query"
                className="w-full border border-gray-300 rounded p-2"
                placeholder="Search Entities"
                onChange={(e) => setQuery(e.target.value)}
            />

            <button
                type="submit"
                className="bg-white hover:bg-blue-500 text-blue-500 hover:text-white font-semibold py-2 px-4 rounded outline">
                Submit
            </button>
        </form>
    );
};

export default SearchEntity;
