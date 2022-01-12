import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  useTheme,
  useMediaQuery,
  Paper,
  Grid,
} from '@material-ui/core'

import { styled } from '@material-ui/styles'
import React, { useRef } from 'react'
import { useHistory } from 'react-router-dom'
// import SideBar from '../Layout/SideBar'
import Select from 'react-select'
import { components } from 'react-select'
import { taskList } from '../../util/Constants'
import { constants } from '../UserCreate/DataConstants'
import { useEffect } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
// import 'primeicons/primeicons.css';
// import 'primereact/resources/themes/fluent-light/theme.css';
import 'primereact/resources/themes/saga-green/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import { teal } from '@material-ui/core/colors'
import { connect } from 'react-redux'
import { reset_empID } from '../../redux/Actions/ManageUser/Action'
import { Toast } from 'primereact/toast'
import { fieldWidth, useStyles } from './Styles'
import {
  getUserGroupAPI,
  putUserDetailsAPI,
  putUserDetailsCamundaAPI,
  postTaskLogsAPI,
  getTasklistsAllAPI,
  getTasklogsAPI,
  postFileAttachmentAPI,
} from '../../api/Fetch'
import { UtilityFunctions } from '../../util/UtilityFunctions'
import { routes, extensions } from '../../util/Constants'

const Input = styled('input')({
  display: 'none',
})

function UpdateUser(props: any) {
  const { empDetails, reset_empID, rolesArray, appFuncList, userDetail } = props
  const history = useHistory()
  const classes = useStyles()
  const theme = useTheme()
  const { DEFAULT, DASHBOARD, USERCONFIG_USERMANAGE } = routes
  const active = useMediaQuery(theme.breakpoints.down(750))
  const forbutton = useMediaQuery(theme.breakpoints.down(400))
  const width = useMediaQuery(theme.breakpoints.up('md'))
  const dialogwidth = width ? 600 : fieldWidth
  const [roleNames, setRoleNames] = React.useState([])
  // const [anchorEl, setAnchorEl] = React.useState(null);

  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [middleName, setMiddleName] = React.useState('')
  const [requestType, setRequestType] = React.useState('')
  const [selectEmployeeID, setSelectEmployeeID] = React.useState<any>('')
  const [employeeID, setEmployeeID] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [designation, setDesignation] = React.useState<any>('')
  const [status, setStatus] = React.useState('')
  const [statusWithValue, setStatusWithValue] = React.useState('')
  const [comments, setComments] = React.useState('')
  const [wrongExtn, setWrongExtn] = React.useState(false)
  const [referenceDoc, setReferenceDoc] = React.useState<any>('')
  const [viewLogEl, setViewLogEl] = React.useState(null)
  const viewLogOpen = Boolean(viewLogEl)
  const [groupData, setGroupData] = React.useState<any>('')
  const [groups, setGroups] = React.useState([])
  const [groupInput, setGroupInput] = React.useState([])
  const [groupOpen, setGroupOpen] = React.useState(false)
  const [cancelOpen, setCancelOpen] = React.useState(false)
  const [additionalInfo, setAdditionalInfo] = React.useState('')
  const [openAdditional, setOpenAdditional] = React.useState(false)
  const [roles, setRoles] = React.useState([])
  const [tasks, setTasks] = React.useState(taskList)
  const [referenceDocData, setReferenceDocData] = React.useState<any>('')
  const [taskSelected, setTaskSelected] = React.useState<any>(null)
  const [taskOpen, setTaskOpen] = React.useState(false)
  const [requestId, setRequestId] = React.useState('')
  const [viewLogRows, setViewLogRows] = React.useState<Array<any>>([])
  const toast = useRef<any>(null)

  useEffect(() => {
    return () => reset_empID()
  }, [])

  useEffect(() => {
    if (!empDetails) {
      history.push(`${DEFAULT}${USERCONFIG_USERMANAGE}`)
    } else {
      console.log(empDetails[0])
      setSelectEmployeeID(empDetails[0])
      setTasks(taskList)

      if (rolesArray) {
        const rolesArrayCopy = JSON.parse(JSON.stringify(rolesArray))
        const rolesValues =
          rolesArrayCopy &&
          rolesArrayCopy.roles.map((role: any) => {
            return {
              label: role.roleName,
              value: role.roleId,
              roleId: role.roleId,
              roleName: role.roleName,
              roleDesc: role.roleDesc,
            }
          })
        setRoles(rolesValues)
        console.log(rolesValues)
      }

      getUserGroupAPI &&
        getUserGroupAPI()
          .then((res) => {
            const groupValues = res.data.usergroups.map((group: any) => {
              return {
                label: group.groupName,
                value: group.groupId,
                groupId: group.groupId,
                groupName: group.groupName,
                status: group.status,
              }
            })
            setGroupData(groupValues)
          })
          .catch((err) => {
            console.log(err)
          })

      getTasklistsAllAPI &&
        getTasklistsAllAPI(empDetails[0].userId)
          .then((res) => {
            console.log(res.data)
            setRequestId(res.data.tasklists[0].requestId)
          })
          .catch((err) => {
            setViewLogRows([])
          })
    }
  }, [rolesArray, empDetails, history, USERCONFIG_USERMANAGE, DEFAULT])

  useEffect(() => {
    if (requestId && requestId !== '') {
      getTasklogsAPI &&
        getTasklogsAPI(requestId)
          .then((res) => {
            console.log(res.data)
            setViewLogRows([...res.data.tasklogs])
          })
          .catch((err) => {
            setViewLogRows([])
          })
    }
  }, [requestId])

  const goBack = () => {
    reset_empID()
    history.goBack()
  }

  const customStyles = {
    option: (provided: any, state: any) => ({
      ...provided,
      borderColor: '#004d40',
      backgroundColor: state.isSelected ? '#004d40' : 'white',
      color: state.isSelected ? 'white' : '#004d40',
    }),
  }

  const roleSelectStyle = {
    option: (provided: any, state: any) => ({
      ...provided,
      borderColor: teal[900],
      backgroundColor: state.isSelected ? teal[900] : 'white',
      color: state.isSelected ? 'white' : teal[900],
    }),
  }

  // const handleReset = () => {
  //   setRoleNames([]);
  const handleFileUpload = (event: any) => {
    setWrongExtn(false)
    setReferenceDoc(event.target.files[0])
    const checkextension = event.target.files[0]
      ? new RegExp(
          '(' + extensions.join('|').replace(/\./g, '\\.') + ')$',
          'i'
        ).test(event.target.files[0].name)
      : false
    if (checkextension) {
      setWrongExtn(false)
    } else if (event.target.files[0]) {
      setWrongExtn(true)
    }
    if (event.target.files[0] && checkextension) {
      // let reader = new FileReader();
      // reader.readAsDataURL(event.target.files[0]);

      // reader.onload = (e: any) => {
      //   console.log(e.target.result);
      setReferenceDocData(event.target.files[0])
      // };
    }
  }
  // };
  const onrequestTypeChange = (e: any) => {
    setRequestType(e.target.value)
  }
  useEffect(() => {
    console.log(requestType)
  }, [requestType])

  const Option = (props: any) => {
    return (
      <div>
        <components.Option {...props}>
          <input
            type="checkbox"
            checked={props.isSelected}
            onChange={() => {}}
          />{' '}
          <label>{props.label}</label>
        </components.Option>
      </div>
    )
  }

  const handleRoleChange1 = (selected: any) => {
    console.log(selected)
    setRoleNames(selected)
  }

  const postTasklog = (logData: any) => {
    postTaskLogsAPI &&
      postTaskLogsAPI(logData)
        .then((res) => {
          toast.current.show({
            severity: 'success',
            summary: '',
            detail: res.data.message,
            life: 6000,
            className: 'login-toast',
          })
        })
        .catch((err) => {
          toast.current.show({
            severity: 'error',
            summary: 'Error!',
            detail: `${err.response.status} from tasklogapi`,
            // detail: `${err.data.errorMessage} ${statusCode}`,
            life: 6000,
            className: 'login-toast',
          })
        })
  }

  const roleSelect1 = (
    <>
      <Select
        options={roles}
        isMulti
        onChange={handleRoleChange1}
        components={{
          Option,
        }}
        value={roleNames}
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        className={classes.multiSelect}
        styles={roleSelectStyle}
        isDisabled={
          UtilityFunctions.isHidden(
            '8',
            appFuncList ? appFuncList : [],
            'mod_role'
          )
            ? true
            : false
        }
      />
    </>
  )

  useEffect(() => {
    if (selectEmployeeID) {
      setEmployeeID(selectEmployeeID.userId)
      setFirstName(selectEmployeeID.firstName)
      setMiddleName(selectEmployeeID.middleName)
      setLastName(selectEmployeeID.lastName)
      setEmail(selectEmployeeID.emailId)
      setDesignation(selectEmployeeID.designation)
      setAdditionalInfo(selectEmployeeID.additionalInfo)
      if (selectEmployeeID.status === 'A') {
        setStatus(selectEmployeeID.status)
        setStatusWithValue('ACTIVE')
      } else if (selectEmployeeID.status === 'W') {
        setStatus(selectEmployeeID.status)
        setStatusWithValue('INPROGRESS')
      } else if (selectEmployeeID.status === 'I') {
        setStatus(selectEmployeeID.status)
        setStatusWithValue('INACTIVE')
      } else {
        setStatus(selectEmployeeID.status)
        setStatusWithValue('DELETED')
      }

      setRoleNames(
        selectEmployeeID.roles.map((role: any) => {
          return {
            label: role.roleName,
            value: role.roleId,
          }
        })
      )
      setGroupInput(
        selectEmployeeID.usergroups.map((group: any) => {
          return {
            label: group.groupName,
            value: group.groupId,
            status: group.status,
          }
        })
      )
      setGroups(
        selectEmployeeID.usergroups.map((group: any) => {
          return {
            label: group.groupId,
            value: group.groupId,
            status: group.status,
          }
        })
      )
      setComments(selectEmployeeID.comments)
    } else {
      setEmployeeID('')
      setFirstName('')
      setMiddleName('')
      setLastName('')
      setEmail('')
      setDesignation('')
      setStatus('')
    }
  }, [selectEmployeeID, groupData])

  const handleOpenGroups = (e: any) => {
    e.preventDefault()
    setGroupOpen(true)
  }
  const handleCloseGroups = (e: any) => {
    e.preventDefault()
    setGroupOpen(false)
  }
  const updateGroups = () => {
    setGroups(groupInput)
    setGroupOpen(false)
  }

  const handleGroupsInput = (selected: any) => {
    setGroupInput(selected)
  }

  const viewGroups = (
    <Dialog onClose={handleCloseGroups} open={groupOpen}>
      <Box
        sx={{
          height: 450,
          // width: dialogwidth,
          width: 'auto',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box
          className={classes.inputFieldBox}
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              height: 30,
              flexDirection: 'row',
            }}
            className={classes.viewLogTitle}
          >
            <Box
              sx={{
                display: 'flex',
                flexGrow: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography variant="subtitle1">Add Groups</Typography>
            </Box>
            <Box
              sx={{
                paddingRight: 2,
              }}
            >
              <button
                style={{
                  border: 0,
                  padding: 0,
                  height: 22,
                  width: 22,
                }}
                className={classes.closeViewLog}
                onClick={handleCloseGroups}
              >
                <b>X</b>
              </button>
            </Box>
          </Box>
          <Box
            sx={{
              alignItems: 'flex-start',
              marginTop: '30px',
            }}
          >
            <Select
              options={groupData}
              isMulti
              onChange={handleGroupsInput}
              components={{
                Option,
              }}
              value={groupInput}
              closeMenuOnSelect={false}
              hideSelectedOptions={false}
              className={classes.multiSelect}
              styles={customStyles}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'end',
          }}
          className={classes.inputFieldBox}
        >
          <Button
            type="button"
            className={classes.whiteButton}
            onClick={updateGroups}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Dialog>
  )

  const handleOpenTasks = (e: any) => {
    console.log('open task')
    e.preventDefault()
    setTaskOpen(true)
  }
  const handleCloseTasks = (e: any) => {
    e.preventDefault()
    console.log('close')
    setTaskOpen(false)
  }

  const unAssignTasks = () => {
    let _tasks = tasks.filter((value) => !taskSelected.includes(value))
    setTasks(_tasks)
    setTaskSelected(null)
    setTaskOpen(false)
  }

  const manageTasks = (
    <Dialog onClose={handleCloseTasks} open={taskOpen}>
      <Box
        sx={{
          height: 500,
          // width: dialogwidth,
          width: 'auto',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box
          className={classes.inputFieldBox}
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              height: 30,
              flexDirection: 'row',
            }}
            className={classes.viewLogTitle}
          >
            <Box
              sx={{
                display: 'flex',
                flexGrow: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography variant="subtitle1">Manage Tasks</Typography>
            </Box>
            <Box
              sx={{
                paddingRight: 2,
              }}
            >
              <button
                style={{
                  border: 0,
                  padding: 0,
                  height: 22,
                  width: 22,
                }}
                className={classes.closeViewLog}
                onClick={handleCloseTasks}
              >
                <b>X</b>
              </button>
            </Box>
          </Box>
          <Box
            sx={{
              alignItems: 'flex-start',
              marginTop: '50px',
            }}
          >
            <DataTable
              value={tasks}
              selection={taskSelected}
              onSelectionChange={(e) => setTaskSelected(e.value)}
              className="p-datatable-sm"
              showGridlines
              scrollable
              scrollHeight="400px"
            >
              <Column
                selectionMode="multiple"
                headerStyle={{
                  width: '40px',
                  backgroundColor: teal[900],
                  color: 'white',
                }}
              ></Column>
              <Column
                field="label"
                header="Task"
                headerStyle={{
                  // width: "40px",
                  backgroundColor: teal[900],
                  color: 'white',
                }}
              >
                Tasks
              </Column>
              <Column
                field="count"
                header="Count"
                headerStyle={{
                  // width: "40px",
                  backgroundColor: teal[900],
                  color: 'white',
                }}
              >
                Count
              </Column>
            </DataTable>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'end',
          }}
        >
          <Button
            type="button"
            className={classes.whiteButton}
            onClick={unAssignTasks}
            disabled={!taskSelected || !taskSelected.length}
          >
            Unassign
          </Button>
        </Box>
      </Box>
    </Dialog>
  )

  const handleOpenViewLog = (e: any) => {
    setViewLogEl(e.currentTarget)
  }
  const handleCloseViewLog = () => {
    setViewLogEl(null)
  }

  const viewAdditionalInfo = (
    <Dialog
      open={openAdditional}
      onClose={() => {
        setOpenAdditional((prevState) => !prevState)
      }}
      fullWidth={true}
      // maxWidth={'lg'}
    >
      <Box
        sx={{
          // width: fieldWidth,
          // border: '3px solid green',
          borderRadius: 4,
          display: 'flex',
          flexDirection: 'column',
          p: 1,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            height: 30,
            flexDirection: 'row',
            flexGrow: 1,
            // width: fieldWidth,
            justifyContent: 'center',
          }}
          className={classes.viewLogTitle}
        >
          <Box
            sx={{
              display: 'flex',
              flexGrow: 1,
              justifyContent: 'center',
            }}
          >
            <Typography variant="subtitle1">Additional Data</Typography>
          </Box>
          <Box
            sx={{
              paddingRight: 2,
            }}
          >
            <button
              style={{
                border: 0,
                padding: 0,
                height: 22,
                width: 22,
              }}
              className={classes.closeViewLog}
              onClick={() => {
                setOpenAdditional((prevState) => !prevState)
              }}
            >
              <b>X</b>
            </button>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            p: 2,
          }}
        ></Box>
        <Box
          sx={{
            // justifyContent: "center",
            display: 'flex',
            // width: fieldWidth,
            // textAlign: "center"
          }}
        >
          <DataTable
            value={
              additionalInfo ? constants.getAdditionalInfo(additionalInfo) : []
            }
            // paginator
            // paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
            rows={1}
            style={{
              fontSize: '12px',
              //backgroundColor: "#f7f7f7",
              width: '100%',
            }}
            showGridlines
            className={`p-datatable-sm ${classes.viewlogTable}`}
            // className={classes.viewlogTable}
            scrollable
            // scrollHeight="400px"
          >
            {constants.getAdditionalInfoHeader.map((column: any) => {
              return (
                <Column
                  key={column.field}
                  field={column.field}
                  header={column.headerName}
                  bodyStyle={{
                    fontSize: '12px',
                    width: column.width,
                  }}
                  headerStyle={{
                    fontSize: '12px',
                    width: column.width,
                    backgroundColor: teal[900],
                    color: 'white',
                  }}
                ></Column>
              )
            })}
          </DataTable>
        </Box>
      </Box>
    </Dialog>
  )

  const viewLog = (
    <Dialog open={viewLogOpen} onClose={handleCloseViewLog}>
      <Box
        sx={{
          // width: dialogwidth,
          // border: '3px solid green',
          borderRadius: 4,
          display: 'flex',
          flexDirection: 'column',
          p: 1,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            height: 30,
            flexDirection: 'row',
            flexGrow: 1,
            // width: fieldWidth,
            justifyContent: 'center',
          }}
          className={classes.viewLogTitle}
        >
          <Box
            sx={{
              display: 'flex',
              flexGrow: 1,
              justifyContent: 'center',
            }}
          >
            <Typography variant="subtitle1">Logs</Typography>
          </Box>
          <Box
            sx={{
              paddingRight: 2,
            }}
          >
            <button
              style={{
                border: 0,
                padding: 0,
                height: 22,
                width: 22,
              }}
              className={classes.closeViewLog}
              onClick={handleCloseViewLog}
            >
              <b>X</b>
            </button>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            p: 2,
          }}
        >
          <Typography variant="body2" style={{ overflowX: 'scroll' }}>
            Request ID:<b> {requestId}</b>
          </Typography>
        </Box>
        <Box
          sx={{
            // justifyContent: "center",
            display: 'flex',

            // textAlign: "center"
          }}
        >
          <DataTable
            value={viewLogRows}
            paginator
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
            rows={5}
            style={{
              fontSize: '12px',
              // backgroundColor: '#f7f7f7',
              width: '100%',
            }}
            className={`p-datatable-sm ${classes.viewlogTable}`}
            scrollable
            // scrollHeight="400px"
          >
            {constants.viewLogColumns.map((column) => {
              return (
                <Column
                  key={column.field}
                  field={column.field}
                  header={column.headerName}
                  bodyStyle={{
                    fontSize: '12px',
                    width: column.width,
                  }}
                  headerStyle={{
                    fontSize: '12px',
                    width: column.width,
                    backgroundColor: teal[900],
                    color: 'white',
                  }}
                ></Column>
              )
            })}
          </DataTable>
        </Box>
      </Box>
    </Dialog>
  )
  const handleCancel = (e: any) => {
    // let text = 'are you really want to go back? All your Data will be lost.'
    // if (window.confirm(text) === true) {
    //   history.goBack()
    // }
    e.preventDefault()
    setCancelOpen((p) => !p)
  }
  const viewCancel = (
    <Dialog open={cancelOpen} onClose={handleCancel}>
      <Box
        sx={{
          //width: dialogwidth,
          //border: '3px solid green',
          borderRadius: 4,
          display: 'flex',
          flexDirection: 'column',
          p: 1,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            height: 30,
            flexDirection: 'row',
          }}
          className={classes.viewLogTitle}
        >
          <Box
            sx={{
              display: 'flex',
              flexGrow: 1,
              justifyContent: 'center',
            }}
          >
            <Typography variant="subtitle1">Are you Sure?</Typography>
          </Box>
          <Box
            sx={{
              paddingRight: 2,
            }}
          >
            <button
              style={{
                border: 0,
                padding: 0,
                height: 22,
                width: 22,
              }}
              className={classes.closeViewLog}
              onClick={handleCancel}
            >
              <b>X</b>
            </button>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            p: 2,
          }}
        >
          <Typography variant="body2" color="primary">
            All your data will be lost.
          </Typography>
        </Box>
        <Box
          sx={{
            justifyContent: 'space-between',
            display: 'flex',

            // textAlign: "center"
            p: 2,
          }}
        >
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={(e) => {
              e.preventDefault()
              history.goBack()
            }}
          >
            OK
          </Button>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Dialog>
  )

  const handleUpdateUserforApprove = (e: any) => {
    e.preventDefault()
    const formData = {
      camunda: {
        submitFlag: 'Approved',
        requestorDetails: {
          emailId: userDetail && userDetail.userdetails[0].user.emailId,
          requestBy: userDetail && userDetail.userdetails[0].user.userId,
          requestedDate: new Date().toISOString().split('T')[0],
          requestType: requestType,
        },
        requestorRoles:
          userDetail &&
          userDetail.userdetails[0].roles.map((role: any) => {
            return {
              roleId: role.roleId,
            }
          }),
      },
      user: {
        EmployeeId: employeeID,
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        emailId: email,
        additionalInfo: additionalInfo,
        designation: designation.toUpperCase(),
        status: status,
      },
      roles: roleNames
        ? roleNames.map((role: any) => {
            return {
              roleId: role.value,
            }
          })
        : [],
      usergroups: groups
        ? groups.map((group: any) => {
            return {
              groupId: group.value,
              status: group.status,
            }
          })
        : [],
    }
    console.log(formData)

    // axios
    //   .put(
    //     `https://dev-api.morrisons.com/commercial-workflow/v1/users/userdetails/${employeeID}?apikey=vqaiDRZzSQhA6CPAy0rSotsQAkRepprX`,
    //     formData,
    //     {
    //       headers: {
    //         "Cache-Control": "no-cache",
    //         Authorization: `Bearer ${accessToken.access_token}`,
    //       },
    //     }
    //   )
    userDetail &&
      putUserDetailsCamundaAPI(formData)
        .then((res) => {
          console.log(res)
          const rolelog =
            userDetail &&
            userDetail.userdetails[0].roles
              .map((role: any) => role.roleId)
              .join(',')
          console.log(rolelog)
          const time = new Date().toISOString()
          const datepart = time.split('T')[0]
          const timepart = time.split('T')[1].split('.')[0]
          const logData = {
            // requestId: userDetail && userDetail.userdetails[0].user.userId,
            requestId: res.data.businessKey,
            // timestamp: `${datepart} ${timepart}`,
            timestamp: `${datepart}`,
            userId: userDetail && userDetail.userdetails[0].user.userId,
            role: rolelog,
            camundaRequestId: res.data.businessKey,
            actionTaken: 'Approved',
            comments: comments,
            attachmentUrl: null,
          }
          if (referenceDocData) {
            const formdata1 = new FormData()
            formdata1.append('fileIn', referenceDocData)
            userDetail &&
              postFileAttachmentAPI &&
              postFileAttachmentAPI(
                formdata1,
                userDetail.userdetails[0].user.userId
              )
                .then((res) => {
                  logData.attachmentUrl = res.data.attachmentUrl
                  postTasklog(logData)
                })
                .catch((err) => {
                  toast.current.show({
                    severity: 'error',
                    summary: 'Error!',
                    detail: `${err.response.status} from tasklistapi`,
                    // detail: `${err.data.errorMessage} ${statusCode}`,
                    life: 6000,
                    className: 'login-toast',
                  })
                  logData.attachmentUrl = null
                  postTasklog(logData)
                })
          } else {
            console.log(logData)
            postTasklog(logData)
          }
          toast.current.show({
            severity: 'success',
            summary: '',
            detail: res.data.comments,
            life: 6000,
            className: 'login-toast',
          })

          setTimeout(() => history.push(`${DEFAULT}${DASHBOARD}`), 6000)
        })
        .catch((err) => {
          console.log(err.response)
          // let statusCode = err.response.status
          // console.log(statusCode)
          // alert(err)
          toast.current.show({
            severity: 'error',
            summary: 'Error!',
            detail: `${err.response.status} from userdetailapi`,
            // detail: `${err.response.data.errorMessage} ${statusCode}`,
            life: 6000,
            className: 'login-toast',
          })
          //history.push('/commercial-webapp/dashboard')
        })

    // const formDataforAttachment: any = {
    //   requestId: 'SYSTCS175',
    //   timestamp: '2021-12-12',
    //   userId: employeeID,
    //   role: 'ADMIN',
    //   camundaRequestId: 'C1234567',
    //   actionTaken: 'New',
    //   comments: comments,
    // }

    // const formdata = new FormData()
    // formdata.append('fileIn', referenceDocData)
    // formdata.append(
    //   'postData',
    //   new Blob([JSON.stringify(formDataforAttachment)], {
    //     type: 'application/json',
    //   })
    // )

    // //start
    // // axios
    // //   .post(
    // //     `https://dev-api.morrisons.com/commercial-user/v1/tasklogs?apikey=vqaiDRZzSQhA6CPAy0rSotsQAkRepprX`,
    // //     formdata,
    // //     {
    // //       headers: {
    // //         "Cache-Control": "no-cache",
    // //         Authorization: `Bearer ${accessToken.access_token}`,
    // //         "content-type": "application/json",
    // //       },
    // //     }
    // //   )
    // postTaskLogsAPI(formData)
    //   .then((res) => {
    //     console.log(res)
    //     let statusCode = res.status
    //     if (statusCode === 200) {
    //       toast.current.show({
    //         severity: 'success',
    //         summary: '',
    //         detail: res.data.message,
    //         life: 6000,
    //         className: 'login-toast',
    //       })
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err.response)
    //     let statusCode = err.response.status
    //     console.log(statusCode)
    //     // alert(err)
    //     toast.current.show({
    //       severity: 'error',
    //       summary: 'Error!',
    //       detail: `${err.response.data.errorMessage} ${statusCode}`,
    //       life: 6000,
    //       className: 'login-toast',
    //     })
    //   })
  }

  const handleUpdateUserforSubmit = (e: any) => {
    e.preventDefault()
    const formData = {
      camunda: {
        submitFlag: 'Submit',
        requestorDetails: {
          emailId: userDetail && userDetail.userdetails[0].user.emailId,
          requestBy: userDetail && userDetail.userdetails[0].user.userId,
          requestedDate: new Date().toISOString().split('T')[0],
          requestType: requestType,
        },
        requestorRoles:
          userDetail &&
          userDetail.userdetails[0].roles.map((role: any) => {
            return {
              roleId: role.roleId,
            }
          }),
      },
      user: {
        EmployeeId: employeeID,
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        emailId: email,
        additionalInfo: additionalInfo,
        designation: designation.toUpperCase(),
        status: status,
      },
      roles: roleNames
        ? roleNames.map((role: any) => {
            return {
              roleId: role.value,
            }
          })
        : [],
      usergroups: groups
        ? groups.map((group: any) => {
            return {
              groupId: group.value,
              status: group.status,
            }
          })
        : [],
    }
    console.log(formData)

    // axios
    //   .put(
    //     `https://dev-api.morrisons.com/commercial-workflow/v1/users/userdetails/${employeeID}?apikey=vqaiDRZzSQhA6CPAy0rSotsQAkRepprX`,
    //     formData,
    //     {
    //       headers: {
    //         "Cache-Control": "no-cache",
    //         Authorization: `Bearer ${accessToken.access_token}`,
    //       },
    //     }
    //   )
    userDetail &&
      putUserDetailsCamundaAPI(formData)
        .then((res) => {
          console.log(res)
          const rolelog =
            userDetail &&
            userDetail.userdetails[0].roles
              .map((role: any) => role.roleId)
              .join(',')
          const time = new Date().toISOString()
          const datepart = time.split('T')[0]
          const timepart = time.split('T')[1].split('.')[0]
          const logData = {
            // requestId: userDetail && userDetail.userdetails[0].user.userId,
            requestId: res.data.businessKey,
            // timestamp: `${datepart} ${timepart}`,
            timestamp: `${datepart}`,
            userId: userDetail && userDetail.userdetails[0].user.userId,
            role: rolelog,
            camundaRequestId: res.data.businessKey,
            actionTaken: 'Submited',
            comments: comments,
            attachmentUrl: null,
          }
          if (referenceDocData) {
            const formdata1 = new FormData()
            formdata1.append('fileIn', referenceDocData)
            console.log(formdata1)
            userDetail &&
              postFileAttachmentAPI &&
              postFileAttachmentAPI(
                formdata1,
                userDetail.userdetails[0].user.userId
              )
                .then((res) => {
                  logData.attachmentUrl = res.data.attachmentUrl
                  postTasklog(logData)
                })
                .catch((err) => {
                  toast.current.show({
                    severity: 'error',
                    summary: 'Error!',
                    detail: `${err.response.status} from tasklistapi`,
                    // detail: `${err.data.errorMessage} ${statusCode}`,
                    life: 6000,
                    className: 'login-toast',
                  })
                })
          } else {
            postTasklog(logData)
          }
          toast.current.show({
            severity: 'success',
            summary: '',
            detail: res.data.comments,
            life: 6000,
            className: 'login-toast',
          })

          setTimeout(() => history.push(`${DEFAULT}${DASHBOARD}`), 6000)
        })
        .catch((err) => {
          console.log(err)
          // let statusCode = err.response.status
          // console.log(statusCode)
          // alert(err)
          toast.current.show({
            severity: 'error',
            summary: 'Error!',
            detail: `${err.response.status} from userdetailapi`,
            // detail: `${err.response.data.errorMessage} ${statusCode}`,
            life: 6000,
            className: 'login-toast',
          })
          //history.push('/commercial-webapp/dashboard')
        })

    // const formDataforAttachment: any = {
    //   requestId: 'SYSTCS175',
    //   timestamp: '2021-12-12',
    //   userId: employeeID,
    //   role: 'ADMIN',
    //   camundaRequestId: 'C1234567',
    //   actionTaken: 'New',
    //   comments: comments,
    // }

    // const formdata = new FormData()
    // formdata.append('fileIn', referenceDocData)
    // formdata.append(
    //   'postData',
    //   new Blob([JSON.stringify(formDataforAttachment)], {
    //     type: 'application/json',
    //   })
    // )

    // //start
    // // axios
    // //   .post(
    // //     `https://dev-api.morrisons.com/commercial-user/v1/tasklogs?apikey=vqaiDRZzSQhA6CPAy0rSotsQAkRepprX`,
    // //     formdata,
    // //     {
    // //       headers: {
    // //         "Cache-Control": "no-cache",
    // //         Authorization: `Bearer ${accessToken.access_token}`,
    // //         "content-type": "application/json",
    // //       },
    // //     }
    // //   )
    // postTaskLogsAPI(formData)
    //   .then((res) => {
    //     console.log(res)
    //     let statusCode = res.status
    //     if (statusCode === 200) {
    //       toast.current.show({
    //         severity: 'success',
    //         summary: '',
    //         detail: res.data.message,
    //         life: 6000,
    //         className: 'login-toast',
    //       })
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err.response)
    //     let statusCode = err.response.status
    //     console.log(statusCode)
    //     // alert(err)
    //     toast.current.show({
    //       severity: 'error',
    //       summary: 'Error!',
    //       detail: `${err.response.data.errorMessage} ${statusCode}`,
    //       life: 6000,
    //       className: 'login-toast',
    //     })
    //   })
  }

  const createForm = (
    <Box
      sx={{
        flexDirection: 'column',
        display: 'flex',
        p: 2,
        paddingLeft: '40px',
        paddingRight: '30px',
        // [theme.breakpoints.up("sm")]: {
        //   paddingLeft: 30,
        //   paddingRight: 30,
        // },
        // [theme.breakpoints.down("sm")]: {
        //   paddingLeft: 10,
        //   paddingRight: 20,
        // },
        textAlign: 'left',
        // width: width ? 700 : fieldWidth,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          // [theme.breakpoints.up("sm")]: {
          //   flexDirection: "row",
          // },
          // [theme.breakpoints.down("sm")]: {
          //   flexDirection: "column",
          // },
          paddingBottom: '20px',
          paddingTop: '10px',
          // width: fieldWidth
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
          }}
        >
          <Typography variant="h6">Update User</Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Box
            sx={{
              paddingLeft: 5,
            }}
          >
            <button className={classes.backButton} onClick={handleOpenViewLog}>
              View Log ({viewLogRows.length})
            </button>
          </Box>
          <Box
            sx={{
              paddingLeft: 5,
            }}
          >
            |
          </Box>
          <Box
            sx={{
              paddingLeft: 5,
            }}
          >
            <button className={classes.backButton} onClick={goBack}>
              Back
            </button>
          </Box>
        </Box>
      </Box>
      <form>
        <Box
          sx={{
            display: 'flex',
            flexDirection: !active ? 'row' : 'column',
            // [theme.breakpoints.up("sm")]: {
            //   flexDirection: "row",
            // },
            // [theme.breakpoints.down("sm")]: {
            //   flexDirection: "column",
            // },
            // alignItems: "baseline",
          }}
          className={classes.eachRow}
        >
          <Box className={classes.inputLabel}>
            <Typography variant="subtitle2">Request Type</Typography>
          </Box>

          <Box className={classes.inputFieldBox}>
            <Typography variant="subtitle2">
              <select
                name="requesttype"
                id="requesttype"
                className={classes.selectField}
                defaultValue=""
                onChange={onrequestTypeChange}
                required
              >
                <option disabled value="">
                  --- Select Request Type ---
                </option>
                {constants.requestTypes.map((type) => {
                  return (
                    type.name.toLowerCase() !== 'new' && (
                      <option value={type.name} key={type.name}>
                        {type.text}
                      </option>
                    )
                  )
                })}
              </select>
            </Typography>
          </Box>
        </Box>
        <Box className={classes.eachRow}>
          <Box className={classes.inputLabel}>
            <Typography variant="subtitle2">
              Employee ID &nbsp;
              <span
                style={{
                  color: '#ff0000',
                }}
              >
                *
              </span>
            </Typography>
          </Box>

          <Box className={classes.inputFieldBox}>
            <Typography variant="subtitle2">
              <input
                type="text"
                className={classes.inputFields}
                value={employeeID}
                onChange={() => {}}
                disabled
              />
            </Typography>
          </Box>
        </Box>

        <Box className={classes.eachRow}>
          <Box className={classes.inputLabel}>
            <Typography variant="subtitle2">First Name</Typography>
          </Box>

          <Box className={classes.inputFieldBox}>
            <Typography variant="subtitle2">
              <input
                type="text"
                name="firstname"
                id="firstname"
                placeholder="eg. Mike"
                className={classes.inputFields}
                // onChange={e => {
                //   setFirstName(e.target.value);
                // }}
                value={firstName}
                onChange={() => {}}
                disabled
              />
            </Typography>
          </Box>
        </Box>
        <Box className={classes.eachRow}>
          <Box className={classes.inputLabel}>
            <Typography variant="subtitle2">Middle Name</Typography>
          </Box>

          <Box className={classes.inputFieldBox}>
            <Typography variant="subtitle2">
              <input
                type="text"
                name="middlename"
                id="middlename"
                placeholder="eg. Dallas"
                className={classes.inputFields}
                // onChange={e => {
                //   setMiddleName(e.target.value);
                // }}
                value={middleName}
                onChange={() => {}}
                disabled
              />
            </Typography>
          </Box>
        </Box>
        <Box className={classes.eachRow}>
          <Box className={classes.inputLabel}>
            <Typography variant="subtitle2">Last Name</Typography>
          </Box>

          <Box className={classes.inputFieldBox}>
            <Typography variant="subtitle2">
              <input
                type="text"
                name="lastname"
                id="lastname"
                placeholder="eg. Black"
                className={classes.inputFields}
                // onChange={e => {
                //   setLastName(e.target.value);
                // }}
                value={lastName}
                onChange={() => {}}
                disabled
              />
            </Typography>
          </Box>
        </Box>

        <Box className={classes.eachRow}>
          <Box className={classes.inputLabel}>
            <Typography variant="subtitle2">Email ID</Typography>
          </Box>

          <Box className={classes.inputFieldBox}>
            <Typography variant="subtitle2">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="eg. abc.xyz@morrisonsplc.co.uk"
                className={classes.inputFields}
                // onChange={e => {
                //   setEmail(e.target.value);
                // }}
                value={email}
                onChange={() => {}}
                disabled
              />
            </Typography>
          </Box>
        </Box>
        <Box className={classes.eachRow}>
          <Box className={classes.inputLabel}>
            <Typography variant="subtitle2">Designation</Typography>
          </Box>

          <Box
            className={classes.inputFieldBox}
            sx={{
              // [theme.breakpoints.up("sm")]: {
              //   flexDirection: "row",
              //   width: 400,
              // },
              // [theme.breakpoints.down("sm")]: {
              //   flexDirection: "column",
              //   width: fieldWidth,
              // },
              flexDirection: !active ? 'row' : 'column',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Box
              sx={{
                // flexGrow: 1,
                display: 'flex',
              }}
            >
              <Typography variant="subtitle2">
                <input
                  type="text"
                  placeholder="designation"
                  disabled
                  className={classes.designationField}
                  value={designation}
                  onChange={() => {}}
                />
              </Typography>
            </Box>
            {/* <Box
              sx={{
                paddingLeft: 5,
                paddingRight: 5,
                fontSize: 'x-large',
                display: 'flex',
              }}
            >
              {width && <>|</>}
            </Box> */}
            <Box
              sx={{
                display: 'flex',
              }}
            >
              <button
                className={
                  UtilityFunctions.isHidden(
                    '8',
                    appFuncList ? appFuncList : [],
                    'addl_data'
                  )
                    ? classes.hideit
                    : classes.backButton
                }
                disabled={additionalInfo ? false : true}
                onClick={(e) => {
                  e.preventDefault()
                  setOpenAdditional((prevState) => !prevState)
                }}
              >
                Additional Data
              </button>
            </Box>
          </Box>
        </Box>
        <Box className={classes.eachRow}>
          <Box className={classes.inputLabel}>
            <Typography variant="subtitle2">Status</Typography>
          </Box>

          <Box className={classes.inputFieldBox}>
            <Typography variant="subtitle2">
              <input
                type="text"
                name="status"
                id="status"
                placeholder="eg. Active"
                className={classes.inputFields}
                // onChange={e => {
                //   setStatus(e.target.value);
                // }}
                value={statusWithValue}
                onChange={() => {}}
                disabled
              />
            </Typography>
          </Box>
        </Box>
        <Box className={classes.eachRow}>
          <Box className={classes.inputLabel}>
            <Typography variant="subtitle2">Role</Typography>
          </Box>

          <Box className={classes.inputFieldBox}>{roleSelect1}</Box>
        </Box>
        <Box className={classes.eachRow}>
          <Box className={classes.inputLabel}>
            <Typography variant="subtitle2">User Group</Typography>
          </Box>

          <Box className={classes.inputFieldBox}>
            <Typography variant="subtitle1">
              {groups ? (
                groups.length > 0 ? (
                  <button
                    className={classes.backButton}
                    onClick={handleOpenGroups}
                  >
                    Groups ( {groups.length} )
                  </button>
                ) : (
                  <button
                    className={
                      UtilityFunctions.isHidden(
                        '8',
                        appFuncList ? appFuncList : [],
                        'mod_group'
                      )
                        ? classes.hideit
                        : classes.backButton
                    }
                    onClick={handleOpenGroups}
                  >
                    Add
                  </button>
                )
              ) : (
                <button
                  className={classes.backButton}
                  onClick={handleOpenGroups}
                >
                  Add
                </button>
              )}
              &nbsp;&nbsp; | &nbsp;&nbsp;
              <button
                className={
                  UtilityFunctions.isHidden(
                    '8',
                    appFuncList ? appFuncList : [],
                    'manage_task'
                  )
                    ? classes.hideit
                    : classes.backButton
                }
                onClick={handleOpenTasks}
              >
                Manage Task ( {tasks.length} )
              </button>
            </Typography>
          </Box>
        </Box>
        <Box className={classes.eachRow}>
          <Box className={classes.inputLabel}>
            <Typography variant="subtitle2">Reference Document</Typography>
          </Box>

          <Box
            // className={classes.inputFieldBox}
            sx={{
              // [theme.breakpoints.up("sm")]: {
              //   flexDirection: "row",
              // },
              // [theme.breakpoints.down("sm")]: {
              //   flexDirection: "column",
              // },
              flexDirection: !active ? 'row' : 'column',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Box
              sx={{
                // flexGrow: 1,
                display: 'flex',
              }}
            >
              <Typography variant="subtitle2">
                {
                  <input
                    type="text"
                    value={referenceDoc ? referenceDoc.name : ''}
                    onClick={() =>
                      document.getElementById('selectedFile')!.click()
                    }
                    className={classes.uploadTextfield}
                    placeholder="No file selected"
                    readOnly
                  />
                }
                <Input
                  type="file"
                  id="selectedFile"
                  onChange={handleFileUpload}
                />
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById('selectedFile')!.click()
                  }
                  className={classes.uploadButton}
                >
                  Browse...
                </button>
              </Typography>
            </Box>
            <Box
              sx={{
                paddingLeft: 5,
                paddingRight: 5,
                fontSize: 'x-large',
                display: 'flex',
              }}
            >
              {/* {width && <>|</>}
            </Box>
            <Box
              sx={{
                display: 'flex',
              }}
            >
              <button className={classes.backButton}>view(3)</button> */}
              {wrongExtn ? (
                <Typography variant="subtitle2" color={'secondary'}>
                  Invalid extension
                </Typography>
              ) : null}
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            // [theme.breakpoints.up("sm")]: {
            //   flexDirection: "row",
            // },
            // [theme.breakpoints.down("sm")]: {
            //   flexDirection: "column",
            // },
            flexDirection: !active ? 'row' : 'column',
            paddingTop: '20px',
          }}
        >
          <Box className={classes.inputLabel}>
            <Typography variant="subtitle2">Comments</Typography>
          </Box>

          <Box className={classes.inputFieldBox}>
            <Typography variant="body2">
              <textarea
                cols={10}
                rows={5}
                className={classes.textArea}
                placeholder="Some Comments....."
                onChange={(e) => {
                  setComments(e.target.value)
                }}
                value={comments}
              />
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: !active ? 'row' : 'column',
            alignItems: !active ? 'center' : 'center',
            paddingTop: '30px',
            justifyContent: !active ? 'space-between' : 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: !forbutton ? 'row' : 'column',
              alignItems: !forbutton ? 'center' : 'center',
              justifyContent: !forbutton ? 'space-between' : 'center',
            }}
          >
            <Button
              type="reset"
              variant="contained"
              color="primary"
              className={
                UtilityFunctions.isHidden(
                  '8',
                  appFuncList ? appFuncList : [],
                  'cancel'
                )
                  ? classes.hideit
                  : classes.whiteButton
              }
              size="small"
              onClick={handleCancel}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              color="primary"
              className={
                UtilityFunctions.isHidden(
                  '8',
                  appFuncList ? appFuncList : [],
                  'reject'
                )
                  ? classes.hideit
                  : classes.whiteButton
              }
              size="small"
            >
              Reject
            </Button>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: !forbutton ? 'row' : 'column',
              alignItems: !forbutton ? 'center' : 'center',
              justifyContent: !forbutton ? 'space-between' : 'center',
            }}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={
                UtilityFunctions.isHidden(
                  '8',
                  appFuncList ? appFuncList : [],
                  'submit'
                )
                  ? classes.hideit
                  : classes.submitButton
              }
              size="small"
              onClick={handleUpdateUserforSubmit}
            >
              Submit
            </Button>

            <Button
              variant="contained"
              color="primary"
              className={
                UtilityFunctions.isHidden(
                  '8',
                  appFuncList ? appFuncList : [],
                  'reassign'
                )
                  ? classes.hideit
                  : classes.buttons
              }
              size="small"
            >
              Reassign
            </Button>

            <Button
              variant="contained"
              color="primary"
              className={
                UtilityFunctions.isHidden(
                  '8',
                  appFuncList ? appFuncList : [],
                  'approve'
                )
                  ? classes.hideit
                  : classes.buttons
              }
              size="small"
              onClick={handleUpdateUserforApprove}
            >
              Approve
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  )

  return (
    <>
      <Toast ref={toast} position="bottom-left" />
      <Paper className={classes.root} elevation={0}>
        <Box sx={{ flexGrow: 1, p: 1, display: 'flex' }}>
          {/* <Grid container spacing={1}> */}
          <Grid
            container
            item
            xs={12}
            className={classes.text}
            alignItems="center"
            justifyContent="center"
          >
            {createForm}
            {viewLog}
            {viewGroups}
            {manageTasks}
            {viewAdditionalInfo}
            {viewCancel}
          </Grid>
          {/* </Grid> */}
        </Box>
      </Paper>
    </>
  )
}

const mapStatetoProps = (state: any) => {
  return {
    empDetails: state.manageUserReducer.empDetails,
    rolesArray: state.loginReducer.rolesArray,
    appFuncList: state.loginReducer.appFuncList,
    userDetail: state.loginReducer.userDetail,
  }
}

const matchDispatchToProps = (dispatch: any) => {
  return {
    reset_empID: () => dispatch(reset_empID()),
  }
}

export default connect(mapStatetoProps, matchDispatchToProps)(UpdateUser)
