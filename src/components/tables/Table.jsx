import React from "react";

import "./table.css";


// Data is an array of objects where each object represents a row in the table.
// Table is an array of objects where each object represents a column in the table.
const Table = ({ data, table }) => {

    // Renders table heading, takes in the object "item" with a heading property.
    const TableHeading = ({ item }) => <th>{item.heading}</th>

    // Renders table row, takes in the object "item" with a rowName property.
    // Item is a row in the table.
    const TableRow = ({ item, columns }) => (
        <tr>
            {/* Iterates through each element of columns array, creating a table cell. */}
                
            {columns.map((column, cellIndex) => {
                // Check if the rowName includes a dot, indicating a nested property.
                if(column.rowName.includes(".")){
                    // Split the rowName on the dot to get an array of keys.
                    const itemSplit = column.rowName.split(".")
                    // Access the nested property and return it in a table data element.
                    return <td key={cellIndex}>{item[itemSplit[0]] [itemSplit[1]]}</td>
                };

                // If the rowName is a boolean, return "Yes" or "No" instead of true or false.
                if (typeof item[column.rowName] === "boolean") {
                    return <td key={cellIndex}>{item[column.rowName] ? "Yes" : "No"}</td>;
                }
                
                return <td key={cellIndex}>{item[`${column.rowName}`]}</td>
            })}
        </tr>
    )

    return (
        <table className="content-table">
            <thead>
                <tr>
                    {table.map((heading, index) => <TableHeading key={index} item={heading}/>)}
                </tr>
            </thead>
            <tbody>
                {data.map((rowData, rowIndex) => <TableRow key={rowIndex} item={rowData} columns={table} />)}
            </tbody>
        </table>
    );
};


export default Table;