import { styled } from '@mui/material'
import { DataGrid as MatrialDataGrid } from '@mui/x-data-grid'

const StyledDataGrid = styled(MatrialDataGrid)(({ theme }) => [
  {
    border: 'none',
    '.MuiDataGrid-columnHeaders': {
      fontSize: 16,
      borderTop: `1px solid ${theme.palette.grey[300]}`,
      borderBottom: `1px solid ${theme.palette.grey[300]}`,
      borderRight: `1px solid ${theme.palette.grey[300]}`,
      borderRadius: '8px'
    },
    '.MuiDataGrid-columnHeader': {
      backgroundColor: '#E7E8F7'
    },
    '.MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
      paddingLeft: 12,
      paddingRight: 12
    },
    '.MuiDataGrid-columnHeadersInner > div > div:first-of-type': {
      borderLeft: `1px solid ${theme.palette.grey[300]}`
    },
    '.MuiDataGrid-columnHeader.MuiDataGrid-withBorderColor': {
      borderRadius: '0px',
      borderRight: `1px solid ${theme.palette.grey[300]}`
    },
    '.MuiDataGrid-columnHeaderTitleContainer': {
      borderBottomColor: theme.palette.grey[200]
    },
    '.MuiDataGrid-columnSeparator': {
      display: 'none'
    },
    '.MuiDataGrid-footerContainer.MuiDataGrid-withBorderColor.css-wop1k0-MuiDataGrid-footerContainer' : {
          display: ' none'
    }
  }
])

/**
 *
 * @param {import('@mui/x-data-grid').DataGridProps} props
 */
export default function DataGrid(props) {
  const {
    checkboxSelection = true,
    disableRowSelectionOnClick = false,
    rowCount = 0,
    paginationMode = 'server',
    pageSizeOptions = [10, 25, 50, 100],
    ...dataGridProps
  } = props

  return (
    <StyledDataGrid
      paginationMode={paginationMode}
      experimentalFeatures={{ columnGrouping: true }}
      autoHeight
      checkboxSelection={checkboxSelection}
      disableRowSelectionOnClick={disableRowSelectionOnClick}
      rowCount={rowCount}
      pageSizeOptions={pageSizeOptions}
      {...dataGridProps}
    />
  )
}
