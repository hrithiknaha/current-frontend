import React from "react";

const StatTable = ({ dataset, header }) => {
    return (
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
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
                            <td className="px-6 py-4 whitespace-normal">
                                <div className="text-sm text-gray-900">{e.name}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{e.count}</div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StatTable;
