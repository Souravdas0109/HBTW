import {
  Grid,
  Typography,
  Box,
  useMediaQuery,
  useTheme,
} from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { teal } from '@material-ui/core/colors'
import { connect } from 'react-redux'
import { useStyles } from './Styles'
import {
  inprogressTaskDetails,
  inprogressTaskTableHeaders,
} from './tableHeader'
import { reset_myinprogressAction } from '../../redux/Actions/PendingAction/Action'
import { routes } from '../../util/Constants'

function InprogressTask(props: any) {
  const { myinprogressTasks, reset_myinprogressAction } = props
  const { DEFAULT, DASHBOARD } = routes
  const history = useHistory()
  const theme = useTheme()
  const classes = useStyles()
  const [globalFilter, setGlobalFilter] = useState('')
  const [inProgressTasksDetails, setInprogressTasksDetails] = useState([])
  const active = useMediaQuery(theme.breakpoints.down('sm'))

  const goBack = () => {
    reset_myinprogressAction()
    history.goBack()
  }
  useEffect(() => {
    return () => {
      reset_myinprogressAction()
    }
  }, [])
  useEffect(() => {
    if (!myinprogressTasks) history.push(`${DEFAULT}${DASHBOARD}`)
  }, [myinprogressTasks, history, DEFAULT, DASHBOARD])
  useEffect(() => {
    if (myinprogressTasks) {
      setInprogressTasksDetails(myinprogressTasks[0].tasks)
    }
  }, [myinprogressTasks])
  return (
    <div className={classes.root}>
      <div className={classes.value}>
        <Grid container className={classes.container}>
          <Grid item sm={12} xs={12}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                p: 2,
                width: '100%',
                flexWrap: 'wrap',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexGrow: 1,
                }}
              >
                <Typography variant="h6">My Task {'>'} In-progress</Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                }}
              >
                <input
                  type="text"
                  value={globalFilter}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                  placeholder={' Search details here '}
                  style={{
                    width: '200px',
                  }}
                />
              </Box>
              <Box
                sx={{
                  paddingLeft: 20,
                }}
              >
                <button
                  className={classes.backButton}
                  onClick={goBack}
                  type="button"
                >
                  Back
                </button>
              </Box>
            </Box>
            <Box
              sx={{
                textAlign: 'center',
                p: 2,
              }}
            >
              {/* {!active ? ( */}
              <DataTable
                value={inProgressTasksDetails}
                rowHover
                paginator
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
                currentPageReportTemplate="{first} - {last} of {totalRecords}"
                stateStorage="session"
                stateKey="dt-state-demo-session-inprogresstask"
                rows={10}
                style={{
                  width: '100%',
                }}
                scrollable
                scrollHeight="flex"
                globalFilter={globalFilter}
                emptyMessage="No users found."
                showGridlines
                //loading={manageUserLoading}
              >
                {inprogressTaskTableHeaders.map((column) => {
                  return (
                    <Column
                      key={column.field}
                      field={column.field}
                      header={column.headerName}
                      bodyStyle={{
                        fontSize: '12px',
                        width: column.width,
                        overflowX: 'auto',
                      }}
                      headerStyle={{
                        fontSize: '12px',
                        width: column.width,
                        backgroundColor: teal[900],
                        color: 'white',
                      }}
                      // body={
                      //   column.field === 'requestedId' && requestIdTemplate
                      // }
                      sortable
                    />
                  )
                })}
              </DataTable>
              {/* ) : (
                <DataTable
                  value={inProgressTasksDetails}
                  rowHover
                  paginator
                  paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
                  currentPageReportTemplate="{first} - {last} of {totalRecords}"
                  stateStorage="session"
                  stateKey="dt-state-demo-session"
                  rows={10}
                  style={{
                    width: '100%',
                  }}
                  scrollable
                  scrollHeight="flex"
                  globalFilter={globalFilter}
                  emptyMessage="No users found."
                  showGridlines
                  //loading={manageUserLoading}
                >
                  {inprogressTaskTableHeaders.map((column) => {
                    return (
                      <Column
                        key={column.field}
                        field={column.field}
                        header={column.headerName}
                        bodyStyle={{
                          fontSize: '12px',
                          width: column.width,
                          overflowX: 'auto',
                        }}
                        headerStyle={{
                          fontSize: '12px',
                          width: column.width,
                          backgroundColor: teal[900],
                          color: 'white',
                        }}
                        // body={
                        //   column.field === 'requestedId' && requestIdTemplate
                        // }
                        sortable
                      />
                    )
                  })}
                </DataTable>
              )} */}
            </Box>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}
const mapStateToProps = (state: any) => {
  return {
    //mypendingAction: state.pendingActionReducer.mypendingAction,
    myinprogressTasks: state.pendingActionReducer.myinprogressTasks,
    // mygroupPendingAction: state.pendingActionReducer.mygroupPendingAction,
    // mygroupUnassignTasks: state.pendingActionReducer.mygroupUnassignTasks,
  }
}
const matchDispatchToProps = (dispatch: any) => {
  return {
    reset_myinprogressAction: () => dispatch(reset_myinprogressAction()),
  }
}

export default connect(mapStateToProps, matchDispatchToProps)(InprogressTask)
