/* Framework imports -------------------------------------------------------- */
import React, {
  useEffect,
  useState,
} from 'react'
import styled from '@emotion/styled'

/* Module imports ----------------------------------------------------------- */
import {
  getReducedRowContent,
  getRowsComparator,
} from 'helpers/tableUtils'

/* Component imports -------------------------------------------------------- */
import {
  Pagination,
  Table as MuiTable,
  TableContainer,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TableSortLabel,
  Checkbox,
  Select,
  MenuItem,
  IconButton,
} from '@mui/material'
import {
  ArrowBackIosNewRounded,
  ArrowForwardIosRounded,
} from '@mui/icons-material'

/* Type imports ------------------------------------------------------------- */
import type { SelectChangeEvent } from '@mui/material'
import type {
  ColumnHeader,
  DataName,
  Row,
  Order,
} from 'types/Table'

/* Types declaration -------------------------------------------------------- */
interface TableSorting {
  setOrder: (newOrder: Order) => void;
  setOrderBy: (newOrderBy: string) => void;
}

interface TablePagination {
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  totalRows?: number;
}

interface TableDefaultOrder {
  order: Order;
  orderBy: DataName;
}

/* Styled components -------------------------------------------------------- */
const TableCellHeader = styled(TableCell)`
  color: ${(props) => props.theme.palette.secondary.main};
  font-weight: bold;
  text-transform: uppercase;
  padding: 10px;
`

const DataTableCell = styled(TableCell)`
  padding: 10px;
`

const PaginationContainer = styled.div`
  padding: 15px 0px 15px 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: end;
  align-items: center;
`

const ChangeAmountContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 20px;
  div {
    max-width: 100px;
  }
`

/* Component declaration ---------------------------------------------------- */
interface TableProps {
  rows: Row[];
  setRows: (rows: Row[]) => void;
  colHeaders: ColumnHeader[];
  selected?: Row[];
  setSelected?: (rows: Row[]) => void;
  onRowClick?: (row: Row) => void;
  limit?: number;
  pagination?: TablePagination;
  defaultOrder?: TableDefaultOrder;
  sorting?: TableSorting;
  resultsPerPage?: number[];
}

const Table: React.FC<TableProps> = ({
  rows,
  setRows,
  colHeaders,
  selected = [],
  setSelected,
  onRowClick,
  limit = 10,
  pagination,
  defaultOrder,
  sorting,
  resultsPerPage = [ 5, 10, 25, 50 ],
}) => {
  const [ firstSort, setFirstSort ] = useState<boolean>(false)
  const [ order, setOrder ] = useState<Order>(defaultOrder?.order ?? 'asc')
  const [ orderBy, setOrderBy ] = useState<DataName>(defaultOrder?.orderBy || '')
  const [ page, setPage ] = useState<number>(0)
  const [ rowsPerPage, setRowsPerPage ] = useState<number>(limit)

  useEffect(() => {
    if (defaultOrder && rows.length > 0 && !firstSort) {
      setRows(rows.slice().sort(getRowsComparator(defaultOrder.order, defaultOrder.orderBy)))
      setFirstSort(true)
    }
  }, [ rows, firstSort, defaultOrder ])

  useEffect(() => {
    setPage(0)
    pagination?.setPage(1)
  }, [ pagination?.totalRows ])

  const handleSort = (property: DataName) => () => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    sorting && sorting.setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
    sorting && sorting.setOrderBy(property)
    setRows(rows.slice().sort(getRowsComparator(isAsc ? 'desc' : 'asc', property)))
  }

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!setSelected) {
      return
    }
    if (event.target.checked) {
      const newSelected: Row[] = rows.map((n) => n)
      setSelected(newSelected)
      return
    }
    setSelected([])
  }

  const handleRowClick = (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>, clickedRow: Row) => {
    const selectedIndex = selected.indexOf(clickedRow)
    let newSelected: Row[] = []

    if (onRowClick && (event.target as HTMLTableRowElement).localName !== 'input') {
      onRowClick(clickedRow)
      return
    }
    if (!setSelected) {
      return
    }
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, clickedRow)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      )
    }
    setSelected(newSelected)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage - 1)
    pagination && pagination.setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: SelectChangeEvent<number>) => {
    const value = event.target.value as number
    setRowsPerPage(value)
    setPage(0)
    pagination && pagination.setPage(1)
    pagination && pagination.setLimit(value)
  }

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ?
    // is server side ?
    pagination ?
    // only calculate with server values
      Math.max(0, rowsPerPage - rows.length) :
    // calculate with client side pagination
      Math.max(0, (page + 1) * rowsPerPage - rows.length) :
    // if first page then don't display empty rows
    0

  return (
    <>
      <TableContainer>
        <MuiTable>
          <TableHead>
            <TableRow>
              {
                setSelected !== undefined &&
                  <TableCell padding="none">
                    <Checkbox
                      color="primary"
                      indeterminate={selected.length > 0 && selected.length < rows.length}
                      checked={rows.length > 0 && selected.length === rows.length}
                      onChange={handleSelectAllClick}
                    />
                  </TableCell>
              }
              {
                colHeaders.map((col, index) => (
                  <TableCellHeader
                    key={`${col.id}-${index}`}
                    padding={col.disablePadding ? 'none' : 'normal'}
                    sortDirection={orderBy === (col.sortId ?? col.id) ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy === (col.sortId ?? col.id)}
                      direction={orderBy === (col.sortId ?? col.id) ? order : 'asc'}
                      onClick={handleSort(col.sortId ?? col.id)}
                    >
                      {col.label}
                    </TableSortLabel>
                  </TableCellHeader>
                ))
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {
              rows.slice((pagination ? 0 : (page * rowsPerPage)), page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = selected.indexOf(row) !== -1

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleRowClick(event, row)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={`${Object.entries(row).toString()}-${index}`}
                      selected={isItemSelected}
                    >
                      {
                        setSelected !== undefined &&
                          <TableCell padding="none">
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                            />
                          </TableCell>
                      }
                      {
                        colHeaders.map((col, colIndex) => (
                          <DataTableCell
                            key={`${col.id}-${index}-${colIndex}`}
                            padding={col?.disablePadding ? 'none' : 'normal'}
                            align={col?.align ?? 'left'}
                          >
                            {
                              col.render !== undefined ?
                                col.render(getReducedRowContent(row, col.id), row) :
                                getReducedRowContent(row, col.id)
                            }
                          </DataTableCell>
                        ))
                      }
                    </TableRow>
                  )
                })
            }
            {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              [ ...Array(emptyRows) ].map((row, index) => (
                <TableRow key={`${index}`}>
                  <DataTableCell colSpan={colHeaders.length} />
                </TableRow>
              ))
            }
          </TableBody>
        </MuiTable>
      </TableContainer>
      <PaginationContainer>
        <ChangeAmountContainer>
          Résultats par page :
          <Select
            value={rowsPerPage}
            onChange={handleChangeRowsPerPage}
            variant="outlined"
            size="small"
          >
            {
              resultsPerPage.map((value) => (
                <MenuItem
                  value={value}
                  key={value}
                >
                  {value}
                </MenuItem>
              ))
            }
          </Select>
        </ChangeAmountContainer>
        {
          pagination && !pagination.totalRows ?
            <div>
              <IconButton
                disabled={page === 0}
                color="secondary"
                onClick={() => handleChangePage(null, page)}
              >
                <ArrowBackIosNewRounded />
              </IconButton>
              <IconButton
                disabled={rows.length < rowsPerPage}
                color="secondary"
                onClick={() => handleChangePage(null, page + 2)}
              >
                <ArrowForwardIosRounded />
              </IconButton>
            </div> :
            <Pagination
              count={Math.ceil((pagination?.totalRows ?? rows.length) / rowsPerPage)}
              page={page + 1}
              onChange={handleChangePage}
            />
        }
      </PaginationContainer>
    </>
  )
}

export default Table
