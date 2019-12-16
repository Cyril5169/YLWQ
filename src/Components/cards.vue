<template>
  <div class="wrapper-cards">
    <!-- 流动栏 -->
    <div class="step">
      <cli-step :active = 'this.nowIndex' ref="step" @flag='handleFlag'></cli-step>
    </div>
   
   <!-- 评审记录 -->
   <review-record :recordTitle="recordTitle" :recordArr="recordArr"></review-record>
    <!-- 灰色提示字 -->
    <div class="gray-word">*灰色内容只供客户核对，不允许修改。如要修改，请联系主管业务经理。</div>

    <!-- 资料卡展示 -->
    <div class="card">
      <card1 v-show="shows[0]" :cardobj="cardobj" :only='only' @bridgenext="next" @mergeMessage="mergeMessage" ></card1>
      <card2 v-show="shows[1]" :cardobj="cardobj" :only='only' @bridgenext="next" @bridgepre="back" @mergeMessage="mergeMessage"></card2>
      <card3 v-show="shows[2]" :cardobj="cardobj" :only='only' @bridgenext="next" @bridgepre="back" @mergeMessage="mergeMessage"></card3>
      <card4 v-show="shows[3]" :cardobj="cardobj" :only='only' :recordTitle="recordTitle" @bridgepre="back" @mergeMessage="mergeMessage" @submitall="save" @postall="submit"></card4>
    </div>

    <!-- 按钮 -->
    <!-- <div class="button" v-show="this.nowIndex != 3">
      <button  @click="back" v-show="isFirst">上一步</button>
      <button  @click='next' ref="button2">下一步</button>
    </div> -->
 
    <!-- <div class="button" v-show="this.nowIndex == 3">
      <button @click="back"  >上一步</button>
      <button @click='save' >保存</button>
      <button @click="submit"  >保存并提交</button>
    </div> -->
  </div>
</template>


<script>
import cliStep from "@/Components/cli-step";
import card1 from "@/Components/cli-filecard1";
import card2 from "@/Components/cli-filecard2";
import card3 from "@/Components/cli-filecard3";
import card4 from "@/Components/cli-filecard4";
import reviewRecord from "@/Components/review-record";
export default {
  name: "cards",
  components: {cliStep,card1,card2,card3,card4,reviewRecord},
    data() {
    return {
      shows: [true, false, false, false],
      cardobj:{},
      flag:true, //锁住切换
      postobj:{},
      recordTitle:"",//传给评审记录的数据
      recordArr:[],//传给评审记录的数据
      only:false
    };
  },
   computed: {
      nowIndex: function(){
          return this.shows.indexOf(true);
      },
      isFirst(){
          return !this.nowIndex == 0;
      }
  }, 
  methods: {
    back() {
          if(this.nowIndex != 0){
          let i = this.nowIndex;
          this.$set(this.shows, i, false);
          this.$set(this.shows, i - 1, true);
        }else{
          this.$router.push({path:'/client/tip'})
        }
        this.$refs.step.$emit('bridge')
    },
    next() {
       if(this.flag == true){
            if(this.nowIndex != 3){
              let i = this.nowIndex;
              this.$set(this.shows, i, false);
              this.$set(this.shows, i + 1, true);
            }
          this.$refs.step.$emit('bridge2')
       }
       this.flag = false;
    },
    save() {
        // this.$alert('提交信息成功');
        //此处调用AXIOS方法将资料卡数据都发送到数据库，但没有改状态
        this.$axios.post('/yulan/customerInfo/updateCustomerInfo.do',this.postobj)
        .then((res)=>{
          console.log(res.data);
          if(res.data.code == 0){
            this.$alert('保存信息成功');
          }else{
            this.$alert('保存失败');
          }
        })
        .catch(err=>{
          console.log("保存信息错误",err);
        })
    },
    submit(){
        //提交的同时还要生成用户填写资料卡这一条评审记录，还有改变state的状态为BUSINESSCHECKING
        this.$axios.post('/yulan/customerInfo/updateCustomerInfo.do',this.postobj)
        .then((res)=>{
          console.log(res.data);
          if(res.data.code == 0){
            this.$axios.post('/yulan/infoState/bussinessCheckCustomerInfoCard.do',{
                cid:this.cardobj.cid,
                state:"BUSINESSCHECKING",
                memo:new Date().getFullYear() + "-" + ((new Date().getMonth() + 1)>=10?new Date().getMonth():'0'+(new Date().getMonth()+1)) + "-" + (new Date().getDate() >= 10? new Date().getDate(): ("0" + new Date().getDate())) + " " + (new Date().getHours() >= 10? new Date().getHours(): ("0" + new Date().getHours())) + ":" + (new Date().getMinutes() >= 10? new Date().getMinutes(): ("0" + new Date().getMinutes())) + " " + this.cardobj.cname + "提交;",
            })
            .then((res)=>{
                console.log(res.data);
                if(res.data.code == 0){
                    console.log('改变资料卡状态为业务员审核中');
                    this.$alert("保存并提交成功！");
                    location.reload();
                }else{
                    console.log('操作失败');
                    this.$alert("保存成功但提交失败！");
                }
            })
            .catch(err=>{
                console.log("操作失败",err);
            })
          }else{
            this.$alert('保存失败');
          }
        })
        .catch(err=>{
          console.log("保存信息错误",err);
        })
    },
    handleFlag(data){ //接受step组件传来的flag值
        this.flag = data;
    },
    //合并所有信息为一个对象的方法
    mergeMessage(obj){
      Object.assign(this.postobj,obj);
      console.log("要传的整个对象",this.postobj);
    }
  },
 mounted(){
   
   //发送请求拿业务员或者客户的cid后面来用
   this.$axios.post('/yulan/customerInfo/getCustomerInfo.do',{
        "CID":this.$store.state.user.data.loginName,
        // "CID":"C15056"
   })
   .then((res) => {
     if(res.data != null&&res.data.code == 0){
       this.cardobj = res.data.data;
       console.log("cards得到的整个对象",this.cardobj)
     }else{
       console.log("拿不到cards对象",res.data);
     }
   })
   .catch(function(err){
     console.log("cards拿对象报错",err)
   });
    // //发送请求拿评审的数据
    this.$axios.post('/yulan/infoState/getCustomerInfoCardState.do',{
      "cid":this.$store.state.user.data.loginName,
      "year":this.$store.state.year,
    }).then((res)=>{
      // console.log("拿评审记录数据成功",res.data.customerInfo,res.data.memo);
        this.recordTitle = res.data.customerInfo;
        this.recordArr = res.data.memo.reverse();
        if(this.recordTitle == "资料卡通过" || this.recordTitle == "业务员审核中" || this.recordTitle == "订单部审核中"){//进入填写资料卡界面出现的弹窗
          // this.$alert("当前资料卡状态为"+this.recordTitle+'，无法再次提交');
          this.only = true; 
        }
    }).catch((err)=>{
      console.log("拿评审记录数据错误?" + err);
    })
 },
   created(){
    // console.log(this.$store.state.choose);
    console.log("登陆了的用户",this.$store.state.user)
   
    
  }
 
};
</script>


<style scoped>
.wrapper-cards {
  font-family: "微软雅黑";
  box-sizing: border-box;
  width: 100%;
  background-color: white;
  margin-top: 50px;
}
.step {
  width: 550px;
  height: 80px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: -40px;
}

.gray-word {
  height: 24px;
  font-size: 16px;
  line-height: 18px;
  color: #8a8d8a;
  padding: 75px 0 0 60px;
  text-align: center;
}

/* button {
  outline: none;
  cursor: pointer;
  border-radius: 10px;
  margin: 50px 30px;
  width: 100px;
  height: 34px;
  font-size: 14px;
  border: 0;
  color: #ffffff;
  background: linear-gradient(to right, #a1d455, #86cb7e);
}
.button {
  display: flex;
  justify-content: center;
 
} */

</style>

<style>
.wrapper-cards .el-popup-parent--hidden{
  overflow-x: hidden !important;
  overflow-y: scroll !important;
}
.wrapper-cards .el-button--primary{
    border-color:rgb(160, 212, 86) !important;
    background-color:rgb(160, 212, 86) !important;
}
.wrapper-cards .el-button:hover{
  border-color:rgb(160, 212, 86) !important;
  background-color: white !important;
  color:rgb(160, 212, 86) !important;
}
.wrapper-cards .el-button--primary:hover{
    border-color:rgb(160, 212, 86) !important;
    background-color:rgb(160, 212, 86) !important;
    color:white !important;
}
</style>

