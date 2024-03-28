import React, { FC } from 'react'
import { DatePicker, Layout, Statistic } from 'antd'
import './MainLayout.css'
import { Menu } from 'antd'
import Icon from '../icon/Icon'
import Logo from '../logo/Logo'
import { renderRoutes } from 'react-router-config'
import { ROUTE_CONFIG } from '../../services/router'
import {  Link } from 'react-router-dom'
// Layout 里面包含多个其它组件，我们可以解构出所需要的组件
const { Sider, Content } = Layout
// Menu 组件包含了很多其它组件，我们也需要通过解构获取需要的组件
const { Item } = Menu
const MainLayout: FC = () => {
  // 使用 useLocation 获取当前页面的 path 信息时报错，改用window...
  const pathname=window.location.pathname
  return (
    <Layout className="app">
      <Sider className="sider" theme="light" collapsible>
      <Logo />
      {/* 将 Menu 的默认值设为当前的 path，一旦手动点击了菜单栏，则会以所选项为准 */}
      <Menu  defaultSelectedKeys={[pathname]}>
        <Item key="detail" icon={<Icon icon={'icon-zhuye'} />}>
        <Link to="/">明细</Link>
    </Item>
    <Item key="chart" icon={<Icon icon={'icon-Chart'} />}>
    <Link to="/chart">图表</Link>
    </Item>
    </Menu>
      </Sider>
      <Content className="content">
        <div className={'header'}>
          <Logo size={'large'} />
          <div className={'header-category'}>
            {/* value 默认只能 string 或者 number 类型数据，所以这里我们使用 valueRender 方法来重写其 value 渲染的组件*/}
            <Statistic
              title={'请选择月份'}
              valueRender={() => <DatePicker picker={'month'} />}
            />
            <Statistic title={'总收入'} value={10000} />
            <Statistic title={'总支出'} value={5000} />
          </div>
        </div>
        <div className="body">{renderRoutes(ROUTE_CONFIG)}</div>
      </Content>
    </Layout>
  )
}
export default MainLayout