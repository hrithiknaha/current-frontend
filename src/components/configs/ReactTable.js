import { useState } from "react";
import { flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";

export const ReactTable = ({ dataset, type, count, fetchMovies }) => {
    const [data, setData] = useState(dataset);

    const columns = [
        {
            accessorKey: "name",
            header: type,
            cell: (props) => <p>{props.getValue()}</p>,
        },
        {
            accessorKey: "count",
            header: count,
            cell: (props) => <p>{props.getValue()}</p>,
        },
    ];

    const table = useReactTable({
        data,
        columns,
        state: {},
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <>
            <div className="shadow overflow-hidden border-b border-gray-200 rounded-lg w-full lg:w-1/3">
                <table className={`${table.getTotalSize()} min-w-full divide-y divide-gray-200`}>
                    <thead className="bg-orange-500">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id} className="bg-orange-500 text-white">
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className={`${header.getSize()} px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider`}>
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {table.getRowModel().rows.map((row, index) => (
                            <tr
                                key={row.id}
                                className={
                                    index % 2 === 0
                                        ? "bg-white hover:cursor-pointer hover:bg-gray-300"
                                        : "bg-gray-100 hover:cursor-pointer hover:bg-gray-300"
                                }
                                onClick={() => fetchMovies(row.original, type.toUpperCase())}>
                                {row.getVisibleCells().map((cell) => (
                                    <td
                                        key={cell.id}
                                        className={`${cell.column.getSize()} text-sm text-gray-900 px-6 py-4 whitespace-normal`}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-between items-center mt-4">
                    <div className="text-orange-500 px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                        Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                    </div>
                    <div>
                        <button
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                            className="px-4 py-2 bg-orange-500 text-white rounded-l">
                            {"<"}
                        </button>
                        <button
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                            className="px-4 py-2 bg-orange-500 text-white rounded-r">
                            {">"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
