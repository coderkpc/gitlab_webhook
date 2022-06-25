const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const { group } = require('../const/index');

/**
 * dim 通知
 * @param {*} msg 信息，不能包含双引号 ""
 * @param {*} target 目标群组
 */
const inform = async function (msg: string, target: string) : Promise<void> {
    const response = await fetch(target, {
        headers: {
        "content-type": "application/json;charset=UTF-8",
        },
        body: '{"text":"' + msg + '"}',
        method: "POST",
        mode: "no-cors",
    });

    if (!response.ok) {
        log(`DIM错误：${response.status} ${response.statusText}`);
    }
};

/**
 * 执行成功通知
 * @param {*} msg 信息，不能包含双引号 ""
 */
const successInform = function (msg: string): void {
    inform("@here " + msg, group);
};

/**
 * 执行错误通知
 * @param {*} msg 错误信息，不能包含双引号 ""
 */
const errorInform = function (msg: string): void {
    inform("@某个大佬" + msg, group);
};

/**
 * 本地打印日志
 * @param {*} msg 错误信息，不能包含双引号 ""
 */
const log = function (msg: string) {
  const logFile = fs.createWriteStream(path.join(__dirname, "../../log.txt"), {
      flags: "a",
  });
  logFile.write(`\nnode log: ${Date()} \n${msg}`);
};

module.exports = {
  inform,
  successInform,
  errorInform,
  log,
};

export {}
