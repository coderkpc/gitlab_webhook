const dayjs = require('dayjs');

// gitlab的token
const token = "";
// mattermost群组
const group = "";
//仓库
const projectUrl = "";

// 端口
const port = 7779;

// 需要监听的场景
interface situation {
    sourceBranch: string,
    targetBranch: string,
    message: string,
    needTag: boolean,
    tag: string
}
const watchSituation: situation[] = [
  {
      sourceBranch: 'release',
      targetBranch: 'master',
      message: `昨天release_${dayjs().subtract(1, 'day').format('YYYYMMDD')}版本上线, 已合入master, 大家记得同步下master代码`,
      needTag: true,
      tag: `release_${dayjs().subtract(1, 'day').format('YYYYMMDD')}`
  },
  {
      sourceBranch: 'master',
      targetBranch: 'integration-test',
      message: `master分支已合入integration-test`,
      needTag: false,
      tag: ''
  }
]

module.exports = {
  group,
  projectUrl,
  token,
  port,
  watchSituation,
};

export {}
