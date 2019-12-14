<template>
  <div class="wrapper-depute">
    <i class="el-icon-close" @click="dispear"></i>

    <div class="left">
      <div class="title">受委托人银行信息</div>
      <div class="input">
        <label for="name">姓名:</label>
        <input type="text" id="name" v-model="obj.name" :disabled="only">
      </div>
      <div class="input">
        <label for="idcardNo">身份证号:</label>
        <input type="text" id="idcardNo" v-model="obj.idcardNo" :disabled="only">
      </div>
      <div class="input">
        <label for="bank">开户银行:</label>
        <input type="text" id="bank" v-model="obj.accountBank" :disabled="only">
      </div>
      <div class="input">
        <label for="accout">银行账户:</label>
        <input type="text" id="accout" v-model="obj.accout" :disabled="only">
      </div>
      <div>
        <!-- <label for="address">银行所在地:</label> -->
        <!-- <input type="text" id="address" v-model="obj.accountLocation"> -->
      <div class="address-wrapper">
        银行所在地:
        <select v-model="province" :disabled="only">
            <option value="" disabled selected>{{dataProvince}}</option>
            <option v-for="(item,index) in provinces" :value="item" :key="index">{{ item.regionName }}</option>
        </select>
        <select v-model="city" class="let-right" :disabled="only">
          <option value="" disabled selected>{{dataCity}}</option>
            <option v-for="(item,index) in citys" :value="item" :key="index">{{ item.regionName }}</option>
        </select>
        <select v-model="area" class="let-right" :disabled="only">
          <option value="" disabled selected>{{dataArea}}</option>
            <option v-for="(item,index) in areas" :value="item" :key="index">{{ item.regionName }}</option>
        </select>
      </div>
      </div>
      <div class="tips">
        <p>*限jpg或jpeg格式，图片大小限制在2M以内，若无法处理请联系业务员</p>
        <p>*委托人下载《授权付款委托书》后填写，并有双方的签字按印，将填写后的《授权付款委托书》扫描或拍照，在本页上传</p>
      </div>
 
       <div
        class="button submit"
        @click="submit"
      >提交</div>

    
    </div>

    <div class="right">
     

      <!-- 1-授权付款委托书 -->
       <div class="picture">
            <p>1-《授权付款委托书》</p>
            <div class="avatar-uploader pic" >
            <img alt="" :src="imageUrl1">
            <input type="file" accept="image/jpg,image/jpeg" name=""  id="a1"  @change="handleUpload1" :disabled="only">
            <label for="a1"><p v-show="!imageUrl1" class="shangchuan">上传文件</p></label>
          </div>
        </div>

      <!-- 2-身份证国徽面 -->
      <div class="picture">
            <p>2-身份证国徽面</p>
            <div class="avatar-uploader pic" >
            <img alt="" :src="imageUrl2">
            <input type="file" accept="image/jpg,image/jpeg" name="" id="a2"   @change="handleUpload2" :disabled="only">
            <label for="a2"><p v-show="!imageUrl2" class="shangchuan">上传文件</p></label>
          </div>
        </div>

      <!--3-身份证头像面 -->
        <div class="picture">
            <p>3-身份证头像面</p>
            <div class="avatar-uploader pic" >
            <img alt="" :src="imageUrl3">
            <input type="file" accept="image/jpg,image/jpeg" name=""  id="a3"  @change="handleUpload3" :disabled="only">
            <label for="a3"><p v-show="!imageUrl3" class="shangchuan">上传文件</p></label>
          </div>
        </div>


      <div  class="button close" @click="dispear" >关闭</div>

    </div>
  </div>
</template>

<script>
var remoteImageURL = "http://14.29.221.109:10250/upload"
export default {
  name: "depute",
  props:{
    addCheck:"",
    only:"",
  },
  data() {
    return {
      dataProvince:"省",
      dataCity:"市",
      dataArea:"县",

      show: true,
      imageUrl1: "", //三张图片绑定的url
      imageUrl2: "",
      imageUrl3: "",
      province:'',//公司-省
      city:'',//市
      area:'',//县
      provinces:[],
      citys:[],
      areas:[],
      // accountLocation:"",
      obj: {
        //发送给后台的数据
        ccyear: this.$store.state.year, //年份
        // ccyear:"1992",
        ccid: this.$store.state.user.data.loginName, //客户编号
        idcardNo: "", //身份证号
        name: "", //姓名
        accountBank: "", //开户银行
        accout: "", //银行账户
        accountLocation: "", //银行所在地
        authfileIamge: "", //打印的委托书
        idcardIamge1: "", //身份证国徽面
        idcardIamge2: "" //身份证头像面
      }
    };
  },
  watch:{
    province(val,oldval){
        this.$axios.post('/yulan/areaRegion/getCity.do',this.province)
        .then((res)=>{
            this.citys = res.data.city;
        })
        .catch((err)=>{
            console.log(err);
        })
        this.areas = [];
    },
    city(val,oldval){
        this.$axios.post('/yulan/areaRegion/getCountry.do',this.city)
        .then((res)=>{
            this.areas = res.data.country;
        })
        .catch((err)=>{
            console.log(err);
        })
    },
    addCheck(newV){
      if(newV == "yes"){
        // if(newV == "N" || newV == null){
        //如果本来就有委托人，则填上原有的数据
        this.$axios.post('/yulan/customerInfo/getYLcontract.do',{
          "ccid":this.$store.state.user.data.loginName,//客户编号
          "ccyear":this.$store.state.year
        })
        .then((res)=>{
            let resobj = res.data.data;
            console.log("拿委托人信息",resobj);
            this.obj.name = resobj.name;
            this.obj.accountBank = resobj.accountBank;
            this.obj.accout = resobj.accout;     
            this.obj.idcardNo = resobj.idcardNo;

            // 省市县
            if(this.only == true){
              let bankarr = resobj.accountLocation.split("-");
              this.dataProvince = bankarr[0];
              if(!!bankarr[1])this.dataCity = bankarr[1];
              if(!!bankarr[2])this.dataArea  = bankarr[2];
            } 


            //大坑↓
            let bankarr = resobj.accountLocation.split("-");
                this.provinces.forEach((x)=>{
                    if(x.regionName == bankarr[0]){
                        this.province = x;
                    }
                })
                // this.dataProvince1 = bankarr1[0];
                if(!!bankarr[1]){
                    this.$axios.post('/yulan/areaRegion/getCity.do',this.province)
                    .then((res)=>{
                        this.citys = res.data.city;
                        this.citys.forEach((x)=>{
                        if(x.regionName == bankarr[1])
                            this.city = x;
                        })
                        if(!!bankarr[2]){
                            this.$axios.post('/yulan/areaRegion/getCountry.do',this.city)
                            .then((res)=>{
                                this.areas = res.data.country;
                                this.areas.forEach((x)=>{
                                if(x.regionName == bankarr[2])
                                    this.area = x;
                                })
                            })
                            .catch((err)=>{
                                console.log(err);
                            })
                            // this.dataCity1 = bankarr1[1];
                        }
                    })
                    .catch((err)=>{
                        console.log(err);
                    })
                    this.areas = [];
                    // this.dataCity1 = bankarr1[1];
                }
                //大坑↑

            if(resobj.authfileIamge != "" && resobj.authfileIamge != null){
              // console.log("有执行到这吗");
              this.obj.authfileIamge = resobj.authfileIamge;
              this.imageUrl1 = remoteImageURL+ resobj.authfileIamge;
              console.log(this.imageUrl1);
  
            }
            if(resobj.idcardIamge1 != ""&& resobj.idcardIamge1 != null){
              this.obj.idcardIamge1 = resobj.idcardIamge1;
              this.imageUrl2 = remoteImageURL+ resobj.idcardIamge1;
            }
            if(resobj.idcardIamge2 != ""&& resobj.idcardIamge2 != null){
              this.obj.idcardIamge2 = resobj.idcardIamge2;
              this.imageUrl3 = remoteImageURL+ resobj.idcardIamge2;
            }
        })
        .catch((err)=>{
            console.log(err);
        })
      }
    }
  },
  mounted(){
    this.$axios.post('/yulan/areaRegion/getProvince.do')
    .then((res)=>{
        this.provinces = res.data.province;
    }).catch((err)=>{
        console.log(err);
    })
  },
  methods: {
    compress(img) {
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");
      let initSize = img.src.length;
      let width = img.width;
      let height = img.height;
      canvas.width = width;
      canvas.height = height;
      // 铺底色
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, width, height);

      //进行最小压缩
      let ndata = canvas.toDataURL("image/jpeg", 0.7);
      return ndata;
    },
    // base64转成blob对象
    dataURItoBlob(base64Data) {
      var byteString;
      if (base64Data.split(",")[0].indexOf("base64") >= 0)
        byteString = atob(base64Data.split(",")[1]);
      else byteString = unescape(base64Data.split(",")[1]);
      var mimeString = base64Data
        .split(",")[0]
        .split(":")[1]
        .split(";")[0];
      var ia = new Uint8Array(byteString.length);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ia], { type: mimeString });
    },
    handleUpload1(e) {
      let self = this;
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      let file = files[0];
      var reader = new FileReader();
      reader.readAsDataURL(file);//读取数据
      console.log('图片大小'+file.size/1024);
      if(file.size/1024 >500) {  //如果图片大于500K则执行以下程序
        reader.onloadend = function() {
          let result = this.result;
          let img = new Image();
          img.src = result;
          img.onload = function(){
            let data = self.compress(img);
            let blob = self.dataURItoBlob(data);
            console.log('压缩后上传');
            let fd = new FormData();
            fd.append("file", blob);
            fd.append("imgType", "YLcontract");
            fd.append("fileName",self.$store.state.user.data.loginName + "-(" + self.$store.state.year + ")-" + "AUTHFILE");
            const instance = self.$axios.create({withCredentials: true});
            instance.post("/yulan/customerInfo/upload.do", fd, {
                headers: { "Content-Type": "multipart/form-data" }
              })
              .then(res => {
                if (res.data != null && res.data.code == 0) {
                  self.obj.authfileIamge = res.data.data.path;
                  self.imageUrl1 = remoteImageURL+ self.obj.authfileIamge + "?t=" + Math.random().toFixed(4);
                  console.log("第一张图片上传成功" + self.obj.authfileIamge);
          }
        })
        .catch(err => {
          console.log("错误", err);
        });
          }
        }
      }else{
        let fd = new FormData();
        fd.append("file", file);
        fd.append("imgType", "YLcontract");
        fd.append("fileName",this.$store.state.user.data.loginName + "-(" + this.$store.state.year + ")-" + "AUTHFILE");
        const instance = this.$axios.create({withCredentials: true});
        instance.post("/yulan/customerInfo/upload.do", fd, {
            headers: { "Content-Type": "multipart/form-data" }
          })
          .then(res => {
            if (res.data != null && res.data.code == 0) {
              this.obj.authfileIamge = res.data.data.path;
              this.imageUrl1 = remoteImageURL+ this.obj.authfileIamge + "?t=" + Math.random().toFixed(4);
              console.log("第一张图片上传成功" + this.obj.authfileIamge);
            }
          })
          .catch(err => {
            console.log("错误", err);
          });
      }
    },
    handleUpload2(e) {
      let self = this;
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      let file = files[0];
      var reader = new FileReader();
      reader.readAsDataURL(file); //读取数据
      console.log('图片大小'+file.size/1024);
      if(file.size/1024 >500) {  //如果图片大于500K则执行以下程序
        reader.onloadend = function() {
            let result = this.result;
            let img = new Image();
            img.src = result;
            img.onload = function(){
              let data = self.compress(img);
              let blob = self.dataURItoBlob(data);
              console.log('压缩后上传');
              let fd = new FormData();
              fd.append("file", blob);
              fd.append("imgType", "YLcontract");
              fd.append("fileName",self.$store.state.user.data.loginName + "-(" + self.$store.state.year + ")-" + "IDCARD");      
              const instance = self.$axios.create({withCredentials: true });
              instance.post("/yulan/customerInfo/upload.do", fd, {
                  headers: { "Content-Type": "multipart/form-data" }
                })
                .then(res => {
                  if (res.data != null && res.data.code == 0) {
                    self.obj.idcardIamge1 = res.data.data.path;
                      self.imageUrl2 = remoteImageURL+ self.obj.idcardIamge1 + "?t=" + Math.random().toFixed(4);
                    console.log("第二张上传图片成功" + self.obj.idcardIamge1);
                  }
                })
                .catch(err => {
                  console.log("错误", err);
                });
            }
        }
      }else{
          let fd = new FormData();
          fd.append("file", file);
          fd.append("imgType", "YLcontract");
          fd.append("fileName",this.$store.state.user.data.loginName + "-(" + this.$store.state.year + ")-" + "IDCARD");      
          const instance = this.$axios.create({withCredentials: true });
          instance.post("/yulan/customerInfo/upload.do", fd, {
              headers: { "Content-Type": "multipart/form-data" }
            })
            .then(res => {
              if (res.data != null && res.data.code == 0) {
                this.obj.idcardIamge1 = res.data.data.path;
                  this.imageUrl2 = remoteImageURL+ this.obj.idcardIamge1 + "?t=" + Math.random().toFixed(4);
                console.log("第二张上传图片成功" + this.obj.idcardIamge1);
              }
            })
            .catch(err => {
              console.log("错误", err);
            });
      }
     
    },
    handleUpload3(e) {
      let self = this;
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      let file = files[0];
      var reader = new FileReader();
      reader.readAsDataURL(file); //读取数据
      console.log('图片大小'+file.size/1024);
      if(file.size/1024 >500) {  //如果图片大于500K则执行以下程序
        reader.onloadend = function() {
            let result = this.result;
            let img = new Image();
            img.src = result;
            img.onload = function(){
              let data = self.compress(img);
              let blob = self.dataURItoBlob(data);
              console.log('压缩后上传');
              let fd = new FormData();
              fd.append("file", blob);
              fd.append("imgType", "YLcontract");
              fd.append("fileName",self.$store.state.user.data.loginName + "-(" + self.$store.state.year + ")-" + "IDCARD_BG");      
              const instance = self.$axios.create({ withCredentials: true });
              instance.post("/yulan/customerInfo/upload.do", fd, {
                  headers: { "Content-Type": "multipart/form-data" }
                })
                .then(res => {
                  if (res.data != null && res.data.code == 0) {
                    self.obj.idcardIamge2 = res.data.data.path;
                      self.imageUrl3 = remoteImageURL+ self.obj.idcardIamge2 + "?t=" + Math.random().toFixed(4);
                    console.log("第三张上传图片成功" + self.obj.idcardIamge2);
                  }
                })
                .catch(err => {
                  console.log("错误", err);
                });
            }
        }
      }else{
            let fd = new FormData();
            fd.append("file", file);
            fd.append("imgType", "YLcontract");
            fd.append("fileName",this.$store.state.user.data.loginName + "-(" + this.$store.state.year + ")-" + "IDCARD_BG");      
            const instance = this.$axios.create({ withCredentials: true });
            instance.post("/yulan/customerInfo/upload.do", fd, {
                headers: { "Content-Type": "multipart/form-data" }
              })
              .then(res => {
                if (res.data != null && res.data.code == 0) {
                  this.obj.idcardIamge2 = res.data.data.path;
                    this.imageUrl3 = remoteImageURL+ this.obj.idcardIamge2 + "?t=" + Math.random().toFixed(4);
                  console.log("第三张上传图片成功" + this.obj.idcardIamge2);
                }
              })
              .catch(err => {
                console.log("错误", err);
              });
      }
      
    },
    dispear() {
      this.$emit("dispearDepute");
    },
    save: function() {
      this.$alert("信息提交成功");
    },
    submit() {
      // //判空
      if(!this.obj.name || !this.obj.accountBank || !this.obj.accout || !this.obj.idcardNo || !this.accountLocation || !this.obj.authfileIamge || !this.obj.idcardIamge1 || !this.obj.idcardIamge2){
        this.$alert("请填写全部信息");
        return;
      }

      //创建
      // if(this.privateAccountAuthed == "N" || this.privateAccountAuthed == null){
      if(this.addCheck == "no" || this.addCheck == null){        
      // if(this.privateAccountAuthed == "Y"){  
      this.$axios

      //又改回来了真要命哦

        .post("/yulan/customerInfo/createYLcontract.do", Object.assign(this.obj,{"accountLocation":this.accountLocation}))
        // .post("/yulan/customerInfo/createYLcontract.do", {
        //   ccyear: this.$store.state.year, //年份
        //   // ccyear:"1992",
        //   ccid: this.$store.state.user.data.loginName, //客户编号
        //   idcardNo:this.obj.idcardNo,
        //   name: this.obj.name, //姓名
        //   accountBank: this.obj.accountBank, //开户银行
        //   accout: this.obj.accout, //银行账户
        //   accountLocation: this.obj.accountLocation, //银行所在地
        //   authFileImage: this.obj.authfileIamge, //打印的委托书
        //   idCardImage1: this.obj.idcardIamge1, //身份证国徽面
        //   idCardImage2: this.obj.idcardIamge2 //身份证头像面
        // })

        .then(res => {
          console.log("成功", res.data);
          if(res.data.code == 0){
            // this.$message({
            //   message: "创建保存成功",
            //   type: "success"
            // });
            this.$alert("创建保存成功");
          //更新外部的privateAccountAuthed的值
          // this.$emit('changePrivate');
          this.$emit('changeCheck');
          this.dispear();
          }else{
            this.$alert("创建失败");
          }

        })
        .catch(err => {
          console.log("错误", err);
        });


      }else if(this.addCheck == "yes"){
      // }else if(this.privateAccountAuthed == "Y"){
        // }else if(this.privateAccountAuthed == "N" || this.privateAccountAuthed == null){
        //更新
        // this.$axios.post('/yulan/customerInfo/updateYLcontract.do')
        console.log(this.accountLocation);
        console.log("要发送的委托人的信息",this.obj);
        this.$axios
        .post("/yulan/customerInfo/updateYLcontract.do", Object.assign(this.obj,{"accountLocation":this.accountLocation}))
        .then(res => {
          console.log("成功", res.data.msg);
          if(res.data.code == 0){
            // this.$message({
            //   message: "更新保存成功",
            //   type: "success"
            // });
            this.$alert('更新保存成功')
            this.dispear();
            // this.$alert("更新成功");
          }else{
            this.$alert("更新失败");
          }
        })
        .catch(err => {
          console.log("错误", err);
        });
      }

        
    }
  },
  computed:{
    accountLocation(){
      if(!this.city.regionName)
        return this.province.regionName;
        else if(!this.area.regionName)
        return this.province.regionName + '-' + this.city.regionName;
        else return this.province.regionName + '-' + this.city.regionName + '-' + this.area.regionName;
    }
  },
 
};
</script>


<style scoped>
.wrapper-depute {
  width: 800px;
  height: 600px;
  margin: 0 auto;
  background-color: #edfdf0;
  border-radius: 10px;
  font-size: 16px;
  position: absolute;
  left: 100px;
  z-index: 100;
  font-family: "微软雅黑";
}
.left {
  width: 40%;
  height: 100%;
  float: left;
}
.right {
  width: 60%;
  height: 100%;
  float: left;
}
.title {
  text-align: right;
  margin: 20px 45px;
  font-size: 18px;
}
.address-wrapper{
  padding-left:30px;
}
.address-wrapper:after{
  content:"";
  clear: both;
  display: block;
}
.address-wrapper select{
  width:201px;
  height:25px;
  border:solid 1px #a0a0a0;
  padding:0 10px;
  font-size: 14px;
  outline: none;
  background-color:transparent;
  margin:4px 0;
  outline: none;
}
.let-right{
  float:right;
}
.tips p {
  font-size: 14px;
  color: gray;
  margin: 30px 10px;
  text-indent: 18px;
}
.input {
  text-align: center;
  height: 50px;
  text-align: right;
  /* box-sizing: border-box; */
}
label + input[type="text"] {
  width:180px;
  height:25px;
  border:solid 1px #a0a0a0;
  padding:0 10px;
  font-size: 14px;
  outline: none;
  background-color:transparent;
}
/*取消输入框默认填充样式*/
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  transition-delay: 9999s;
  transition: color 9999s ease-out, background-color 9999s ease-out;
}

.picture {
  display: inline-block;
  margin-top: 22px;
  position: relative;
  box-sizing: border-box;
}
.picture p {
  text-align: center;
}

.picture div {
  width: 200px;
  height: 150px;
  background-color: #e9efea;
  margin: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 5px;
}
.picture div:hover {
  background-color: #444746;
}

.button {
  margin: 0 auto;
  width: 100px;
  outline: none;
  height: 34px;
  line-height: 34px;
  font-size: 14px;
  text-align: center;
  background-image: linear-gradient(74deg, #a7d64b 1%, #82c985 100%),
    linear-gradient(#a5d050, #a5d050);
  color: white;
  border-radius: 10px;
  cursor: pointer;
}
.close{
  margin-top:98px;
}
.submit {
  transform: translateY(-4px);
}
.el-icon-close {
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  color: red;
  font-size: 18px;
}
.pic input {
  width: 100%;
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  opacity: 0;
  filter: alpha(opacity=0);
  cursor: pointer;
}
.pic img {
  display: inline-block;
  height: 100%;
  width: 100%;
}
.shangchuan {
  position: absolute;
  font-size: 16px;
  line-height: 16px;
  top: 45%;
  left: 50%;
  transform: translateX(-50%);
  border: 1px solid white;
  border-radius: 5px;
  padding: 4px;
  color: white;
  display: none;
}
.avatar-uploader:hover .shangchuan {
  display: inline-block;
}
/*以下是旧的东西*/
.avatar-uploader {
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  background-color: #e9efea;
}

</style>
<style>
.wrapper-depute .el-popup-parent--hidden{
  overflow-x: hidden !important;
  overflow-y: scroll !important;
}
.wrapper-depute .el-button--primary{
    border-color:rgb(160, 212, 86) !important;
    background-color:rgb(160, 212, 86) !important;
}
.wrapper-depute .el-button:hover{
  border-color:rgb(160, 212, 86) !important;
  background-color: white !important;
  color:rgb(160, 212, 86) !important;
}
.wrapper-depute .el-button--primary:hover{
    border-color:rgb(160, 212, 86) !important;
    background-color:rgb(160, 212, 86) !important;
    color:white !important;
}
</style>

