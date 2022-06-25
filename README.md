# MSS_Webhook

## 系统概要

基于mattermost和gitlab的API和webhook实现的自动化机器人

## 功能实现

1. 监听合并事件
    1. 自动打tag
    2. 自动dim通知

2. 自动创建合并请求
    1. 未实现，待开发

3. 待续

## 讨论

有问题请在[issue](https://github.com/coderkpc/gitlab_webhook/issues)讨论

1. 后续打算用ESModule而不是Commonjs的方式来写，看了下ts4.7版本的更新好像已经在nodejs中支持了，因为interface好像不支持用Commonjs来导入导出😱
2. 有一个想法就是在处理完release合入master的事件以后自动创建一个 “从master合入integration-test”的pr指派给主程序员，要去找找创建合并请求的api🤔
3. 学着编写shell，还有最近比较火的zx，实现对比分支落后多少commit的自动化



## 感谢

感谢lsj大佬的指点, 真的受益匪浅, 老司机无疑了🙉

## 环境依赖

- Node版本: 16.14.0

- typescript: 4.7.4

- express: 4.17.3

## 部署步骤

....目前部署有点问题，可能是node写的不太熟练，要把整个项目放到服务器然后yarn + yarn build一下才能跑起来，有点麻烦，部署还没实现自动化

## 代码规范

集成了prettier和eslint但是发现好像没有起到什么作用...待完善


## 目录结构描述

├── dist  // tsc编译后的js文件

├── src // ts编写的源文件

├───├── const //常量 存放token和mattermost的webhook 以及监听场景

├───├── utils //一些工具函数, 如dim通知, 成功和失败的消息发送, 本地打印日志

├───├── handle //主要功能模块, 如合并事件的处理

├── log.txt // 本地日志

├── package.json  // 包描述文件

├── tsconfig.json // ts配置



## 版本内容更新

### V1.0.0 

> 监听合并事件
>
> - 自动dim通知
> - 本地日志打印
> - 自动打tag
