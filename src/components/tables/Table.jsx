import React from "react";

import "./table.css";


const Table = ({ data, table }) => {

    // Renders table heading, takes in the object "item" with a heading property.
    const TableHeading = ({ item }) => <th>{item.heading}</th>


    // Renders table row, takes in the object "item" with a rowName property.
    const TableRow = ({ item, columns }) => (
        <tr>
            {/* 
                Iterates through each element of columns array.
                For each column within columns a table data element is created.
            */}
            {columns.map((column, cellIndex) => {
                if(column.rowName.includes(".")){
                    const itemSplit = column.rowName.split(".")
                    return <td key={cellIndex}>{item[itemSplit[0]] [itemSplit[1]]}</td>
                };

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