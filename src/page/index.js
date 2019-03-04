import React from 'react';

import { DatePicker, Input, Layout, Menu, Icon, Button, Radio } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const { SubMenu } = Menu;


export default class IndexPage extends React.Component {
    state = {
        size: 'large', loading: false,
        iconLoading: false,
    };
    handleSizeChange = (e) => {
        this.setState({ size: e.target.value });
    }
    onChange(date, dateString) {
        console.log(date, dateString);
    }
    enterLoading = () => {
        this.setState({ loading: true });
    }

    enterIconLoading = () => {
        this.setState({ iconLoading: true });
    }

    render() {
        const size = this.state.size;
        return (
            // <Calendar onPanelChange={this.onPanelChange} /> 
            <div style={{ height: '100%' }}>
                <Layout>
                    <Sider width={200} style={{ background: '#fff' }}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%', borderRight: 0 }}
                        >
                            <SubMenu key="sub1" title={<span><Icon type="user" />subnav 1</span>}>
                                <Menu.Item key="1"><a href="#/second">option1</a></Menu.Item>
                                <Menu.Item key="2">option2</Menu.Item>
                                <Menu.Item key="3">option3</Menu.Item>
                                <Menu.Item key="4">option4</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" title={<span><Icon type="laptop" />subnav 2</span>}>
                                <Menu.Item key="5">option5</Menu.Item>
                                <Menu.Item key="6">option6</Menu.Item>
                                <Menu.Item key="7">option7</Menu.Item>
                                <Menu.Item key="8">option8</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub3" title={<span><Icon type="notification" />subnav 3</span>}>
                                <Menu.Item key="9">option9</Menu.Item>
                                <Menu.Item key="10">option10</Menu.Item>
                                <Menu.Item key="11">option11</Menu.Item>
                                <Menu.Item key="12">option12</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header>
                            <Menu
                                theme="dark"
                                mode="horizontal"
                                defaultSelectedKeys={['2']}
                                style={{ lineHeight: '64px' }}
                            >
                                <Menu.Item key="1">nav 1</Menu.Item>
                                <Menu.Item key="2">nav 2</Menu.Item>
                                <Menu.Item key="3">nav 3</Menu.Item>
                            </Menu>
                        </Header>
                        <Content>
                            <div>
                                <DatePicker onChange={this.onChange} />
                                <br />
                                <MonthPicker onChange={this.onChange} placeholder="Select month" />
                                <br />
                                <RangePicker onChange={this.onChange} />
                                <br />
                                <WeekPicker onChange={this.onChange} placeholder="Select week" />
                                <Button type="primary" icon="search">Search</Button>
                                <Button shape="circle" icon="search" />
                                <Button type="dashed" icon="search">Search</Button>

                                <Radio.Group value={size} onChange={this.handleSizeChange}>
                                    <Radio.Button value="large">Large</Radio.Button>
                                    <Radio.Button value="default">Default</Radio.Button>
                                    <Radio.Button value="small">Small</Radio.Button>
                                </Radio.Group>
                                <br /><br />


                                <Button type="primary" size={size} >Primary</Button>
                                <Button size={size}>Normal</Button>
                                <Button type="dashed" size={size}>Dashed</Button>
                                <Button type="danger" size={size}>Danger</Button>
                                <br />
                                <Button type="dashed" shape="circle" icon="download" size={size} />
                                <Button type="primary" shape="round" icon="download" size={size}>Download</Button>
                                <Button type="primary" icon="download" size={size}>Download</Button>
                                <Button>Default</Button>
                                <Button disabled>Default(disabled)</Button>
                                <br />
                                <Button type="dashed" disabled>Dashed(disabled)</Button>
                                <div style={{ padding: '8px 8px 0 8px', background: 'rgb(190, 200, 200)' }}>
                                    <Button ghost>Ghost</Button>
                                    <Button ghost disabled>Ghost(disabled)</Button>
                                </div>
                                <Button.Group size={size}>
                                    <Button type="primary">
                                        <Icon type="left" />Backward
                                    </Button>
                                    <Button type="primary">
                                        Forward<Icon type="right" />
                                    </Button>
                                </Button.Group>
                            </div>
                            <div>
                                <Input placeholder="Basic usage" />
                            </div>
                            <Button type="primary">Primary</Button>
                            <span>
                                <Button type="primary" loading>
                                    Loading
                                </Button>
                                <Button type="primary" size="small" loading>
                                    Loading
                                </Button>
                                <br />
                                <Button type="primary" loading={this.state.loading} onClick={this.enterLoading}>
                                    Click me!
                                </Button>
                                <Button type="primary" icon="poweroff" loading={this.state.iconLoading} onClick={this.enterIconLoading}>
                                    Click me!
                                </Button>
                                <br />
                                <Button shape="circle" loading />
                                <Button type="primary" shape="circle" loading />
                            </span>

                            <div style={{ background: 'rgb(190, 200, 200)', padding: '26px 16px 16px' }}>
                                <Button type="primary" ghost>Primary</Button>
                                <Button ghost>Default</Button>
                                <Button type="dashed" ghost>Dashed</Button>
                                <Button type="danger" ghost>danger</Button>
                            </div>
                            <div>
                                <Button type="primary" block>Primary</Button>
                                <Button block>Default</Button>
                                <Button type="dashed" block>Dashed</Button>
                                <Button type="danger" block>danger</Button>
                            </div>
                        </Content>
                        <Footer style={{ textAlign: 'center', borderTop: '1px solid #ccc', borderTopWidth: 1 }}>
                            <span>
                                Ant Design ©2018 Created by Ant UED
                            </span>

                            <span>
                                Ant Design ©2018 v1.2.1
                            </span>
                            <span>
                                reated by Ant UED
                            </span>
                        </Footer>
                    </Layout>
                </Layout>


            </div>
        )

    }
}
