<template>
  <div class="box">
    <review-record :recordTitle="recordTitle" :recordArr="recordArr" ></review-record>
    <i class="el-icon-close" @click="dispear"></i>
    <div class="show" v-html="b2b2"></div>
      <!-- 确认退回按钮 -->
      <div class="button">
        <button @click="queding">确认</button>
        <button @click="showReason" v-show="flag == '0' ">退回</button>
      </div>

       <!-- 隐藏部分 -->
      <transition name="el-fade-in-linear">
      <div v-show="hide">
      <div class="back">
        <p>*请说明退回协议书的理由，业务员将根据您的理由修改后再次发送:</p>
        <textarea
          name="reason"
          cols="30"
          rows="10"
          v-model="reason"
        ></textarea>
      </div>
      <button @click="tuihui">提交</button>
    </div>
      </transition>
      <div ref="tuihuiBtn"></div>
  </div>
</template>

<script>
import reviewRecord from "@/Components/review-record";
var ps = {//身份和审核后变成的状态
  "MANAGER":"DEP_MARKET_CHECK",
  "MARKETCHECKER":"CSA_CHECK",
  "VSMAPPROVEXII":"APPROVED"
}
var pt = {//身份和中文翻译
  "MANAGER":"中心总经理",
  "MARKETCHECKER":"市场部",
  "VSMAPPROVEXII":"销售总监"
}
var pn = {//身份和signed变化
  "MANAGER":0,
  "MARKETCHECKER":0,
  "VSMAPPROVEXII":1
}
export default {
  name: "ser-protocol",
  components:{reviewRecord},
  data() {
    return {
      hide:false,
      b2b2:'',
      reason:"",
      position: this.$store.state.user.pos[0].position,
      recordTitle:"",//传给评审记录的数据
      recordArr:[],//传给评审记录的数据
      
    };
  },
  props:{
    cid: String, //父组件传递的当前选中客户cid
    flag:Number //判断是否出现退回按钮 
  },
  computed:{
        nowMonth(){
              let month = '0'+ (new Date().getMonth()+1);
              return month.substr(month.length-2) ;
        },
        nowDate(){
            let date = '0'+ (new Date().getDate());
            return date.substr(date.length-2) ;
        },
        nowHour(){
            let hour = '0'+ (new Date().getHours());
            return hour.substr(hour.length-2) ;
        },
        nowMinute(){
            let minute = '0'+ (new Date().getMinutes());
            return minute.substr(minute.length-2) ;
        },
        wfmemo(){  //记录条
          let nowTime = new Date().getFullYear() + "-" + this.nowMonth + "-" + this.nowDate + " " + this.nowHour + ":" + this.nowMinute + " " ;
          let wfmemo = nowTime + ' '+'被'+ pt[this.position]+ this.$store.state.user.data.realName;
          return wfmemo;
       
       
      },
  },
  methods:{
    showReason(){
      this.hide = true;
      // this.$refs.tuihuiBtn.scrollIntoView();
    },
    dispear() { //红叉关闭
         this.$emit('close',false)
    },
    queding(){
      let market = ''
      let csa = ''
      if(this.position == 'MARKETCHECKER'){ market = this.$store.state.user.data.realName}
      if(this.position == 'VSMAPPROVEXII'){ csa = this.$store.state.user.data.realName}
      if(this.flag == '0'){
        this.$axios.post('/yulan/infoState/checkYLcontractentryState.do',{
              "cid":this.cid,
              "state": ps[this.position],
              "wfmemo":this.wfmemo+' 审核批准协议文本;',
              "signed":pn[this.position],
              "market":market,
              "csa":csa
        })
        .then((res) => {
          if(res.data != null&&res.data.code == 0){
            if(res.data.code == 0){
              this.$alert('同意该协议书');
              location.reload();
              this.dispear();
              // console.log('执行小刷新');
              // this.$emit('updatePage');
              //  setTimeout(() =>{  
              //  this.$emit('updatePage');
              //  console.log('延迟执行了吗');
              // }, 4000);
            }
          }
        })
        .catch(function(err){
          console.log(err)
        });
      }else{
           this.dispear();
      }
     
    },
    tuihui(){
      if(this.reason == ''){
               this.$alert('退回理由不能为空');
               return false;
      }
      this.$axios.post('/yulan/infoState/checkYLcontractentryState.do',{
            "cid":this.cid,
            "state":"SALEMANMODIFYING",
            "wfmemo":this.wfmemo + '退回协议书，原因是 ['+ this.reason + '];',
            "signed":2,
            "market":"",
            "csa":""
      })
      .then((res) => {
        if(res.data != null&&res.data.code == 0){
          if(res.data.code == 0){
            this.$alert('退回协议书成功');
             location.reload();
             this.dispear();
            //  console.log('执行小刷新');
            //  this.$emit('updatePage');
            //  setTimeout(() =>{  
            //    this.$emit('updatePage');
            //    console.log('延迟执行了吗');
            //   }, 2000);
            
          }
        }
      })
      .catch(function(err){
        console.log(err)
      });
    }
  },
  watch:{
    cid(newvalue,oldvalue){
     console.log("当前选中客户"+this.cid);
     this.$axios.post('/yulan/YLcontractentry/getYLcontractHTML.do	',{
         "cid":newvalue,
   }).then((res) => {
     if(res.data != null&&res.data.code == 0){
       this.b2b2 = res.data.data;
     }
   }).catch(function(err){
     console.log(err)
   });
   this.$axios.post('/yulan/infoState/getYLcontractentryState.do',{
      "cid":newvalue,
      "cyear":this.$store.state.year
    }).then((res)=>{
      console.log("拿评审记录数据成功");
        this.recordTitle = res.data.yLcontractInfo;
        this.recordArr = res.data.yLcontractentryMemo.reverse();
    }).catch((err)=>{
      console.log("拿评审记录数据错误" + err);
    })
    },
   hide: function () {
       this.$nextTick(() => {
            this.$refs.tuihuiBtn.scrollIntoView(false);
       })
    } 
    
   
  },
}
</script>

<style scoped>
.box {
  background-color: white;
  padding: 40px 50px;
  position: relative;
  border: 1px solid #86cb7e;
}
.show {
  height: 650px;
  overflow-y: scroll;
  overflow-x: hidden;
}
button {
  outline: none;
  cursor: pointer;
  border-radius: 10px;
  width: 100px;
  height: 34px;
  font-size: 14px;
  border: 0;
  color: #ffffff;
  background: linear-gradient(to right, #a1d455, #86cb7e);
}
.button {
  margin: 0 auto;
  width: 300px;
  text-align: center;
}
.button button {
  margin: 20px;
}
.back textarea {
  width: 600px;
  margin: 10px 0;
}
.back p {
  font-size: 16px;
}
.el-icon-close {
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  color: red;
  font-size: 25px;
}
</style>

<style>
.box .el-popup-parent--hidden{
  overflow-x: hidden !important;
  overflow-y: scroll !important;
}
.box .el-button--primary{
    border-color:rgb(160, 212, 86) !important;
    background-color:rgb(160, 212, 86) !important;
}
.box .el-button:hover{
  border-color:rgb(160, 212, 86) !important;
  background-color: white !important;
  color:rgb(160, 212, 86) !important;
}
.box .el-button--primary:hover{
    border-color:rgb(160, 212, 86) !important;
    background-color:rgb(160, 212, 86) !important;
    color:white !important;
}
</style>

