<template>
  <div class="wrapper">
    <div v-if="!enActive" class="cn">
      <h2>背景</h2>
      <p>
        为了更好地研究大规模影像数据集对深度学习模型的训练和推理的影响，以及不同来源数据的影响，我们在此公布一组来自于某家上海三甲医院和社区医院的多中心数据集，数据量、患者数量、多中心、正位胸片、异常结果来自于影像报告的提取.
      </p>
      <el-table
        :data="dataSourceCN"
        border
        style="width:541px">
        <el-table-column
          prop="source"
          label="数据来源"
          width="180px">
        </el-table-column>
        <el-table-column
          prop="num"
          label="图像数量"
          width="180px">
        </el-table-column>
        <el-table-column
          prop="index"
          label="Data_source"
          width="180px">
        </el-table-column>
      </el-table>
      <h2>预处理方法</h2>
      <p>
        图像：从DICOM文件转换为PNG文件， resize, 灰阶从12bit改为8bit.包括患者姓名、住址和影像号、检验检查号等能反应患者唯一标识相关信息都被删除。
      </p>
      <p>
        分类标签：基于胸片的读片报告，影像异常表现采用基于规则和医生评估的方法进行提取，共提取出22个常见异常表现，相关的层级分类。
      </p>
      <h2>数据</h2>
      <p>
        所有的图像都压缩在一个压缩文件夹下，分类标签都保存在一个csv文件下。
      </p>
      <h2>分类结果表</h2>
      <p>
        表中’file_id’代表图像的文件名,"data_source"代表数据来源，含义如表中所示。数据格式如: |file_id|data_source|label1|label2|.......|label25|
      </p>
      <p>
        1)	目前的多源数据中，包括的异常表现，在分类标签重按顺序排列: 气胸，2) 肺气肿，3) 肺内钙化，4) PICC， 5) 动脉弓迂曲，6) 动脉弓钙化，7) 动脉异常，8) 小片影，9) 心影增大，10) 斑片影，11) 肺内阴影，12) 空洞，13) 肺内占位，14) 肺纹理增多，15) 水肿，16) 肺结节，17) 肺门异常，18) 胸腔积液，19) 胸膜增厚，20) 胸膜粘连，21) 胸膜钙化，22) 胸膜异常，23) 脊柱侧弯，24) 起搏器植入后，25) 间质改变。
      </p>
    </div>
    <div v-else class="en">
      <h2>Background</h2>
      <p>
        Chest radiography is extensively used to screen and diagnose pulmonary and cardiac diseases. The advantages of its clinical practicality, efficiency, and cost-effectiveness make chest radiography the most accessible imaging test for pulmonary disorders, especially in primary hospitals. Currently, the interpretation of a chest radiograph mainly relies on radiologists.
      </p>
      <p>
        With the development of algorithms, convolutional neural networks (CNNs) have shown the ability to detect a single disorder in chest radiography, e.g., pneumothorax, lung cancer, pneumonia, and tuberculosis. Traditionally, expert annotation is applied to establish a CNN model for classifying medical images. This manual labeling procedure is time-consuming and highly demanding. Importantly, beyond the detection of a single disease, multi-label classification is necessary to interpret a chest radiograph in clinical practice.
      </p>
      <p>
        In order to promote the development of the artificial intelligence-assisted diagnosis of chest radiography, we launched the Chest Radiograph at Diverse Institutes (CRADI) dataset. This dataset is comprised of a large number of chest radiographs. Each radiograph has a 25-label disorder annotation, that was established by the terms adopted from the Fleischner’s glossary, and extracted from the original diagnostic report by natural language processing (NLP) and radiologist expertise.
      </p>
      <p>
        At present, the data of the CRADI dataset comes from one academic hospitals and multiple community clinics in Shanghai. The cases in the CRADI dataset are comprised of in-patients, out-patients, and screening participants.
      </p>
      <p>
        The CRADI dataset provides a better understanding of the multiple and different clinical data sources for chest radiography, which is potentially helpful for the training and test of CNN models.
      </p>
      <p>
        We welcome more data into the CRADI dataset. If you find it helpful to your research work or you want to contribute to this dataset, please feel free to contact us.
      </p>
      <el-table
        :data="dataSourceEN"
        border
        style="width:751px">
        <el-table-column
          prop="source"
          label="Data source"
          width="390px">
        </el-table-column>
        <el-table-column
          prop="num"
          label="Number of images"
          width="180px">
        </el-table-column>
        <el-table-column
          prop="index"
          label="Data_source"
          width="180px">
        </el-table-column>
      </el-table>
      <p>
        Note. Each case includes one posterior-anterior (PA) view chest radiograph and the corresponding text label of disorder findings.
      </p>
      <h2>Preprocessing methods</h2>
      <p>
        Images: transformed and resized from DCM format to PNG, changed from 12-bit grayscale to 8-bit. All patient- or institute-related information is de-identified.
      </p>
      <p>
        Label: labels are extracted from the original diagnostic reports. The regular expression is applied by NLP and rules-based extraction methods. In total, 25 labels are extracted for each image.
      </p>
      <h2>Data</h2>
      <p>
        All images are compressed into one file. All classification labels are listed in one CSV file. Data order is as following way:
      </p>
      <h2>Classification result</h2>
      <p>
        Each image links to the label by an item of ‘file_id’.
      </p>
      <p>
        data_source stands for the resource of data. Data sources are listed in the previous table.
        Result table format: |file_id|data_source|label1|label2|.......|label25|
      </p>
      <p>
        The order of the 25 labels is as the following:<br>
        1) pneumothorax, 2) emphysema, 3) pulmonary parenchymal calcification, 4) PICC implant, 5) aortic unfolding, 6) aortic arteriosclerosis, 7) aortic abnormalities, 8) small consolidation, 9) cardiomegaly, 10) patchy consolidation, 11) consolidation, 12) cavity, 13) mass, 14) prominent bronchovascular marking, 15) pulmonary edema, 16) pulmonary nodule, 17) hilar adenopathy, 18) pleural effusion, 19) pleural thickening, 20) pleural adhesion, 21) pleural calcification, 22) pleural abnormalities, 23) scoliosis, 24) pacemaker implant, 25) interstitial involvement.
      </p>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'Introduction',
    data() {
      return {
        dataSourceCN: [
          {
            source: '某三甲医院的体检患者',
            num: '2136',
            index: '1'
          },
          {
            source: '某三甲医院',
            num: '6005',
            index: '2'
          },

          {
            source: '4家社区医院数据',
            num: '1774',
            index: '3'
          }
        ],
        dataSourceEN: [
          {
            source: 'Screening participants from An Academic hospital',
            num: '2136',
            index: '1'
          },
          {
            source: 'In-and-out patient from An Academic hospital',
            num: '6005',
            index: '2'
          },
          {
            source: 'Community clinics',
            num: '1774',
            index: '3'
          }
        ]
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
    .el-table {
      margin-bottom: 10px;
    }
    h2 {
      margin-bottom: 10px;
    }
    h3 {
      margin-bottom: 10px;
    }
    p {
      font-size: 15px;
      line-height: 1.8;
      margin-bottom: 10px;
    }
  }
</style>
