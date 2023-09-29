import React from "react";

const StatTable = ({ dataset, header }) => {
    return (
        <div className="shadow overflow-hidden border-b border-gray-200 rounded-lg w-full lg:w-1/3">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-orange-500">
                    <tr>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                            {header}
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                            Movies
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {dataset.slice(0, 10).map((e) => (
                        <tr key={e.name}>
                            <td className="text-sm text-gray-900 px-6 py-4 whitespace-normal">{e.name}</td>
                            <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap">{e.count}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StatTable;
