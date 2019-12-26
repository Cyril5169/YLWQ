<template>
  <div class="wrapper-jun">
    <div class="div1">
      <cliDepute
        v-show="showcliDepute"
        @dispearDepute="dispearDepute()"
        @changeCheck="getWeiTuo"
        :addCheck="codeCheck"
        :only="only"
      ></cliDepute>
      <div class="ways">经营方式</div>
      <form class="ways-contents">
        <input
          type="radio"
          v-model="pickWay"
          value="has-has"
          id="has-has"
          name="bussiness-way"
          :disabled="only"
        />
        <label for="has-has">&nbsp;&nbsp;有营业执照-有对账公号&nbsp;&nbsp;&nbsp;（请仅填公司汇款账号信息）</label>
        <br />
        <input
          type="radio"
          :disabled="faPiaoDisable||only"
          v-model="pickWay"
          value="has-no"
          id="has-no"
          name="bussiness-way"
        />
        <label for="has-no">&nbsp;&nbsp;有营业执照-无对账公号&nbsp;&nbsp;&nbsp;（请仅填个人汇款账号信息）</label>
        <br />
        <transition name="fade">
          <!-- <div class="add-account" v-show="isShow">
                <span>是否增加委托授权付款银行账号（仅限经营者配偶）&nbsp;&nbsp;&nbsp;</span><input type="radio" v-model="addCheck" value="yes" name="addCheck" id="jyes" :disabled='only'><label for="jyes">是</label>&nbsp;&nbsp;&nbsp;<input type="radio" v-model="addCheck" value="no" id="jno" name="addCheck" :disabled='only'><label for="jno">否</label>
                <div v-show="addAccountShow"><span class="download" @click="downLoad"><span>下载《授权付款委托书》</span></span><a class="alert-block" @click="moreMessageInput">填写授权委托账号信息及附件</a></div>
          </div>-->
        </transition>
        <input
          type="radio"
          :disabled="faPiaoDisable||only"
          v-model="pickWay"
          value="no-no"
          id="no-no"
          name="bussiness-way"
        />
        <label for="no-no">&nbsp;&nbsp;无营业执照&nbsp;&nbsp;&nbsp;（请仅填个人汇款账号信息）</label>
        <br />
      </form>
      <div class="gray-word">*请选择经营类型后填写对应的账号</div>
      <div class="bankwrapper">
        <div class="company">
          <div class="account-info">公司汇款账号信息:</div>
          <div>
            <span>汇款人</span>
            <input
              type="text"
              v-model="cardobj.account1Name"
              class="readonly"
              readonly
              :disabled="isDisable"
            />
          </div>
          <div>
            <span>汇款银行</span>
            <input
              type="text"
              v-model="account1Bank"
              :disabled="isDisable"
              :readOnly="only"
              :class="{readonly:only}"
            />
          </div>
          <div>
            <span>账号</span>
            <input
              type="text"
              v-model="account1"
              :disabled="isDisable"
              :readOnly="only"
              :class="{readonly:only}"
            />
          </div>
          <!-- <div><span>银行所在地</span><v-distpicker @selected="onSelected1" :disabled = "isDisable" class="address"></v-distpicker></div> -->
          <div class="loc-wrapper">
            <span>银行所在地</span>
            <select :disabled="isDisable||only" v-model="province1">
              <option value disabled selected>{{dataProvince1}}</option>
              <option
                v-for="(item,index) in provinces1"
                :value="item"
                :key="index"
              >{{ item.regionName }}</option>
            </select>
            <select :disabled="isDisable||only" v-model="city1">
              <option value disabled selected>{{dataCity1}}</option>
              <option
                v-for="(item,index) in citys1"
                :value="item"
                :key="index"
              >{{ item.regionName }}</option>
            </select>
            <select :disabled="isDisable||only" v-model="area1">
              <option value disabled selected>{{dataArea1}}</option>
              <option
                v-for="(item,index) in areas1"
                :value="item"
                :key="index"
              >{{ item.regionName }}</option>
            </select>
          </div>
          <!-- <div>{{ province + city + area}}123</div>  为什么这里的city不会显示啊，巨坑 -->
        </div>
        <div class="personal">
          <div class="account-info">个人汇款信息:</div>
          <div>
            <span>汇款人</span>
            <input
              type="text"
              :disabled="!isDisable"
              class="readonly"
              readonly
              :value="cardobj.account2Name"
            />
          </div>
          <div>
            <span>汇款银行</span>
            <input
              type="text"
              :disabled="!isDisable"
              v-model="account2Bank"
              :readOnly="only"
              :class="{readonly:only}"
            />
          </div>
          <div>
            <span>账号</span>
            <input
              type="text"
              :disabled="!isDisable"
              v-model="account2"
              :readOnly="only"
              :class="{readonly:only}"
            />
          </div>
          <!-- <div><span>银行所在地</span><v-distpicker :disabled = "!isDisable" class="address"></v-distpicker></div> -->
          <div class="loc-wrapper">
            <span>银行所在地</span>
            <select :disabled="!isDisable||only" v-model="province2">
              <option value disabled selected>{{dataProvince2}}</option>
              <option
                v-for="(item,index) in provinces2"
                :value="item"
                :key="index"
              >{{ item.regionName }}</option>
            </select>
            <select :disabled="!isDisable||only" v-model="city2">
              <option value disabled selected>{{dataCity2}}</option>
              <option
                v-for="(item,index) in citys2"
                :value="item"
                :key="index"
              >{{ item.regionName }}</option>
            </select>
            <select :disabled="!isDisable||only" v-model="area2">
              <option value disabled selected>{{dataArea2}}</option>
              <option
                v-for="(item,index) in areas2"
                :value="item"
                :key="index"
              >{{ item.regionName }}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="gray-word">
        *请先选择账号实体对应的类型，然后再逐个选择待上传资质文件类型
        <span class="photo-tip">（点击图片可查看大图）</span>
      </div>

      <!-- 自己写的展示图片 -->
      <!-- <div class="checkPhoto" v-show="showBP">
            <i id="chacha-close" class="el-icon-close" @click="showBP = !showBP"></i>
            <img :src="bigRouter">
      </div>-->

      <div class="photo-wrapper-left">
        <select class="acount-type" v-model="accountType" :disabled="only">
          <!-- <option disabled selected value="">请选择账号实体对应的类型</option> -->
          <option v-for="(list,index) in accountTypesList" :key="index">{{ list }}</option>
        </select>
        <img id="show" alt @click="showPhoto" />
      </div>
      <div class="photo-wrapper-right">
        <select class="license-type" v-model="photoType">
          <option v-for="(list,index) in photoTypesList" :key="index">{{ list }}</option>
        </select>
        <a href="javascript:;" class="a-upload">
          <input
            type="file"
            accept="image/jpg, image/jpeg, image/png"
            :disabled="only"
            name="photo1"
            id
            @change="changepic"
          />上传文件
        </a>
        <h1>{{ photoType }}</h1>
        <div>{{operateMessage}}</div>
        <div class="number-wrapper" v-show="cardShow">
          身份证号：
          <input
            type="text"
            name="IDcard"
            class="IDcard"
            v-model="file1IdcardNo"
            :readOnly="only"
            :class="{readonly:only}"
          />
        </div>
        <div class="number-wrapper" v-show="yingyeShow">
          营业执照注册号：
          <input
            type="text"
            name="IDcard"
            class="IDcard"
            v-model="file2BusinesslicenseNo"
            :readOnly="only"
            :class="{readonly:only}"
          />
          <div>
            营业执照有效期：
            <el-date-picker
              class="file2BusinesslicenseEnd"
              v-model="file2BusinesslicenseEnd"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择日期"
              :disabled="noEnd || (this.only == true)"
            ></el-date-picker>
            <input
              type="checkbox"
              id="longdate"
              v-model="noEnd"
              :disabled="only"
              @click="noEnd=!noEnd;file2BusinesslicenseEnd=''"
            />
            <label for="longdate">长期有效</label>
          </div>
        </div>
        <div class="number-wrapper" v-show="suiwuShow">
          税务证号：
          <input
            type="text"
            v-model="file4GtqcNo"
            name="IDcard"
            class="IDcard"
            :readOnly="only"
            :class="{readonly:only}"
          />
        </div>
      </div>
    </div>
    <div class="button">
      <button @click="back">上一步</button>
      <button @click="save" v-show="!this.only">保存</button>
      <button @click="submit" v-show="!this.only">保存并提交</button>
      <button @click="enter" v-show="this.showEnter">确认</button>
      <button @click="change" v-show="this.showEnter">修改</button>
    </div>
  </div>
</template>

<script>
var remoteImageURL = "http://14.29.221.109:10250/upload";
import cliDepute from "@/Components/cli-depute";
export default {
  name: "cli-filecard4",
  components: { cliDepute },
  props: {
    cardobj: Object,
    recordTitle: "",
    only: Boolean,
    showEnter: Boolean
  },
  data() {
    return {
      //省市县的显示初始值
      dataProvince1: "省",
      dataCity1: "市",
      dataArea1: "县",
      dataProvince2: "省",
      dataCity2: "市",
      dataArea2: "县",

      showBP: false,
      bigRouter: "",
      // faPiaoDisable:"",//根据card1的发票类型选择是否可以选中
      codeCheck: "",
      showcliDepute: false, //是否显示配偶信息填入块
      privateAccountAuthed: "N",
      pickWay: "", //经验方式
      addCheck: "no", //是否增加委托账号
      addAccountShow: false, //是否显示下载，相关人的那一行的
      isShow: false, //经营方式是有营业执照-无对账公号显示的方块
      isDisable: false, //通过经营方式来判断账号可输入的是左边还是右边
      provinces1: [],
      citys1: [],
      areas1: [],
      provinces2: [],
      citys2: [],
      areas2: [],

      //公司
      account1Name: "", //公司收款帐户名（传）
      account1Bank: "", //公司-汇款银行（填）
      account1: "", //公司-汇款帐号（填）
      // account1Location:"",//公司-地址（填）//整合后的值！！
      province1: "", //公司-省
      city1: "", //市
      area1: "", //县

      //个人
      account2Name: "", //个人收款帐户名
      account2Bank: "", //个人-汇款银行
      account2: "", //个人-汇款帐号
      // account2Location:"",//个人-地址
      province2: "", //个人-省
      city2: "", //市
      area2: "", //县

      //杂项数据
      //customerentitytypex:1,
      file1IdcardNo: "", //身份证号
      file2BusinesslicenseNo: "", //营业执照注册号
      file2BusinesslicenseEnd: "", //营业执照有效期
      file4GtqcNo: "",

      //accountTypesList:['公司：三证五证合一','公司：三证五证未合一','个体户：已取得税务登记证','个人','个体户：未取得税务登记证'],
      accountType: "公司：三证五证合一",
      allphotoTypesList: [
        "1-身份证头像面",
        "2-身份证国徽面",
        "3-营业执照",
        "4-税务登记证（国税）"
      ],
      photoTypesList: ["1-身份证头像面", "2-身份证国徽面", "3-营业执照"], //真正渲染上选择列表的数组
      photoType: "1-身份证头像面",
      filesarr: [{}, {}, {}, {}], //放置四证书的对象数组
      operateMessage: "",
      noEnd: false, //是否无限期
      cardShow: true, //身份证填框
      yingyeShow: false, //营业填框
      suiwuShow: false //税务填框

      // showPost:true;
    };
  },
  methods: {
    // 压缩图片
    compress(img, fate) {
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
    //点击小图看大图
    showPhoto() {
      let newP = this.filesarr[this.showImageIndex].url;
      // 新窗口打开
      var l = (screen.availWidth - 667) / 2;
      var t = (screen.availHeight - 885) / 2;
      window.open(
        newP,
        "newWin",
        "width=667,height=885,top=" +
          t +
          ",left=" +
          l +
          ",toolbar=no,menubar=no,location=no,status=yes"
      );
    },

    changepic(e) {
      let self = this;
      var files = e.target.files || e.dataTransfer.files;
      //判断支不支持FileReader
      if (!files.length) return;
      var picavalue = files[0];
      var reader = new FileReader();
      reader.readAsDataURL(picavalue); //读取数据
      if (picavalue.size / 1024 > 500) {
        //如果图片大于500K则执行以下程序
        reader.onloadend = function() {
          let result = this.result;
          let img = new Image();
          img.src = result;
          let fate = 500 / (picavalue.size / 1024);
          img.onload = function() {
            let data = self.compress(img, fate);
            let blob = self.dataURItoBlob(data);
            console.log("压缩后上传");
            self.operateMessage =
              new Date().getFullYear() +
              "-" +
              (new Date().getMonth() + 1) +
              "-" +
              new Date().getDate() +
              " " +
              new Date().getHours() +
              ":" +
              (new Date().getMinutes() >= 10
                ? new Date().getMinutes()
                : "0" + new Date().getMinutes()) +
              " " +
              self.cardobj.cid;
            self.filesarr[self.showImageIndex].date = self.operateMessage; //拿到每一张照片的时间并赋值给对象数组
            let temp = {
              "0": "IDCARD",
              "1": "IDCARD_BG",
              "2": "BUSSINESSLICENSE",
              "3": "GTQC"
            };
            let fd = new FormData();
            fd.append("file", blob);
            fd.append("imgType", "Customer");
            fd.append(
              "fileName",
              self.cardobj.cid +
                "-(" +
                self.$store.state.year +
                ")-" +
                temp[self.showImageIndex]
            );
            let instance = self.$axios.create({
              withCredentials: true
            });
            instance
              .post("/yulan/customerInfo/upload.do", fd, {
                headers: { "Content-Type": "multipart/form-data" }
              })
              .then(res => {
                if (res.data != null && res.data.code == 0) {
                  let url = (self.filesarr[self.showImageIndex].url =
                    remoteImageURL +
                    res.data.data.path +
                    "?t=" +
                    Math.random().toFixed(4));
                  self.filesarr[self.showImageIndex].posturl =
                    res.data.data.path;
                  document.getElementById("show").src =
                    url + "?t=" + Math.random().toFixed(4);
                }
              })
              .catch(res => {
                console.log("4张图片之一发送失败", err);
              });
          };
        };
      } else {
        console.log("未压缩上传");
        self.operateMessage =
          new Date().getFullYear() +
          "-" +
          (new Date().getMonth() + 1) +
          "-" +
          new Date().getDate() +
          " " +
          new Date().getHours() +
          ":" +
          (new Date().getMinutes() >= 10
            ? new Date().getMinutes()
            : "0" + new Date().getMinutes()) +
          " " +
          self.cardobj.cid;
        self.filesarr[self.showImageIndex].date = self.operateMessage; //拿到每一张照片的时间并赋值给对象数组
        let temp = {
          "0": "IDCARD",
          "1": "IDCARD_BG",
          "2": "BUSSINESSLICENSE",
          "3": "GTQC"
        };
        let fd = new FormData();
        fd.append("file", picavalue);
        fd.append("imgType", "Customer");
        fd.append(
          "fileName",
          self.cardobj.cid +
            "-(" +
            self.$store.state.year +
            ")-" +
            temp[self.showImageIndex]
        );
        let instance = self.$axios.create({
          withCredentials: true
        });
        instance
          .post("/yulan/customerInfo/upload.do", fd, {
            headers: { "Content-Type": "multipart/form-data" }
          })
          .then(res => {
            if (res.data != null && res.data.code == 0) {
              let url = (self.filesarr[self.showImageIndex].url =
                remoteImageURL +
                res.data.data.path +
                "?t=" +
                Math.random().toFixed(4));
              self.filesarr[self.showImageIndex].posturl = res.data.data.path;
              document.getElementById("show").src =
                url + "?t=" + Math.random().toFixed(4);
            }
          })
          .catch(res => {
            console.log("4张图片之一发送失败", err);
          });
      }
    },
    // 下载《授权付款委托书》
    downLoad(e) {
      location.href = "http://14.29.221.109:10250/yulan/file/down.do";
    },
    // 填写附件
    moreMessageInput() {
      this.showcliDepute = true;
    },
    // 在附件中点击关闭传给父组件出发的函数，改变显示状态
    dispearDepute() {
      this.showcliDepute = false;
    },
    back() {
      this.$emit("bridgepre");
    },
    save() {
      if (!this.check()) {
        return;
      }
      this.$emit("mergeMessage", {
        account1Bank: this.account1Bank, //公司-汇款银行（填）
        account1: this.account1, //公司-汇款帐号（填）
        account1Location: this.account1Location, //公司-地址（填）
        account2Bank: this.account2Bank, //个人-汇款银行
        account2: this.account2, //个人-汇款帐号
        account2Location: this.account2Location, //个人-地址
        hasPublicAccount: this.hasPublicAccount, //有无对公账号
        busientType: this.busientType, //公司:有营业执照，个体户:无营业执照

        file1IdcardNo: this.file1IdcardNo, //身份证号
        file2BusinesslicenseNo: this.file2BusinesslicenseNo, //营业账户
        file2BusinesslicenseEnd:
          typeof this.file2BusinesslicenseEnd != "string" &&
          this.file2BusinesslicenseEnd != null
            ? this.file2BusinesslicenseEnd.getFullYear() +
              "-" +
              (this.file2BusinesslicenseEnd.getMonth() + 1) +
              "-" +
              this.file2BusinesslicenseEnd.getDate()
            : this.file2BusinesslicenseEnd,
        file2BusinesslicenseNoend: this.noEnd == true ? 1 : 0, //是否永久有效
        file4GtqcNo: this.file4GtqcNo,
        //图片上传的信息
        customerentitytypex: this.customerentitytypex,
        cid: this.cardobj.cid,
        file1Idcard: this.filesarr[0].posturl,
        file1Op: this.filesarr[0].date,
        file2Businesslicense: this.filesarr[2].posturl,
        file2Op: this.filesarr[2].date,
        file4Gtqc: this.filesarr[3].posturl,
        file4Op: this.filesarr[3].date,
        file5IdcardBg: this.filesarr[1].posturl,
        file5Op: this.filesarr[1].date,
        contractyear: this.$store.state.year, //必备
        privateAccountAuthed: this.privateAccountAuthed //默认没有配偶
      });
      this.$emit("submitall");
    },
    submit() {
      if (!this.check()) {
        return;
      }
      this.$confirm("此提交操作只能执行一次，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$emit("mergeMessage", {
            account1Bank: this.account1Bank, //公司-汇款银行（填）
            account1: this.account1, //公司-汇款帐号（填）
            account1Location: this.account1Location, //公司-地址（填）
            account2Bank: this.account2Bank, //个人-汇款银行
            account2: this.account2, //个人-汇款帐号
            account2Location: this.account2Location, //个人-地址
            hasPublicAccount: this.hasPublicAccount, //有无对公账号
            busientType: this.busientType, //公司:有营业执照，个体户:无营业执照

            file1IdcardNo: this.file1IdcardNo, //身份证号
            file2BusinesslicenseNo: this.file2BusinesslicenseNo, //营业账户
            file2BusinesslicenseEnd:
              typeof this.file2BusinesslicenseEnd != "string" &&
              this.file2BusinesslicenseEnd != null
                ? this.file2BusinesslicenseEnd.getFullYear() +
                  "-" +
                  (this.file2BusinesslicenseEnd.getMonth() + 1) +
                  "-" +
                  this.file2BusinesslicenseEnd.getDate()
                : this.file2BusinesslicenseEnd,
            file2BusinesslicenseNoend: this.noEnd == true ? 1 : 0, //是否永久有效
            file4GtqcNo: this.file4GtqcNo,
            //图片上传的信息
            customerentitytypex: this.customerentitytypex,
            cid: this.cardobj.cid,
            file1Idcard: this.filesarr[0].posturl,
            file1Op: this.filesarr[0].date,
            file2Businesslicense: this.filesarr[2].posturl,
            file2Op: this.filesarr[2].date,
            file4Gtqc: this.filesarr[3].posturl,
            file4Op: this.filesarr[3].date,
            file5IdcardBg: this.filesarr[1].posturl,
            file5Op: this.filesarr[1].date,
            contractyear: this.$store.state.year, //必备
            privateAccountAuthed: this.privateAccountAuthed //默认没有配偶
          });
          this.$emit("postall");
        })
        .catch(() => {
          this.$alert("请认真核对信息!");
        });
    },
    check() {
      //判断资料卡当前状态是否要让客户将资料卡提交到业务员处
      if (
        this.recordTitle == "资料卡通过" ||
        this.recordTitle == "业务员审核中" ||
        this.recordTitle == "订单部审核中"
      ) {
        this.$alert("当前资料卡不为填写状态");
        return false;
      }
      //对应账号信息判断
      if (this.pickWay == "has-has") {
        if (!this.account1 || !this.account1Bank || !this.account1Location) {
          this.$alert("请您完整填写对应的银行信息");
          return false;
        }
      } else {
        if (!this.account2 || !this.account2Bank || !this.account2Location) {
          this.$alert("请您完整填写对应的银行信息");
          return false;
        }
      }

      //前两张图片是必要的
      if (!this.filesarr[0].posturl) {
        this.$alert("请上传身份证头像面照片");
        return false;
      }
      if (!this.file1IdcardNo) {
        this.$alert("请填写身份证号码");
        return false;
      }
      if (!this.filesarr[1].posturl) {
        this.$alert("请上传身份证国徽面照片");
        return false;
      }

      if (
        this.accountType == "公司：三证五证合一" ||
        this.accountType == "个体户：未取得税务登记证"
      ) {
        //3张图片的时候
        if (!this.filesarr[2].posturl) {
          this.$alert("请上传营业执照");
          return false;
        }
        if (!this.file2BusinesslicenseNo) {
          this.$alert("请填写营业执照注册号");
          return false;
        }
        if (this.noEnd == false && !this.file2BusinesslicenseEnd) {
          this.$alert("请确定营业执照的有效期");
          return false;
        }
      } else if (
        this.accountType == "公司：三证五证未合一" ||
        this.accountType == "个体户：已取得税务登记证"
      ) {
        //4张图片的时候
        if (!this.filesarr[2].posturl) {
          this.$alert("请上传营业执照");
          return false;
        }
        if (!this.file2BusinesslicenseNo) {
          this.$alert("请填写营业执照注册号");
          return false;
        }
        if (this.noEnd == false && !this.file2BusinesslicenseEnd) {
          this.$alert("请确定营业执照的有效期");
          return false;
        }
        if (!this.filesarr[3].posturl) {
          this.$alert("请上传税务登记证照片");
          return false;
        }
        if (!this.file4GtqcNo) {
          this.$alert("请填写税务证号");
          return false;
        }
      }
      return true;
    },
    enter(){
      this.$emit("enter");
    },
    change(){
      this.$emit("change");
    },
    getWeiTuo() {
      this.$axios
        .post("/yulan/customerInfo/getYLcontract.do", {
          ccid: this.cardobj.cid,
          ccyear: this.$store.state.year
        })
        .then(res => {
          if (res.data.code == 0) this.codeCheck = "yes";
          else if (res.data.code == 1) this.codeCheck = "no";
        })
        .catch(err => {
          console.log("拿委托状态错误呀");
        });
    }
  },
  watch: {
    pickWay() {
      //显示小方块内容
      if (this.pickWay == "has-no") {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
      //显示公司和个人信息填写
      if (this.pickWay != "has-has") {
        this.isDisable = true;
        //置空另一半
        (this.account1Bank = ""),
          (this.account1 = ""),
          (this.province1 = ""),
          (this.city1 = ""),
          (this.area1 = "");
      } else {
        this.isDisable = false;
        //置空另一半
        (this.account2Bank = ""),
          (this.account2 = ""),
          (this.province2 = ""),
          (this.city2 = ""),
          (this.area2 = "");
      }
    },
    //是否增加委托授权付款银行账号
    addCheck() {
      if (this.addCheck == "yes") {
        this.addAccountShow = true;
      } else if (this.addCheck == "no") {
        this.addAccountShow = false;
      }
    },
    codeCheck() {
      if (this.codeCheck == "yes") this.addCheck = "yes";
      else this.addCheck = "no";
    },
    province1(val, oldval) {
      this.$axios
        .post("/yulan/areaRegion/getCity.do", this.province1)
        .then(res => {
          this.citys1 = res.data.city;
          // this.city1 = this.citys1[0];
        })
        .catch(err => {
          console.log(err);
        });
      this.areas1 = [];
    },
    city1(val, oldval) {
      this.$axios
        .post("/yulan/areaRegion/getCountry.do", this.city1)
        .then(res => {
          this.areas1 = res.data.country;
        })
        .catch(err => {
          console.log(err);
        });
    },
    province2(val, oldval) {
      this.$axios
        .post("/yulan/areaRegion/getCity.do", this.province2)
        .then(res => {
          this.citys2 = res.data.city;
        })
        .catch(err => {
          console.log(err);
        });
      this.areas2 = [];
    },
    city2(val, oldval) {
      this.$axios
        .post("/yulan/areaRegion/getCountry.do", this.city2)
        .then(res => {
          this.areas2 = res.data.country;
        })
        .catch(err => {
          console.log(err);
        });
    },
    photoType() {
      switch (this.photoType) {
        case "1-身份证头像面":
          this.yingyeShow = false;
          this.cardShow = true;
          this.suiwuShow = false;
          break;
        case "2-身份证国徽面":
          this.yingyeShow = false;
          this.cardShow = false;
          this.suiwuShow = false;
          break;
        case "3-营业执照":
          this.yingyeShow = true;
          this.cardShow = false;
          this.suiwuShow = false;
          break;
        case "4-税务登记证（国税）":
          this.yingyeShow = false;
          this.cardShow = false;
          this.suiwuShow = true;
          break;
      }
      document.getElementById("show").src = this.filesarr[
        this.showImageIndex
      ].url;
      this.operateMessage = this.filesarr[this.showImageIndex].date;
    },
    accountType() {
      this.photoType = "1-身份证头像面";
      switch (this.accountType) {
        case "公司：三证五证合一":
          this.photoTypesList = this.allphotoTypesList.slice(0, 3);
          break;
        case "公司：三证五证未合一":
          this.photoTypesList = this.allphotoTypesList;
          break;
        case "个体户：已取得税务登记证":
          this.photoTypesList = this.allphotoTypesList;
          break;
        case "个体户：未取得税务登记证":
          this.photoTypesList = this.allphotoTypesList.slice(0, 3);
          break;
        case "个人":
          this.photoTypesList = this.allphotoTypesList.slice(0, 2);
          break;
      }
    },
    cardobj() {
      //初始化显示省市县，并将从对象上拿到的银行所在地信息拿下来赋初始值（对不起臣妾做不到啊！！！！）
      if (this.only == true) {
        if (
          !!this.cardobj.account1Location &&
          this.cardobj.busientType == "公司" &&
          this.cardobj.hasPublicAccount == "Y"
        ) {
          // this.account1Location = this.cardobj.account1Location;//赋初始值，不了，只是展示就好了
          let bankarr1 = this.cardobj.account1Location.split("-");
          this.dataProvince1 = bankarr1[0];
          if (!!bankarr1[1]) this.dataCity1 = bankarr1[1];
          if (!!bankarr1[2]) this.dataArea1 = bankarr1[2];
        }
        if (
          !!this.cardobj.account2Location &&
          (this.cardobj.busientType == "个体户" ||
            (this.cardobj.busientType == "公司" &&
              this.cardobj.hasPublicAccount == "N"))
        ) {
          // this.account2Location = this.cardobj.account2Location;//赋初始值
          let bankarr2 = this.cardobj.account2Location.split("-");
          this.dataProvince2 = bankarr2[0];
          if (!!bankarr2[1]) this.dataCity2 = bankarr2[1];
          if (!!bankarr2[2]) this.dataArea2 = bankarr2[2];
        }
      }

      //开始来写最恶心的部分了，这个写完我就升天了
      if (
        !!this.cardobj.account1Location &&
        this.cardobj.busientType == "公司" &&
        this.cardobj.hasPublicAccount == "Y"
      ) {
        // this.account1Location = this.cardobj.account1Location;//赋初始值，不了，只是展示就好了
        let bankarr1 = this.cardobj.account1Location.split("-");
        this.provinces1.forEach(x => {
          if (x.regionName == bankarr1[0]) {
            this.province1 = x;
          }
        });
        // this.dataProvince1 = bankarr1[0];
        if (!!bankarr1[1]) {
          this.$axios
            .post("/yulan/areaRegion/getCity.do", this.province1)
            .then(res => {
              this.citys1 = res.data.city;
              this.citys1.forEach(x => {
                if (x.regionName == bankarr1[1]) this.city1 = x;
              });
              if (!!bankarr1[2]) {
                this.$axios
                  .post("/yulan/areaRegion/getCountry.do", this.city1)
                  .then(res => {
                    this.areas1 = res.data.country;
                    this.areas1.forEach(x => {
                      if (x.regionName == bankarr1[2]) this.area1 = x;
                    });
                  })
                  .catch(err => {
                    console.log(err);
                  });
                // this.dataCity1 = bankarr1[1];
              }
            })
            .catch(err => {
              console.log(err);
            });
          this.areas1 = [];
          // this.dataCity1 = bankarr1[1];
        }
      }
      if (
        !!this.cardobj.account2Location &&
        (this.cardobj.busientType == "个体户" ||
          (this.cardobj.busientType == "公司" &&
            this.cardobj.hasPublicAccount == "N"))
      ) {
        let bankarr2 = this.cardobj.account2Location.split("-");
        this.provinces2.forEach(x => {
          if (x.regionName == bankarr2[0]) {
            this.province2 = x;
          }
        });
        // this.dataProvince1 = bankarr1[0];
        if (!!bankarr2[1]) {
          this.$axios
            .post("/yulan/areaRegion/getCity.do", this.province2)
            .then(res => {
              this.citys2 = res.data.city;
              this.citys2.forEach(x => {
                if (x.regionName == bankarr2[1]) this.city2 = x;
              });
              if (!!bankarr2[2]) {
                this.$axios
                  .post("/yulan/areaRegion/getCountry.do", this.city2)
                  .then(res => {
                    this.areas2 = res.data.country;
                    this.areas2.forEach(x => {
                      if (x.regionName == bankarr2[2]) this.area2 = x;
                    });
                  })
                  .catch(err => {
                    console.log(err);
                  });
                // this.dataCity1 = bankarr1[1];
              }
            })
            .catch(err => {
              console.log(err);
            });
          this.areas2 = [];
          // this.dataCity1 = bankarr1[1];
        }
      }

      //初始化一些必要数据↓ ↓↓↓↓
      if (this.cardobj.busientType == "公司") {
        if (this.cardobj.hasPublicAccount == "Y") {
          this.pickWay = "has-has";
          this.account1 = this.cardobj.account1;
          this.account1Bank = this.cardobj.account1Bank;
        } else {
          this.pickWay = "has-no";
          this.account2 = this.cardobj.account2;
          this.account2Bank = this.cardobj.account2Bank;

          // if(this.privateAccountAuthed == "Y")this.addAccountShow = true;
        }
      } else {
        this.pickWay = "no-no";
        this.account2 = this.cardobj.account2;
        this.account2Bank = this.cardobj.account2Bank;
      }
      // this.privateAccountAuthed = this.cardobj.privateAccountAuthed;
      // if(this.cardobj.privateAccountAuthed == "Y")this.addCheck = "yes";

      // //图片区域的数据初始化
      let arr = [
        "公司：三证五证合一",
        "公司：三证五证未合一",
        "个体户：已取得税务登记证",
        "个体户：未取得税务登记证",
        "个人"
      ];
      if (
        this.cardobj.customerentitytypex != "0" &&
        this.cardobj.customerentitytypex != null
      )
        this.accountType = arr[this.cardobj.customerentitytypex - 1];

      this.file1IdcardNo = this.cardobj.file1IdcardNo;
      this.file2BusinesslicenseNo = this.cardobj.file2BusinesslicenseNo;

      this.noEnd = this.cardobj.file2BusinesslicenseNoend == 1; //是否永久有效

      if (this.noEnd == false)
        this.file2BusinesslicenseEnd = this.cardobj.file2BusinesslicenseEnd; //不为长期有效才赋值上去
      this.file4GtqcNo = this.cardobj.file4GtqcNo;

      if (this.cardobj.file1Idcard != "" && this.cardobj.file1Idcard != null) {
        document.getElementById("show").src =
          remoteImageURL +
          this.cardobj.file1Idcard +
          "?t=" +
          Math.random().toFixed(4);
      }
      try {
        this.filesarr[0].posturl = this.cardobj.file1Idcard;
        this.filesarr[1].posturl = this.cardobj.file5IdcardBg;
        this.filesarr[2].posturl = this.cardobj.file2Businesslicense;
        this.filesarr[3].posturl = this.cardobj.file4Gtqc;

        this.filesarr[0].url =
          remoteImageURL +
          this.cardobj.file1Idcard +
          "?t=" +
          Math.random().toFixed(4);
        this.filesarr[1].url =
          remoteImageURL +
          this.cardobj.file5IdcardBg +
          "?t=" +
          Math.random().toFixed(4);
        this.filesarr[2].url =
          remoteImageURL +
          this.cardobj.file2Businesslicense +
          "?t=" +
          Math.random().toFixed(4);
        this.filesarr[3].url =
          remoteImageURL +
          this.cardobj.file4Gtqc +
          "?t=" +
          Math.random().toFixed(4);
      } catch (err) {
        console.log("有图片没路劲的会报错", err);
      }
      this.getWeiTuo();
    }
  },
  computed: {
    // 根据下来菜单确定上传的图片是图片数组的哪一张（index值）
    showImageIndex: function() {
      return this.photoTypesList.indexOf(this.photoType);
    },
    customerentitytypex() {
      switch (this.accountType) {
        case "公司：三证五证合一":
          this.photoTypesList = this.allphotoTypesList.slice(0, 3);
          return 1;
        case "公司：三证五证未合一":
          this.photoTypesList = this.allphotoTypesList;
          return 2;
        case "个体户：已取得税务登记证":
          this.photoTypesList = this.allphotoTypesList;
          return 3;
        case "个体户：未取得税务登记证":
          this.photoTypesList = this.allphotoTypesList.slice(0, 3);
          return 4;
        case "个人":
          this.photoTypesList = this.allphotoTypesList.slice(0, 2);
          return 5;
      }
    },
    hasPublicAccount() {
      if (this.pickWay == "has-has") return "Y";
      else return "N";
    },
    busientType() {
      if (this.pickWay == "has-has" || this.pickWay == "has-no") return "公司";
      else return "个体户";
    },
    account1Location() {
      if (!this.city1.regionName) return this.province1.regionName;
      else if (!this.area1.regionName)
        return this.province1.regionName + "-" + this.city1.regionName;
      else
        return (
          this.province1.regionName +
          "-" +
          this.city1.regionName +
          "-" +
          this.area1.regionName
        );
    },
    account2Location() {
      if (!this.city2.regionName) return this.province2.regionName;
      else if (!this.area2.regionName)
        return this.province2.regionName + "-" + this.city2.regionName;
      else
        return (
          this.province2.regionName +
          "-" +
          this.city2.regionName +
          "-" +
          this.area2.regionName
        );
    },
    //根据store来更新
    accountTypesList() {
      if (this.$store.state.faPiao == "增值税专用发票") {
        if (
          this.accountType == "个体户：已取得税务登记证" ||
          this.accountType == "个体户：未取得税务登记证" ||
          this.accountType == "个人"
        ) {
          this.accountType = "公司：三证五证合一";
        }
        return ["公司：三证五证合一", "公司：三证五证未合一"];
      }
      if (this.$store.state.faPiao == "不开发票") {
        if (this.pickWay == "no-no") {
          this.accountType = "个人";
          return ["个人"];
        } else {
          if (this.accountType == "个人")
            this.accountType = "公司：三证五证合一";
          return [
            "公司：三证五证合一",
            "公司：三证五证未合一",
            "个体户：已取得税务登记证",
            "个体户：未取得税务登记证"
          ];
        }
      }
      if (
        this.$store.state.faPiao == "增值税普通发票" ||
        this.$store.state.faPiao == "电子普通发票"
      ) {
        if (this.pickWay == "no-no") {
          this.accountType = "个人";
          return ["个人"];
        } else {
          if (
            this.accountType == "个人" ||
            this.accountType == "个体户：未取得税务登记证"
          )
            this.accountType = "公司：三证五证合一";
          return [
            "公司：三证五证合一",
            "公司：三证五证未合一",
            "个体户：已取得税务登记证"
          ];
        }
      }
    },
    faPiaoDisable() {
      if (this.$store.state.faPiao == "增值税专用发票") {
        this.pickWay = "has-has";
        return true;
      } else return false;
    }
  },
  mounted() {
    this.$axios
      .post("/yulan/areaRegion/getProvince.do")
      .then(res => {
        this.provinces1 = this.provinces2 = res.data.province;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped>
.loc-wrapper select {
  vertical-align: top;
}
.photo-tip {
  color: red;
}
.el-icon-close {
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 0px;
  color: red;
  font-size: 25px;
}
.checkPhoto {
  border: 1px solid rgb(154, 209, 95);
  padding: 50px;
  background-color: white;
  z-index: 101;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
.checkPhoto img {
  max-height: 500px;
  max-width: 500px;
}
#chacha-close {
  right: -110px;
}
.gray-word {
  height: 24px;
  font-family: MicrosoftYaHeiUI;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 18px;
  letter-spacing: 0px;
  color: #8a8d8a;
  margin: 20px 0;
}
.wrapper-jun {
  font-family: "微软雅黑";
  padding: 0px 60px 0 60px;
  box-sizing: border-box;
  width: 100%;
}
.div1 {
  width: 100%;
  margin: 0 5%;
}
.ways {
  text-align: center;
  line-height: 140px;
  float: left;
  font-size: 16px;
}
.ways-contents {
  padding-top: 10px;
  margin-left: 100px;
  font-size: 14px;
}
.ways-contents > input {
  border-radius: 50%;
  position: relative;
}
label {
  line-height: 40px;
  font-size: 14px;
  cursor: pointer;
}
input[type="radio"] + label::before {
  cursor: pointer;
  content: "";
  display: inline-block;
  vertical-align: middle;
  position: relative;
  top: -2px;
  font-size: 12px;
  width: 1em;
  height: 1em;
  margin-right: 0.4em;
  border-radius: 50%;
  border: 1px solid #7f7f7f;
  text-indent: 0.15em;
  padding: 0.2em;
  /*注意这里有个padding，这是为了裁切背景色的时候让内容和边框留个间隙，这样就形成了Radio的外观*/
}
input[type="radio"]:checked + label::before {
  background-color: #a7d64b;
  background-clip: content-box;
}
input[type="radio"] {
  position: absolute;
  opacity: 0; /*完全透明*/
}
.add-account > span {
  margin-left: 33px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.download {
  cursor: pointer;
  margin-left: 33px;
  margin-right: 20px;
  color: #c5c6c5;
}
.download a {
  color: #c5c6c5;
}
.download a:visited {
  color: #a6d64c;
}
.alert-block {
  color: #a6d64c;
  cursor: pointer;
}
/*第二块---------------------------------公司和个人-------------------*/
/*左边*/

.readonly {
  background-color: #e9eeeb;
}
i {
  font-style: normal;
  font-size: 18px;
  display: inline-block;
  width: 280px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.bankwrapper::after {
  content: "";
  display: block;
  clear: both;
}
.company {
  width: 50%;
  float: left;
}
/*右边*/
.personal {
  width: 50%;
  margin-left: 50%;
}
/*小标题*/
.account-info {
  font-size: 18px;
  line-height: 30px;
}
.company span,
.personal span {
  display: inline-block;
  width: 100px;
  font-size: 16px;
}
.company div,
.personal div {
  padding: 10px 0;
}
.wrapper-jun input[type="text"] {
  width: 260px;
  height: 25px;
  border: solid 1px #a0a0a0;
  padding: 0 10px;
  font-size: 14px;
  outline: none;
}
.wrapper-jun select {
  width: 104px;
  height: 26px;
  font-size: 16px;
  line-height: 20px;
  background-color: transparent;
}
.wrapper-jun .acount-type {
  width: 300px;
  font-size: 16px;
}
.photo-wrapper-left {
  float: left;
  width: 350px;
}
.photo-wrapper-left > img {
  display: block;
  margin-top: 20px;
  width: 300px;
  height: 200px;
  border: 1px solid rgb(192, 192, 192);
}
.photo-wrapper-right {
  margin-left: 350px;
  height: 300px;
}
.photo-wrapper-right .license-type {
  position: relative;
  top: -11px;
  width: 300px;
}
/*选择文件标签*/
.a-upload {
  padding: 4px 10px;
  height: 20px;
  line-height: 20px;
  position: relative;
  top: -3px;
  cursor: pointer;
  color: white;
  text-decoration: none;
  background-image: linear-gradient(74deg, #a7d64b 1%, #82c985 100%),
    linear-gradient(#a5d050, #a5d050);
  border-radius: 4px;
  overflow: hidden;
  display: inline-block;
  *display: inline;
  *zoom: 1;
}

.a-upload input {
  position: absolute;
  font-size: 100px;
  right: 0;
  top: 0;
  opacity: 0;
  filter: alpha(opacity=0);
  cursor: pointer;
}
h1 {
  color: #4d4d4d;
  font-family: "MicrosoftYaHeiUI";
  line-height: 100px;
  font-weight: normal;
}
.number-wrapper {
  line-height: 60px;
  font-size: 16px;
}
.IDcard {
  width: 200px !important;
}
input[type="checkbox"] + label::before {
  content: "\a0"; /*不换行空格*/
  font-size: 180%;
  display: inline-block;
  vertical-align: 0.2em;
  width: 0.8em;
  height: 0.8em;
  margin-right: 0.2em;
  background-color: #e5f3cb;
  text-indent: 0.15em;
  line-height: 0.65; /*行高不加单位，子元素将继承数字乘以自身字体尺寸而非父元素行高*/
  border: 1px solid #a4d041;
  position: relative;
  top: 8px;
}
input[type="checkbox"]:checked + label::before {
  content: "\2714";
  font-size: 180%;
  color: #769b20;
  background-color: #e5f3cb;
}
input[type="checkbox"] {
  position: absolute;
  clip: rect(0, 0, 0, 0);
}
input[type="date"]::-webkit-clear-button {
  display: none;
}
button {
  outline: none;
  cursor: pointer;
  border-radius: 10px;
  margin: 10px 30px 50px;
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
}
</style>

<style>
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 150px;
  height: 30px;
}
.el-input__inner {
  height: 30px;
  border-color: #a0a0a0;
}
.distpicker-address-wrapper {
  display: inline-block;
}
.distpicker-address-wrapper select {
  width: 100px;
  padding: 0 0 0 4px;
  height: 27px;
  border: solid 1px #a0a0a0;
  font-size: 16px;
}
.wrapper-jun .el-popup-parent--hidden {
  overflow-x: hidden !important;
  overflow-y: scroll !important;
}
.wrapper-jun .el-button--primary {
  border-color: rgb(160, 212, 86) !important;
  background-color: rgb(160, 212, 86) !important;
}
.wrapper-jun .el-button:hover {
  border-color: rgb(160, 212, 86) !important;
  background-color: white !important;
  color: rgb(160, 212, 86) !important;
}
.wrapper-jun .el-button--primary:hover {
  border-color: rgb(160, 212, 86) !important;
  background-color: rgb(160, 212, 86) !important;
  color: white !important;
}
</style>

