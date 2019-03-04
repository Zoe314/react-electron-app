const { app, BrowserWindow } = require('electron')
// const { net } = require('electron')
// const axios = require('axios')
// const http = require('./http')
var pcsc = require('pcsclite');
var pcsc = pcsc();
// 保持对window对象的全局引用，如果不这么做的话，当JavaScript对象被
// 垃圾回收的时候，window对象将会自动的关闭
let win

function createWindow() {
    // 创建浏览器窗口。
    win = new BrowserWindow({ width: 800, height: 600 })

    // 然后加载应用的 index.html。  url 及本地文件形式
    win.loadURL('http://localhost:3000')
    // win.loadFile('public/index.js')

    // 这是不可用的============
    // win.loadURL(url.format({
    //     pathname: path.join(__dirname, './build/index.html'),
    //     protocol: 'file:',
    //     slashes: true
    // }))

    // 打开开发者工具
    win.webContents.openDevTools()
   
    // 监听插卡事件
    pcsc.on('reader', function (reader) {

        console.log('New reader detected', reader.name);

        reader.on('error', function (err) {
            console.log('Error(', this.name, '):', err.message);
        });

        reader.on('status', function (status) {
            // console.log('Status(', this.name, '):', status);
            /* check what has changed */
            var changes = this.state ^ status.state;
            if (changes) {
                if ((changes & this.SCARD_STATE_EMPTY) && (status.state & this.SCARD_STATE_EMPTY)) {
                    console.log("card removed");/* card removed */
                    reader.disconnect(reader.SCARD_LEAVE_CARD, function (err) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('Disconnected');
                        }
                    });
                } else if ((changes & this.SCARD_STATE_PRESENT) && (status.state & this.SCARD_STATE_PRESENT)) {
                    // console.log("card inserted");/* card inserted */
                    reader.connect({ share_mode: this.SCARD_SHARE_SHARED }, function (err, protocol) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('Protocol(', reader.name, '):', protocol);
                            reader.transmit(new Buffer([0x00, 0xB0, 0x00, 0x00, 0x20]), 40, protocol, function (err, data) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log('Data received收到', data);
                                    reader.close();
                                    // pcsc.close();
                                    // console.log(data);
                                }
                            });
                        }
                    });
                }
            }
           
            // 3.node.js中http请求
            // var postData = JSON.stringify({
            //     'msg' : 'Hello World!'
            //   });               
            //   var options = {
            //     hostname: 'www.baidu.com',
            //     port: 80,
            //     path: '/upload',
            //     method: 'POST',
            //     headers: {
            //       'Content-Type': 'application/json',
            //       'Content-Length': Buffer.byteLength(postData)
            //     }
            //   };
              
            //   var req = http.request(options, (res) => {
            //     console.log(`STATUS: ${res.statusCode}`);
            //     console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
            //     res.setEncoding('utf8');
            //     res.on('data', (chunk) => {
            //       console.log(`BODY: ${chunk}`);
            //     });
            //     res.on('end', () => {
            //       console.log('No more data in response.')
            //     })
            //   });
              
            //   req.on('error', (e) => {
            //     console.log(`problem with request: ${e.message}`);
            //   });
              
            //   // write data to request body
            //   req.write(postData);
            //   req.end();

    //         http.post('/VKey-portalsvr-server//agreement/bluetooth/create', {
    //           }, res => {
    //             console.log(res)
    //           }, err => {
    //             console.log(err)
    //           })

        });

        reader.on('end', function () {
            console.log('Reader', this.name, 'removed');
        });
    });

    pcsc.on('error', function (err) {
        console.log('PCSC error', err.message);
    });


    // 当 window 被关闭，这个事件会被触发。
    win.on('closed', () => {
        // 取消引用 window 对象，如果你的应用支持多窗口的话，
        // 通常会把多个 window 对象存放在一个数组里面，
        // 与此同时，你应该删除相应的元素。
        win = null
    })
}

// Electron 会在初始化后并准备
// 创建浏览器窗口时，调用这个函数。
// 部分 API 在 ready 事件触发后才能使用。
app.on('ready', createWindow)

// 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
    // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
    // 否则绝大部分应用及其菜单栏会保持激活。
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // 在macOS上，当单击dock图标并且没有其他窗口打开时，
    // 通常在应用程序中重新创建一个窗口。
    if (win === null) {
        createWindow()
    }
})

// 在这个文件中，你可以续写应用剩下主进程代码。
// 也可以拆分成几个文件，然后用 require 导入。
