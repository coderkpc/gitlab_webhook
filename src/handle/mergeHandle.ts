const fetch = require('node-fetch');
const dayjs = require('dayjs')
const { successInform, errorInform, log } = require('../utils/index');
const { projectUrl, token, watchSituation } = require('../const/index');

interface situation {
    sourceBranch: string,
    targetBranch: string,
    message: string,
    needTag: boolean,
    tag: string
}

function getSituation (body: any): situation | undefined {
    // 获取源分支和目标分支
    const sourceBranch = body.object_attributes.source_branch;
    const targetBranch = body.object_attributes.target_branch;

    const result = watchSituation.find(item => {
        // 源分支和目标分支必须匹配
        return item.sourceBranch === sourceBranch && item.targetBranch === targetBranch;
    })
    return result;
}

async function checkTagExist(mergeEvent: situation) {
  const { tag } = mergeEvent;

  // 调用判断接口
  log(`判断标签 ${tag} 是否存在?`);
  const response = await fetch(
      `${projectUrl}tags/${tag}?private_token=${token}`,
      {
          method: "GET",
      }
  );
  const data = await response.json();

  // true === 标签存在
  if (response.ok) {
      log(`标签 ${tag} 已存在!`);
      errorInform(`标签 ${tag} 已存在，请手动处理!`);
  } else if (data.message !== "404 Tag Not Found") {
      log(`判断标签 ${tag} 是否存在出错!!!`);
      errorInform(`判断标签是否存在出错: ${data.message}`);
  }

  return response.ok;
}

async function tagHandle(mergeEvent: situation): Promise<void> {
  // 判断标签是否存在
  const isExist = await checkTagExist(mergeEvent);

  // 标签不存在
  if (!isExist) {
      // 如果标签不存在  则推送标签到仓库
      const { sourceBranch, targetBranch, tag, message } = mergeEvent;
      log(`开始推送tag: ${tag}, 时间:${dayjs().format('YYYY年MM月DD日 hh时mm分ss秒')}`);
      log(`源分支: ${sourceBranch}, 目标分支: ${targetBranch}, 标签名: ${tag}`);
      const response = await fetch(
          `${projectUrl}tags?ref=${targetBranch}&tag_name=${tag}&message=${tag}&private_token=${token}`,
          {
              method: "POST",
          }
      );
      const data = await response.json();

      if (response.ok) {
          successInform(message);
      } else {
          log(`打标签出错!`);
          errorInform(`打标签出错: ${data.message}`);
      }
  }
}

// 处理合并
function mergeHandle(body: any): void {
  // 获取事件状态
  const state = body.object_attributes.state;
  const result: situation | undefined = getSituation(body);

  // 如果当前场景不做监听 直接返回
  if(result === undefined) return;

  if (state === "merged") {
      if (result.needTag) {
          // 打标签
          tagHandle(result);
      } else {
          // 直接通知
          successInform(result.message);
      }
  }
}

module.exports = mergeHandle

export {}
