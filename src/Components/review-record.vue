<template>
  <div class="record-wrapper" ref="records">
    <div class="record-tag" @click="toggleRecord">
      <div class="record-tag1"></div>
      <div class="record-tag2">评审记录</div>
    </div>
    <div class="record-content">
      <div class="record-state title">
        当前状态：
        <span>{{recordTitle}}</span>
      </div>
      <hr />
      <div class="record-state">评审记录:</div>
      <div class="records-wrapper">
        <div class="record" v-for="(data,index) in recordArr" :key="index">
          <p v-html="data">{{data}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "review-record",
  props: ["recordTitle", "recordArr"],
  data() {
    return {
      toggle: true
    };
  },
  methods: {
    toggleRecord() {
      this.toggle = !this.toggle;
      if (this.toggle) this.$refs.records.style.right = "0px";
      else this.$refs.records.style.right = "-220px";
    }
  }
};
</script>

<style scoped>
.record-wrapper {
  z-index: 1;
  font-size: 16px;
  position: fixed;
  top: 170px;
  right: 0px;
  font-size: 16px;
  transition: all 0.4s;
}
.record-tag {
  display: inline-block;
  vertical-align: top;
  cursor: pointer;
  position: absolute;
  left: -168px;
  top: 20px;
}
/*左边的三角形*/
.record-tag1 {
  border-right: 30px solid rgb(156, 210, 93);
  border-top: 18px solid transparent;
  border-left: 30px solid transparent;
  border-bottom: 18px solid transparent;
  display: inline-block;
  vertical-align: text-top;
}
/*右边的绿底的评审记录*/
.record-tag2 {
  width: 100px;
  height: 36px;
  background-color: rgb(156, 210, 93);
  color: white;
  line-height: 36px;
  display: inline-block;
  vertical-align: text-top;
  padding-left: 15px;
}
/*评审记录的最外包*/
.record-content {
  position: relative;
  display: inline-block;
  width: 200px;
  overflow: hidden;
  box-shadow: 0 0 4px black;
  background-color: white;
}
/*记录溢出滚动相对应的外包块*/
.records-wrapper {
  height: 157px;
  overflow-y: scroll;
  overflow-x: hidden;
  padding: 0 0 0 16px;
  margin-bottom: 16px;
}
/*表示当前状态的*/
.record-state {
  font-size: 16px;
  line-height: 36px;
  padding-left: 6px;
}
.record-state span {
  color: #ff0000;
}
.record-state.title {
  font-size: 17.8px;
  /* font-weight: bold; */
}
.record {
  margin: 12px 0;
}
.record > p {
  line-height: 18px;
}
</style>

