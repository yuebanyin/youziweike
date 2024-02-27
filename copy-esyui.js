/* eslint-disable prefer-const */
/* eslint-disable no-restricted-syntax */
const AdmZip = require('adm-zip');

const fs = require('fs');

const path = require('path');

function unzip(zipPath, targetPath) {
  const zipFile = fs.readFileSync(zipPath);
  const zip = new AdmZip(zipFile);
  try {
    console.warn(12334, zip);
    // 解压到指定路径
    zip.extractAllToAsync(targetPath, true, (err) => {
      if (!err) {
        console.warn('解压完成！');
      } else {
        console.error('解压失败：', err);
      }
    });
  } catch (error) {
    console.error('解压失败：', error);
  }
}

fetch();

function copyFolder(sp, dp) {
  if (!fs.existsSync(dp)) {
    // 如果目标路径不存在则创建该路径
    fs.mkdirSync(dp);
  }
  const files = fs.readdirSync(sp);

  for (let file of files) {
    const sourceFilePath = path.join(sp, file);
    const destinationFilePath = path.join(dp, file);

    if (fs.statSync(sourceFilePath).isDirectory()) {
      // 递归调用自身处理子文件夹
      copyFolder(sourceFilePath, destinationFilePath);
    } else {
      // 直接复制文件到目标路径
      fs.copyFileSync(sourceFilePath, destinationFilePath);
    }
  }
}

// 源文件夹路径
const sourceFolderPath = './copy';
// 目标文件夹路径
const targetFolderPath = './node_modules';

// 源文件夹路径
const zipPath = './copy/esy-ui.zip';
const targetPath = './copy';

try {
  unzip(zipPath, targetPath);
  // copyFolder(sourceFolderPath, targetFolderPath);
  console.info('成功复制文件夹！');
} catch (error) {
  console.error('复制文件夹时发生错误：', error);
}
