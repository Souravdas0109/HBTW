import {
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  makeStyles,
  OutlinedInput,
  Radio,
  RadioGroup,
  Typography,
  InputAdornment,
  Button,
  Dialog,
  Box,
  useTheme,
  useMediaQuery,
  styled,
  TextField,
  Select,
  InputLabel,
  MenuItem,
  Tooltip,
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { teal } from '@material-ui/core/colors'
import { SearchOutlined } from '@material-ui/icons'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
// import { RiFileExcel2Fill } from 'react-icons/ri'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import {
  DatePicker,
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers'
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import DatePicker from '@mui/lab/DatePicker';
import DateFnsUtils from '@date-io/date-fns'
import { useHistory } from 'react-router-dom'
import React, { useState, useEffect, useRef } from 'react'
import {
  actionTypes,
  delistAddedToRangeCols,
  delistExistingProductsCols,
  massActions,
  productListCols,
  salesChannels,
  delistToRangeData,
  placeholderCols,
  lineStatusOptions,
  yesOrNo,
  supplierCodeOptions,
  replacementAssociationCols,
  // supplierCodes
} from './DataConstants'
import { MultiSelect } from 'primereact/multiselect'
import { Dropdown } from 'primereact/dropdown'
import { life } from '../../../util/Constants'
import { allMessages } from '../../../util/Messages'
import LoadingComponent from '../../../components/LoadingComponent/LoadingComponent'
import { Toast } from 'primereact/toast'
import AutocompleteSelect from '../../../RangeChangeManagement/components/AutoCompleteSelect/AutocompleteSelect'
import DialogHeader from '../../../RangeChangeManagement/components/DialogHeader/DialogHeader'
import SearchSelect from '../../../RangeChangeManagement/components/SearchSelect/SearchSelect'
import { Autocomplete } from '@material-ui/lab'
import { tableBodyStyle, useStyles, tableHeaderStyle } from './Styles'
import {
  getRangeByRangeResetId,
  putCamundaMileStoneUpdate,
} from '../../../api/Fetch'
import { connect } from 'react-redux'
import { routes } from '../../../util/Constants'
function DelistsAddedToRange(props: any) {
  const { rafpendingActionDetailsCT06, userDetail } = props
  const { DEFAULT, DASHBOARD_RANGE_PENDINGACTION } = routes
  const classes = useStyles()
  const theme = useTheme()
  const history = useHistory()
  const small = useMediaQuery(theme.breakpoints.up('md'))
  const radio = <Radio color="primary" />

  const [productType, setProductType] = useState<any>('existingProducts')
  const [eventDetails, setEventDetails] = useState<any>()
  const [actionType, setActionType] = useState<any>()
  const [actionTypeSelected, setActionTypeSelected] = useState<any>()
  const [actionTypeOptions, setActionTypeOptions] = useState<any>()
  const [min, setMin] = useState<any>('')
  const [existingSearchFields, setExistingSearchFields] = useState<any>()
  const [productId, setProductId] = useState<any>('')
  const [noOfStores, setNoOfStores] = useState<any>('')
  const [storeCode, setStoreCode] = useState<any>('')
  const [supplier, setSupplier] = useState<any>('')
  const [supplierSiteNumber, setSupplierSiteNumber] = useState<any>('')
  const [local, setLocal] = useState<any>('yes')
  const [pin, setPin] = useState<any>('')
  const [buyingMinIngredients, setBuyingMinIngredients] = useState<any>('')
  const [openUploadDialog, setOpenUploadDialog] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<any>()
  const [importedData, setImportedData] = useState<any>()
  const [supplierCode, setSupplierCode] = useState<any>()
  const [selectedSalesChannels, setSelectedSalesChannels] = useState<any>()
  const [placeholderCount, setPlaceholderCount] = useState<any>('')
  const [placeholderProducts, setPlaceholderProducts] = useState<any>([])
  const [replacementAssociationProduct, setReplacementAssociationProduct] =
    useState<any>([])
  const [newProductId, setNewProductId] = useState<any>('')
  const [selectedProductListItems, setSelectedProductListItems] =
    useState<any>()
  const [bulkActions, setBulkActions] = useState<any>()
  const [openActionTypeDialog, setOpenActionTypeDialog] = useState(false)

  const [replaceMinOrPin, setReplaceMinOrPin] = useState<any>('')
  const [fromDate, setFromDate] = useState<any>()
  const [toDate, setToDate] = useState<any>()
  const [addStoreCode, setAddStoreCode] = useState<any>('')
  const [comments, setComments] = useState<any>('')
  const [openPlaceholderDialog, setOpenPlaceholderDialog] = useState(false)
  const [openPlaceholderUpload, setOpenPlaceholderUpload] = useState(false)
  const [placeholderFile, setPlaceholderFile] = useState<any>()

  const [selectedPlaceholderData, setSelectedPlaceholderData] = useState<any>(
    []
  )
  const [selectedReplaceAssData, setSelectedReplaceAssData] = useState<any>([])
  const toast = useRef<any>(null)
  const [toastRemove, setToastRemove] = React.useState('')
  const [barCodeDoesnotExists, setBarCodeDoesnotExists] = useState<any>([])
  const [isProgressLoader, setIsProgressLoader] = useState(false)
  const [barCodeExists, setBarCodeExists] = useState<any>([])
  const [effectiveDateTo, setEffectiveDateTo] = useState<any>(
    null
    // `${new Date().toISOString().split('T')[0]}`
  )
  const [effectiveDateForm, setEffectiveDateForm] = useState<any>(
    null
    // `${new Date().toISOString().split('T')[0]}`
  )

  // const stylesInp = {
  //   container: {
  //     width: '1000px',
  //   },
  //   '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]': {
  //     padding: '0px',
  //   },
  // }
  useEffect(() => {
    console.log(effectiveDateForm)
  }, [effectiveDateForm])

  //   useEffect(() => {
  //     getRangeByRangeResetId('2220')
  //       .then((res: any) => {
  //         console.log(res.data.items)
  //         if (res.data.items.length > 0) {
  //           const data = res.data.items.map((item: any) => {
  //             return {
  //               actionType: item.type,
  //               itemNumber: item.itemNumber,
  //               description: item.description,
  //               lineStatus: 'Draft',
  //               comments: comments,
  //             }
  //           })
  //           setImportedData(data)
  //         }
  //       })
  //       .catch((err: any) => {
  //         console.log(err)
  //         if (importedData && importedData.length > 0) {
  //           setImportedData((prevState: any) => {
  //             return [...prevState]
  //           })
  //         }
  //       })
  //   }, [])
  useEffect(() => {
    if (!rafpendingActionDetailsCT06)
      history.push(`${DEFAULT}${DASHBOARD_RANGE_PENDINGACTION}`)
  }, [
    rafpendingActionDetailsCT06,
    history,
    DEFAULT,
    DASHBOARD_RANGE_PENDINGACTION,
  ])
  useEffect(() => {
    console.log(rafpendingActionDetailsCT06)
    if (rafpendingActionDetailsCT06 && rafpendingActionDetailsCT06.eventId) {
      getRangeByRangeResetId(rafpendingActionDetailsCT06.eventId)
        .then((res: any) => {
          console.log(res.data)
          const data = res.data
          setEventDetails([data])
        })
        .catch((err: any) => {
          console.log(err.response)
        })
    }
  }, [rafpendingActionDetailsCT06])

  useEffect(() => {
    setExistingSearchFields([
      {
        productId: productId,
        storeCode: storeCode,
        supplier: supplier,
        supplierSiteNumber: supplierSiteNumber,
        local: local,
        pin: pin,
        buyingMinIngredients: buyingMinIngredients,
      },
    ])
  }, [
    productId,
    storeCode,
    supplier,
    supplierSiteNumber,
    local,
    pin,
    buyingMinIngredients,
  ])

  const Input = styled('input')({
    display: 'none',
  })

  const handleProductTypeChange = (e: any) => {
    setProductType(e.target.value)
  }

  // const productIdTemplate = (rowData: any) => {
  //     return <TextFieldWithSearch value={productId} onChangeFn={setProductId} onSearch={console.log} />
  // }

  // const storeCodeTemplate = () => {
  //     return <TextFieldWithSearch value={storeCode} onChangeFn={setStoreCode} onSearch={console.log} />
  // }

  // const supplierTemplate = () => {
  //     return <TextFieldWithSearch value={supplier} onChangeFn={setSupplier} onSearch={console.log} />
  // }

  // const supplierSiteNumberTemplate = () => {
  //     return <TextFieldWithSearch value={supplierSiteNumber} onChangeFn={setSupplierSiteNumber} onSearch={console.log} />
  // }

  const localTemplate = (rowData: any) => {
    return (
      <select
        value={rowData.local}
        onChange={(e: any) => {
          setExistingSearchFields((prevState: any) => {
            return [
              {
                ...prevState[0],
                local: e.target.value,
              },
            ]
          })
        }}
        style={{
          height: '30px',
          padding: '5px',
        }}
      >
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>
    )
  }

  // const pinTemplate = () => {
  //     return <TextFieldWithSearch value={pin} onChangeFn={setPin} onSearch={console.log} />
  // }

  // const buyingMinIngredientsTemplate = () => {
  //     return <TextFieldWithSearch value={buyingMinIngredients} onChangeFn={setBuyingMinIngredients} onSearch={console.log} />
  // }

  const clearancePricingTemplate = (rowData: any) => {
    if (rowData['min/pin']) {
      if (rowData.clearancePricing === 'NA') {
        return (
          <select defaultValue={rowData.clearancePricing} disabled>
            <option value="NA">NA</option>
          </select>
        )
      } else {
        return (
          <select defaultValue={rowData.clearancePricing}>
            <option value="Exclude from">Exclude from</option>
            <option value="NA">NA</option>
          </select>
        )
      }
    }
  }

  const clearDepotByTemplate = (rowData: any) => {
    if (rowData['min/pin']) {
      if (rowData.clearDepotBy === 'NA') {
        return (
          <select defaultValue={rowData.clearDepotBy} disabled>
            <option value="NA">NA</option>
          </select>
        )
      } else {
        return (
          <select value={rowData.clearDepotBy}>
            <option value="Week-4">Week-4</option>
            <option value="NA">NA</option>
          </select>
        )
      }
    }
  }

  const ingredientMinTemplate = (rowData: any) => {
    if (
      actionTypeSelected !== 'Delist Product (MIN)' ||
      actionTypeSelected !== 'New Product (MIN)'
    ) {
      return <span>{rowData.ingredientMin}</span>
    } else {
      return (
        <a href="#" style={{ color: '#0074cc' }}>
          <span>{rowData.ingredientMin}</span>
        </a>
      )
    }
  }

  //   useEffect(() => {
  //     getConfigType('Action Type').then((res: any) => {
  //       const actionOptions = res.data.map((actionType: any) => {
  //         return {
  //           label: actionType.configValue,
  //           value: actionType.configValue,
  //         }
  //       })
  //       console.log(actionOptions)
  //       setActionTypeOptions(actionOptions)
  //     })
  //   }, [])

  const handleActionType = (e: any) => {
    if (e) {
      setActionType(e)
      setActionTypeSelected(e.value)
      console.log('ACTION TYPE', e)
    } else {
      setActionType('')
    }
  }

  const handleBulkActions = (e: any) => {
    if (e) {
      setBulkActions(e)
    } else {
      setBulkActions('')
    }
  }

  const handleUploadDialogOpen = () => {
    actionType && setOpenUploadDialog(true)
  }

  const handleUploadDialogClose = () => {
    setOpenUploadDialog(false)
    setUploadedFile(null)
  }

  const handleFileUpload = (event: any) => {
    setUploadedFile(event.target.files[0])
  }

  const handleUpload = (e: any) => {
    // e.preventDefault();
    handleUploadDialogClose()
    if (
      uploadedFile &&
      (uploadedFile.type === 'text/csv' ||
        uploadedFile.type === 'application/vnd.ms-excel' ||
        uploadedFile.type ===
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    ) {
      console.log(uploadedFile)
      import('xlsx').then((xlsx) => {
        const reader = new FileReader()
        reader.onload = (event: any) => {
          const wb = xlsx.read(event.target.result, { type: 'array' })
          const wsname = wb.SheetNames[0]
          const ws = wb.Sheets[wsname]
          const data = xlsx.utils.sheet_to_json(ws)
          console.log(data)
          const data1 = xlsx.utils.sheet_to_json(ws, { header: 1 })
          const cols: any = data1[0]

          const json = JSON.parse(
            // JSON.stringify(data).replace(/ /g, '_')
            JSON.stringify(data).replace(/"\s+|\s+"/g, '"')
          )

          const convert = (obj: any) => {
            const result: any = {}
            Object.keys(obj).forEach(function (key: any) {
              result[key.replace(/ /g, '_')] = obj[key]
            })
            return result
          }

          var result = json.map(function (o: any) {
            return convert(o)
          })
          console.log('trimSpace', result)

          let newData = result.map((d: any, index: any) => {
            if (d.Action_Type && d.Action_Type === 'Delist MIN') {
              getAndCheckItemNumber(
                d.MIN,
                'Delist MIN',
                index + 1,
                d.Comments,
                'NA',
                'NA'
              )
              // return {
              //   actionType: d.Action_Type ? d.Action_Type : '',
              //   min: d.MIN ? d.MIN : '',
              //   comments: d.Comments ? d.Comments : '',
              //   lineStatus: 'Request For Stock Count',
              //   man: 'NA',
              //   ingredientMin: 'NA',
              //   pin: '111111',
              //   description: 'Blahh Blahh',
              //   replaceMin: 'NA',
              //   replaceMinDescription: 'NA',
              //   existingSupplier: 'Futura-1001098',
              //   existingSupplierSite: 'Tetbury-9866',
              //   numberOfRangeStores: 'NA',
              //   storeCode: 'NA',
              // }
            } else if (d.Action_Type && d.Action_Type === 'New MIN') {
              getAndCheckItemNumber(
                d.MIN,
                'New MIN',
                index + 1,
                d.Comments,
                d.New_Number_of_Range_Stores,
                d.Store_Code
              )
              // return {
              //   actionType: d[cols[0]] ? d[cols[0]] : '',
              //   min: d[cols[1]] ? d[cols[1]] : '',
              //   numberOfRangeStores: d[cols[2]] ? d[cols[2]] : '',
              //   storeCode: d[cols[3]] ? d[cols[3]] : '',
              //   comments: d[cols[4]] ? d[cols[4]] : '',
              //   lineStatus: 'Draft',
              //   man: 'NA',
              //   ingredientMin: 'NA',
              //   pin: '111111',
              //   description: 'Blahh Blahh',
              //   replaceMin: 'NA',
              //   replaceMinDescription: 'NA',
              //   existingSupplier: 'Futura-1001098',
              //   existingSupplierSite: 'Tetbury-9866',
              // }
            }
          })

          // console.log(newData)
          // if (importedData && importedData.length > 0) {
          //   setImportedData((prevState: any) => {
          //     return [...prevState, ...newData]
          //   })
          // } else {
          //   setImportedData([...newData])
          // }
        }

        reader.readAsArrayBuffer(uploadedFile)
      })
    } else {
      alert('Upload correct file')
      setUploadedFile(null)
    }
  }

  const uploadDialog = (
    <Dialog open={openUploadDialog} onClose={handleUploadDialogClose}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: small ? '400px' : '260px',
          // height: "250px",
          border: '3px solid green',
          borderRadius: 5,
        }}
      >
        <DialogHeader
          title={`Upload ${actionType && actionType.value}`}
          onClose={handleUploadDialogClose}
        />

        <Box sx={{ p: 1 }}>
          <Typography variant="body2" color="primary">
            Upload {actionType && actionType.value}
          </Typography>
        </Box>

        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
            <input
              type="text"
              value={uploadedFile ? uploadedFile.name : ''}
              onClick={() => document.getElementById('selectedFile')!.click()}
              className={classes.uploadTextfield}
              placeholder="No file selected"
              readOnly
            />
            <Input
              type="file"
              id="selectedFile"
              accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              onChange={handleFileUpload}
              required
            />
            <button
              type="button"
              onClick={() => document.getElementById('selectedFile')!.click()}
              className={classes.uploadButton}
              style={{ width: '60%' }}
            >
              Browse...
            </button>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            p: 2,
            justifyContent: 'right',
          }}
        >
          <Box>
            <Typography color="primary">
              Supported file type in MS Excel
              <i className="pi pi-file-excel" style={{ fontSize: '18px' }}></i>
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            p: 3,
            justifyContent: 'right',
          }}
        >
          <Button
            //   className={classes.submitButtons}
            variant="contained"
            color="primary"
            onClick={handleUpload}
          >
            Select
          </Button>
        </Box>
      </Box>
    </Dialog>
  )

  const handleActionTypeDialogOpen = () => {
    actionType && setOpenActionTypeDialog(true)
  }

  const handleActionTypeDialogClose = () => {
    setOpenActionTypeDialog(false)
    // setMin('')
    // setComments('')
    // setNoOfStores('')
    // setStoreCode('')
  }

  const handleFromDate = (date: any) => {
    // const newDate = date.getDate() + "-" + parseInt(date.getMonth() + 1) + "-" + date.getFullYear()
    const newDate =
      parseInt(date.getMonth() + 1) +
      '-' +
      date.getDate() +
      '-' +
      date.getFullYear()
    console.log(newDate)
    setFromDate(newDate)
  }

  const handleToDate = (date: any) => {
    // const newDate = date.getDate() + "-" + parseInt(date.getMonth() + 1) + "-" + date.getFullYear()
    const newDate =
      parseInt(date.getMonth() + 1) +
      '-' +
      date.getDate() +
      '-' +
      date.getFullYear()
    console.log(newDate)
    setToDate(newDate)
  }

  const handleAddProduct = (e: any) => {
    e.preventDefault()
    if (
      min ||
      replaceMinOrPin ||
      fromDate ||
      toDate ||
      addStoreCode ||
      comments
    ) {
      if (actionType && actionType.value !== 'Derange MIN') {
        let addData = {
          'action/type': actionType && actionType,
          'min/pin': min && min,
          description: 'NA',
          'replaceMin/pin': replaceMinOrPin ? replaceMinOrPin : 'NA',
          fromDate: fromDate ? fromDate : 'NA',
          toDate: toDate ? toDate : 'NA',
          lineStatus: 'Request For',
          clearancePricing: 'Include in',
          clearDepotBy: 'Week-4',
        }
        console.log(addData)
        if (importedData) {
          setImportedData((prevState: any) => {
            let newData = [...prevState]
            newData.push(addData)
            return newData
          })
        } else {
          setImportedData([addData])
        }
        // let newData = importedData ? [...importedData]: []
        // newData.push(addData)
        // console.log(newData);
        handleActionTypeDialogClose()
      }
    }
  }
  // console.log('minValue', minValue)
  // getProductServiceByItemnumber &&
  //   getProductServiceByItemnumber(minValue)
  //     .then((res: any) => {
  //       console.log('Item res 100001498', res)
  //     })
  //     .catch((err: any) => {
  //       console.log('Item err 100001498', err)
  //     })
  const getAndCheckItemNumber = (
    minValue: any,
    type: any,
    index: any,
    commentXl: any,
    newnoofrangestoreXl: any,
    storecodeXl: any
  ) => {
    setIsProgressLoader(true)
    const formData: any = {
      min: min !== '' ? min : minValue,
      pin: '',
      packquantity: '',
      description: '',
      actionType: type,
      legacyItemNumbers: '',
      supplierId: '',
      comments: comments,
      storeCode: 'NA',
      numberOfRangeStores: 'NA',
      lineStatus:
        actionTypeSelected === 'Delist Product (MIN)'
          ? 'Request For Stock Count'
          : 'Draft',
      ingredientMin: '',
      man: '',
      edf: effectiveDateForm,
      edt: effectiveDateTo,
    }

    Promise.allSettled([
      //Dont change sequence order below api calls
      //   getProductServiceByItemnumber(minValue),
      //   getRangeByRangeResetId('2220'),
      //   getProductSupplierServiceByItemnumber(minValue),
    ])
      .then(function (values: any) {
        console.log('promise1, promise2', values)
        const [rREventId, productV1, ProductSupp] = values
        const getEventApi = rREventId.value.data
        const productV1Api = productV1.value.data
        const ProductSuppApi = ProductSupp.value.data
        if (values[0].status === 'rejected') {
          setIsProgressLoader(false)
          toast.current.show({
            severity: 'error',
            summary: 'Error',
            //detail: `${minValue} ${allMessages.error.itemIdError}`,
            life: life,
            className: 'login-toast',
          })
          return
        }
        //Only for placeHolder
        // if (
        //   getEventApi.department !==
        //   productV1Api.commercialHierarchy.departmentName
        // ) {
        //   setIsProgressLoader(false)
        //   toast.current.show({
        //     severity: 'error',
        //     summary: 'Error',
        //     detail: `${minValue} ${"Department did'nt match."}`,
        //     life: life,
        //     className: 'login-toast',
        //   })
        //   return
        // }
        //Only for placeHolder

        formData.pin = values[0].value.data.packs[0].packNumber //pin
        formData.man = values[0].value.data.parentItemNumber // parentItemNumber
        formData.packquantity = parseInt(
          values[0].value.data.packs[0].packQuantity
        ) // Packquantity
        formData.description = values[0].value.data.itemDescription // itemDescription
        formData.legacyItemNumbers = values[0].value.data.legacyItemNumbers //legacyItemNumbers
        formData.supplierId = values[2].value.data.itemSuppliers[0].supplierId

        formData.ingredientMin = parseInt(
          values[0].value.data.ingredients.length
        )

        if (type === 'Delist MIN') {
          formData.comments = comments === '' ? commentXl : comments
        }
        if (type === 'New MIN') {
          formData.storeCode = storecodeXl
          formData.numberOfRangeStores = newnoofrangestoreXl
          formData.comments = comments === '' ? commentXl : comments
        }
        if (type === 'Delist PIN') {
          formData.storeCode = storecodeXl
          formData.numberOfRangeStores = newnoofrangestoreXl
          formData.comments = comments === '' ? commentXl : comments
          formData.edf = effectiveDateForm === null ? 'NA' : effectiveDateForm
          formData.edt = effectiveDateTo === null ? 'NA' : effectiveDateTo
        }

        if (importedData && importedData.length > 0) {
          setImportedData((prevState: any) => {
            return [...prevState, formData]
          })
        } else {
          setImportedData([formData])
        }
        console.log('formData', formData)
        toast.current.show({
          severity: 'success',
          summary: 'Success',
          //detail: `${minValue} ${allMessages.success.itemIdSuccess}`,
          life: life,
          className: 'login-toast',
        })
        setIsProgressLoader(false)
        setActionType('')
      })
      .catch((err: any) => {
        setIsProgressLoader(false)
        console.log('promise1, ERRor', err)
        if (importedData && importedData.length > 0) {
          setImportedData((prevState: any) => {
            return [...prevState, formData]
          })
        } else {
          setImportedData([formData])
        }
      })
  }

  const handleManualRAF = () => {
    console.log('clicked')

    handleActionTypeDialogClose()
    // return
    if (actionType.value === 'Delist Product (MIN)') {
      if (min !== '') {
        console.log('hello')
        getAndCheckItemNumber(min, 'Delist MIN', '', '', 'NA', 'NA')
        // const formData = {
        //   actionType: actionType.value,
        //   itemNumber: min,
        //   comments: comments,
        //   lineStatus: 'Request For Stock Count',
        //   man: 'NA',
        //   ingredientMin: 'NA',
        //   pin: '111111',
        //   description: 'Blahh Blahh',
        //   replaceMin: 'NA',
        //   replaceMinDescription: 'NA',
        //   existingSupplier: 'Futura-1001098',
        //   existingSupplierSite: 'Tetbury-9866',
        //   numberOfRangeStores: 'NA',
        //   storeCode: 'NA',
        // }
        // if (importedData && importedData.length > 0) {
        //   setImportedData((prevState: any) => {
        //     return [...prevState, formData]
        //   })
        // } else {
        //   setImportedData([formData])
        // }
      }
    } else if (actionType.value === 'New Product (MIN)') {
      if (min !== '') {
        console.log('hello')
        getAndCheckItemNumber(min, 'New MIN', '', '', noOfStores, '')
        // const formData = {
        //   actionType: actionType.value,
        //   min: min,
        //   comments: comments,
        //   lineStatus: 'Draft',
        //   man: 'NA',
        //   ingredientMin: 'NA',
        //   pin: '111111',
        //   description: 'Blahh Blahh',
        //   replaceMin: 'NA',
        //   replaceMinDescription: 'NA',
        //   existingSupplier: 'Futura-1001098',
        //   existingSupplierSite: 'Tetbury-9866',
        //   numberOfRangeStores: noOfStores ? noOfStores : 'NA',
        //   storeCode: storeCode ? storeCode : 'NA',
        // }
        // if (importedData && importedData.length > 0) {
        //   setImportedData((prevState: any) => {
        //     return [...prevState, formData]
        //   })
        // } else {
        //   setImportedData([formData])
        // }
      }
    } else if (actionType.value === 'Delist Outercase Code (PIN)') {
      if (min !== '') {
        console.log('hello')
        getAndCheckItemNumber(min, 'Delist PIN', '', '', '', '')
        // const formData = {
        //   actionType: actionType.value,
        //   min: min,
        //   comments: comments,
        //   lineStatus: 'Draft',
        //   man: 'NA',
        //   ingredientMin: 'NA',
        //   pin: '111111',
        //   description: 'Blahh Blahh',
        //   replaceMin: 'NA',
        //   replaceMinDescription: 'NA',
        //   existingSupplier: 'Futura-1001098',
        //   existingSupplierSite: 'Tetbury-9866',
        //   numberOfRangeStores: noOfStores ? noOfStores : 'NA',
        //   storeCode: storeCode ? storeCode : 'NA',
        // }
        // if (importedData && importedData.length > 0) {
        //   setImportedData((prevState: any) => {
        //     return [...prevState, formData]
        //   })
        // } else {
        //   setImportedData([formData])
        // }
      }
    }
  }

  const handleProductListSave = () => {
    console.log('handleProductListSave', importedData)
  }

  const actionTypeDialog = (
    <Dialog
      open={openActionTypeDialog}
      onClose={handleActionTypeDialogClose}
      fullWidth
      classes={{ paperFullWidth: classes.placeholderDialog }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          //   width: small ? '500px' : '260px',
          // height: "250px",
          border: '3px solid green',
          borderRadius: 5,
          padding: '10px',
        }}
      >
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          {/* <Box
          sx={{
            display: 'flex',
            height: 30,
            flexDirection: 'row',
            borderRadius: 10,
          }}
          //   className={classes.dialogTitle}
        >
          <Box
            sx={{
              display: 'flex',
              flexGrow: 1,
              justifyContent: 'center',
            }}
          >
            <Typography variant="subtitle1">Add {actionType}</Typography>
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
              //   className={classes.dialogCloseButton}
              onClick={handleActionTypeDialogClose}
            >
              <b>X</b>
            </button>
          </Box>
        </Box> */}
          <DialogHeader
            title={`Add ${actionType && actionType.value}`}
            onClose={handleActionTypeDialogClose}
          />

          {/* <Box sx={{ p: 1 }}>
          <Typography variant="body2">Add {actionType}</Typography>
        </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <table cellPadding={'10px'}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <thead
                  style={{
                    fontSize: '12px',
                    textAlign: 'left',
                  }}
                >
                  <tr>
                    <th>{actionType}</th>
                    <th>
                      <TextField
                        variant="outlined"
                        // className={classes.addActionFields}
                        size="small"
                        value={min}
                        onChange={(e: any) => setMinOrPin(e.target.value)}
                        required
                      />
                    </th>
                  </tr>
                  <tr>
                    <th>Replace MIN/PIN</th>
                    <th>
                      <TextField
                        variant="outlined"
                        // className={classes.addActionFields}
                        size="small"
                        value={replaceMinOrPin}
                        onChange={(e: any) =>
                          setReplaceMinOrPin(e.target.value)
                        }
                      />
                    </th>
                  </tr>

                  <tr>
                    <th>Effective Date(from)</th>
                    <th>
                      <KeyboardDatePicker
                        format="dd/MM/yyyy"
                        inputVariant="outlined"
                        value={fromDate}
                        onChange={handleFromDate}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                        style={{
                          height: '35px',
                        }}
                        size="small"
                      />
                      
                    </th>
                  </tr>

                  <tr>
                    <th>Effective Date(to)</th>
                    <th>
                      <KeyboardDatePicker
                        format="dd/MM/yyyy"
                        inputVariant="outlined"
                        value={toDate}
                        onChange={handleToDate}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                        style={{
                          height: '35px',
                        }}
                        size="small"
                      />
                      
                    </th>
                  </tr>

                  {actionType === 'Derange MIN' && (
                    <tr>
                      <th>Store Code</th>
                      <th>
                        <TextField
                          variant="outlined"
                          //   className={classes.addActionFields}
                          size="small"
                          value={addStoreCode}
                          onChange={(e: any) => setAddStoreCode(e.target.value)}
                          required
                        />
                      </th>
                    </tr>
                  )}

                  <tr>
                    <th>Comments</th>
                    <th>
                      <TextField
                        variant="outlined"
                        // className={classes.addActionFields}
                        size="small"
                        value={comments}
                        onChange={(e: any) => setComments(e.target.value)}
                      />
                    </th>
                  </tr>
                </thead>
              </MuiPickersUtilsProvider>

            </table>
          </Box>

          <Box
            sx={{
              display: 'flex',
              p: 3,
              justifyContent: 'right',
            }}
          >
            <Button
              // className={classes.submitButtons}
              type="submit"
            >
              Add
            </Button>
          </Box> */}
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ p: 1 }}>
              <Typography variant="subtitle2" color="primary">
                {`Add ${actionType && actionType.value}`}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                p: 1,
                width: '100%',
              }}
            >
              {actionType && actionType.value === 'Delist Product (MIN)' && (
                <>
                  <Box
                    sx={{
                      p: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      // flexGrow: '1',
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle2" color="primary">
                        Delist Product (MIN)
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" color="primary">
                        {/* <input
                        type="text"
                        value={min}
                        onChange={(e: any) => setMin(e.target.value)}
                      /> */}
                        <OutlinedInput
                          value={min}
                          onChange={(e: any) => setMin(e.target.value)}
                          className={classes.inputFields}
                        />
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      p: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      // flexGrow: '1',
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle2" color="primary">
                        Comments
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" color="primary">
                        {/* <input
                        type="text"
                        value={comments}
                        onChange={(e: any) => setComments(e.target.value)}
                      /> */}
                        <OutlinedInput
                          value={comments}
                          onChange={(e: any) => setComments(e.target.value)}
                          className={classes.inputFields}
                        />
                      </Typography>
                    </Box>
                  </Box>
                </>
              )}

              {actionType && actionType.value === 'New Product (MIN)' && (
                <>
                  <Box sx={{ p: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box>
                      <Typography variant="subtitle2" color="primary">
                        New Product (MIN)
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" color="primary">
                        {/* <input
                        type="text"
                        value={min}
                        onChange={(e: any) => setMin(e.target.value)}
                      /> */}
                        <OutlinedInput
                          value={min}
                          onChange={(e: any) => setMin(e.target.value)}
                          className={classes.inputFields}
                        />
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ p: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box>
                      <Typography variant="subtitle2" color="primary">
                        New no. of Range Stores
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" color="primary">
                        {/* <input
                        type="text"
                        value={noOfStores}
                        onChange={(e: any) => setNoOfStores(e.target.value)}
                      /> */}
                        <OutlinedInput
                          value={noOfStores}
                          onChange={(e: any) => setNoOfStores(e.target.value)}
                          className={classes.inputFields}
                        />
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ p: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box>
                      <Typography variant="subtitle2" color="primary">
                        Store Code
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" color="primary">
                        {/* <select
                        placeholder="--Select--"
                        value={storeCode}
                        onChange={(e: any) => setStoreCode(e.target.value)}
                        style={{ width: '160px' }}
                      >
                        <option value="001">Store-001</option>
                      </select> */}

                        <Select
                          value={storeCode}
                          onChange={(e) => setStoreCode(e.target.value)}
                          input={
                            <OutlinedInput
                              margin="dense"
                              className={classes.inputFields}
                            />
                          }
                        >
                          <MenuItem
                            value={'001'}
                            // key={type.id}
                            className={classes.muiSelect}
                          >
                            Store-001
                          </MenuItem>
                        </Select>
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ p: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box>
                      <Typography variant="subtitle2" color="primary">
                        Comments
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" color="primary">
                        {/* <input
                        type="text"
                        value={comments}
                        onChange={(e: any) => setComments(e.target.value)}
                      /> */}
                        <OutlinedInput
                          value={comments}
                          onChange={(e: any) => setComments(e.target.value)}
                          className={classes.inputFields}
                        />
                      </Typography>
                    </Box>
                  </Box>
                </>
              )}
              {actionType &&
                actionType.value === 'Delist Outercase Code (PIN)' && (
                  <>
                    <Box
                      sx={{ p: 1, display: 'flex', flexDirection: 'column' }}
                    >
                      <Box>
                        <Typography variant="subtitle2" color="primary">
                          Delist Outercase Code (PIN)
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" color="primary">
                          {/* <input
                        type="text"
                        value={min}
                        onChange={(e: any) => setMin(e.target.value)}
                      /> */}
                          <OutlinedInput
                            value={min}
                            onChange={(e: any) => setMin(e.target.value)}
                            className={classes.inputFields}
                          />
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{ p: 1, display: 'flex', flexDirection: 'column' }}
                    >
                      <Box>
                        <Typography variant="subtitle2" color="primary">
                          Effective Date(From)
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" color="primary">
                          {/* <input
                        type="text"
                        value={noOfStores}
                        onChange={(e: any) => setNoOfStores(e.target.value)}
                      /> */}
                          <DatePicker
                            format="dd/MM/yy"
                            value={effectiveDateForm}
                            onChange={(e: any) => {
                              setEffectiveDateForm(
                                e.toISOString().split('T')[0]
                              )
                            }}
                            minDate={new Date().toISOString().split('T')[0]}
                          />
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{ p: 1, display: 'flex', flexDirection: 'column' }}
                    >
                      <Box>
                        <Typography variant="subtitle2" color="primary">
                          Effective Date(To)
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" color="primary">
                          {/* <select
                        placeholder="--Select--"
                        value={storeCode}
                        onChange={(e: any) => setStoreCode(e.target.value)}
                        style={{ width: '160px' }}
                      >
                        <option value="001">Store-001</option>
                      </select> */}

                          <DatePicker
                            format="dd/MM/yy"
                            value={effectiveDateTo}
                            onChange={(e: any) => {
                              setEffectiveDateTo(e.toISOString().split('T')[0])
                            }}
                            minDate={effectiveDateForm && effectiveDateForm}
                            disabled={effectiveDateForm === null ? true : false}
                          />
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{ p: 1, display: 'flex', flexDirection: 'column' }}
                    >
                      <Box>
                        <Typography variant="subtitle2" color="primary">
                          Comments
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" color="primary">
                          {/* <input
                        type="text"
                        value={comments}
                        onChange={(e: any) => setComments(e.target.value)}
                      /> */}
                          <OutlinedInput
                            value={comments}
                            onChange={(e: any) => setComments(e.target.value)}
                            className={classes.inputFields}
                          />
                        </Typography>
                      </Box>
                    </Box>
                  </>
                )}
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
              <Box sx={{ p: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleManualRAF} //De-list save
                >
                  Save
                </Button>
              </Box>
            </Box>
          </Box>
        </MuiPickersUtilsProvider>
      </Box>
    </Dialog>
  )

  const existingProducts = (
    <form style={{ width: '100%' }}>
      <Grid
        item
        container
        xl={12}
        lg={12}
        md={12}
        sm={12}
        xs={12}
        style={{ alignItems: 'center' }}
      >
        <Grid item container xl={8} lg={8} md={8} sm={12} xs={12}>
          <DataTable
            value={existingSearchFields}
            scrollable
            showGridlines
            style={{
              height: '100%',
              width: '100%',
            }}
            className="p-datatable-sm"
          >
            {delistExistingProductsCols.map((col: any, index: any) => {
              return (
                <Column
                  key={index}
                  field={col.field}
                  header={col.header}
                  // style={{
                  //   width: col.width,
                  //   fontSize: '0.9rem',
                  //   padding: '0.5rem',
                  // }}
                  // headerStyle={{
                  //   backgroundColor: teal[900],
                  //   color: 'white',
                  //   width: col.width,
                  //   fontSize: '0.9rem',
                  //   padding: '0.5rem',
                  // }}
                  bodyStyle={tableBodyStyle(col.width)}
                  headerStyle={tableHeaderStyle(
                    col.width,
                    theme.palette.primary.main
                  )}
                  body={
                    // (col.field === "productId" && productIdTemplate)
                    // ||
                    // (col.field === "storeCode" && storeCodeTemplate)
                    // ||
                    // (col.field === "supplier" && supplierTemplate)
                    // ||
                    // (col.field === "supplierSiteNumber" && supplierSiteNumberTemplate)
                    // ||
                    col.field === 'local' && localTemplate
                    // ||
                    // (col.field === "pin" && pinTemplate)
                    // ||
                    // (col.field === "buyingMinIngredients" && buyingMinIngredientsTemplate)
                  }
                />
              )
            })}
          </DataTable>
        </Grid>
        <Grid
          item
          container
          xl={4}
          lg={4}
          md={4}
          sm={12}
          xs={12}
          style={{ textAlign: 'center' }}
          spacing={2}
        >
          <Grid item xl={5} lg={5} md={5} sm={12} xs={12}>
            <Button variant="contained" color="primary" type="submit">
              ADD
            </Button>
          </Grid>
          <Grid item xl={2} lg={2} md={2} sm={12} xs={12}>
            OR
          </Grid>
          <Grid item xl={5} lg={5} md={5} sm={12} xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleUploadDialogOpen}
            >
              Upload File
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  )

  const submitNewProduct = (e: any) => {
    e.preventDefault()
    if (newProductId) {
      let newProductData: any = {
        productId: newProductId,
        description: '',
        'department/Category': 'Household & Pet Food/Pet Foods',
        lineStatus: 'Draft',
        type: 'New',
        clearancePricing: 'NA',
        clearDepotBy: 'NA',
      }
      if (importedData) {
        setImportedData((prevState: any) => {
          let newData = [...prevState]
          newData.push(newProductData)
          console.log(newData)
          return newData
        })
      } else {
        setImportedData([newProductData])
      }
    }
  }

  const newProducts = (
    <form style={{ width: '100%' }} onSubmit={submitNewProduct}>
      <Grid
        item
        container
        xl={12}
        lg={12}
        md={12}
        sm={12}
        xs={12}
        style={{ alignItems: 'end' }}
        spacing={2}
      >
        <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
          New Products
          <br />
          <input
            type="text"
            required
            // className={classes.placeholderCountStyle}
            style={{
              width: small ? '88%' : '100%',
            }}
            value={newProductId}
            onChange={(e: any) => setNewProductId(e.target.value)}
          />
        </Grid>
        <Grid
          item
          xl={2}
          lg={2}
          md={2}
          sm={6}
          xs={12}
          style={{ textAlign: 'center' }}
        >
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{ width: '80px' }}
          >
            ADD
          </Button>
        </Grid>
      </Grid>
    </form>
  )

  const submitPlaceholderProducts = (e: any) => {
    e.preventDefault()
    if (placeholderCount && supplierCode && salesChannels.length > 0) {
      let placeholderData: any = []
      for (var i = 0; i < placeholderCount; i++) {
        placeholderData.push({
          productId: `rand${Math.floor(100 + Math.random() * 900)}`,
          description: '',
          'department/Category': 'Household & Pet Food/Pet Foods',
          lineStatus: 'Draft',
          type: 'Placeholder',
          clearancePricing: 'NA',
          clearDepotBy: 'NA',
        })
      }
      console.log(placeholderData)
      if (importedData) {
        setImportedData((prevState: any) => {
          let newData = [...prevState]
          placeholderData.map((d: any) => {
            newData.push(d)
          })
          return newData
        })
      } else {
        setImportedData(placeholderData)
      }
    }
  }

  useEffect(() => {
    console.log('importedData', importedData)
  }, [importedData])

  //   const placeholderProducts = (
  //     <Grid
  //       item
  //       container
  //       xl={12}
  //       lg={12}
  //       md={12}
  //       sm={12}
  //       xs={12}
  //       style={{
  //         alignItems: 'center',
  //         padding: '10px',
  //       }}
  //       spacing={2}
  //     >
  //       <Grid item container md={7} sm={12} xs={12}>
  //         <Grid item xs={8}>
  //           <Typography variant="subtitle2" color="primary">
  //             How many new lines do you wish to enter?
  //             <br />
  //             <input
  //               type="text"
  //               required
  //               // className={classes.placeholderCountStyle}
  //               style={{
  //                 width: small ? '88%' : '100%',
  //               }}
  //               value={placeholderCount}
  //               onChange={(e: any) => setPlaceholderCount(e.target.value)}
  //             />
  //           </Typography>
  //         </Grid>
  //         <Grid
  //           item
  //           //   xl={2}
  //           //   lg={2}
  //           //   md={2}
  //           //   sm={6}
  //           xs={4}
  //           style={{ textAlign: 'center' }}
  //         >
  //           <Button
  //             variant="contained"
  //             color="primary"
  //             type="submit"
  //             style={{ width: '80px' }}
  //           >
  //             ADD
  //           </Button>
  //         </Grid>
  //       </Grid>

  //       <Grid item sm={1} xs={12}>
  //         <Typography variant="subtitle2" color="primary">
  //           OR
  //         </Typography>
  //       </Grid>
  //       <Grid item md={3} sm={12} xs={12}>
  //         <Button
  //           variant="contained"
  //           color="primary"
  //           // type="submit"
  //           // style={{ width: '80px' }}
  //         >
  //           Upload File
  //         </Button>
  //       </Grid>
  //     </Grid>
  //   )

  const handleTableStatusChange = (rowData: any, e: any) => {
    let newData: any = []
    importedData.map((d: any) => {
      if (d.min === rowData.min) {
        let selectValue = d
        selectValue.lineStatus = e.target.value
        newData.push(selectValue)
      } else {
        newData.push(d)
      }
    })
    console.log(newData)
    setImportedData(newData)
  }

  const lineStatusTemplate = (rowData: any) => {
    // return (
    //   <select
    //     value={rowData !== undefined ? rowData.lineStatus : 'Draft'}
    //     onChange={(e: any) => handleTableStatusChange(rowData, e)}
    //   >
    //     {lineStatusOptions.map((status: any) => {
    //       return (
    //         <option value={status.value} key={status.value}>
    //           {status.label}
    //         </option>
    //       )
    //     })}
    //   </select>
    // )
    return (
      <Select
        value={rowData.lineStatus}
        onChange={(e: any) => handleTableStatusChange(rowData, e)}
        input={<OutlinedInput margin="dense" className={classes.muiSelect} />}
      >
        {lineStatusOptions.map((type) => {
          return (
            <MenuItem value={type.value} key={type.value}>
              {type.label}
            </MenuItem>
          )
        })}
      </Select>
    )
  }

  const productListTable = (
    <Grid
      item
      container
      xl={12}
      lg={12}
      md={12}
      sm={12}
      xs={12}
      style={{ alignItems: 'center', paddingTop: '20px' }}
      spacing={2}
    >
      <Grid item xl={7} lg={7} md={7} sm={5} xs={12}>
        <Typography variant="subtitle1" color="primary">
          Product List
        </Typography>
      </Grid>
      <Grid item container xl={5} lg={5} md={5} sm={5} xs={12} spacing={2}>
        <Grid item xl={8} lg={8} md={8} sm={8} xs={7}>
          {/* <FormControl
            variant="outlined"
            style={{
              width: '90%',
            }}
          > */}
          {/* {!bulkActions && (
              <InputLabel
                id="demo-simple-select-outlined-label"
                style={{
                  color: 'white',
                  fontSize: '14px',
                }}
              >
                BULK ACTIONS
              </InputLabel>
            )} */}
          {/* <InputLabel>Bulk Actions</InputLabel>

            <Select
              value={bulkActions}
              // displayEmpty
              // inputProps={{ 'aria-label': 'Without label' }}
              onChange={(e: any) => setBulkActions(e.target.value)}
              className={classes.bulkActionSelect}
              // input={
              //   <OutlinedInput
              //     margin="dense"
              //     className={classes.bulkActionSelect}
              //     placeholder="BULK ACTIONS"
              //   />
              // }
            >
              
              {massActions.map((action: any) => {
                return (
                  <MenuItem value={action.value} key={action.value}>
                    {action.label}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl> */}
          <Typography color="primary">
            <AutocompleteSelect
              value={bulkActions}
              options={massActions}
              onChange={handleBulkActions}
              placeholder="Bulk Actions"
            />
          </Typography>
        </Grid>
        <Grid item xl={4} lg={4} md={4} sm={4} xs={5}>
          <Button variant="contained" color="primary">
            Refresh
          </Button>
        </Grid>
      </Grid>

      <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
        <DataTable
          value={importedData && importedData}
          className="p-datatable-sm"
          // paginator
          // rows={10}
          // alwaysShowPaginator={false}
          // editMode="cell"
          selectionMode="checkbox"
          selection={selectedProductListItems}
          onSelectionChange={(e: any) => {
            setSelectedProductListItems(e.value)
            setReplacementAssociationProduct(e.value)
          }}
          showGridlines
          scrollable
          rowHover
        >
          <Column
            selectionMode="multiple"
            headerStyle={{
              width: '50px',
              color: 'white',
              backgroundColor: teal[900],
            }}
          ></Column>
          {/* <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column> */}
          {productListCols.map((col: any, index: any) => {
            return (
              <Column
                key={index}
                field={col.field}
                header={col.header}
                body={
                  (col.field === 'lineStatus' && lineStatusTemplate) ||
                  (col.field === 'clearancePricing' &&
                    clearancePricingTemplate) ||
                  (col.field === 'ingredientMin' && ingredientMinTemplate) ||
                  (col.field === 'clearDepotBy' && clearDepotByTemplate)
                }
                // style={{
                //   width: col.width,
                //   fontSize: '0.8rem',
                //   padding: '8px',
                // }}
                // headerStyle={{
                //   color: 'white',
                //   backgroundColor: teal[900],
                //   width: col.width,
                //   fontSize: '0.9rem',
                //   padding: '8px',
                // }}
                bodyStyle={tableBodyStyle(col.width)}
                headerStyle={tableHeaderStyle(
                  col.width,
                  theme.palette.primary.main
                )}
              />
            )
          })}
        </DataTable>
      </Grid>
      {/* <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
        <button
        //  className={classes.backButton}
        >
          <Typography variant="subtitle1">View More Columns</Typography>
        </button>
      </Grid> */}
    </Grid>
  )

  const handlePlaceholderDialogOpen = () => {
    setOpenPlaceholderDialog(true)
  }
  const handlePlaceholderDialogClose = () => {
    setOpenPlaceholderDialog(false)
  }

  const [openReplacementAssDialog, setOpenReplacementAssDialog] =
    useState(false)

  const handleReplacemantAssociationDialogOpen = () => {
    setOpenReplacementAssDialog(true)
  }
  const handleReplacemantAssociationDialogClose = () => {
    setOpenReplacementAssDialog(false)
  }

  console.log('placeholderProducts CHeck', placeholderProducts)

  const handlePlaceholderAdd = (count: any) => {
    if (count != 0) {
      console.log('adding ', count)
      const newData: any = []
      for (var i = 0; i < count; i++) {
        var min = 1000000000000
        var max = 9999999999999
        var rand = Math.floor(min + Math.random() * (max - min))

        newData.push({
          _idCheck: rand,
          actionType: 'Placeholder MIN',
          min: '',
          comments: '',
          lineStatus: 'Draft',
          man: 'NA',
          ingredientMin: 'NA',
          pin: 'NA    ',
          description: '',
          replaceMin: 'NA',
          replaceMinDescription: 'NA',
          existingSupplier: '',
          existingSupplierSite: '',
          numberOfRangeStores: '',
          storeCode: '',
          ownBrand: 'Y',
          barcode: i === 0 ? '5010228012933' : '501022801293' + i,
          casePack: '',
          local: 'Y',
          onlineCFC: 'Y',
          onlineStorePick: 'Y',
          wholesale: 'Y',
        })
      }

      console.log(newData)
      if (placeholderProducts && placeholderProducts.length > 0) {
        setPlaceholderProducts((prevState: any) => {
          return [...prevState, ...newData]
        })
      } else {
        setPlaceholderProducts(newData)
      }
    }
  }
  const handleReplacementAssAdd = (count: any) => {
    if (count != 0) {
      console.log('adding ', count)
      const newData: any = []
      for (var i = 0; i < count; i++) {
        var min = 1000000000000
        var max = 9999999999999
        var rand = Math.floor(min + Math.random() * (max - min))

        newData.push({
          delist_min_pin: '111913101',
          replace_min_pin: '148759650',
          effectivedatefrom: '12/02/2022',
          effectivedateto: '12/02/2022',
          comments: 'Hello',
        })
      }

      console.log(newData)
      if (
        replacementAssociationProduct &&
        replacementAssociationProduct.length > 0
      ) {
        setReplacementAssociationProduct((prevState: any) => {
          return [...prevState, ...newData]
        })
      } else {
        setReplacementAssociationProduct(newData)
      }
    }
  }

  const removeReplaceAssociate = () => {
    let _tasks = replacementAssociationProduct.filter(
      (value: any) => !selectedReplaceAssData.includes(value)
    )
    console.log(_tasks)
    setReplacementAssociationProduct(_tasks)
    setSelectedReplaceAssData(null)
  }

  const removePlaceholder = () => {
    if (
      selectedPlaceholderData.length < 1 ||
      selectedPlaceholderData === null
    ) {
      return
    }

    setIsProgressLoader(true)
    let _tasks = placeholderProducts.filter(
      (value: any) => !selectedPlaceholderData.includes(value)
    )

    // let _bar = barCodeExists.map((val: any) => {
    //   return selectedPlaceholderData.filter((fil: any) => {
    //     return val.barcode !== fil.barcode
    //   })
    // })
    // if (_bar && _bar.length > 0 && _bar[0].length === 0) {
    //   setBarCodeExists([])
    // }

    let barExistsUniq = barCodeExists.filter((array: any) => {
      return selectedPlaceholderData.some((filter: any) => {
        return array.barcode != filter.barcode
      })
    })

    console.log(_tasks)
    console.log(barExistsUniq)
    setBarCodeExists(barExistsUniq)
    // setBarCodeDoesnotExists(_bar)
    setPlaceholderProducts(_tasks)
    setSelectedPlaceholderData(null)
    setTimeout(() => {
      setIsProgressLoader(false)
    }, 1000)
  }

  useEffect(() => {
    console.log('barCodeExists', barCodeExists)
    console.log('barCodeDoesnotExists', barCodeDoesnotExists)
  }, [barCodeExists, barCodeDoesnotExists])

  const handlePlaceholderSave = () => {
    setIsProgressLoader(true)
    let arrEmpty: any = []
    setBarCodeExists(arrEmpty)
    setBarCodeDoesnotExists(arrEmpty)

    // placeholderProducts.map((val: any) => {
    //   getProductServiceByItemnumber(val.barcode)
    //     .then((res: any) => {
    //       console.log('Success', res)
    //       setBarCodeExists((prevState: any) => {
    //         return [
    //           ...prevState,
    //           {
    //             barcode: res.data.gtins[0].id,
    //             minNum: res.data.itemNumber,
    //           },
    //         ]
    //       })
    //     })
    //     .catch((err: any) => {
    //       console.log('ERror')
    //       setBarCodeDoesnotExists((prevState: any) => {
    //         return [
    //           ...prevState,
    //           {
    //             barcode: val.barcode,
    //           },
    //         ]
    //       })
    //     })
    // })
    setTimeout(() => {
      setIsProgressLoader(false)
    }, 1000)
    if (barCodeDoesnotExists.length === placeholderProducts.length) {
      handlePlaceholderDialogClose()

      setPlaceholderCount('')
      setPlaceholderProducts([])
      setBarCodeExists(arrEmpty)
      setBarCodeDoesnotExists(arrEmpty)
      if (importedData && importedData.length > 0) {
        let newData = [...importedData, ...placeholderProducts]
        console.log(newData)
        setImportedData(newData)
      } else {
        setImportedData(placeholderProducts)
      }
    }
  }

  const handlePlaceholderUploadOpen = () => {
    setOpenPlaceholderUpload(true)
  }
  const handlePlaceholderUploadClose = () => {
    setOpenPlaceholderUpload(false)
    setPlaceholderFile('')
  }

  const handlePlaceholderUpload = (event: any) => {
    setPlaceholderFile(event.target.files[0])
  }
  const handlePlaceholderFileUpload = () => {
    console.log('handlePlaceholderFileUpload', 'Clicked')
    if (
      placeholderFile &&
      (placeholderFile.type === 'text/csv' ||
        placeholderFile.type === 'application/vnd.ms-excel' ||
        placeholderFile.type ===
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    ) {
      console.log(placeholderFile)
      import('xlsx').then((xlsx) => {
        const reader = new FileReader()
        reader.onload = (event: any) => {
          const wb = xlsx.read(event.target.result, { type: 'array' })
          const wsname = wb.SheetNames[0]
          const ws = wb.Sheets[wsname]
          const data = xlsx.utils.sheet_to_json(ws)
          console.log(data)
          const data1 = xlsx.utils.sheet_to_json(ws, { header: 1 })
          const cols: any = data1[0]

          let newData = data.map((d: any, index: any) => {
            return {
              actionType: 'Placeholder MIN',
              min: `0${index}00${index}`,
              comments: d[cols[12]] ? d[cols[12]] : '',
              lineStatus: 'Draft',
              man: 'NA',
              ingredientMin: 'NA',
              pin: 'NA    ',
              description: d[cols[0]] ? d[cols[0]] : '',
              replaceMin: 'NA',
              replaceMinDescription: 'NA',
              existingSupplier: d[cols[3]] ? d[cols[3]] : '',
              existingSupplierSite: d[cols[4]] ? d[cols[4]] : '',
              numberOfRangeStores: d[cols[6]] ? d[cols[6]] : '',
              storeCode: d[cols[7]] ? d[cols[7]] : '',
              ownBrand: d[cols[1]] ? d[cols[1]] : '',
              barcode: d[cols[2]] ? d[cols[2]] : '',
              casePack: d[cols[5]] ? d[cols[5]] : '',
              local: d[cols[8]] ? d[cols[8]] : '',
              onlineCFC: d[cols[9]] ? d[cols[9]] : '',
              onlineStorePick: d[cols[10]] ? d[cols[10]] : '',
              wholesale: d[cols[11]] ? d[cols[11]] : '',
            }
          })

          console.log(newData)
          if (placeholderProducts && placeholderProducts.length > 0) {
            setPlaceholderProducts((prevState: any) => {
              return [...prevState, ...newData]
            })
          } else {
            setPlaceholderProducts([...newData])
          }
        }

        reader.readAsArrayBuffer(placeholderFile)
      })
      handlePlaceholderUploadClose()
    } else {
      alert('Upload correct file')
      setPlaceholderFile(null)
    }
  }

  const uploadPlaceholderDialog = (
    <Dialog
      open={openPlaceholderUpload}
      onClose={handlePlaceholderUploadClose}
      fullWidth
      classes={{
        paperFullWidth: classes.placeholderDialog,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          // width: small ? '400px' : '260px',
          // height: "250px",
          border: '3px solid green',
          borderRadius: 5,
        }}
      >
        <DialogHeader
          title={`Upload Placeholder Products`}
          onClose={handlePlaceholderUploadClose}
        />

        <Box sx={{ p: 1 }}>
          <Typography variant="body2" color="primary">
            Upload Placeholder Products
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <input
              type="text"
              value={placeholderFile ? placeholderFile.name : ''}
              onClick={() =>
                document.getElementById('placeholderFile')!.click()
              }
              className={classes.uploadTextfield}
              placeholder="No file selected"
              readOnly
            />
            <Input
              type="file"
              id="placeholderFile"
              accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              onChange={handlePlaceholderUpload}
              required
            />
            <button
              type="button"
              onClick={() =>
                document.getElementById('placeholderFile')!.click()
              }
              className={classes.uploadButton}
              style={{ width: '60%' }}
            >
              Browse...
            </button>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            p: 2,
            justifyContent: 'right',
          }}
        >
          <Box>
            <Typography color="primary">
              Supported file type in MS Excel
              <i className="pi pi-file-excel" style={{ fontSize: '18px' }}></i>
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            p: 3,
            justifyContent: 'right',
          }}
        >
          <Button
            //   className={classes.submitButtons}
            variant="contained"
            color="primary"
            onClick={handlePlaceholderFileUpload}
          >
            Select
          </Button>
        </Box>
      </Box>
    </Dialog>
  )

  const onEditorValueChange = (props: any, value: any) => {
    let updatedProducts = [...props.value]
    updatedProducts[props.rowIndex][props.field] = value
    setPlaceholderProducts(updatedProducts)
  }

  const inputTextEditor = (props: any, field: any) => {
    return (
      <input
        type="text"
        value={props.rowData[field]}
        onChange={(e: any) => onEditorValueChange(props, e.target.value)}
      />
    )
  }

  useEffect(() => {
    console.log('placeholderProducts', placeholderProducts)
  }, [placeholderProducts])

  const onChangePlaceHolderFields = (
    prevState: any,
    field: any,
    rowDataSelected: any,
    event: any
  ) => {
    return prevState.map((obj: any) =>
      obj.barcode === rowDataSelected.barcode
        ? Object.assign(obj, { [field]: event.target.value })
        : obj
    )
  }

  const ownBrandPlaceholderTemplate = (rowData: any) => {
    console.log('ownBrandPlaceholderTemplate', rowData)
    return (
      <Select
        value={rowData.ownBrand}
        // onChange={(e) => eventHandleDetailsSOT(e)}
        onChange={(e: any) => {
          setPlaceholderProducts((prevState: any) => {
            return onChangePlaceHolderFields(prevState, 'ownBrand', rowData, e)
          })
          // setPlaceholderProducts((prevState: any) => {
          //   return prevState.map((obj: any) =>
          //     obj.min === rowData.min
          //       ? Object.assign(obj, { ownBrand: e.target.value })
          //       : obj
          //   )
          // })
        }}
        input={<OutlinedInput margin="dense" className={classes.muiSelect} />}
      >
        {yesOrNo.map((type: any) => {
          return (
            <MenuItem
              value={type.name}
              key={type.name}
              className={classes.muiSelect}
            >
              {type.text}
            </MenuItem>
          )
        })}
      </Select>
    )
  }
  const barCodePlaceholderTemplate = (rowData: any) => {
    return (
      <OutlinedInput
        margin="dense"
        className={classes.muiSelect}
        value={rowData.barcode}
        onChange={(e) => {
          if (e.target.value !== null) {
            setPlaceholderProducts((prevState: any) => {
              return onChangePlaceHolderFields(prevState, 'barcode', rowData, e)
            })
          }
        }}
      />
    )
  }

  const descriptionPlaceholderTemplate = (rowData: any) => {
    return (
      <OutlinedInput
        margin="dense"
        className={classes.muiSelect}
        value={rowData.description}
        onChange={(e) => {
          if (e.target.value !== null) {
            setPlaceholderProducts((prevState: any) => {
              return onChangePlaceHolderFields(
                prevState,
                'description',
                rowData,
                e
              )
            })
          }
        }}
      />
    )
  }

  const supplierCodePlaceholderTemplate = (rowData: any) => {
    return (
      // <SearchSelect
      //   value={rowData.existingSupplier}
      //   // onChange={handleBuyer}
      //   className={classes.muiSelect}
      //   onChange={(e: any) => {
      //     if (e.target.value !== null) {
      //       setPlaceholderProducts((prevState: any) => {
      //         return onChangePlaceHolderFields(
      //           prevState,
      //           'existingSupplier',
      //           rowData,
      //           e
      //         )
      //       })
      //     }
      //   }}
      //   styles={{
      //     fontSize: '12px',
      //   }}
      // />
      <Autocomplete
        id="combo-box-demo3"
        // className={stylesInp}
        options={supplierCodeOptions}
        getOptionLabel={(option: any) => option.label}
        renderInput={(params: any) => (
          <TextField {...params} variant="outlined" />
        )}
        popupIcon={<SearchOutlined />}
      />
    )
  }

  const supplierSiteCodePlaceholderTemplate = (rowData: any) => {
    return (
      <SearchSelect
        value={rowData.existingSupplierSite}
        // onChange={handleBuyer}
        className={classes.muiSelect}
        onChange={(e: any) => {
          if (e.target.value !== null) {
            setPlaceholderProducts((prevState: any) => {
              return onChangePlaceHolderFields(
                prevState,
                'existingSupplierSite',
                rowData,
                e
              )
            })
          }
        }}
        // onClick={() =>supplierCode()}
        styles={{
          fontSize: '12px',
        }}
      />
    )
  }

  const casePackPlaceholderTemplate = (rowData: any) => {
    return (
      <OutlinedInput
        margin="dense"
        className={classes.muiSelect}
        value={rowData.casePack}
        onChange={(e) => {
          if (e.target.value !== null) {
            setPlaceholderProducts((prevState: any) => {
              return onChangePlaceHolderFields(
                prevState,
                'casePack',
                rowData,
                e
              )
            })
          }
        }}
      />
    )
  }
  const newNoOfRangeStorePlaceholderTemplate = (rowData: any) => {
    return (
      <OutlinedInput
        margin="dense"
        className={classes.muiSelect}
        value={rowData.numberOfRangeStores}
        onChange={(e) => {
          if (e.target.value !== null) {
            setPlaceholderProducts((prevState: any) => {
              return onChangePlaceHolderFields(
                prevState,
                'numberOfRangeStores',
                rowData,
                e
              )
            })
          }
        }}
      />
    )
  }

  const localPlaceholderTemplate = (rowData: any) => {
    return (
      <Select
        value={rowData.local}
        // onChange={(e) => eventHandleDetailsSOT(e)}
        onChange={(e: any) => {
          if (e.target.value !== null) {
            setPlaceholderProducts((prevState: any) => {
              return onChangePlaceHolderFields(prevState, 'local', rowData, e)
            })
          }
        }}
        input={<OutlinedInput margin="dense" className={classes.muiSelect} />}
      >
        {yesOrNo.map((type: any) => {
          return (
            <MenuItem
              value={type.name}
              key={type.name}
              className={classes.muiSelect}
            >
              {type.text}
            </MenuItem>
          )
        })}
      </Select>
    )
  }
  const onlineCFCPlaceholderTemplate = (rowData: any) => {
    return (
      <Select
        value={rowData.onlineCFC}
        // onChange={(e) => eventHandleDetailsSOT(e)}
        onChange={(e: any) => {
          if (e.target.value !== null) {
            setPlaceholderProducts((prevState: any) => {
              return onChangePlaceHolderFields(
                prevState,
                'onlineCFC',
                rowData,
                e
              )
            })
          }
        }}
        input={<OutlinedInput margin="dense" className={classes.muiSelect} />}
      >
        {yesOrNo.map((type: any) => {
          return (
            <MenuItem
              value={type.name}
              key={type.name}
              className={classes.muiSelect}
            >
              {type.text}
            </MenuItem>
          )
        })}
      </Select>
    )
  }
  const onlineStorePickPlaceholderTemplate = (rowData: any) => {
    return (
      <Select
        value={rowData.onlineStorePick}
        // onChange={(e) => eventHandleDetailsSOT(e)}
        onChange={(e: any) => {
          if (e.target.value !== null) {
            setPlaceholderProducts((prevState: any) => {
              return onChangePlaceHolderFields(
                prevState,
                'onlineStorePick',
                rowData,
                e
              )
            })
          }
        }}
        input={<OutlinedInput margin="dense" className={classes.muiSelect} />}
      >
        {yesOrNo.map((type: any) => {
          return (
            <MenuItem
              value={type.name}
              key={type.name}
              className={classes.muiSelect}
            >
              {type.text}
            </MenuItem>
          )
        })}
      </Select>
    )
  }
  const wholeSalePlaceHolderTemplate = (rowData: any) => {
    return (
      <Select
        value={rowData.wholesale}
        // onChange={(e) => eventHandleDetailsSOT(e)}
        onChange={(e: any) => {
          if (e.target.value !== null) {
            setPlaceholderProducts((prevState: any) => {
              return onChangePlaceHolderFields(
                prevState,
                'wholesale',
                rowData,
                e
              )
            })
          }
        }}
        input={<OutlinedInput margin="dense" className={classes.muiSelect} />}
      >
        {yesOrNo.map((type: any) => {
          return (
            <MenuItem
              value={type.name}
              key={type.name}
              className={classes.muiSelect}
            >
              {type.text}
            </MenuItem>
          )
        })}
      </Select>
    )
  }

  const commentsPlaceHolderTemplate = (rowData: any) => {
    return (
      <OutlinedInput
        margin="dense"
        className={classes.muiSelect}
        value={rowData.comments}
        onChange={(e) => {
          if (e.target.value !== null) {
            setPlaceholderProducts((prevState: any) => {
              return onChangePlaceHolderFields(
                prevState,
                'comments',
                rowData,
                e
              )
            })
          }
        }}
      />
    )
  }

  const placeholderDialog = (
    <Dialog
      open={openPlaceholderDialog}
      onClose={handlePlaceholderDialogClose}
      fullWidth
      classes={{
        paperFullWidth:
          placeholderProducts && placeholderProducts.length > 0
            ? classes.placeholderDialogFull
            : classes.placeholderDialog,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          // width: small ? "600px" : "260px",
          // height: "250px",
          border: '3px solid green',
          borderRadius: 5,
          padding: '10px',
        }}
      >
        <DialogHeader
          title="Add placeholder Products"
          onClose={handlePlaceholderDialogClose}
        />

        {barCodeExists &&
          barCodeExists.map((val: any) => (
            <Alert
              className={classes.alertMsg}
              style={{ color: '#000' }}
              severity="error"
            >
              <b>• {'\u00A0'}</b> BAR Code <b> '{val.barcode}' </b> is belongs
              to MIN <b> '{val.minNum}' </b>
            </Alert>
          ))}

        {/* {renderAlert()} */}

        <Grid
          item
          container
          xl={12}
          lg={12}
          md={12}
          sm={12}
          xs={12}
          style={{
            textAlign: 'center',
            padding: '10px',
          }}
          spacing={2}
        >
          <Grid item md={7} sm={12} xs={12}>
            <Typography variant="subtitle2" color="primary">
              How many new lines do you wish to enter?
            </Typography>
          </Grid>
          <Grid item container md={7} sm={12} xs={12}>
            {/* <Grid item container xs={12}> */}

            <Grid item xs={12} sm={8}>
              <Typography variant="subtitle2" color="primary">
                <input
                  type="text"
                  required
                  // className={classes.placeholderCountStyle}
                  style={{
                    width: small ? '88%' : '100%',
                  }}
                  value={placeholderCount}
                  onChange={(e: any) => setPlaceholderCount(e.target.value)}
                />
              </Typography>
            </Grid>
            <Grid item sm={4} xs={12} style={{ textAlign: 'center' }}>
              <Button
                variant="contained"
                color="primary"
                style={{ width: '80px' }}
                onClick={() =>
                  handlePlaceholderAdd(placeholderCount ? placeholderCount : 0)
                }
              >
                ADD
              </Button>
            </Grid>
            {/* </Grid> */}
          </Grid>

          <Grid item md={1} sm={12} xs={12}>
            <Typography variant="subtitle2" color="primary">
              OR
            </Typography>
          </Grid>
          <Grid item md={3} sm={12} xs={12}>
            <Button
              variant="contained"
              color="primary"
              // type="submit"
              // style={{ width: '80px' }}
              onClick={handlePlaceholderUploadOpen}
            >
              Upload File
            </Button>
          </Grid>
          {placeholderProducts && placeholderProducts.length > 0 && (
            <Grid
              item
              container
              xs={12}
              style={{
                paddingLeft: '10px',
                paddingRight: '10px',
                paddingTop: '20px',
              }}
            >
              <Grid
                item
                xs={10}
                style={{ textAlign: 'left', paddingBottom: '5px' }}
              >
                <Typography variant="body2" color="primary">
                  Product List {/* placeholder  */}
                </Typography>
              </Grid>
              <Grid item xs={2} style={{ paddingBottom: '5px' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handlePlaceholderAdd(1)}
                >
                  Add Row
                </Button>
              </Grid>
              <Grid item xs={12}>
                <DataTable
                  value={placeholderProducts && placeholderProducts}
                  selectionMode={
                    placeholderProducts > 0 ? 'single' : 'checkbox'
                  }
                  selection={selectedPlaceholderData}
                  onSelectionChange={(e) => setSelectedPlaceholderData(e.value)}
                  // globalFilter={globalFilter}
                  className="p-datatable-sm"
                  //   stateStorage="session"
                  //   stateKey="dt-state-demo-session-eventmanage"
                  showGridlines
                  scrollable
                  scrollHeight="300px"
                  // editMode="cell"
                >
                  <Column
                    selectionMode="multiple"
                    headerStyle={{
                      width: '50px',
                      color: 'white',

                      backgroundColor: theme.palette.primary.main,
                    }}
                    // frozen
                  ></Column>
                  {placeholderCols.map((col: any, index: any) => {
                    return (
                      <Column
                        key={index}
                        field={col.field}
                        header={col.header}
                        body={
                          (col.field === 'ownBrand' &&
                            ownBrandPlaceholderTemplate) ||
                          (col.field === 'barcode' &&
                            barCodePlaceholderTemplate) ||
                          (col.field === 'description' &&
                            descriptionPlaceholderTemplate) ||
                          (col.field === 'existingSupplier' &&
                            supplierCodePlaceholderTemplate) ||
                          (col.field === 'casePack' &&
                            casePackPlaceholderTemplate) ||
                          (col.field === 'numberOfRangeStores' &&
                            newNoOfRangeStorePlaceholderTemplate) ||
                          (col.field === 'local' && localPlaceholderTemplate) ||
                          (col.field === 'onlineCFC' &&
                            onlineCFCPlaceholderTemplate) ||
                          (col.field === 'onlineStorePick' &&
                            onlineStorePickPlaceholderTemplate) ||
                          (col.field === 'wholesale' &&
                            wholeSalePlaceHolderTemplate) ||
                          (col.field === 'comments' &&
                            commentsPlaceHolderTemplate) ||
                          (col.field === 'existingSupplierSite' &&
                            supplierSiteCodePlaceholderTemplate)
                        }
                        bodyStyle={tableBodyStyle(col.width)}
                        headerStyle={tableHeaderStyle(
                          col.width,
                          theme.palette.primary.main
                        )}

                        // editor={(props: any) =>
                        //   inputTextEditor(props, 'description')
                        // }
                      />
                    )
                  })}
                </DataTable>
              </Grid>
              <Grid item xs={8}></Grid>
              <Grid item xs={2} style={{ paddingTop: '5px' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={removePlaceholder}
                >
                  Delete
                </Button>
              </Grid>
              <Grid item xs={2} style={{ paddingTop: '5px' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handlePlaceholderSave}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Box>
    </Dialog>
  )

  const delistminpinTemplate = (rowData: any) => {
    return <span>{rowData ? rowData.min : ''}</span>
  }
  const replaceminpinTemplate = (rowData: any) => {
    return <span>{rowData ? rowData.min : ''}</span>
  }

  // Uncomment for Replacement Association

  // const replacementAssociationDialog = (
  //   <Dialog
  //     open={openReplacementAssDialog}
  //     onClose={handleReplacemantAssociationDialogClose}
  //     fullWidth
  //     classes={{
  //       paperFullWidth:
  //         placeholderProducts && placeholderProducts.length > 0
  //           ? classes.placeholderDialogFull
  //           : classes.placeholderDialog,
  //     }}
  //   >
  //     <Box
  //       sx={{
  //         display: 'flex',
  //         flexDirection: 'column',
  //         border: '3px solid green',
  //         borderRadius: 5,
  //         padding: '10px',
  //       }}
  //     >
  //       <DialogHeader
  //         title="Add Replacement Association"
  //         onClose={handleReplacemantAssociationDialogClose}
  //       />
  //       <Grid
  //         item
  //         container
  //         xl={12}
  //         lg={12}
  //         md={12}
  //         sm={12}
  //         xs={12}
  //         style={{
  //           textAlign: 'center',
  //           padding: '10px',
  //         }}
  //         spacing={2}
  //       >
  //         <Grid
  //           item
  //           container
  //           xs={12}
  //           style={{
  //             paddingLeft: '10px',
  //             paddingRight: '10px',
  //             paddingTop: '20px',
  //           }}
  //         >
  //           <Grid
  //             item
  //             xs={10}
  //             style={{ textAlign: 'left', paddingBottom: '5px' }}
  //           >
  //             <Typography variant="body1" color="primary">
  //               Add Replacement Association
  //             </Typography>
  //           </Grid>
  //           <Grid item xs={2} style={{ paddingBottom: '5px' }}>
  //             <Button
  //               variant="contained"
  //               color="primary"
  //               onClick={() => handleReplacementAssAdd(1)}
  //             >
  //               Add Row
  //             </Button>
  //           </Grid>
  //           <Grid item xs={12}>
  //             <DataTable
  //               value={
  //                 replacementAssociationProduct && replacementAssociationProduct
  //               }
  //               selectionMode={
  //                 replacementAssociationProduct > 0 ? 'single' : 'checkbox'
  //               }
  //               selection={selectedReplaceAssData}
  //               onSelectionChange={(e) => setSelectedReplaceAssData(e.value)}
  //               className="p-datatable-sm"

  //               showGridlines
  //               scrollable
  //               scrollHeight="300px"
  //             >
  //               <Column
  //                 selectionMode="multiple"
  //                 headerStyle={{
  //                   width: '50px',
  //                   color: 'white',

  //                   backgroundColor: theme.palette.primary.main,
  //                 }}
  //               ></Column>
  //               {replacementAssociationCols.map((col: any, index: any) => {
  //                 return (
  //                   <Column
  //                     key={index}
  //                     field={col.field}
  //                     header={col.header}
  //                     body={
  //                       (col.field === 'delist_min_pin' &&
  //                         delistminpinTemplate) ||
  //                       (col.field === 'replace_min_pin' &&
  //                         replaceminpinTemplate)
  //                     }
  //                     bodyStyle={tableBodyStyle(col.width)}
  //                     headerStyle={tableHeaderStyle(
  //                       col.width,
  //                       theme.palette.primary.main
  //                     )}
  //                   />
  //                 )
  //               })}
  //             </DataTable>
  //           </Grid>
  //           <Grid item xs={8}></Grid>
  //           <Grid item xs={2} style={{ paddingTop: '5px' }}>
  //             <Button
  //               variant="contained"
  //               color="primary"
  //               onClick={removeReplaceAssociate}
  //             >
  //               Delete
  //             </Button>
  //           </Grid>
  //           <Grid item xs={2} style={{ paddingTop: '5px' }}>
  //             <Button
  //               variant="contained"
  //               color="primary"
  //               onClick={handlePlaceholderSave}
  //             >
  //               Save
  //             </Button>
  //           </Grid>
  //         </Grid>
  //       </Grid>
  //     </Box>
  //   </Dialog>
  // )
  const convertedTargetDateTemplate = (rowData: any) => {
    if (rowData.targetDate) {
      const date = new Date(rowData.targetDate)
      const formattedDate = date
        .toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })
        .replace(/ /g, '-')
      return formattedDate
    } else {
      return 'NA'
    }
  }
  const convertedAppDueDateTemplate = (rowData: any) => {
    if (rowData.appDueDate) {
      const date = new Date(rowData.appDueDate)
      const formattedDate = date
        .toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })
        .replace(/ /g, '-')
      // if (rowData.status === 'Error') {
      //   return <div style={{ color: 'red' }}>{formattedDate}</div>
      // } else {
      return formattedDate
      // }
    } else {
      return 'NA'
    }
  }
  const goBack = () => {
    history.goBack()
  }

  const handleCompleteTask = () => {
    if (rafpendingActionDetailsCT06) {
      const completePayload = {
        reviewDecision: 'Complete',
        requester: {
          persona: rafpendingActionDetailsCT06.assigneeRole,
          details: {
            emailId: userDetail && userDetail.userdetails[0].user.emailId,
            userId: userDetail && userDetail.userdetails[0].user.userId,
            name:
              userDetail &&
              userDetail.userdetails[0].user.middleName &&
              userDetail.userdetails[0].user.middleName !== ''
                ? `${userDetail.userdetails[0].user.firstName} ${userDetail.userdetails[0].user.middleName} ${userDetail.userdetails[0].user.lastName}`
                : `${userDetail.userdetails[0].user.firstName} ${userDetail.userdetails[0].user.lastName}`,
          },
          roles:
            userDetail &&
            userDetail.userdetails[0].roles.map((role: any) => {
              return {
                // roleId: role.roleId,
                roleId: role.roleName,
              }
            }),
          usergroups:
            userDetail &&
            userDetail.userdetails[0].usergroups.map((group: any) => {
              return {
                groupId: group.groupId,
                status: group.status,
              }
            }),
        },
        eventStatus: 'Published',
        eventId: rafpendingActionDetailsCT06.eventId,
        milestones: [
          {
            action: '',
            status: rafpendingActionDetailsCT06.status,
            visibility: rafpendingActionDetailsCT06.visibility,
            activeTaskId: rafpendingActionDetailsCT06.activeTaskId,
            milestoneTaskId: rafpendingActionDetailsCT06.milestoneTaskId,
            taskName: rafpendingActionDetailsCT06.taskName,
            taskDescription: rafpendingActionDetailsCT06.taskDescription,
            tradingGroup: rafpendingActionDetailsCT06.tradingGroup,
            weeksPrior: rafpendingActionDetailsCT06.weeksPrior,
            dueDate: rafpendingActionDetailsCT06.dueDate,
            notifyDate: rafpendingActionDetailsCT06.notifyDate,
            slaDate: rafpendingActionDetailsCT06.slaDate,
            healthcheckDate: rafpendingActionDetailsCT06.healthcheckDate,
            assigneeDetails: {
              emailId: rafpendingActionDetailsCT06.assigneeEmailId,
              userId: rafpendingActionDetailsCT06.assigneeUserId,
              name: rafpendingActionDetailsCT06.assigneeName,
            },
            // assigneeRole: userAssigned.roles,
            assigneeRole: rafpendingActionDetailsCT06.assigneeRole,
          },
        ],
        logging: {
          comments: '',
          //updated: res.data.attachmentUrl,
          updated: '',
        },
      }
      putCamundaMileStoneUpdate(
        rafpendingActionDetailsCT06.eventId,
        completePayload
      )
        .then((res: any) => {
          console.log(res.data)
        })
        .catch((err: any) => {
          console.log(err.response)
        })
    }
  }

  return (
    <>
      <Toast
        ref={toast}
        position="bottom-left"
        // onRemove={() => {
        //   history.push(`${DEFAULT}${RANGEAMEND_MANAGE}`)
        // }}
        // onRemove={handleToaster}
      />
      <LoadingComponent showLoader={isProgressLoader} />
      <Grid container spacing={2} style={{ padding: '20px' }}>
        <Grid
          container
          item
          xl={12}
          lg={12}
          md={12}
          sm={12}
          xs={12}
          spacing={2}
          style={{ paddingBottom: '20px' }}
        >
          <Grid item xl={9} lg={9} md={9} sm={12} xs={12}>
            <Typography variant="h6" color="primary">
              Pending Action -{' '}
              <b>Delists added to the Range Change Management App</b>
            </Typography>
          </Grid>

          <Grid item xl={2} lg={2} md={2} sm={3} xs={5}>
            <button
              // className={classes.backButton}
              className="backButton"
            >
              {/* <Typography variant="subtitle1" color="primary"> */}
              View Log
              {/* </Typography> */}
            </button>
          </Grid>

          <Grid item xl={1} lg={1} md={1} sm={3} xs={3}>
            <button
              // className={classes.backButton}
              className="backButton"
              onClick={goBack}
            >
              {/* <Typography variant="subtitle1" color="primary"> */}
              <svg
                className="MuiSvgIcon-root"
                focusable="false"
                viewBox="0 0 34 34"
                aria-hidden="true"
              >
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
              </svg>
              Back
              {/* </Typography> */}
            </button>
          </Grid>
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <DataTable
            value={eventDetails}
            scrollable
            showGridlines
            style={{
              height: '100%',
            }}
            className="p-datatable-sm"
          >
            {delistAddedToRangeCols.map((col: any, index: any) => {
              return (
                <Column
                  key={index}
                  field={col.field}
                  header={col.header}
                  style={{
                    width: col.width,
                    fontSize: '0.9rem',
                    padding: '0.5rem',
                  }}
                  headerStyle={{
                    backgroundColor: teal[900],
                    color: 'white',
                    width: col.width,
                    fontSize: '0.9rem',
                    padding: '0.5rem',
                  }}
                  body={
                    (col.field === 'targetDate' &&
                      convertedTargetDateTemplate) ||
                    (col.field === 'appDueDate' && convertedAppDueDateTemplate)
                  }
                />
              )
            })}
          </DataTable>
        </Grid>
        <Grid
          item
          container
          xl={12}
          lg={12}
          md={12}
          sm={12}
          xs={12}
          spacing={2}
          style={{
            alignItems: 'center',
          }}
        >
          <Grid
            item
            container
            md={6}
            sm={12}
            xs={12}
            spacing={2}
            style={{ textAlign: 'center' }}
          >
            <Grid item xs={10} sm={5} style={{ textAlign: 'left' }}>
              <Typography color="primary">
                <AutocompleteSelect
                  value={actionType}
                  options={actionTypeOptions}
                  onChange={handleActionType}
                  placeholder="--- Action Type ---"
                />
              </Typography>
            </Grid>
            <Grid item xs={2} sm={2}>
              <Tooltip
                title={
                  actionType ? (
                    ''
                  ) : (
                    <Typography variant="caption">
                      {"Select the 'Action Type'."}
                    </Typography>
                  )
                }
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleActionTypeDialogOpen}
                >
                  Add
                </Button>
              </Tooltip>
            </Grid>
            <Grid item xl={1} lg={1} md={1} sm={1} xs={12}>
              OR
            </Grid>
            <Grid item sm={4} xs={12}>
              <Tooltip
                title={
                  actionType ? (
                    ''
                  ) : (
                    <Typography variant="caption">
                      {"Select the 'Action Type'."}
                    </Typography>
                  )
                }
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleUploadDialogOpen}
                >
                  Upload File
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
          <Grid
            item
            container
            md={6}
            sm={12}
            xs={12}
            spacing={2}
            style={{ textAlign: 'center' }}
          >
            <Grid item sm={4} xs={12}>
              <button
                className="backButton"
                onClick={handlePlaceholderDialogOpen}
              >
                <Typography variant="body2" color="primary">
                  Add Placeholder MIN/PIN
                </Typography>
              </button>
            </Grid>
            <Grid item sm={4} xs={12}>
              <button
                className="backButton"
                onClick={handleReplacemantAssociationDialogOpen}
              >
                <Typography variant="body2" color="primary">
                  Replacement Association
                </Typography>
              </button>
            </Grid>
            <Grid item sm={4} xs={12}>
              <button
                className="backButton"
                // onClick={handlePlaceholderDialogOpen}
              >
                <Typography variant="body2" color="primary">
                  Issue Delist Letter
                </Typography>
              </button>
            </Grid>
          </Grid>
        </Grid>

        {/* <Grid item
                    xl={12}
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                >

                    <FormControl>
                        <RadioGroup
                            name="delistAddedToRange"
                            value={productType}
                            onChange={handleProductTypeChange}
                            style={{ display: "inline" }}>

                            <FormControlLabel value="existingProducts" control={radio} label="Existing Products" />
                            <FormControlLabel value="newProducts" control={radio} label="New Products" />
                            <FormControlLabel value="placeholderProducts" control={radio} label="Placeholder Products" />
                        </RadioGroup>
                    </FormControl>

                </Grid>
                <Grid item
                    xl={12}
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                >
                    {
                        productType &&
                            productType === "existingProducts" ?
                            existingProducts
                            :
                            productType === "newProducts" ?
                                newProducts
                                :
                                productType === "placeholderProducts" &&
                                placeholderProducts
                    }
                </Grid> */}

        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          {importedData && productListTable}
        </Grid>

        {importedData && (
          <Grid item container xl={12} lg={12} md={12} sm={12} xs={12}>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}></Grid>
            <Grid
              item
              container
              xl={6}
              lg={6}
              md={6}
              sm={12}
              xs={12}
              style={{ textAlign: 'center' }}
              spacing={2}
            >
              <Grid item xl={4} lg={4} md={4} sm={4} xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleProductListSave}
                >
                  Save
                </Button>
              </Grid>
              <Grid item xl={4} lg={4} md={4} sm={4} xs={12}>
                <Button variant="contained" color="primary">
                  Submit Draft
                </Button>
              </Grid>
              <Grid item xl={4} lg={4} md={4} sm={4} xs={12}>
                <Button variant="contained" color="primary">
                  Complete Task
                </Button>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
      {uploadDialog}
      {actionTypeDialog}
      {placeholderDialog}
      {/* {replacementAssociationDialog}  */}
      {/* Uncomment for Replacement Association  */}
      {uploadPlaceholderDialog}
    </>
  )
}

const mapStateToProps = (state: any) => {
  return {
    rafpendingActionDetailsCT06:
      state.pendingActionReducer.rafpendingActionDetailsCT06,
    userDetail: state.loginReducer.userDetail,
  }
}

export default connect(mapStateToProps, null)(DelistsAddedToRange)
