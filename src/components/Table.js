import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useTable,
  useGlobalFilter,
  usePagination,
  useSortBy,
} from "react-table";
import GlobalSearch from "./GlobalSearch";
import "./Table.css";

export default function Table({ data }) {
  const navigate = useNavigate();

  const [api, setapi] = useState(null);

  const onDelete = (id) => {
    console.log("delete", id);
    axios
      .delete(`https://api.escuelajs.co/api/v1/products/${id}`)
      .then((response) => {
        // console.log('Data has been deleted', response.data)
        const getData = () => {
          axios
            .get("https://api.escuelajs.co/api/v1/products")
            .then((getData) => {
              // console.log(getData.status)
              setapi(getData.data);
            });
        };
        getData();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const onEdit = (valuesGet) => {
    let { id, title, description, price, images } = valuesGet;
    // console.log("row", valuesGet)
    localStorage.setItem("id", id);
    localStorage.setItem("title", title);
    localStorage.setItem("description", description);
    localStorage.setItem("price", price);
    localStorage.setItem("image", images);
    navigate("/edit");
  };

  const COLUMNS = [
    {
      Header: "Id",
      accessor: "id",
    },
    {
      Header: "Title",
      accessor: "title",
    },
    {
      Header: "Price",
      accessor: "price",
    },
    {
      Header: "Description",
      accessor: "description",
    },
    {
      Header: "Images",
      accessor: "images",
      Cell: ({ cell: { value } }) => (
        <div>
          <img src={value} alt={value} width={100} />
        </div>
      ),
    },
    {
      Header: "Action",
      accessor: "action",
      Cell: (cell) => (
        // console.log(cell.row.values.id)
        <div>
          <button
            className="bg-light p-2 my-2  border-white border btn-lg"
            onClick={() => onEdit(cell.row.values)}
          >
            Edit
          </button>

          <button
            className="bg-light p-2 my-2 border-white border btn-lg"
            onClick={() => onDelete(cell.row.values.id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];
  const columns = useMemo(() => COLUMNS, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    // rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { pageIndex, pageSize, globalFilter } = state;

  const [theme, setTheme] = useState("light");
  const [dark, setDark] = useState("Dark");
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      setDark("Light");
    } else {
      setTheme("light");
      setDark("Dark");
    }
  };
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.className = theme;
  }, [theme]);

  return (
    <div className={`${theme}`}>
      {/* <button className='btn btn-info mx-2 my-2' onClick={toggleTheme}>{dark}</button> */}

      <GlobalSearch filter={globalFilter} setFilter={setGlobalFilter} />

      <div className="container mt-1">
        <h3 className="text-center">React Table</h3>

        <table
          className={`table table-bordered ${
            theme === "dark" ? "light" : "dark"
          }`}
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr
                className="bg-dark text-light"
                {...headerGroup.getHeaderGroupProps()}
              >
                {headerGroup.headers.map((column) => (
                  <th
                    scope="col"
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render("Header")}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " ▼"
                          : " ▲"
                        : ""}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              // console.log('row',row.id)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    // console.log('cell',cell)
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>

        <div
          className={`container text-center mb-5 p-2 ${
            theme === "dark" ? "light" : "dark"
          }`}
        >
          <strong className="input-group-sm font-weight-bold">
            Go to Page
            <input
              className="rounded border-secondary "
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const pageNumber = e.target.value
                  ? Number(e.target.value) - 1
                  : 0;
                gotoPage(pageNumber);
              }}
            />
          </strong>

          <button
            className="btn btn-dark mx-2 btn-sm font-weight-bold"
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            {" "}
            {"<<"}{" "}
          </button>

          <button
            className="btn btn-dark mx-2 btn-sm font-weight-bold"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            Previous
          </button>
          <span className="font-weight-bold">
            Page{" "}
            <span className="font-weight-bold">
              {pageIndex + 1} of {pageOptions.length}
            </span>{" "}
          </span>
          <button
            className="btn btn-dark mx-2 btn-sm font-weight-bold"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            Next
          </button>

          <button
            className="btn btn-dark mx-2 btn-sm font-weight-bold"
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {" "}
            {">>"}{" "}
          </button>
          <select
            className="mx-2 rounded sm border-secondary bg-dark text-light p-1"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {[5, 10, 15, 20, 25].map((pageSize) => (
              <option className="" key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
