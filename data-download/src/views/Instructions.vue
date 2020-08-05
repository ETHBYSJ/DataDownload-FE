<template>
  <div class="wrapper">
    <div class="cn">
      <h2>使用说明</h2>
      <p>
        在进行上传/下载操作前，请先登录。
      </p>
      <p>
        根目录下一般用户不允许上传文件，请先创建文件夹后在新建的文件夹中上传。文件上传后，需要经过管理员审核后才能进行共享。上传文件时，文件名请不要带有下划线 "_"，否则会导致上传失败。
      </p>
      <p>
        用户可以设置文件/文件夹的共享状态(私有/公开)，来限制其他用户访问您的文件/文件夹。
      </p>
    </div>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <div class="en">
      <h2>Instructions</h2>
      <p>
        Please login before uploading / downloading.
      </p>
      <p>
        Normal users are not allowed to upload files under the root directory. Please create a folder first and then upload files in your folder. After the file is uploaded, it needs to be approved by the administrator before sharing. When uploading a file, please ensure there is no underline "_" character in your file name, otherwise the upload operation will fail.
      </p>
      <p>
        Users can set the file / folder sharing state (private / public) to restrict other users' access to your files / folders.
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Instructions'
  }
</script>

<style lang="less" scoped>
  .wrapper {
    margin-left: 30px;
    margin-right: 30px;
    margin-top: 30px;
    h2 {
      margin-bottom: 10px;
    }
    p {
      font-size: 15px;
      line-height: 1.8;
      margin-bottom: 10px;
    }
  }
</style>
