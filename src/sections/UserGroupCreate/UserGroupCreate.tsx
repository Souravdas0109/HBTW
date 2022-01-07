import {
  Button,
  Grid,
  Typography,
  Box,
  useTheme,
  Dialog,
  Paper,
  useMediaQuery,
} from '@material-ui/core'
import React, { useRef, useState } from 'react'
import Select, { StylesConfig } from 'react-select'
import { Link } from 'react-router-dom'
import { components } from 'react-select'
import CloseIcon from '@material-ui/icons/Close'
import { TextareaAutosize } from '@material-ui/core'
import { teal } from '@material-ui/core/colors'
import { Toast } from 'primereact/toast'
import { useEffect } from 'react'
import { useStyles } from './Styles'
import {
  constants,
  locationTypes,
  LocationhierarchyTypes,
} from './DataConstants'
import config from '../../config/Config'
import { getProductHierarchyAPI, putUserGroupAPI } from '../../api/Fetch'

function UserGroupCreate() {
  const theme = useTheme()
  const { BASE_URL_SIT, PRODUCT_HIERARCHY_GET, API_KEY } = config
  const active = useMediaQuery(theme.breakpoints.down(750))
  const classes = useStyles()
  const [groupId, setGroupId] = useState('')
  const [groupname, setGroupname] = useState('')
  const [description, setDescription] = useState('')
  const [currentDate, setCurrentDate] = useState('')
  const [status, setStatus] = useState('')
  const [viewProductEl, setViewProductEl] = useState(null)
  const [locationNames, setLocationNames] = useState([])
  const [viewLocationEl, setViewLocationEl] = useState(null)
  const toast = useRef<any>(null)
  //product changes start.............................................
  // const BASE = "https://pre-api.morrisons.com";
  const [error, setError] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [selected, setSelected] = useState<any>([])
  const [data, setData] = useState<any>([])
  const [uniquediv, setUniqueDiv] = useState<any>([])
  const [uniquedivobj, setUniqueDivObj] = useState<any>([])
  const [uniquegrp, setUniqueGrp] = useState<any>([])
  const [uniquegrpobj, setUniqueGrpObj] = useState<any>([])
  const [uniquecat, setUniqueCat] = useState<any>([])
  const [uniquecatobj, setUniqueCatObj] = useState<any>([])
  const [uniquedep, setUniqueDep] = useState<any>([])
  const [uniquedepobj, setUniqueDepObj] = useState<any>([])
  const [uniquecls, setUniqueCls] = useState<any>([])
  const [uniqueclsobj, setUniqueClsObj] = useState<any>([])
  const [uniquescls, setUniqueScls] = useState<any>([])
  const [uniquesclsobj, setUniqueSclsObj] = useState<any>([])
  const [payload, setPayload] = useState<any>([])
  const [hierLevel, setHierLevel] = useState<any>('')
  //product changes end ................................................

  //product changes start...........................................

  useEffect(() => {
    for (let d = 0; d < data.length; d++) {
      data[d]['tag'] = data[d].name
      let tag = `${data[d].name}#${data[d].tag}#${data[d].id}`
      if (!uniquediv.includes(tag)) {
        setUniqueDiv((prevState: any) => [...prevState, tag])
        const splitted = tag.split('#')
        setUniqueDivObj((prevState: any) => [
          ...prevState,
          {
            value: splitted[0],
            label: splitted[1],
            id: splitted[2],
            hierGroup: 'division',
          },
        ])
      }
      for (let g = 0; g < data[d].nodes.length; g++) {
        data[d].nodes[g]['tag'] = `${data[d].tag} > ${data[d].nodes[g].name}`
        let tag = `${data[d].nodes[g].name}#${data[d].nodes[g].tag}#${data[d].nodes[g].id}`
        if (!uniquegrp.includes(tag)) {
          setUniqueGrp((prevState: any) => [...prevState, tag])
          const splitted = tag.split('#')
          setUniqueGrpObj((prevState: any) => [
            ...prevState,
            {
              value: splitted[0],
              label: splitted[1],
              id: splitted[2],
              hierGroup: 'group',
            },
          ])
        }
        for (let c = 0; c < data[d].nodes[g].nodes.length; c++) {
          data[d].nodes[g].nodes[c][
            'tag'
          ] = `${data[d].nodes[g].tag} > ${data[d].nodes[g].nodes[c].name}`
          let tag = `${data[d].nodes[g].nodes[c].name}#${data[d].nodes[g].nodes[c].tag}#${data[d].nodes[g].nodes[c].id}`
          if (!uniquecat.includes(tag)) {
            setUniqueCat((prevState: any) => [...prevState, tag])
            const splitted = tag.split('#')
            setUniqueCatObj((prevState: any) => [
              ...prevState,
              {
                value: splitted[0],
                label: splitted[1],
                id: splitted[2],
                hierGroup: 'category',
              },
            ])
          }
          for (let dp = 0; dp < data[d].nodes[g].nodes[c].nodes.length; dp++) {
            data[d].nodes[g].nodes[c].nodes[dp][
              'tag'
            ] = `${data[d].nodes[g].nodes[c].tag} > ${data[d].nodes[g].nodes[c].nodes[dp].name}`
            let tag = `${data[d].nodes[g].nodes[c].nodes[dp].name}#${data[d].nodes[g].nodes[c].nodes[dp].tag}#${data[d].nodes[g].nodes[c].nodes[dp].id}`
            if (!uniquedep.includes(tag)) {
              setUniqueDep((prevState: any) => [...prevState, tag])
              const splitted = tag.split('#')
              setUniqueDepObj((prevState: any) => [
                ...prevState,
                {
                  value: splitted[0],
                  label: splitted[1],
                  id: splitted[2],
                  hierGroup: 'department',
                },
              ])
            }
            for (
              let cl = 0;
              cl < data[d].nodes[g].nodes[c].nodes[dp].nodes.length;
              cl++
            ) {
              data[d].nodes[g].nodes[c].nodes[dp].nodes[cl][
                'tag'
              ] = `${data[d].nodes[g].nodes[c].nodes[dp].tag} > ${data[d].nodes[g].nodes[c].nodes[dp].nodes[cl].name}`
              let tag = `${data[d].nodes[g].nodes[c].nodes[dp].nodes[cl].name}#${data[d].nodes[g].nodes[c].nodes[dp].nodes[cl].tag}#${data[d].nodes[g].nodes[c].nodes[dp].nodes[cl].id}`
              if (!uniquecls.includes(tag)) {
                setUniqueCls((prevState: any) => [...prevState, tag])
                const splitted = tag.split('#')
                setUniqueClsObj((prevState: any) => [
                  ...prevState,
                  {
                    value: splitted[0],
                    label: splitted[1],
                    id: splitted[2],
                    hierGroup: 'class',
                  },
                ])
              }
              for (
                let scl = 0;
                scl <
                data[d].nodes[g].nodes[c].nodes[dp].nodes[cl].nodes.length;
                scl++
              ) {
                data[d].nodes[g].nodes[c].nodes[dp].nodes[cl].nodes[scl][
                  'tag'
                ] = `${data[d].nodes[g].nodes[c].nodes[dp].nodes[cl].tag} > ${data[d].nodes[g].nodes[c].nodes[dp].nodes[cl].nodes[scl].name}`
                let tag = `${data[d].nodes[g].nodes[c].nodes[dp].nodes[cl].nodes[scl].name}#${data[d].nodes[g].nodes[c].nodes[dp].nodes[cl].nodes[scl].tag}#${data[d].nodes[g].nodes[c].nodes[dp].nodes[cl].nodes[scl].id}`
                if (!uniquescls.includes(tag)) {
                  setUniqueScls((prevState: any) => [...prevState, tag])
                  const splitted = tag.split('#')
                  setUniqueSclsObj((prevState: any) => [
                    ...prevState,
                    {
                      value: splitted[0],
                      label: splitted[1],
                      id: splitted[2],
                      hierGroup: 'subclass',
                    },
                  ])
                }
              }
            }
          }
        }
      }
    }
  }, [data])

  useEffect(() => {
    async function handleClick() {
      setData([])
      setUniqueDivObj([])
      setUniqueGrpObj([])
      setUniqueCatObj([])
      setUniqueDepObj([])
      setUniqueClsObj([])
      setUniqueSclsObj([])
      setUniqueDiv([])
      setUniqueGrp([])
      setUniqueCat([])
      setUniqueDep([])
      setUniqueCls([])
      setUniqueScls([])
      setDisabled(true)
      let nexturl = `${BASE_URL_SIT}${PRODUCT_HIERARCHY_GET}?apikey=${API_KEY}`
      // let nexturl = `${BASE}/product/v1/hierarchies/reporting?apikey=ArAaZlvKV09DlZst4aGqxicONzvtGbpI&offset=0`;
      //   const start = new Date();
      while (nexturl !== '') {
        if (error !== '') {
          toast.current.show({
            severity: 'error',
            summary: 'Error!',
            detail: 'Product hierarchy service has issue',
            life: 6000,
            className: 'login-toast',
          })
          break
        }
        // console.log("to visit url: ", nexturl);
        // await axios
        //   .get(nexturl, {
        //     headers: {
        //       Authorization:
        //         "Basic QXJBYVpsdktWMDlEbFpzdDRhR3F4aWNPTnp2dEdicEk6d2txU0VjQWRHWllaRnc5Yg==",
        //     },
        //   })
        await getProductHierarchyAPI(nexturl)
          .then((res) => {
            setData((prevState: any) => [
              ...prevState,
              ...res.data.hierarchy.nodes,
            ])
            nexturl = res.data.metaData.links.next
              ? `${BASE_URL_SIT}${res.data.metaData.links.next}`
              : ''
            // console.log(`up next: ${res.data.metaData.links.next}`);
            // console.log(res.data.hierarchy.nodes);
          })
          .catch((e) => {
            nexturl = ''
            setError(e.message)
          })
      }
      // const end = new Date();
      // const timediff = end - start;
      // console.log("Time taken for api calls: ", timediff);
    }
    handleClick()
  }, [BASE_URL_SIT, PRODUCT_HIERARCHY_GET, API_KEY, error])

  const handleChange = (e: any) => {
    setHierLevel(constants.mainvalues.filter((val) => val.value === e.value))
    switch (e.value) {
      case 'division':
        setDisabled(false)
        setPayload('')
        setSelected([...uniquedivobj])
        break
      case 'group':
        setDisabled(false)
        setPayload('')
        setSelected([...uniquegrpobj])
        break
      case 'category':
        setDisabled(false)
        setPayload('')
        setSelected([...uniquecatobj])
        break
      case 'department':
        setDisabled(false)
        setPayload('')
        setSelected([...uniquedepobj])
        break
      case 'class':
        setDisabled(false)
        setPayload('')
        setSelected([...uniqueclsobj])
        break
      case 'subclass':
        setDisabled(false)
        setPayload('')
        setSelected([...uniquesclsobj])
        break
      default:
        setDisabled(true)
        setPayload('')
        setSelected([])
        break
    }
  }

  const handleHierarchyChange = (e: any) => {
    let values = []

    for (let i = 0; i < e.length; i++) {
      values.push({
        value: e[i].label,
        label: e[i].label,
        hierarchyLevel: e[i].hierGroup ? e[i].hierGroup : e[i].hierarchyLevel,
        hierarchyId: e[i].id ? e[i].id : e[i].hierarchyId,
        startDate: new Date().toISOString().split('T')[0],
        endDate: '2099-12-31',
      })
    }
    setPayload([...values])
    console.log(values)
  }

  //product changes end...................

  const productCustomStyles = {
    option: (provided: any, state: any) => ({
      ...provided,
      borderColor: teal[900],
      backgroundColor: state.isSelected ? teal[900] : 'white',
      color: state.isSelected ? 'white' : teal[900],
    }),
  }
  const locationCustomStyles: StylesConfig<LocationhierarchyTypes, true> = {
    option: (provided: any, state: any) => ({
      ...provided,
      borderColor: teal[900],
      backgroundColor: state.isSelected ? teal[900] : 'white',
      color: state.isSelected ? 'white' : teal[900],
    }),
  }

  const viewProductOpen = Boolean(viewProductEl)
  const viewLocationOpen = Boolean(viewLocationEl)
  const handleLocationChange = (selected: any) => {
    setLocationNames(selected)
    // console.log(selected);
  }
  const handleReset = () => {
    setGroupId('')
    setGroupname('')
    setDescription('')
    setPayload([])
    setLocationNames([])
  }
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
  const productSelect = (
    <>
      {/* <Select
        // options={producthierarchyTypes}
        options={productHierarchyValues && productHierarchyValues}
        isMulti
        onChange={handleProductChange}
        components={{
          Option,
        }}
        value={productNames}
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        className={classes.multiSelect}
        styles={productCustomStyles}
      /> */}
      <Select
        closeMenuOnSelect={false}
        //components={animatedComponents}
        //defaultValue={[colourOptions[4], colourOptions[5]]}
        // components={{
        //   Option,
        // }}
        isDisabled={disabled}
        isMulti
        hideSelectedOptions={true}
        options={selected}
        value={payload}
        onChange={handleHierarchyChange}
        className={classes.multiSelect}
        styles={productCustomStyles}
        //value={payload !== "" ? payload.id : ""}
      />
    </>
  )
  const locationSelect = (
    <>
      <Select
        options={locationTypes}
        isMulti
        onChange={handleLocationChange}
        components={{
          Option,
        }}
        value={locationNames}
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        className={classes.multiSelect}
        styles={locationCustomStyles}
      />
    </>
  )
  const ongroupIDChange = (e: any) => {
    setGroupId(e.target.value)
  }
  const ongroupnameChange = (e: any) => {
    setGroupname(e.target.value)
  }
  const ondescriptionChange = (e: any) => {
    setDescription(e.target.value)
  }
  const onstatusChange = (e: any) => {
    setStatus(e.target.value)
  }
  const handleOpenViewProduct = (e: any) => {
    setViewProductEl(e.currentTarget)
  }
  const handleCloseViewProduct = () => {
    setViewProductEl(null)
  }
  const handleOpenViewLocation = (e: any) => {
    setViewLocationEl(e.currentTarget)
  }
  const handleCloseViewLocation = () => {
    setViewLocationEl(null)
  }

  const viewProduct = (
    <Dialog
      id="basic-menu"
      open={viewProductOpen}
      onClose={handleCloseViewProduct}
    >
      <Box
        sx={{
          width: 'auto',
          height: !active ? 500 : 400,
          //   border: "3px solid green",
          //   borderRadius: 4,
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
            <Typography variant="subtitle1">Add Product Hierarchies</Typography>
          </Box>
          <Box
            sx={{
              paddingRight: '2px',
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
              onClick={handleCloseViewProduct}
            >
              <CloseIcon />
            </button>
          </Box>
        </Box>
        <Box
          sx={{
            paddingLeft: '16px',
            display: 'flex',
          }}
        >
          <Box
            className={classes.inputFieldBox}
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* {productSelect} */}
            <Box>
              <label>Hierarchy Level</label>
            </Box>
            <Box>
              {/* <select
                style={{ width: 150 }}
                defaultValue="0"
                onChange={handleHierLevelSelect}
              >
                <option disabled value="0">
                  --- Select Hierarchy Level ---
                </option>
                {hierLevels &&
                  hierLevels.map((lvl: any, index: any) => {
                    return (
                      <option key={index} value={lvl}>
                        {lvl.toUpperCase()}
                      </option>
                    );
                  })}
              </select> */}
              <Select
                defaultValue={hierLevel}
                isDisabled={data !== [] ? false : true}
                isLoading={false}
                // components={{
                //   Option,
                // }}
                isRtl={false}
                isSearchable={true}
                name="color"
                options={constants.mainvalues}
                onChange={handleChange}
                className={classes.multiSelect}
                styles={locationCustomStyles}
                //value={hierLevel}
              />
              {/* <TreeSelect value={hierLevelSelect} options={hierLevelValues} onChange={(e)=>setHierLevelSelect(e.value)}/> */}
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            padding: '16px',
          }}
        >
          <Box>
            <label>Search Hierrachies</label>
          </Box>
          <Box
            sx={{
              justifyContent: 'center',
              paddingRight: '10px',
            }}
          >
            {productSelect}
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
  const viewLocation = (
    <Dialog
      id="basic-menu"
      open={viewLocationOpen}
      onClose={handleCloseViewLocation}
    >
      <Box
        sx={{
          width: 'auto',
          height: !active ? 500 : 400,
          //   border: "3px solid green",
          //   borderRadius: 4,
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
            <Typography variant="subtitle1">
              Add Location Hierarchies
            </Typography>
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
              onClick={handleCloseViewLocation}
            >
              <CloseIcon />
            </button>
          </Box>
        </Box>
        <Box
          sx={{
            justifyContent: 'center',
            display: 'flex',
            p: 2,
          }}
        >
          <Box className={classes.inputFieldBox}>{locationSelect}</Box>
        </Box>
      </Box>
    </Dialog>
  )
  useEffect(() => {
    let today = new Date()
    let dd = String(today.getDate())

    let mm = String(today.getMonth() + 1)
    let yyyy = String(today.getFullYear())
    if (dd < '10') {
      dd = '0' + dd
    }

    if (mm < '10') {
      mm = '0' + mm
    }
    let startdate
    startdate = yyyy + '-' + mm + '-' + dd
    //console.log(startdate);
    setCurrentDate(startdate)
  }, [locationNames])

  const handleCreateGroup = (e: any) => {
    e.preventDefault()

    const formData = {
      groupName: groupname,
      groupDesc: description,
      status: status,
      locationHierarchy: locationNames.map((location: any) => {
        return {
          hierarchyLevel: location.hierarchyLevel,
          hierarchyId: location.hierarchyId,
          startDate: location.startDate,
          endDate: location.endDate,
        }
      }),
      productHierarchy: payload.map((product: any) => {
        return {
          hierarchyLevel: product.hierarchyLevel,
          hierarchyId: product.hierarchyId,
          startDate: product.startDate,
          endDate: product.endDate,
        }
      }),
    }
    //console.log(status);
    console.log(formData)
    // let accessToken;
    // if (localStorage && localStorage.getItem("_GresponseV2")) {
    //   accessToken = JSON.parse(
    //     (localStorage && localStorage.getItem("_GresponseV2")) || "{}"
    //   );
    // }

    // axios
    //   .put(
    //     `https://dev-api.morrisons.com/commercial-user/v1/usergroups/${groupId}?apikey=vqaiDRZzSQhA6CPAy0rSotsQAkRepprX`,
    //     formData,
    //     {
    //       headers: {
    //         "Cache-Control": "no-cache",
    //         Authorization: `Bearer ${accessToken.access_token}`,
    //       },
    //     }
    //   )
    putUserGroupAPI(formData, groupId)
      .then((res) => {
        //console.log(res);
        let statusCode = res.status
        //console.log(res.data.message);
        if (statusCode === 200) {
          toast.current.show({
            severity: 'success',
            summary: '',
            detail: res.data.message,
            life: 6000,
            className: 'login-toast',
          })
        }
      })
      .catch((err) => {
        //console.log(err);
        let statusCode = err.response.data.error
        console.log(statusCode)
        toast.current.show({
          severity: 'error',
          summary: 'Error!',
          detail: err.response.data.error,
          life: 6000,
          className: 'login-toast',
        })
      })
  }

  return (
    <>
      <Toast ref={toast} position="bottom-left" />
      <Paper className={classes.root} elevation={0}>
        <Box
          sx={{ flexGrow: 1, p: 1, display: 'flex' }}
          className={classes.text}
        >
          <Grid container spacing={1}>
            <Grid
              container
              item
              xs={12}
              justifyContent="center"
              alignItems="center"
            >
              <Box
                sx={{
                  flexDirection: 'column',
                  display: 'flex',
                  p: 2,
                  paddingLeft: '40px',
                  paddingRight: '30px',
                  textAlign: 'left',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    paddingBottom: '20px',
                    paddingTop: '10px',
                  }}
                >
                  <Box
                    sx={{
                      flexGrow: 1,
                    }}
                  >
                    <Typography variant="h6">Create Group</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: !active ? 'row' : 'column',
                    }}
                  >
                    <Box
                      sx={{
                        paddingLeft: 5,
                      }}
                    >
                      <Link
                        to="/commercial-webapp/userconfig/usergroup"
                        className={classes.backButton}
                      >
                        Back
                      </Link>
                    </Box>
                  </Box>
                </Box>
                <form onSubmit={handleCreateGroup}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: !active ? 'row' : 'column',
                      alignItems: 'baseline',
                    }}
                  >
                    <Box
                      className={classes.inputLabel}
                      sx={{
                        display: !active ? null : 'flex',
                      }}
                    >
                      <Typography variant="subtitle2">
                        Group ID &nbsp;
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
                          name="groupId"
                          id="groupId"
                          placeholder="eg. 012345"
                          className={classes.inputFields}
                          onChange={ongroupIDChange}
                          value={groupId}
                          required
                        />
                      </Typography>
                    </Box>
                  </Box>
                  <Box className={classes.eachRow}>
                    <Box
                      className={classes.inputLabel}
                      sx={{
                        display: !active ? null : 'flex',
                      }}
                    >
                      <Typography variant="subtitle2">
                        Group Name &nbsp;
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
                          name="groupname"
                          id="groupname"
                          placeholder="eg. group name 1"
                          className={classes.inputFields}
                          onChange={ongroupnameChange}
                          value={groupname}
                          required
                        />
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: !active ? 'row' : 'column',
                      paddingTop: '20px',
                    }}
                  >
                    <Box
                      className={classes.inputLabel}
                      sx={{
                        display: !active ? null : 'flex',
                      }}
                    >
                      <Typography variant="subtitle2">Description</Typography>
                    </Box>
                    <Box className={classes.inputFieldBox}>
                      <Typography variant="subtitle2">
                        <TextareaAutosize
                          name="description"
                          id="description"
                          className={classes.textArea}
                          onChange={ondescriptionChange}
                          value={description}
                          minRows="5"
                        />
                      </Typography>
                    </Box>
                  </Box>
                  <Box className={classes.eachRow}>
                    <Box className={classes.inputLabel}>
                      <Typography variant="subtitle2">
                        Status &nbsp;
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
                        <select
                          name="status"
                          id="status"
                          className={classes.selectField}
                          defaultValue=""
                          onChange={onstatusChange}
                          required
                        >
                          <option
                            disabled
                            value=""
                            className={classes.selectOptions}
                          >
                            None
                          </option>
                          {constants.groupstatuses.map((type) => {
                            return (
                              <option value={type.statusID} key={type.statusID}>
                                {type.text}
                              </option>
                            )
                          })}
                        </select>
                      </Typography>
                    </Box>
                  </Box>
                  <Box className={classes.eachRow}>
                    <Box className={classes.inputLabel}>
                      <Typography variant="subtitle2">
                        Product Hierarchies
                      </Typography>
                    </Box>

                    <Box className={classes.inputFieldBox}>
                      <Typography variant="subtitle1">
                        {payload ? (
                          payload.length > 0 ? (
                            <Link
                              to="#"
                              className={classes.underlineRemove}
                              onClick={handleOpenViewProduct}
                            >
                              Product Hierarchies({payload.length})
                            </Link>
                          ) : (
                            <Link
                              to="#"
                              className={classes.underlineRemove}
                              onClick={handleOpenViewProduct}
                            >
                              Add
                            </Link>
                          )
                        ) : (
                          <Link
                            to="#"
                            className={classes.underlineRemove}
                            onClick={handleOpenViewProduct}
                          >
                            Add
                          </Link>
                        )}
                      </Typography>
                      {viewProduct}
                    </Box>
                  </Box>
                  <Box className={classes.eachRow}>
                    <Box className={classes.inputLabel}>
                      <Typography variant="subtitle2">
                        Location Hierarchies
                      </Typography>
                    </Box>

                    <Box className={classes.inputFieldBox}>
                      <Typography variant="subtitle1">
                        {locationNames ? (
                          locationNames.length > 0 ? (
                            <Link
                              to="#"
                              className={classes.underlineRemove}
                              onClick={handleOpenViewLocation}
                            >
                              Location Hierarchies({locationNames.length})
                            </Link>
                          ) : (
                            <Link
                              to="#"
                              className={classes.underlineRemove}
                              onClick={handleOpenViewLocation}
                            >
                              Add
                            </Link>
                          )
                        ) : (
                          <Link
                            to="#"
                            className={classes.underlineRemove}
                            onClick={handleOpenViewLocation}
                          >
                            Add
                          </Link>
                        )}
                      </Typography>
                      {viewLocation}
                    </Box>
                  </Box>
                  <Box className={classes.eachRow}>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: !active ? 'row' : 'column',
                        justifyContent: !active ? 'space-evenly' : 'center',
                        width: !active ? 400 : 200,
                        alignItems: !active ? 'center' : 'center',
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                        }}
                      >
                        <Button
                          type="reset"
                          variant="contained"
                          className={classes.submitButton}
                          onClick={handleReset}
                        >
                          Reset
                        </Button>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                        }}
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          className={classes.buttons}
                          onClick={handleCreateGroup}
                        >
                          Submit
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </form>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </>
  )
}
export default UserGroupCreate
