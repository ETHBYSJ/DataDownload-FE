<template>
    <div class="wrapper">
        <div class = "chinese" v-if="!enActive">
        <p>
            为了进一步推动研究大规模影像数据集对深度学习模型的训练和推理的影响，我们使用深度卷积神经网络训练了多标签分类模型，并使用了grad-cam方法做出类别的关注区域热力图。
        </p>
        <p>具体的项目细节请参照我们的github，以下是项目的链接</p>
        <div class="git-hub-link">
            <a  href="https://github.com/WAIRlab/CRADI_x-ray_classification">https://github.com/WAIRlab/CRADI_x-ray_classification</a>
        </div>
        <br>
        <p>
            同时，我们也将训练好的模型公布如下：
        </p>
        <div class="model-link">
            <a> downloadlink</a>
        </div>
        </div>
        <div class="english" v-else>
        <p>
             In order to further promote the research on the influence of large-scale image data sets on the training and reasoning of deep learning model, we train the multi-label classification model based on the CNN and make the thermal map of the concerned area of the category through the grad cam method.
        </p>
        <p>
             You can find the details about this project in our github, here is the link:
        </p>
        <div class="git-hub-link">
            <a  href="https://github.com/WAIRlab/CRADI_x-ray_classification">https://github.com/WAIRlab/CRADI_x-ray_classification</a>
        </div>
        <br>
        <p>
            At the same time, we pulish the trained model as follows: 
        </p>
        <div class="model-link">
            <a> downloadlink</a>
        </div>
        </div>
        <br>
        <br>
        <br>
    </div>
</template>

<script>

export default {
    name: "Model",
    data() {
        return {
            modellink: ""
        }
    },
    computed: {
      enActive(){
        let lang = this.$i18n.locale;
        return lang === "en-US" ? true : false;
      }
    }
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
    .git-hub-link {
        text-align: center;
    }
    .model-link {
        text-align: center;
    }
  }
</style>