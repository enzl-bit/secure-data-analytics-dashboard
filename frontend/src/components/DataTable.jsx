import React from "react";

export default function DataTable({ data }) {
  if (!data || data.length === 0) return <p>No data to display</p>;

  const columns = Object.keys(data[0]);

  return (
    <table className="min-w-full border border-gray-300">
      <thead className="bg-gray-200">
        <tr>
          {columns.map((col) => (
            <th
              key={col}
              className="border border-gray-300 px-4 py-2 text-left text-sm font-medium"
            >
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr
            key={idx}
            className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
          >
            {columns.map((col) => (
              <td key={col} className="border border-gray-300 px-4 py-2 text-sm">
                {row[col]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
