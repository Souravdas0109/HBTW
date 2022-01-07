import { Switch } from 'react-router-dom'
import React from 'react'
import DashboardMain from '../pages/DashboardMain/DashboardMain'
import ProductPortal from '../pages/ProductPortal/ProductPortal'
import PromotionFunding from '../pages/PromotionFunding/PromotionFunding'
import RangeAmend from '../pages/RangeAmend/RangeAmend'
import RetailPrice from '../pages/RetailPrice/RetailPrice'
import SupplierPortal from '../pages/SupplierPortal/SupplierPortal'
import AuthRoute from './AuthRoute'
import PageNotFound from '../pages/PageNotFound/PageNotFound'
import UserManageCreate from '../pages/UserManageCreate/UserManageCreate'
import UserManageManage from '../pages/UserManageManage/UserManageManage'
import UserManageUpdate from '../pages/UserManageUpdate/UserManageUpdate'
import UserManageGroup from '../pages/UserManageGroup/UserManageGroup'
import UserManageGroupCreate from '../pages/UserManageGroupCreate/UserManageGroupCreate'
import UserManageGroupUpdate from '../pages/UserManageGroupUpdate/UserManagerGroupUpdate'
import UserPendingAction from '../pages/UserPendingAction/UserPendingAction'
import UserPendingActionUpdate from '../pages/UserPendingActionUpdate/UserPendingActionUpdate'
import UserUnassignWorkflow from '../pages/UserUnassignWorkflow/UserUnassignWorkflow'
import UserInprogressTask from '../pages/UserInprogressTask/UserInprogressTask'
import UserGroupPendingAction from '../pages/UserGroupPendingAction/UserGroupPendingAction'

const UserRouter = ({
  path,
  serviceError,
  userDetail,
}: {
  path: string
  serviceError: boolean
  userDetail: any
}) => {
  const getPermission = (url: string) => {
    if (userDetail[0].user.status.toLowerCase() === 'a') {
      const value = userDetail[0].appmenu.findIndex(
        (item: any) => item.url === url
      )
      if (
        value > -1 &&
        userDetail[0].appmenu[value].accessType.toLowerCase() !== 'h'
      ) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }
  return (
    <Switch>
      <AuthRoute
        path={`${path}/dashboard`}
        component={DashboardMain}
        isAuthorized={userDetail && getPermission('/dashboard')}
        serviceError={serviceError}
        arb={false}
      />
      <AuthRoute
        path={`${path}/pendingactions/pendingactions`}
        component={UserPendingAction}
        isAuthorized={userDetail && getPermission('/dashboard')}
        serviceError={serviceError}
        arb={false}
      />
      <AuthRoute
        path={`${path}/pendingactions/pendingactionsupdate`}
        component={UserPendingActionUpdate}
        isAuthorized={userDetail && getPermission('/dashboard')}
        serviceError={serviceError}
        arb={false}
      />
      <AuthRoute
        path={`${path}/unassignworkflow/unassignworkflow`}
        component={UserUnassignWorkflow}
        isAuthorized={userDetail && getPermission('/dashboard')}
        serviceError={serviceError}
        arb={false}
      />
      <AuthRoute
        path={`${path}/inprogresstasks/inprogresstasks`}
        component={UserInprogressTask}
        isAuthorized={userDetail && getPermission('/dashboard')}
        serviceError={serviceError}
        arb={false}
      />
      <AuthRoute
        path={`${path}/mygrouppendingactions/mygrouppendingactions`}
        component={UserGroupPendingAction}
        isAuthorized={userDetail && getPermission('/dashboard')}
        serviceError={serviceError}
        arb={false}
      />
      <AuthRoute
        path={`${path}/rangeamend`}
        component={RangeAmend}
        isAuthorized={userDetail && getPermission('/rangeamend')}
        serviceError={serviceError}
        arb={false}
      />
      <AuthRoute
        path={`${path}/promofunding`}
        component={PromotionFunding}
        isAuthorized={userDetail && getPermission('/promofunding')}
        serviceError={serviceError}
        arb={false}
      />
      <AuthRoute
        path={`${path}/retailprice`}
        component={RetailPrice}
        isAuthorized={userDetail && getPermission('/retailprice')}
        serviceError={serviceError}
        arb={false}
      />
      <AuthRoute
        path={`${path}/supplierport`}
        component={SupplierPortal}
        isAuthorized={userDetail && getPermission('/supplierport')}
        serviceError={serviceError}
        arb={false}
      />
      <AuthRoute
        path={`${path}/productport`}
        component={ProductPortal}
        isAuthorized={userDetail && getPermission('/productport')}
        serviceError={serviceError}
        arb={false}
      />
      <AuthRoute
        path={`${path}/userconfig/usercreate`}
        component={UserManageCreate}
        isAuthorized={userDetail && getPermission('/userconfig/usercreate')}
        serviceError={serviceError}
        arb={false}
      />
      <AuthRoute
        path={`${path}/userconfig/usermanage`}
        component={UserManageManage}
        isAuthorized={userDetail && getPermission('/userconfig/usermanage')}
        serviceError={serviceError}
        arb={false}
      />
      <AuthRoute
        path={`${path}/userconfig/usergroup`}
        component={UserManageGroup}
        isAuthorized={userDetail && getPermission('/userconfig/usergroup')}
        serviceError={serviceError}
        arb={false}
      />
      <AuthRoute
        path={`${path}/userconfig/groupcreate`}
        component={UserManageGroupCreate}
        isAuthorized={userDetail && getPermission('/userconfig/usergroup')}
        serviceError={serviceError}
        arb={false}
      />
      <AuthRoute
        path={`${path}/userconfig/groupupdate`}
        component={UserManageGroupUpdate}
        isAuthorized={userDetail && getPermission('/userconfig/usergroup')}
        serviceError={serviceError}
        arb={false}
      />
      <AuthRoute
        path={`${path}/userconfig/userupdate`}
        component={UserManageUpdate}
        isAuthorized={userDetail && getPermission('/userconfig/usermanage')}
        serviceError={serviceError}
        arb={false}
      />
      <AuthRoute
        path={`${path}/*`}
        component={PageNotFound}
        isAuthorized={false}
        serviceError={serviceError}
        arb={true}
      />
    </Switch>
  )
}

export default UserRouter
