import {
  Grid,
  Typography,
  Box,
  useMediaQuery,
  useTheme,
  Button,
} from '@material-ui/core'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { useEffect, useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { teal } from '@material-ui/core/colors'
import { connect } from 'react-redux'
import { useStyles } from './Styles'
import { Toast } from 'primereact/toast'
import {
  groupPendingActionDetails,
  groupPendingActionTableHeaders,
} from './tableHeaders'
import { reset_mygrouppendingAction } from '../../redux/Actions/PendingAction/Action'
import { routes } from '../../util/Constants'
import { putClaimTaskAPI } from '../../api/Fetch'

function GroupPendingAction(props: any) {
  const { reset_mygrouppendingAction, mygroupPendingAction, userDetail } = props
  const { DEFAULT, DASHBOARD } = routes
  const theme = useTheme()
  const classes = useStyles()
  const history = useHistory()
  const [globalFilter, setGlobalFilter] = useState('')
  const [unassignUser, setUnassignUser] = useState([])
  const toast = useRef<any>(null)
  const [myGroupPendingActionDetails, setMyGroupPendingActionDetails] =
    useState([])
  const active = useMediaQuery(theme.breakpoints.down('sm'))

  const goBack = () => {
    reset_mygrouppendingAction()
    history.goBack()
  }
  useEffect(() => {
    return () => {
      reset_mygrouppendingAction()
    }
  }, [])
  useEffect(() => {
    if (!mygroupPendingAction) history.push(`${DEFAULT}${DASHBOARD}`)
  }, [mygroupPendingAction, history, DEFAULT, DASHBOARD])
  useEffect(() => {
    if (mygroupPendingAction) {
      setMyGroupPendingActionDetails(mygroupPendingAction[0].tasks)
    }
  }, [mygroupPendingAction])

  useEffect(() => {
    console.log(unassignUser)
  }, [unassignUser])

  const handleAssign = () => {
    if (unassignUser.length > 0) {
      const assignPayload = {
        requestorDetails: {
          emailId: userDetail && userDetail.userdetails[0].user.emailId,
          requestBy: userDetail && userDetail.userdetails[0].user.userId,
          requestType: 'Assign',
          requestDate: new Date().toISOString().split('T')[0],
        },
        requestorRoles:
          userDetail &&
          userDetail.userdetails[0].roles.map((role: any) => {
            return {
              roleId: role.roleId,
            }
          }),
        // submitFlag: 'Assign',
      }
      const taskIds =
        unassignUser && unassignUser.map((item: any) => item.taskId)

      for (let i = 0; i < taskIds.length; i++) {
        putClaimTaskAPI &&
          putClaimTaskAPI(assignPayload, taskIds[i])
            .then((res) => {
              console.log(res.data)
              // if (res.data.status.toLowerCase() !== 'failed') {
              toast.current.show({
                severity: 'success',
                summary: taskIds[i],
                detail: res.data.comments,
                life: 6000,
                className: 'login-toast',
              })
              // } else {
              //   toast.current.show({
              //     severity: 'error',
              //     summary: 'Error!',
              //     detail: res.data.comments,
              //     life: 6000,
              //     className: 'login-toast',
              //   })
              // }
            })
            .catch((err) => {
              toast.current.show({
                severity: 'error',
                summary: 'Error!',
                // detail: `${err.response.status} from tasklistapi`,
                detail: err.response.data.errorMessage,
                life: 6000,
                className: 'login-toast',
              })
            })
      }
    }
  }
  return (
    <>
      <Toast ref={toast} position="bottom-left" />
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
                  <Typography variant="h6">Pending Action</Typography>
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
                  <button className={classes.exploreButton} onClick={goBack}>
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
                {!active ? (
                  <DataTable
                    value={myGroupPendingActionDetails}
                    paginator
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
                    rows={10}
                    style={{
                      width: '100%',
                    }}
                    selection={unassignUser}
                    onSelectionChange={(e) => setUnassignUser(e.value)}
                    scrollable
                    scrollHeight="flex"
                    globalFilter={globalFilter}
                    emptyMessage="No users found."
                    showGridlines
                    //loading={manageUserLoading}
                  >
                    <Column
                      selectionMode="multiple"
                      headerStyle={{
                        width: '3em',
                        backgroundColor: teal[900],
                        color: 'white',
                      }}
                    ></Column>
                    {groupPendingActionTableHeaders.map((column) => {
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
                          // sortable
                        />
                      )
                    })}
                  </DataTable>
                ) : (
                  <DataTable
                    value={myGroupPendingActionDetails}
                    paginator
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
                    rows={10}
                    style={{
                      width: '100%',
                    }}
                    selection={unassignUser}
                    onSelectionChange={(e) => setUnassignUser(e.value)}
                    scrollable
                    scrollHeight="flex"
                    globalFilter={globalFilter}
                    emptyMessage="No users found."
                    showGridlines
                    //loading={manageUserLoading}
                  >
                    <Column
                      selectionMode="multiple"
                      headerStyle={{
                        width: '3em',
                        backgroundColor: teal[900],
                        color: 'white',
                      }}
                    ></Column>
                    {groupPendingActionTableHeaders.map((column) => {
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
                )}
              </Box>
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
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  size="small"
                  onClick={handleAssign}
                >
                  Assign to Me
                </Button>
              </Box>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (state: any) => {
  return {
    mygroupPendingAction: state.pendingActionReducer.mygroupPendingAction,
    userDetail: state.loginReducer.userDetail,
    // mygroupUnassignTasks: state.pendingActionReducer.mygroupUnassignTasks,
  }
}
const matchDispatchToProps = (dispatch: any) => {
  return {
    reset_mygrouppendingAction: () => dispatch(reset_mygrouppendingAction()),
  }
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(GroupPendingAction)
