/** 自动化部署 linux 服务器 */
let Client = require('ssh2-sftp-client');

const path = require('path');

let client = new Client();

const config = {
  host: 'xxx',
  port: 22,
  username: 'root',
  password: 'xxx',
};

const localPath = path.resolve(__dirname, './dist');

const serviceBackupPath = '/home/backup';

const servicePath = '/home/data';

const main = async () => {
  try {
    await client.connect(config);
    console.log('连接服务器成功');
    if (await client.exists(serviceBackupPath)) {
      await client.rmdir(serviceBackupPath, true);
      console.log('删除备份文件成功');
    }
    if (await client.exists(servicePath)) {
      await client.rename(servicePath, serviceBackupPath);
      console.log('原有的文件夹重命名为备份文件');
    }
    console.log('开始上传');
    await client.uploadDir(localPath, servicePath);
    console.log('上传成功');
  } finally {
    client.end();
  }
};

main();
