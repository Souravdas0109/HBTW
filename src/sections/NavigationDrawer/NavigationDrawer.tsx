import {
  Collapse,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core'
import { ChevronLeft } from '@material-ui/icons'
import IconExpandLess from '@material-ui/icons/ExpandLess'
import IconExpandMore from '@material-ui/icons/ExpandMore'
import React from 'react'
import { useStyles } from '../../pages/Home/Styles'
import { connect } from 'react-redux'

interface NavigationProps {
  menuItems: Array<any>
  open: boolean
  handleDrawerToggle: () => void
  handleClick: (url: string) => void
  openCol: Array<boolean>
  setOpenCol: (arr: Array<boolean>) => void
  location: any
}

const NavigationDrawer = (props: NavigationProps) => {
  const classes = useStyles()
  const base = '/commercial-webapp'
  const {
    menuItems,
    open,
    handleDrawerToggle,
    handleClick,
    openCol,
    setOpenCol,
    location,
  } = props
  return (
    <>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{ paper: classes.drawerPaper }}
        onClose={handleDrawerToggle}
        onKeyDown={handleDrawerToggle}
      >
        <div className={`${classes.height} ${classes.setup}`}>
          <Typography variant="subtitle2" align="center">
            Menu Items
          </Typography>
          <IconButton onClick={handleDrawerToggle} edge="end">
            <ChevronLeft color="secondary" />
          </IconButton>
        </div>
        <Divider />
        <List>
          {menuItems &&
            menuItems.map((menu, index) => {
              if (menu.more.length === 0) {
                return (
                  <ListItem
                    key={menu.appCode}
                    button
                    onClick={() => handleClick(`${base}${menu.url}`)}
                    className={
                      location.pathname === `${base}${menu.url}`
                        ? `${classes.hover} ${classes.active}`
                        : classes.hover
                    }
                  >
                    <ListItemText
                      primary={menu.appName}
                      classes={{ primary: classes.listItemText }}
                    />
                  </ListItem>
                )
              }
              if (menu.more.length > 0) {
                return (
                  <List key={menu.appCode}>
                    <ListItem
                      onClick={() => {
                        const arr = [...openCol]
                        arr[index] = !arr[index]
                        setOpenCol(arr)
                      }}
                      button /*className={classes.link}*/
                    >
                      <ListItemText
                        classes={{ primary: classes.listItemText }}
                        primary={menu.appName}
                      />
                      <ListItemIcon>
                        {openCol[index] ? (
                          <IconExpandLess />
                        ) : (
                          <IconExpandMore />
                        )}
                      </ListItemIcon>
                    </ListItem>
                    <Collapse in={openCol[index]} timeout="auto" unmountOnExit>
                      <Divider />
                      {/* <SidepanelSmall handleDrawerToggle={handleDrawerToggle} /> */}
                      <List>
                        {menu.more.map((task: any) => (
                          <ListItem
                            className={
                              location.pathname === `${base}${task.url}` ||
                              (location.pathname ===
                                `${base}/userconfig/userupdate` &&
                                `${base}${task.url}` ===
                                  `${base}/userconfig/usermanage`) ||
                              ((location.pathname ===
                                `${base}/userconfig/groupcreate` ||
                                location.pathname ===
                                  `${base}/userconfig/groupupdate`) &&
                                `${base}${task.url}` ===
                                  `${base}/userconfig/usergroup`)
                                ? `${classes.link} ${classes.active}`
                                : classes.link
                            }
                            button
                            onClick={() => {
                              handleClick(`${base}${task.url}`)
                            }}
                            key={task.appmenuId}
                          >
                            <ListItemText
                              primary={task.menu1Desc}
                              classes={{ primary: classes.listItemText }}
                            />
                          </ListItem>
                        ))}
                      </List>
                      <Divider />
                    </Collapse>
                  </List>
                )
              }
              return null
            })}
        </List>
      </Drawer>
    </>
  )
}

const mapStateToProps = (state: any) => {
  return {
    menuItems: state.loginReducer.menuList,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationDrawer)
