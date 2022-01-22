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
import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { teal } from '@material-ui/core/colors'
import { useStyles } from './Styles'
import { Toast } from 'primereact/toast'
import {
  pendingActionDetails,
  pendingActionTableHeaders,
} from '../PendingAction/tableHeader'
import { reset_mygroupunassignAction } from '../../redux/Actions/PendingAction/Action'
import { routes } from '../../util/Constants'
import { putClaimTaskAPI } from '../../api/Fetch'
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent'

function UnassignWorkflow(props: any) {
  const { reset_mygroupunassignAction, mygroupUnassignTasks, userDetail } =
    props
  const { DEFAULT, DASHBOARD } = routes
  const theme = useTheme()
  const classes = useStyles()
  const history = useHistory()
  const [globalFilter, setGlobalFilter] = useState('')
  const [unassignUser, setUnassignUser] = useState([])
  const toast = useRef<any>(null)
  const active = useMediaQuery(theme.breakpoints.down('sm'))
  const [myGroupUnassignedTasks, setMyGroupUnassignedTasks] = useState([])
  //
  const [isProgressLoader, setIsProgressLoader] = React.useState(false)
  //

  const goBack = () => {
    reset_mygroupunassignAction()
    history.goBack()
  }
  useEffect(() => {
    return () => {
      reset_mygroupunassignAction()
    }
  }, [])
  useEffect(() => {
    if (!mygroupUnassignTasks) history.push(`${DEFAULT}${DASHBOARD}`)
  }, [mygroupUnassignTasks, history, DEFAULT, DASHBOARD])
  useEffect(() => {
    if (mygroupUnassignTasks) {
      setMyGroupUnassignedTasks(mygroupUnassignTasks[0].tasks)
    }
  }, [mygroupUnassignTasks])

  useEffect(() => {
    console.log(unassignUser)
  }, [unassignUser])

  const handleAssign = () => {
    setIsProgressLoader(true)
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
        //submitFlag: 'Assign',
      }
      const taskIds =
        unassignUser && unassignUser.map((item: any) => item.taskId)
      console.log(taskIds)

      for (let i = 0; i < taskIds.length; i++) {
        putClaimTaskAPI &&
          putClaimTaskAPI(assignPayload, taskIds[i])
            .then((res) => {
              console.log(res.data)
              setIsProgressLoader(false)
              if (res && isProgressLoader === false) {
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
              }
            })
            .catch((err) => {
              setIsProgressLoader(false)
              if (err.response && isProgressLoader === false) {
                toast.current.show({
                  severity: 'error',
                  summary: 'Error!',
                  //detail: `${err.response.status} from tasklistapi`,
                  detail: err.response.data.errorMessage,
                  life: 6000,
                  className: 'login-toast',
                })
              }
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
                  <Typography variant="h6">Unassign Workflow</Typography>
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
                    value={myGroupUnassignedTasks}
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
                    {pendingActionTableHeaders.map((column) => {
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
                    value={myGroupUnassignedTasks}
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
                    {pendingActionTableHeaders.map((column) => {
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
          <div>
            <LoadingComponent showLoader={isProgressLoader} />
          </div>
        </div>
      </div>
    </>
  )
}
const mapStateToProps = (state: any) => {
  return {
    mygroupUnassignTasks: state.pendingActionReducer.mygroupUnassignTasks,
    userDetail: state.loginReducer.userDetail,
  }
}
const matchDispatchToProps = (dispatch: any) => {
  return {
    reset_mygroupunassignAction: () => dispatch(reset_mygroupunassignAction()),
  }
}

export default connect(mapStateToProps, matchDispatchToProps)(UnassignWorkflow)
