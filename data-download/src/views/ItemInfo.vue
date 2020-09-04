<template>
  <div>
    <el-container class="header">
      <el-header class="name">
        <h2>CRADI</h2>
      </el-header>
      <el-container class="main">
        <el-aside width="70%" class="image">
          <el-image :src="imgUrl" fit="contain"  @down.prevent alt="This is an image"/>
        </el-aside>
        <el-main class="side-info">
          <div class="title">{{$t('m.About')}}</div>
          <ul>
            <li><i class="el-icon-circle-check"></i>{{$t('m.About1')}}</li>
            <li><i class="el-icon-circle-check"></i>{{$t('m.About2')}}</li>
            <li><i class="el-icon-circle-check"></i>{{$t('m.About3')}}</li>
          </ul>
          <div class="downloadBtn">
            <el-button type="primary" @click="handleDownload" >{{$t('m.Download')}}</el-button>
          </div>
        </el-main>
      </el-container>
    </el-container>
    <div class="body">
      <el-tabs v-model="tabActiveName" >
        <el-tab-pane :label="$t('m.Description')" name="first"><Introduction></Introduction></el-tab-pane>
        <el-tab-pane :label="$t('m.License')" name="second"><Agreement></Agreement></el-tab-pane>
      </el-tabs>
      <div v-if="!enActive" class="body-footer">
        <p>如遇下载问题，可以联系我们。</p>
        <br>
        <br>
        <p>我们致力于大数据处理、云计算与人工智能方面的研究工作，欢迎科研合作与交流。</p>
      </div>
      <div v-else class="body-footer">
        <p>Please contact us if you have any problems during the downloading.</p>
        <br>
        <br>
        <p>We are committed to the research of big data processing, cloud computing and artificial intelligence, and would welcome the scientific
          research cooperation and exchange. </p>
      </div>
      
    </div>
    <div class="footer">
      <el-container v-if="!enActive">
        <el-main class="footer-main">
        <h2>友情链接</h2>
        <ul class="hyper-links">
          <li><a href="http://epcc.sjtu.edu.cn">上海交通大学新兴并行计算研究中心</a></li>
          <li><a href="http://www.cs.sjtu.edu.cn">上海交通大学计算机科学与工程系</a></li>
          <li><a href="http://www.seiee.sjtu.edu.cn">上海交通大学电子信息与电气工程学院</a></li>
          <li><a href="https://www.sjtu.edu.cn">上海交通大学</a></li>        
        </ul>
        </el-main>
        <el-aside class="footer-aside"  width="50%">
          <h2>联系我们</h2>
          <ul class="contact-info">
            <li>电子邮件：yshen@cs.sjtu.edu.cn</li>
            <li>地址：上海交通大学闵行校区计算机科学与工程系</li>
            <li>邮编: 200240</li>
          </ul>
        </el-aside>
      </el-container>
      <el-container v-else>
        <el-main class="footer-main">
        <h2>Links</h2>
        <ul class="hyper-links">
          <li><a href="http://epcc.sjtu.edu.cn">Emerging Parallel Computing Center, SJTU</a></li>
          <li><a href="http://www.cs.sjtu.edu.cn">Department of Computer Science and Engineering, SJTU</a></li>
          <li><a href="http://www.seiee.sjtu.edu.cn">School of Electronic Information and Electrical Engineering, SJTU</a></li>
          <li><a href="https://www.sjtu.edu.cn">Shanghai Jiao Tong University</a></li>
        </ul>
        </el-main>
        <el-aside class="footer-aside" width="43%">
          <h2>Contact Us</h2>
          <ul class="contact-info">
            <li>E-mail：yshen@cs.sjtu.edu.cn</li>
            <li>Address：Department of computer science and engineering, Shanghai Jiao Tong University, Shanghai(200240), China</li>
          </ul>
        </el-aside>
      </el-container>
    </div>
    <el-dialog
      :title="$t('m.Agreement')"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false">
      <div class="agreement-wrapper">
        <h1>Research Use Agreement of the CRADI</h1>
        <br>
        <br>
        <p>
          &emsp;By registering for downloads from the CRADI Dataset, you are agreeing to this Research Use Agreement.
        </p>
        <p>
          &emsp;1. Permission is granted to view and use the CRADI Dataset without charge for personal, non-commercial research purposes only. Any commercial use, sale, or other monetization is prohibited.
        </p>
        <p>
          &emsp;2. You may make a verbatim copy of the CRADI Dataset for personal, non-commercial research use as permitted in this Research Use Agreement. If another user within your organization wishes to use the CRADI Dataset, they must register as an individual user and comply with all the terms of this Research Use Agreement.
        </p>
        <p>
          &emsp;3. YOU MAY NOT DISTRIBUTE, PUBLISH, OR REPRODUCE A COPY of any portion or all of the CRADI Dataset to others without specific prior written permission from the Shanghai Jiaotong University.
        </p>
        <p>
          &emsp;4. YOU MAY NOT SHARE THE DOWNLOAD LINK to the CRADI dataset to others. If another user within your organization wishes to use the CRADI Dataset, they must register as an individual user and comply with all the terms of this Research Use Agreement.
        </p>
        <p>
          &emsp;5. You must not modify, reverse engineer, decompile, or create derivative works from the CRADI Dataset. You must not remove or alter any copyright or other proprietary notices in the CRADI Dataset.
        </p>
        <p>
          &emsp;6. The CRADI Dataset has not been reviewed or approved by the administrative authority and is for non-clinical, Research Use Only. In no event shall data or images generated through the use of the CRADI Dataset be used or relied upon in the diagnosis or provision of patient care.
        </p>
        <p>
          &emsp;7. THE CRADI DATASET IS PROVIDED "AS IS," AND JIAOTONG UNIVERSITY AND ITS COLLABORATORS DO NOT MAKE ANY WARRANTY, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE, NOR DO THEY ASSUME ANY LIABILITY OR RESPONSIBILITY FOR THE USE OF THIS CRADI DATASET.
        </p>
        <p>
          &emsp;8. You will not make any attempt to re-identify any of the individual data subjects. Re-identification of individuals is strictly prohibited. Any re-identification of any individual data subject shall be immediately reported to the School of Medicine.
        </p>
        <p>
          &emsp;9. Any violation of this Research Use Agreement or other impermissible use shall be grounds for immediate termination of use of this CRADI Dataset. In the event that the university determines that the recipient has violated this Research Use Agreement or other impermissible use has been made, the univeristy may direct that the undersigned data recipient immediately return all copies of the CRADI Dataset and retain no copies thereof even if you did not cause the violation or impermissible use.
        </p>
        <p>
          &emsp;In consideration for your agreement to the terms and conditions contained here, Shanghai Jiaotong University grants you permission to view and use the CRADI Dataset for personal, non-commercial research. You may not otherwise copy, reproduce, retransmit, distribute, publish, commercially exploit or otherwise transfer any material.
        </p>
        <h1>Limitation of Use</h1>
        <p>
          &emsp;You may use CRADI Dataset for legal purposes only.
        </p>
        <p>
          &emsp;You agree to indemnify and hold Shanghai Jiaotong University harmless from any claims, losses or damages, including legal fees, arising out of or resulting from your use of the CRADI Dataset or your violation or role in violation of these Terms. You agree to fully cooperate in Shanghai Jiaotong University’s defense against any such claims.
        </p>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible=false">{{$t('m.Cancel')}}</el-button>
        <el-button type="primary" @click="doDownload">{{$t('m.Confirm')}}</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :title="$t('m.DownloadNotice')"
      :visible.sync="downloadVisible"
      :close-on-click-modal="false">
      <div v-if="!enActive">
        <p>正在处理图像，稍后将向您的邮箱发送下载链接。请注意：<b>图像已经添加了水印。</b></p>
      </div>
      <div v-else>
        <p>The images are being processed and a download link will be sent to your email later. Please note that <b>the images have been watermarked</b></p>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="downloadVisible=false">{{$t('m.Confirm')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Introduction from './Introduction'
import Agreement from './Agreement'
import {mapGetters} from 'vuex'

import api from '../api'

  export default {
    name: "ItemInfo",
    components : {
      Introduction,
      Agreement
    },
    data: function () {
      return{
        tabActiveName:"first",
        //协议确认
        dialogVisible: false,
        //下载确认
        downloadVisible: false,
        //图片相对地址
        imgUrl: require("../assets/image2.png"),
        //数据包名称
        name: 'example.zip'
        // name: 'go1.14.6.linux-amd64.tar.gz'
      }
    },
    computed:{
      ...mapGetters(['isAuthenticated', 'user']),
      enActive(){
        let lang = this.$i18n.locale;
        return lang === "en-US" ? true : false;
      }
    },
    mounted() {
        this.$on('error',(e)=> {console.log(e)})
    },
    methods:
    {
      handleDownload() {
        if(this.isAuthenticated)
        {
          this.dialogVisible = true
        }
        else{
          this.$router.push('/login')
        }
      },
      doDownload() {
        this.dialogVisible = false
        let params = {
          // path: "/Data-CRADI/data/raw_data_repository/chestXray/chexpert/",
          path: "/Data-CRADI",
          email: this.user.email
        }
        this.downloadVisible = true
        // console.log(params)
        api.files.downloadSession(params).then(res => {
          console.log(res)
          if(res.data.code !== 0) {
            this.$error(this.$t('m.Download_Error'))
          }
          else {
            // window.location.href = res.data.data
            this.$success(this.$t('m.Download_Succeed'))
          }
        }).catch(() => {
          this.$error(this.$t('m.Download_Error'))
        })
        // window.location.href = 'http://127.0.0.1:8088/api/v1/file/download_test'
        /*
        api.files.downloadStatic(data).then(res => {
          // console.log(res)
          let link = document.createElement('a')
          let blob = new Blob([res.data], {type: 'octet/stream'})
          // let objectUrl = URL.createObjectURL(blob)
          // window.location.href = objectUrl
          link.download = this.name
          link.href = URL.createObjectURL(blob)
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          // saveAs(blob, this.oldName)

        }).catch(() => {
          this.$error(this.$t('m.Download_Error'))
        })
        */
      },
    }

  }

</script>

<style lang='less' scoped>
  .header {
    padding-left: 20%;
    padding-right: 20%;
    .name {
      padding: 15px 20px 0 20px;
      border-bottom: 1px solid #e1e1e1;
      font-size: 20px;
    }
    .main {
      .image{
        /deep/ .el-image{
          width: 100%;
        }
      }
      .side-info {
        margin-left: 20px;
        // display: inline-block;
        .title{
          font-size: 18px;
          font-weight: bold;
          border-bottom: 1px solid #e1e1e1;
          height: 20%;
        }
        ul {
          font-size: 16px;
          color: grey;
          // height: 40%;
          li {
            list-style-type: none;
            padding: 5px 0px;
            i {
              padding-right: 3px;
            }
          }
        }
        .downloadBtn{
          height: 15%;
          margin-top: 10%;
        }

      }
    }
  }
  .body {
    padding-left:20%;
    padding-right: 20%;
    .body-footer{
      padding : 0 30px;
      font-size: 15px;
    }
  }
  .agreement-wrapper {
    // word-break: break-word;
  }
  .footer {
    padding: 0 20%;
    background-color: #f6f9fa;
    color: #585858;
    .footer-main{
      padding-left: 10%;
    }
    .footer-aside{
      padding: 20px;
      .contact-info {
        // padding: 20px;
      }
    }
    .contact-us{
      text-align: center;
      padding-bottom: 20px;
    }
  }
</style>
