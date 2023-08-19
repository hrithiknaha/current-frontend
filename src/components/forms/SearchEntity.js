const SearchEntity = ({ handleSubmit, setQuery }) => {
    return (
        <form
            className="flex gap-4 items-center justify-between py-4 lg:py-8 lg:px-0 lg:w-3/4 rounded w-full px-4"
            onSubmit={handleSubmit}>
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
                className="bg-orange-500 text-white hover:bg-orange-600 font-semibold py-2 px-4 rounded outline">
                Submit
            </button>
        </form>
    );
};

export default SearchEntity;
