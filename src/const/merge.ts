// 需要监听的场景
interface situation {
  sourceBranch: string,
  targetBranch: string,
  message: string,
  needTag: boolean,
  tag: string,
  formatObj?: dateFormat,
}

// 定义时间格式的类型
interface dateFormat {
  insertDate: boolean,
  dateOffset: number,
  format: string
}

const watchSituation: situation[] = [
  {
      sourceBranch: 'release',
      targetBranch: 'master',
      message: `昨天release_$date版本上线, 已合入master, 大家记得同步下master代码`,
      needTag: true,
      tag: `release_$date`,
      formatObj: {
          insertDate: true,
          dateOffset: -1,
          format: 'YYYYMMDD'
      }
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
  watchSituation,
};

export {}
