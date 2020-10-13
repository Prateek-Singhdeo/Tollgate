import React from 'react';
import 'antd/dist/antd.css'
import './App.css';

import { Link, Switch, Route } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  CarOutlined,
  SnippetsOutlined
} from '@ant-design/icons';

import CreateReceipt from './comoponents/CreateReceipt';
import CheckValidity from './comoponents/CheckValidity';

const { Header, Sider} = Layout;


function App() {
  return (
    <Layout>
        <Sider className="sidebar">
          <div className="logo" />
          <Menu theme="dark" mode="inline">
            <Menu.Item key="1" icon={<CarOutlined />}>
              <Link to="/">Check Validity</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<SnippetsOutlined />}>
              <Link to="/create">Create Receipt</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          
          </Header>
            <Switch>
              <Route exact path="/">
                <CheckValidity />
              </Route>
              <Route exact path="/create">
                <CreateReceipt />
              </Route>
            </Switch>
        </Layout>
      </Layout>
  );
}

export default App;
