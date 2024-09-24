/* Module imports ----------------------------------------------------------- */
import {
  utils,
  writeFile,
} from 'xlsx'

/* Type imports ------------------------------------------------------------- */
import type {
  DataType,
  Row,
  Order,
  ColumnHeader,
} from 'types/Table'

/* tableUtils methods ------------------------------------------------------- */
export const getReducedRowContent = (row: Row, path: string): DataType => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return path.split('.').reduce((a, b) => a?.[b] || '', row)
}

const descendingComparator = (a: Row, b: Row, orderBy: string) => {
  if ((getReducedRowContent(b, orderBy)) < (getReducedRowContent(a, orderBy))) {
    return -1
  }
  if ((getReducedRowContent(b, orderBy)) > (getReducedRowContent(a, orderBy))) {
    return 1
  }
  return 0
}

export const getRowsComparator = (order: Order, orderBy: string) => {
  return order === 'desc' ?
    (a: Row, b: Row) => descendingComparator(a, b, orderBy) :
    (a: Row, b: Row) => -descendingComparator(a, b, orderBy)
}

export const exportToXLSX = (cols: ColumnHeader[], data: Row[], name: string) => {
  const rows = data.map((row) => cols.map((col): string =>
    (col.renderForExport?.(getReducedRowContent(row, col.id)) as string ?? getReducedRowContent(row, col.id)).toString().replace(/\r\n/g, '\n')),
  )
  const worksheet = utils.aoa_to_sheet([ cols.map((col) => col.label), ...rows ])
  const workbook = utils.book_new()
  worksheet['!cols'] = cols.map((e, i) => ({ wch: rows.reduce((w, r) => Math.max(w, ...r[i].split('\n').map((e) => e.length)), 10) }))
  utils.book_append_sheet(workbook, worksheet, 'Feuille 1')

  writeFile(workbook, `${name}.xlsx`)
}
