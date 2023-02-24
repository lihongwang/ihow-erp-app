<template>
  <view class="warp">
    <uni-card is-full :is-shadow="false">
      <text class="uni-h6">宫格组件主要使用场景如：商品推荐列表、热门内容等</text>
    </uni-card>
    <uni-section title="基础样式" type="line" padding>
      <uni-grid :column="4" :highlight="true" @change="change">
        <uni-grid-item v-for="(item, index) in 4" :key="index" :index="index">
          <view class="grid-item-box" style="background-color: #fff">
            <uni-icons type="image" :size="30" color="#777" />
            <text class="text">文本信息</text>
          </view>
        </uni-grid-item>
      </uni-grid>
    </uni-section>
    <uni-section title="自定义列数" type="line" padding>
      <uni-grid :column="4" :highlight="true" @change="change">
        <uni-grid-item v-for="(item, index) in 8" :key="index" :index="index">
          <view class="grid-item-box" style="background-color: #fff">
            <uni-icons type="image" :size="30" color="#777" />
            <text class="text">文本信息</text>
          </view>
        </uni-grid-item>
      </uni-grid>
    </uni-section>

    <uni-section title="滑动视图" type="line" padding>
      <!-- 因为swiper特性的关系，请指定swiper的高度 ，swiper的高度并不会被内容撑开-->
      <swiper class="swiper" :indicator-dots="true">
        <swiper-item>
          <uni-grid :column="3" :highlight="true" @change="change">
            <uni-grid-item v-for="(item, index) in list" :key="index" :index="index">
              <view class="grid-item-box">
                <uni-icons type="contact" size="30"></uni-icons>
                <text class="text">{{ item.text }}</text>
              </view>
            </uni-grid-item>
          </uni-grid>
        </swiper-item>
        <swiper-item>
          <uni-grid :column="3" :highlight="true" @change="change">
            <uni-grid-item v-for="(item, index) in list" :key="index" :index="index">
              <view class="grid-item-box">
                <uni-icons type="contact" size="30"></uni-icons>
                <text class="text">{{ item.text }}</text>
              </view>
            </uni-grid-item>
          </uni-grid>
        </swiper-item>
        <swiper-item>
          <uni-grid :column="3" :highlight="true" @change="change">
            <uni-grid-item v-for="(item, index) in list" :key="index" :index="index">
              <view class="grid-item-box">
                <uni-icons type="contact" size="30"></uni-icons>
                <text class="text">{{ item.text }}</text>
              </view>
            </uni-grid-item>
          </uni-grid>
        </swiper-item>
      </swiper>
    </uni-section>
    <uni-section title="动态加载" type="line" padding>
      <view class="grid-dynamic-box">
        <uni-grid :column="3" :highlight="true" @change="change">
          <uni-grid-item v-for="(item, index) in dynamicList" :key="index" :index="index">
            <view class="grid-item-box" :style="{ backgroundColor: item.color }">
              <uni-icons type="contact" size="30"></uni-icons>
              <text class="text">{{ item.text }}</text>
            </view>
          </uni-grid-item>
        </uni-grid>
      </view>
      <button type="primary" @click="add">点击添加一个宫格</button>
      <button v-if="dynamicList.length !== 0" type="primary" style="margin-top: 15px" @click="del">
        点击删除一个宫格
      </button>
    </uni-section>
    <uni-section title="无边框带角标（3列）" type="line" padding>
      <uni-grid :column="3" :show-border="false" :square="false" @change="change">
        <uni-grid-item v-for="(item, index) in list" :key="index" :index="index">
          <view class="grid-item-box">
            <uni-icons type="contact" size="30"></uni-icons>
            <text class="text">{{ item.text }}</text>
            <view v-if="item.badge" class="grid-dot">
              <uni-badge :text="item.badge" :type="item.type" />
            </view>
          </view>
        </uni-grid-item>
      </uni-grid>
    </uni-section>
    <uni-section title="矩形宫格（3列）" type="line" padding>
      <uni-grid :column="3" :square="false" :highlight="false" @change="change">
        <uni-grid-item v-for="(item, index) in list" :key="index" :index="index">
          <view class="grid-item-box">
            <uni-icons type="contact" size="30"></uni-icons>
            <text class="text">{{ item.text }}</text>
          </view>
        </uni-grid-item>
      </uni-grid>
    </uni-section>
    <uni-section title="边框颜色（4列 无文字）" type="line" padding>
      <uni-grid :column="4" border-color="#03a9f4" @change="change">
        <uni-grid-item :index="0">
          <view class="grid-item-box">
            <uni-icons type="contact" size="30"></uni-icons>
          </view>
        </uni-grid-item>
        <uni-grid-item :index="1">
          <view class="grid-item-box">
            <uni-icons type="contact" size="30"></uni-icons>
          </view>
        </uni-grid-item>
        <uni-grid-item :index="2">
          <view class="grid-item-box">
            <uni-icons type="contact" size="30"></uni-icons>
          </view>
        </uni-grid-item>
        <uni-grid-item :index="3">
          <view class="grid-item-box">
            <uni-icons type="contact" size="30"></uni-icons>
          </view>
        </uni-grid-item>
      </uni-grid>
    </uni-section>
  </view>
  <view class="container">
    <uni-card :is-shadow="false" is-full>
      <text class="uni-h6"
        >uni-forms 组件一般由输入框、选择器、单选框、多选框等控件组成，用以收集、校验、提交数据。</text
      >
    </uni-card>
    <uni-section title="基本用法" type="line">
      <view class="example">
        <!-- 基础用法，不包含校验规则 -->
        <uni-forms ref="baseForm" :model-value="baseFormData">
          <uni-forms-item label="姓名" required>
            <uni-easyinput v-model="baseFormData.name" placeholder="请输入姓名" />
          </uni-forms-item>
          <uni-forms-item label="年龄" required>
            <uni-easyinput v-model="baseFormData.age" placeholder="请输入年龄" />
          </uni-forms-item>
          <uni-forms-item label="性别" required>
            <uni-data-checkbox v-model="baseFormData.sex" :localdata="sexs" />
          </uni-forms-item>
          <uni-forms-item label="兴趣爱好" required>
            <uni-data-checkbox v-model="baseFormData.hobby" multiple :localdata="hobbys" />
          </uni-forms-item>
          <uni-forms-item label="自我介绍">
            <uni-easyinput v-model="baseFormData.introduction" type="textarea" placeholder="请输入自我介绍" />
          </uni-forms-item>
          <uni-forms-item label="日期时间">
            <uni-datetime-picker v-model="baseFormData.datetimesingle" type="datetime" return-type="timestamp" />
          </uni-forms-item>
        </uni-forms>
      </view>
    </uni-section>

    <uni-section title="对齐方式" type="line">
      <view class="example">
        <view class="segmented-control">
          <uni-segmented-control :current="current" :values="items" style-type="button" @clickItem="onClickItem">
          </uni-segmented-control>
        </view>
        <!-- 展示不同的排列方式 -->
        <uni-forms ref="baseForm" :model-value="alignmentFormData" :label-position="alignment">
          <uni-forms-item label="姓名" required>
            <uni-easyinput v-model="baseFormData.name" placeholder="请输入姓名" />
          </uni-forms-item>
          <uni-forms-item label="年龄" required>
            <uni-easyinput v-model="baseFormData.age" placeholder="请输入年龄" />
          </uni-forms-item>
        </uni-forms>
      </view>
    </uni-section>

    <uni-section title="表单校验" type="line">
      <view class="example">
        <!-- 基础表单校验 -->
        <uni-forms ref="valiForm" :rules="rules" :model-value="valiFormData">
          <uni-forms-item label="姓名" required name="name">
            <uni-easyinput v-model="valiFormData.name" placeholder="请输入姓名" />
          </uni-forms-item>
          <uni-forms-item label="年龄" required name="age">
            <uni-easyinput v-model="valiFormData.age" placeholder="请输入年龄" />
          </uni-forms-item>
          <uni-forms-item label="自我介绍" name="introduction">
            <uni-easyinput v-model="valiFormData.introduction" type="textarea" placeholder="请输入自我介绍" />
          </uni-forms-item>
        </uni-forms>
        <button type="primary" @click="submit('valiForm')">提交</button>
      </view>
    </uni-section>

    <uni-section title="自定义校验规则" type="line">
      <view class="example">
        <!-- 自定义表单校验 -->
        <uni-forms ref="customForm" :rules="customRules" :model-value="customFormData">
          <uni-forms-item label="姓名" required name="name">
            <uni-easyinput v-model="customFormData.name" placeholder="请输入姓名" />
          </uni-forms-item>
          <uni-forms-item label="年龄" required name="age">
            <uni-easyinput v-model="customFormData.age" placeholder="请输入年龄" />
          </uni-forms-item>
          <uni-forms-item label="兴趣爱好" required name="hobby">
            <uni-data-checkbox v-model="customFormData.hobby" multiple :localdata="hobbys" />
          </uni-forms-item>
        </uni-forms>
        <button type="primary" @click="submit('customForm')">提交</button>
      </view>
    </uni-section>

    <uni-section title="动态表单" type="line">
      <view class="example">
        <!-- 动态表单校验 -->
        <uni-forms ref="dynamicForm" :rules="dynamicRules" :model-value="dynamicFormData">
          <uni-forms-item label="邮箱" required name="email">
            <uni-easyinput v-model="dynamicFormData.email" placeholder="请输入姓名" />
          </uni-forms-item>
          <uni-forms-item
            v-for="(item, index) in dynamicLists"
            :key="item.id"
            :label="item.label + ' ' + index"
            required
            :rules="item.rules"
            :name="'domains[' + item.id + ']'"
          >
            <view class="form-item">
              <uni-easyinput v-model="dynamicFormData.domains[item.id]" placeholder="请输入域名" />
              <button class="button" size="mini" type="default" @click="del(item.id)">删除</button>
            </view>
          </uni-forms-item>
        </uni-forms>
        <view class="button-group">
          <button type="primary" size="mini" @click="add">新增域名</button>
          <button type="primary" size="mini" @click="submit('dynamicForm')">提交</button>
        </view>
      </view>
    </uni-section>
  </view>
</template>
<script>
export default {
  data() {
    return {
      dynamicList: [],
      list: [
        {
          url: '/static/c1.png',
          text: 'Grid 1',
          badge: '0',
          type: 'primary',
        },
        {
          url: '/static/c2.png',
          text: 'Grid 2',
          badge: '1',
          type: 'success',
        },
        {
          url: '/static/c3.png',
          text: 'Grid 3',
          badge: '99',
          type: 'warning',
        },
        {
          url: '/static/c4.png',
          text: 'Grid 4',
          badge: '2',
          type: 'error',
        },
        {
          url: '/static/c5.png',
          text: 'Grid 5',
        },
        {
          url: '/static/c6.png',
          text: 'Grid 6',
        },
        {
          url: '/static/c7.png',
          text: 'Grid 7',
        },
        {
          url: '/static/c8.png',
          text: 'Grid 8',
        },
        {
          url: '/static/c9.png',
          text: 'Grid 9',
        },
      ],
      // 基础表单数据
      baseFormData: {
        name: '',
        age: '',
        introduction: '',
        sex: 2,
        hobby: [5],
        datetimesingle: 1627529992399,
      },
      // 表单数据
      alignmentFormData: {
        name: '',
        age: '',
      },
      // 单选数据源
      sexs: [
        {
          text: '男',
          value: 0,
        },
        {
          text: '女',
          value: 1,
        },
        {
          text: '保密',
          value: 2,
        },
      ],
      // 多选数据源
      hobbys: [
        {
          text: '跑步',
          value: 0,
        },
        {
          text: '游泳',
          value: 1,
        },
        {
          text: '绘画',
          value: 2,
        },
        {
          text: '足球',
          value: 3,
        },
        {
          text: '篮球',
          value: 4,
        },
        {
          text: '其他',
          value: 5,
        },
      ],
      // 分段器数据
      current: 0,
      items: ['左对齐', '顶部对齐'],
      // 校验表单数据
      valiFormData: {
        name: '',
        age: '',
        introduction: '',
      },
      // 校验规则
      rules: {
        name: {
          rules: [
            {
              required: true,
              errorMessage: '姓名不能为空',
            },
          ],
        },
        age: {
          rules: [
            {
              required: true,
              errorMessage: '年龄不能为空',
            },
            {
              format: 'number',
              errorMessage: '年龄只能输入数字',
            },
          ],
        },
      },
      // 自定义表单数据
      customFormData: {
        name: '',
        age: '',
        hobby: [],
      },
      // 自定义表单校验规则
      customRules: {
        name: {
          rules: [
            {
              required: true,
              errorMessage: '姓名不能为空',
            },
          ],
        },
        age: {
          rules: [
            {
              required: true,
              errorMessage: '年龄不能为空',
            },
          ],
        },
        hobby: {
          rules: [
            {
              format: 'array',
            },
            {
              validateFunction: function (rule, value, data, callback) {
                if (value.length < 2) {
                  callback('请至少勾选两个兴趣爱好')
                }
                return true
              },
            },
          ],
        },
      },
      dynamicFormData: {
        email: '',
        domains: {},
      },
      dynamicLists: [],
      dynamicRules: {
        email: {
          rules: [
            {
              required: true,
              errorMessage: '域名不能为空',
            },
            {
              format: 'email',
              errorMessage: '域名格式错误',
            },
          ],
        },
      },
    }
  },
  computed: {
    // 处理表单排列切换
    alignment() {
      if (this.current === 0) return 'left'
      if (this.current === 1) return 'top'
      return 'left'
    },
  },
  onLoad() {},
  onReady() {
    // 设置自定义表单校验规则，必须在节点渲染完毕后执行
    this.$refs.customForm.setRules(this.customRules)
  },
  methods: {
    change(e) {
      let { index } = e.detail
      this.list[index].badge && this.list[index].badge++

      uni.showToast({
        title: `点击第${index + 1}个宫格`,
        icon: 'none',
      })
    },
    add() {
      if (this.dynamicList.length < 9) {
        this.dynamicList.push({
          url: `/static/c${this.dynamicList.length + 1}.png`,
          text: `Grid ${this.dynamicList.length + 1}`,
          color: this.dynamicList.length % 2 === 0 ? '#f5f5f5' : '#fff',
        })
      } else {
        uni.showToast({
          title: '最多添加9个',
          icon: 'none',
        })
      }
    },
    del() {
      this.dynamicList.splice(this.dynamicList.length - 1, 1)
    },
    onClickItem(e) {
      console.log(e)
      this.current = e.currentIndex
    },

    submit(ref) {
      this.$refs[ref]
        .validate()
        .then((res) => {
          console.log('success', res)
          uni.showToast({
            title: `校验通过`,
          })
        })
        .catch((err) => {
          console.log('err', err)
        })
    },
  },
}
</script>
<style lang="scss">
.example {
  padding: 15px;
  background-color: #fff;
}

.segmented-control {
  margin-bottom: 15px;
}

.button-group {
  margin-top: 15px;
  display: flex;
  justify-content: space-around;
}

.form-item {
  display: flex;
  align-items: center;
}

.button {
  display: flex;
  align-items: center;
  height: 35px;
  margin-left: 10px;
}
.image {
  width: 25px;
  height: 25px;
}

.text {
  font-size: 14px;
  margin-top: 5px;
}

.example-body {
  /* #ifndef APP-NVUE */
  // display: block;
  /* #endif */
}

.grid-dynamic-box {
  margin-bottom: 15px;
}

.grid-item-box {
  flex: 1;
  // position: relative;
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px 0;
}

.grid-item-box-row {
  flex: 1;
  // position: relative;
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 15px 0;
}

.grid-dot {
  position: absolute;
  top: 5px;
  right: 15px;
}

.swiper {
  height: 420px;
}

/* #ifdef H5 */
@media screen and (min-width: 768px) and (max-width: 1425px) {
  .swiper {
    height: 630px;
  }
}

@media screen and (min-width: 1425px) {
  .swiper {
    height: 830px;
  }
}
/* #endif */
</style>
