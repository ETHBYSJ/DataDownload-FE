<template>
  <div>
    <line-item class="item" :class="[show?'line-in':'line']"
    :style="isDir?'cursor:pointer':''"
    @click.native.prevent.stop="open"
    @mouseenter.native="handleMouseEnter"
    @mouseleave.native="handleMouseLeave">
      <div class="flex-container" slot="content" >
        <!--icon-->
        <div class="icon">
          <i v-if="isDir" class="el-icon-folder"></i>
          <i v-else class="el-icon-document"></i>
        </div>
        <span class="name" v-if="!isEditing">{{oldName}}</span>
        <div class="edit-wrapper flex-container" v-else>
          <el-input size="small" class="edit-name" v-model="newName" @click.stop.native="dummy"></el-input>
          <el-button :loading="saving" size="small" class="edit-btn" type="primary" @click.stop.native="handleSave">{{$t('m.Save')}}</el-button>
        </div>
        <!--文件审核状态-->
        <div class="review-status">
          <el-tag type="success" v-if="!this.isDir && this.review">
            {{$t('m.Reviewed')}}
          </el-tag>
          <el-tag type="danger" v-if="!this.isDir && !this.review">
            {{$t('m.UnReviewed')}}
          </el-tag>
        </div>
        <!--某些操作图标-->
        <div class="hidden-items" :style="visibility">
          <template v-if="this.user.id === this.ownerId">
            <el-tooltip
              :class="[privacyActive?'privacy-in':'privacy']"
              v-if="currentShare"
              :content="$t('m.Privacy')"
              placement="top-start"
              @mouseenter.native="handleEnterPrivacy"
              @mouseleave.native="handleLeavePrivacy"
              @click.native.prevent.stop="handlePrivacy">
              <i class="el-icon-lock" style="cursor:pointer"></i>
            </el-tooltip>
            <el-tooltip
              :class="[shareActive?'share-in':'share']"
              v-else
              :content="$t('m.Share')"
              placement="top-start"
              @mouseenter.native="handleEnterShare"
              @mouseleave.native="handleLeaveShare"
              @click.native.prevent.stop="handleShare">
              <i class="el-icon-unlock" style="cursor:pointer"></i>
            </el-tooltip>
          </template>

          <template>
            <el-tooltip
              :class="[downloadActive?'download-in':'download']"
              v-if="!isDir && (this.user.id === ownerId || share)"
              :content="$t('m.Download')"
              placement="top-start"
              @mouseenter.native="handleEnterDownload"
              @mouseleave.native="handleLeaveDownload"
              @click.native.prevent.stop="handleDownload">
              <i class="el-icon-download" style="cursor:pointer"></i>
            </el-tooltip>
            <el-tooltip
              class="private"
              v-else-if="!isDir"
              :content="$t('m.File_Private')"
              placement="top-start"
              @click.native.prevent.stop="dummy">
              <i class="el-icon-user"></i>
            </el-tooltip>
          </template>
          <template>
            <el-tooltip
              :class="[renameActive?'rename-in':'rename']"
              v-if="this.user.id === ownerId"
              :content="$t('m.Rename')"
              placement="top-start"
              @mouseenter.native="handleEnterRename"
              @mouseleave.native="handleLeaveRename"
              @click.native.prevent.stop="handleRename">
              <i class="el-icon-edit" style="cursor:pointer" ></i>
            </el-tooltip>
          </template>
          <template>
            <el-tooltip
              :class="[deleteActive?'delete-in':'delete']"
              v-if="this.user.id === ownerId"
              :content="$t('m.Delete')"
              placement="top-start"
              @mouseenter.native="handleEnterDelete"
              @mouseleave.native="handleLeaveDelete"
              @click.native.prevent.stop="handleDelete">
              <i class="el-icon-delete" style="cursor:pointer"></i>
            </el-tooltip>
          </template>
        </div>
        <div class="size">
          <p v-if="isDir">&mdash;</p>
          <p v-else>{{showSize()}}</p>
        </div>

        <p class="modified">{{modified | localtime}}</p>
      </div>
    </line-item>

    <el-dialog
      :title="$t('m.Agreement')"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false">
      <div class="agreement-wrapper">
        <h1>Research Use Agreement of the CRADI Dataset</h1>
        <p>
          By registering for downloads from the CRADI Dataset, you are agreeing to this Research Use Agreement.as well as to the Terms of Use of the Shanghai Jiao Tong University Department of Computer Science and Engineering website.
        </p>
        <p>
          1. Permission is granted to view and use the CRADI Dataset without charge for personal, non-commercial research purposes only. Any commercial use, sale, or other monetization is prohibited.
        </p>
        <p>
          2. You may make a verbatim copy of the CRADI Dataset for personal, non-commercial research use as permitted in this Research Use Agreement. If another user within your organization wishes to use the CRADI Dataset, they must register as an individual user and comply with all the terms of this Research Use Agreement.
        </p>
        <p>
          3. YOU MAY NOT DISTRIBUTE, PUBLISH, OR REPRODUCE A COPY of any portion or all of the CRADI Dataset to others without specific prior written permission from the Shanghai Jiaotong University.
        </p>
        <p>
          4. YOU MAY NOT SHARE THE DOWNLOAD LINK to the CRADI dataset to others. If another user within your organization wishes to use the CRADI Dataset, they must register as an individual user and comply with all the terms of this Research Use Agreement.
        </p>
        <p>
          5. You must not modify, reverse engineer, decompile, or create derivative works from the CRADI Dataset. You must not remove or alter any copyright or other proprietary notices in the CRADI Dataset.
        </p>
        <p>
          6. The CRADI Dataset has not been reviewed or approved by the administrative authority and is for non-clinical, Research Use Only. In no event shall data or images generated through the use of the CRADI Dataset be used or relied upon in the diagnosis or provision of patient care.
        </p>
        <p>
          7. THE CRADI DATASET IS PROVIDED "AS IS," AND JIAOTONG UNIVERSITY AND ITS COLLABORATORS DO NOT MAKE ANY WARRANTY, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE, NOR DO THEY ASSUME ANY LIABILITY OR RESPONSIBILITY FOR THE USE OF THIS CRADI DATASET.
        </p>
        <p>
          8. You will not make any attempt to re-identify any of the individual data subjects. Re-identification of individuals is strictly prohibited. Any re-identification of any individual data subject shall be immediately reported to the School of Medicine.
        </p>
        <p>
          9. Any violation of this Research Use Agreement or other impermissible use shall be grounds for immediate termination of use of this CRADI Dataset. In the event that the university determines that the recipient has violated this Research Use Agreement or other impermissible use has been made, the univeristy may direct that the undersigned data recipient immediately return all copies of the CRADI Dataset and retain no copies thereof even if you did not cause the violation or impermissible use.
        </p>
        <p>
          In consideration for your agreement to the terms and conditions contained here, Shanghai Jiaotong University grants you permission to view and use the CRADI Dataset for personal, non-commercial research. You may not otherwise copy, reproduce, retransmit, distribute, publish, commercially exploit or otherwise transfer any material.
        </p>
        <h1>Limitation of Use</h1>
        <p>
          You may use CRADI Dataset for legal purposes only.
        </p>
        <p>
          You agree to indemnify and hold Shanghai Jiaotong University harmless from any claims, losses or damages, including legal fees, arising out of or resulting from your use of the CRADI Dataset or your violation or role in violation of these Terms. You agree to fully cooperate in Shanghai Jiaotong University’s defense against any such claims.
        </p>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible=false">{{$t('m.Cancel')}}</el-button>
        <el-button type="primary" @click="doDownload">{{$t('m.Confirm')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import api from '../../api'
  import {saveAs} from 'file-saver'
  import filesize from 'filesize'
  import LineItem from "../LineItem"
  import {mapGetters} from 'vuex'

  export default {
    name: 'ListingItem',
    components: {
      LineItem
    },
    data: function() {
      return {
        dialogVisible: false,
        visibility: 'visibility: hidden',
        isEditing: false,
        newName: '',
        oldName: '',
        show: false,
        privacyActive: false,
        shareActive: false,
        downloadActive: false,
        renameActive: false,
        deleteActive: false,
        saving: false,
        currentShare: false
      }
    },
    computed: {
        ...mapGetters(['user'])
    },
    mounted() {
      this.newName = this.name
      this.oldName = this.name
      this.currentShare = this.share
    },
    props: ['isDir', 'name', 'modified', 'size', 'path', 'ownerId', 'share', 'review'],
    watch: {
      'name'(val) {
        this.newName = val
        this.oldName = val
      },
      'share'(val) {
        this.currentShare = val
      },
      'currentShare'(newVal, oldVal) {
        if(newVal !== oldVal) {
          this.$emit('share', newVal)
        }
      },
      'show'(val) {
        if(val) {
          this.visibility = 'visibility: visible'
        }
        else {
          this.visibility = 'visibility: hidden'
        }
      }
    },
    methods: {
      handleSetShare(status) {
        let params = {
          name: this.oldName,
          path: this.path,
          share: status
        }
        api.files.setShare(params).then(res => {
          if(res.data.code === 0) {
            this.currentShare = status
            this.$success(this.$t('m.Set_Share_Success'))
          }
          else {
            this.$error(this.$t('m.Set_Share_Error'))
          }
        }).catch(() => {
          this.$error(this.$t('m.Set_Share_Error'))
        })
      },
      handleEnterPrivacy() {
        this.privacyActive = true
      },
      handleLeavePrivacy() {
        this.privacyActive = false
      },
      handlePrivacy() {
        this.handleSetShare(false)
      },
      handleEnterShare() {
        this.shareActive = true
      },
      handleLeaveShare() {
        this.shareActive = false
      },
      handleShare() {
        this.handleSetShare(true)
      },
      showSize() {
        return filesize(this.size)
      },
      // 吸收输入框的点击事件，阻止向父元素冒泡
      dummy() {

      },
      open() {
        // ex: /files/，末尾的/代表这是一个目录
        if(!this.isDir) {
          return
        }
        let path = this.$route.path
        if(path[path.length - 1] === '/') {
          this.$router.push({path: path + this.name + '/'})
        }
        else {
          this.$router.push({path: path + '/' + this.name + '/'})
        }
      },
      /*
      getPath(path) {
        let url = this.$route.path
        if(url.startsWith('files')) {
          url = path.substring(6)
        }
        if(url !== '/' && url[url.length - 1] === '/') {
          url = url.substring(0, url.length - 1)
        }
        return url
      },
      */
      handleSave() {
        this.isEditing = false
        this.saving = true

        let params = {
          oldName: this.oldName,
          newName: this.newName,
          path: this.path
        }
        if(this.oldName === this.newName) {
          this.saving = false
          return
        }
        api.files.renameFile(params).then(res => {
          this.saving = false
          if(res.data.code !== 0) {
            this.$error(this.$t('m.Rename_Error'))
          }
          else {
            this.oldName = this.newName
            this.$success(this.$t('m.Rename_Success'))
          }
        }).catch(() => {
          this.saving = false
          this.$error(this.$t('m.Rename_Error'))
        })
      },
      handleMouseEnter() {
        this.show = true
      },
      handleMouseLeave() {
        if(!this.isEditing) {
          this.show = false
        }
      },
      // 重命名
      handleRename() {
        this.isEditing = true
      },
      handleDownload() {
        this.dialogVisible = true
      },
      // 下载(仅限文件)
      doDownload() {
        let data = {
          name: this.oldName,
          path: this.path
        }
        api.files.download(data).then(res => {
          this.dialogVisible = false

          let link = document.createElement('a')
          let blob = new Blob([res.data], {type: 'octet/stream'})
          link.download = this.oldName
          link.href = URL.createObjectURL(blob)
          document.body.appendChild(link)
          link.click()

          // let blob = new Blob([res.data])
          // saveAs(blob, this.oldName)

        }).catch(() => {
          this.dialogVisible = false
          this.$error(this.$t('m.Download_Error'))
        })
      },
      // 删除
      handleDelete() {
        let params = {
          name: this.oldName,
          path: this.path
        }
        api.files.delete(params).then(res => {
          if(res.data.code === 0) {
            this.$success(this.$t('m.Delete_Success'))
            this.$emit('delete')
          }
          else {
            this.$error(this.$t('m.Delete_Error'))
          }
        }).catch(() => {
          this.$error(this.$t('m.Delete_Error'))
        })
      },
      handleEnterRename() {
        this.renameActive = true
      },
      handleLeaveRename() {
        this.renameActive = false
      },
      handleEnterDownload() {
        this.downloadActive = true
      },
      handleLeaveDownload() {
        this.downloadActive = false
      },
      handleEnterDelete() {
        this.deleteActive = true
      },
      handleLeaveDelete() {
        this.deleteActive = false
      }
    }
  }
</script>

<style scoped lang="less">
  .el-input--small {
    font-size: 14px !important;
    font-family: "Microsoft YaHei UI",serif;
  }
  .item {
    display: flex;
    height: 32px;
    border-bottom: 1px solid rgba(187, 187, 187, 0.5);
    padding-top: 10px;
    padding-bottom: 10px;

    .icon {
      flex: none;
      width: 50px;
      font-size: 16px;
      align-self: center;
    }
    .name {
      flex: 1 1;
      font-size: 14px;
      align-self: center;
    }
    .edit-wrapper {
      flex: 1 1;
      align-self: center;
      .edit-btn {
        align-self: center;
      }
      .edit-name {
        align-self: center;
      }

    }
    .review-status {
      flex: none;
      width: 100px;
    }

    .size {
      flex: none;
      width: 100px;
      font-size: 14px;
      align-self: center;
    }
    .hidden-items {
      flex: none;
      width: 200px;
      // flex: 1 1;
      font-size: 16px;
      align-self: center;
      margin-left: 10px;
      .privacy {
        color: blue;
        width: 25px;
      }
      .privacy-in {
        color: blue;
        font-size: 18px;
        width: 25px;
      }
      .share {
        color: blue;
        width: 25px;
      }
      .share-in {
        color: blue;
        font-size: 18px;
        width: 25px;
      }
      .download {
        color: blue;
        width: 25px;
      }
      .download-in {
        color: blue;
        font-size: 18px;
        width: 25px;
      }
      .private {
        color: blue;
        font-size: 18px;
        width: 25px;
      }
      .rename {
        color: blue;
        width: 25px;
      }
      .rename-in {
        color: blue;
        font-size: 18px;
        width: 25px;
      }
      .delete {
        color: red;
        width: 25px;
      }
      .delete-in {
        color: red;
        font-size: 18px;
        width: 25px;
      }
    }
    .modified {
      flex: none;
      width: 200px;
      font-size: 14px;
      align-self: center;
    }
  }
  .agreement-wrapper {
    margin-left: 30px;
    margin-right: 30px;
    margin-top: 30px;
    h1 {
      margin-bottom: 10px;
    }
    p {
      font-size: 15px;
      line-height: 1.8;
      margin-bottom: 10px;
    }
  }
  .line {

  }
  .line-in {
    background: #f0f8ff;
  }
</style>
