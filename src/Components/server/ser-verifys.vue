<template>
  <div class="verifys-wrapper" ref="VerifysLoad">
    <div class="temp">
      <div ref="verifysLeap" style="height:40px"></div>
      <i class="el-icon-close" @click="dispear"></i>
      <!-- 1 -->
      <h2>基本信息</h2>
      <div class="content">
        <div class="filesLeft">
          <div class="person">
            <img src="../../assets/images/头像.png" />
            <span class="cliName">{{cardobj.cname}}</span>
          </div>
          <div class="intention">
            <p class="title">意向品牌</p>
            <div class="inteninput">
              <input
                type="checkbox"
                disabled="disabled"
                name="brand"
                id="WallPaper"
                v-model="databool1"
              />
              <label for="WallPaper">玉兰（墙纸类产品）</label>
              <br />
              <input
                type="checkbox"
                disabled="disabled"
                name="brand"
                id="SoftProducts"
                v-model="databool2"
              />
              <label for="SoftProducts">玉兰·兰居尚品（软装类产品）</label>
            </div>
          </div>

          <div class="nowBrand">
            <p class="title">主营品牌（非玉兰）</p>
            <input
              type="text"
              name="brandName"
              readonly="brandName"
              class="readOnly"
              :value="cardobj.currentProduct"
            />
          </div>
          <div class="receipt">
            <p class="title">发票开具类型</p>
            <input
              class="readOnly"
              readonly
              type="text"
              :value="cardobj.invoiceType"
              style="width:135px"
            />
          </div>
          <div class="taxPayer">
            <p class="title">一般纳税人</p>
            <input
              type="radio"
              disabled
              name="payerType"
              value="yes"
              id="yes"
              v-model="taxPayerType"
            />
            <label for="yes">是</label>
            <input
              type="radio"
              disabled
              name="payerType"
              value="not"
              id="not"
              v-model="taxPayerType"
            />
            <label for="not">否</label>
          </div>

          <div class="message1" v-show="isShow1">
            <p class="title">接收邮箱</p>
            <input
              type="text"
              name="email1"
              v-model="cardobj.recipeTargetMb"
              readonly
              class="readOnly"
            />
          </div>

          <div class="message2" v-show="isShow2">
            <p class="title">增值税发票开票信息</p>
            <div class="address">
              <p class="title">地址</p>
              <input
                type="text"
                name="invAddress"
                v-model="cardobj.invAddress"
                readonly
                class="readOnly"
              />
            </div>
            <div class="telephone">
              <p class="title">电话</p>
              <input
                type="text"
                name="invTelephone"
                v-model="cardobj.invTelephone"
                readonly
                class="readOnly"
              />
            </div>
            <div class="bank">
              <p class="title">开户银行</p>
              <input
                type="text"
                name="invBank"
                v-model="cardobj.invBankname"
                readonly
                class="readOnly"
              />
            </div>
            <div class="bankAccount">
              <p class="title">银行账号</p>
              <input
                type="text"
                name="invBanmaccount"
                v-model="cardobj.invBanmaccount"
                readonly
                class="readOnly"
              />
            </div>
          </div>
        </div>
        <div class="filesRight">
          <div class="owner">
            <p class="title">法人代表/经营者</p>
            <input
              type="text"
              name="ownerName"
              readonly="ownerName"
              class="readOnly"
              :value="cardobj.xJuridicPerson"
            />
          </div>
          <div class="owner">
            <p class="title">主营区域</p>
            <input
              type="text"
              name="area"
              readonly="area"
              class="readOnly"
              :value="cardobj.marketname"
            />
          </div>
          <div class="owner">
            <p class="title">店面面积 (平方米)</p>
            <input type="text" name="space" readonly class="readOnly" :value="cardobj.shopArea" />
          </div>
          <div class="owner">
            <p class="title">法人手机</p>
            <input
              type="text"
              name="tel"
              readonly
              class="readOnly"
              :value="cardobj.juridicPersonHandset"
            />
          </div>
        </div>
      </div>

      <!-- 2 -->
      <h2>业务信息</h2>
      <div class="content">
        <div class="filesLeft">
          <div class="content-wrapper">
            <p class="title">联系人</p>
            <input type="text" readonly="contacts" class="readOnly" v-model="cardobj.txAgentName" />
          </div>
          <div class="content-wrapper">
            <p class="title">手机</p>
            <input type="text" readonly="phone" class="readOnly" v-model="cardobj.xHandset2" />
          </div>
          <div class="content-wrapper">
            <p class="title">QQ</p>
            <input type="text" class="readOnly" readonly v-model="cardobj.qq" />
          </div>
          <div class="content-wrapper">
            <p class="title">通讯地址</p>
            <!-- <input type="text" readonly="address" class="readOnly" v-model="cardobj.xPostAddress"> -->
            <div class="longAddress">{{cardobj.xPostAddress}}</div>
          </div>
        </div>
        <div class="fliesRight">
          <div class="content-wrapper">
            <p class="title">电话</p>
            <input
              type="text"
              name="phone"
              readonly="phone"
              class="readOnly"
              v-model="cardobj.xOfficeTel"
            />
          </div>
          <div class="content-wrapper">
            <p class="title">传真</p>
            <input type="text" name="xFax" v-model="cardobj.xFax" readonly class="readOnly" />
          </div>
          <div class="content-wrapper">
            <p class="title">E-mail</p>
            <input type="text" name="xEmail" v-model="cardobj.xEmail" readonly class="readOnly" />
          </div>
          <div class="content-wrapper">
            <p class="title">邮编</p>
            <input type="text" name="xZipCpde" v-model="cardobj.xZipCode" readonly class="readOnly" />
          </div>
        </div>
      </div>
      <!-- 3 -->
      <h2>物流信息</h2>
      <div class="content">
        <div class="filesLeft">
          <div class="contact">
            <p class="title">联系人</p>
            <input type="text" class="readOnly" readonly v-model="cardobj.wlAgentName" />
          </div>
          <div class="mobilephone">
            <p class="title">物流手机</p>
            <input type="text" class="readOnly" readonly v-model="cardobj.xHandset" />
          </div>
          <div class="delivery">
            <p class="title">收货地址</p>
            <!-- <input type="text" class="readOnly" readOnly v-model="cardobj.xDeliveryAdress"> -->
            <div class="longAddress">{{cardobj.xDeliveryAdress}}</div>
          </div>
        </div>
        <div class="filesRight">
          <div class="telephone">
            <p class="title">电话</p>
            <input type="text" class="readOnly" readonly="phone" v-model="cardobj.xOfficeTel1" />
          </div>
          <div class="fax">
            <p class="title">传真</p>
            <input type="text" class="readOnly" readonly name="faxWl" v-model="cardobj.faxWl" />
          </div>
          <div class="emailAddress">
            <p class="title">邮编</p>
            <input
              type="text"
              class="readOnly"
              readonly
              name="zipCodeWl"
              v-model="cardobj.zipCodeWl"
            />
          </div>
        </div>
      </div>
      <!-- 4 -->
      <h2>银行账户</h2>
      <div class="wrapper-jun">
        <div class="div1">
          <serDepute
            v-show="showcliDepute"
            :ccid="this.cardobj.cid"
            :year="this.cardobj.contractyear"
            @dispearDepute="dispearDepute()"
            @showDeputePhoto="showPhoto"
            style="position:absolute;top:100px;"
          ></serDepute>

          <div class="ways">经营方式</div>
          <form class="ways-contents">
            <input
              disabled
              type="radio"
              v-model="pickWay"
              value="has-has"
              id="has-has"
              name="bussiness-way"
            />
            <label for="has-has">&nbsp;&nbsp;有营业执照-有对账公号&nbsp;&nbsp;&nbsp;（请仅填公司汇款账号信息）</label>
            <br />
            <input
              disabled
              type="radio"
              v-model="pickWay"
              value="has-no"
              id="has-no"
              name="bussiness-way"
            />
            <label for="has-no">&nbsp;&nbsp;有营业执照-无对账公号&nbsp;&nbsp;&nbsp;（请仅填个人汇款账号信息）</label>
            <br />
            <!-- <div class="add-account" v-show="isShow">
              <a class="alert-block" @click="moreMessageInput">查看授权委托账号信息及附件</a>
            </div>-->
            <input
              disabled
              type="radio"
              v-model="pickWay"
              value="no-no"
              id="no-no"
              name="bussiness-way"
            />
            <label for="no-no">&nbsp;&nbsp;无营业执照&nbsp;&nbsp;&nbsp;（请仅填个人汇款账号信息）</label>
            <br />
          </form>

          <div class="bankwrapper">
            <div class="company" v-show="cardobj.hasPublicAccount == 'Y'">
              <div class="account-info">公司汇款账号信息</div>
              <div>
                <span>汇款人</span>
                <input type="text" v-model="cardobj.account1Name" class="readOnly" readonly />
              </div>
              <div>
                <span>汇款银行</span>
                <input type="text" v-model="cardobj.account1Bank" class="readOnly" readonly />
              </div>
              <div>
                <span>账号</span>
                <input type="text" v-model="cardobj.account1" class="readOnly" readonly />
              </div>
              <!-- <div><span>银行所在地</span><input type="text" v-model="cardobj.account1Location" readOnly class="readOnly"></div> -->
              <div>
                <span>银行所在地</span>
                <div
                  class="longAddress"
                  style="display:inline-block;padding:0 10px;vertical-align:top"
                >{{cardobj.account1Location}}</div>
              </div>
            </div>
            <div class="company" v-show="cardobj.hasPublicAccount == 'N'">
              <div class="account-info">个人汇款信息</div>
              <div>
                <span>汇款人</span>
                <input type="text" class="readOnly" readonly v-model="cardobj.account2Name" />
              </div>
              <div>
                <span>汇款银行</span>
                <input type="text" class="readOnly" readonly v-model="cardobj.account2Bank" />
              </div>
              <div>
                <span>账号</span>
                <input type="text" class="readOnly" readonly v-model="cardobj.account2" />
              </div>
              <!-- <div><span>银行所在地</span><input type="text" v-model="cardobj.account2Location" readOnly class="readOnly"></div> -->
              <div>
                <span>银行所在地</span>
                <div
                  class="longAddress"
                  style="display:inline-block;padding:0 10px;vertical-align:top"
                >{{cardobj.account2Location}}</div>
              </div>
            </div>
          </div>
          <div>
            <p>账号实体对应的类型</p>
            <input type="text" v-model="accountType" readonly class="readOnly" />
          </div>
          <div class="gray-word">*点击图片查看大图</div>
          <div class="photos-infos">
            <!-- 1 -->
            <div class="photos-info">
              <img
                class="photo-show"
                id="show"
                alt
                :src="file1Idcard"
                @click="showPhoto2(file1Idcard)"
              />
              <div class="photo-title">1-身份证头像面</div>
              <div class="photo-message">{{cardobj.file1Op}}</div>
              <div class="info-wrapper">
                身份证号：
                <input
                  type="text"
                  name="IDcard"
                  class="IDcard readOnly"
                  v-model="cardobj.file1IdcardNo"
                  readonly
                />
              </div>
            </div>
            <!-- 2 -->
            <div class="photos-info">
              <img
                class="photo-show"
                id="show"
                alt
                :src="file5IdcardBg"
                @click="showPhoto2(file5IdcardBg)"
              />
              <div class="photo-title">2-身份证国徽面</div>
              <div class="photo-message">{{cardobj.file5Op}}</div>
            </div>
            <!-- 3 -->
            <div class="photos-info" v-show="card3Show">
              <img
                class="photo-show"
                id="show"
                alt
                :src="file2Businesslicense"
                @click="showPhoto2(file2Businesslicense)"
              />
              <div class="photo-title">3-营业执照</div>
              <div class="photo-message">{{cardobj.file2Op}}</div>
              <div class="info-wrapper">
                营业执照注册号：
                <input
                  type="text"
                  name="IDcard"
                  class="IDcard readOnly"
                  readonly
                  v-model="cardobj.file2BusinesslicenseNo"
                />
              </div>
              <div class="info-wrapper">
                营业执照有效期：
                <input
                  type="text"
                  class="IDcard readOnly"
                  readonly
                  :value="cardobj.file2BusinesslicenseNoend == 0?cardobj.file2BusinesslicenseEnd:'长期有效'"
                />
              </div>
            </div>
            <!-- 4 -->
            <div class="photos-info" v-show="card4Show">
              <img class="photo-show" id="show" alt :src="file4Gtqc" @click="showPhoto2(file4Gtqc)" />
              <div class="photo-title">4-税务登记证（国税）</div>
              <div class="photo-message">{{cardobj.file4Op}}</div>
              <div class="info-wrapper">
                税务证号：
                <input
                  type="text"
                  v-model="cardobj.file4GtqcNo"
                  name="IDcard"
                  class="IDcard readOnly"
                  readonly
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 通过，退回 -->
      <div class="button">
        <button @click="queding" v-show="showBtn">确定</button>
        <button @click="tuihuiReason" v-show="showBtn">退回</button>
      </div>
      <div class="hide" v-show="hide">
        <div class="back">
          <p>*请说明退回资料卡的理由，客户将根据您的理由修改后再次发送:</p>
          <textarea name="reason" cols="30" rows="10" v-model="reason"></textarea>
        </div>
        <div class="button">
          <button @click="tuihui">提交</button>
        </div>
      </div>
    </div>
    <div ref="tuihuiBtn"></div>
    <review-record :recordTitle="recordTitle" :recordArr="recordArr"></review-record>
  </div>
</template>

<script>
var ms = {
  //身份和中文翻译
  SALEMAN_M: "办事处经理",
  SALEMAN_S: "业务经理",
  BILLDEP_APPROVE: "订单部"
};
var remoteImageURL = "http://14.29.221.109:10250/upload";
var loadingInstance; //加载
import serDepute from "@/Components/server/ser-depute";
import reviewRecord from "@/Components/review-record";
import { Loading } from "element-ui";
import { UpdateState, GetCardByCustomer } from "@/api/card";

export default {
  name: "ser-verifys",
  components: { serDepute, reviewRecord },
  props: {
    cid: "",
    showBtn: "",
    year: ""
  },
  data() {
    return {
      showBP: false,
      bigRouter: "",
      cardobj: {},
      databool1: false, //bool1
      databool2: false, //bool2
      preferedbrand: "", //最后要传的意向品牌，搞定
      isShow1: false,
      isShow2: false,
      invoiceType: "", //发票类型
      taxPayerType: "",

      //4------四张图片路径
      file1Idcard: "",
      file2Businesslicense: "",
      file4Gtqc: "",
      file5IdcardBg: "",

      //根据accountType显示三四张图片的逻辑变量
      card3Show: true,
      card4Show: true,

      // hasPublicAccount:"",//有无对公账号
      showcliDepute: false, //是否显示配偶信息填入块
      pickWay: "has-has", //经验方式
      addCheck: "no", //是否增加委托账号
      addAccountShow: false, //是否显示下载，相关人的那一行的
      isShow: false, //经营方式是有营业执照-无对账公号显示的方块
      isDisable: false, //通过经营方式来判断账号可输入的是左边还是右边

      //杂项数据
      //customerentitytypex:1,
      file1IdcardNo: "", //身份证号
      file2BusinesslicenseNo: "", //营业执照注册号
      indate: "", //营业执照有效期
      file4GtqcNo: "",

      accountTypesList: [
        "公司：三证五证合一",
        "公司：三证五证未合一",
        "个体户：已取得税务登记证",
        "个体户：未取得税务登记证",
        "个人"
      ],
      accountType: "",
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
      suiwuShow: false, //税务填框
      //退回理由块
      hide: false,
      reason: "",
      position: this.$store.state.user.pos[0].position,
      recordTitle: "", //传给评审记录的数据
      recordArr: [] //传给评审记录的数据
    };
  },
  methods: {
    rotate() {
      this.deg += 90;
      if (this.deg >= 360) {
        this.deg = 0;
      }
    },
    //点击小图看大图
    showPhoto(newP) {
      if (newP == "" || newP == null || !newP) {
        this.$alert("暂无该图片数据");
        return;
      }
      this.showBP = true;
      this.bigRouter = newP;
    },
    // 营业执照，税务登记证这些大图，就打开浏览器看吧，后来改成全部都是浏览器打开了
    showPhoto2(newP) {
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
    //审核资料卡红叉关闭
    dispear() {
      this.$emit("close", false);
      this.$refs.verifysLeap.scrollIntoView();
      this.hide = false;
    },
    // 查看附件（配偶）
    moreMessageInput() {
      this.showcliDepute = true;
    },
    //退回，通过，这个操作后要刷新那一页的展示，调用一次ajax请求
    // BUSINESSCHECKING --- 业务员审核中
    // BIILDEPCHECKING --- 订单部审核中
    queding() {
      let position = this.$store.state.user.pos[0].position;
      if (position == "SALEMAN_M" || position == "SALEMAN_S") {
        // this.$axios
        //   .post("/yulan/infoState/bussinessCheckCustomerInfoCard.do", {
        //     cid: this.cid,
        //     state: "BIILDEPCHECKING",
        //     memo: this.memo + "通过;"
        //   })
        UpdateState({
          cid: this.cid,
          year: this.year,
          state: "BIILDEPCHECKING",
          memo: this.memo + "通过;"
        }).then(res => {
          this.$alert("审核成功！状态更新为：订单部审核中");
          this.$emit("close", false);
          //location.reload();
          this.updatePage(); //小刷新
        });
        this.hide = false;
      } else if (position == "BILLDEP_APPROVE") {
        // this.$axios
        //   .post("/yulan/infoState/bussinessCheckCustomerInfoCard.do", {
        //     cid: this.cid,
        //     state: "APPROVED",
        //     memo: this.memo + "通过;"
        //   })
        UpdateState({
          cid: this.cid,
          year: this.year,
          state: "APPROVED",
          memo: this.memo + "通过;"
        }).then(res => {
          this.$alert("审核成功！状态更新为：已通过");
          this.$emit("close", false);
          //location.reload();
          this.updatePage(); //小刷新
        });
        this.hide = false;
      } else {
        this.$alert("对不起，您没有权限执行通过操作");
      }
    },
    tuihui() {
      if (this.reason == "") {
        this.$alert("退回理由不能为空");
        return false;
      }
      let position = this.$store.state.user.pos[0].position;
      if (
        position == "BILLDEP_APPROVE" ||
        position == "SALEMAN_M" ||
        position == "SALEMAN_S"
      ) {
        // this.$axios
        //   .post("/yulan/infoState/bussinessCheckCustomerInfoCard.do", {
        //     cid: this.cid,
        //     state: "CUSTOMERPORCESSING2", //正确
        //     memo: this.memo + "退回，原因是 [" + this.reason + "];"
        //   })
        UpdateState({
          cid: this.cid,
          year: this.year,
          state: "CUSTOMERPORCESSING2",
          memo: this.memo + "退回，原因是 [" + this.reason + "];"
        }).then(res => {
          this.$alert("退回该客户资料卡成功");
          this.$emit("close", false);
          //location.reload();
          this.updatePage(); //小刷新
        });
        this.hide = false;
      } else {
        this.$alert("对不起，您没有权限执行退回操作");
      }
    },
    tuihuiReason() {
      this.hide = true;
    },
    //触发父组件事件更新当前页的数据
    updatePage() {
      this.$emit("updatePage");
    },
    dispearDepute() {
      this.showcliDepute = false;
    },
    //获取委托状态
    getWeiTuo() {
      this.$axios
        .post("/yulan/customerInfo/getYLcontract.do", {
          ccid: this.cardobj.cid,
          ccyear: this.cardobj.contractyear
        })
        .then(res => {
          if (res.data.code == 0) this.addCheck = "yes";
          else if (res.data.code == 1) this.addCheck = "no";
          if (this.addCheck == "yes") this.isShow = true;
          else this.isShow = false;
        })
        .catch(err => {
          console.log("拿委托状态错误呀");
        });
    }
  },
  watch: {
    // cidYear(newV) {
    //   if(newV.cid){
    //   //新进卡片图片先清空
    //   this.file1Idcard = "";
    //   this.file2Businesslicense = "";
    //   this.file4Gtqc = "";
    //   this.file5IdcardBg = "";
    //   this.accountType = ""; //账户类型也先清空
    //   loadingInstance = Loading.service(this.$refs.VerifysLoad); //开始加载

    //   // this.$axios
    //   //   .post("/yulan/customerInfo/getCustomerInfo.do", {
    //   //     CID: newV
    //   //   })
    //   GetCardByCustomer({ cid: newV.cid, year: newV.year })
    //     .then(res => {
    //       if (res.data != null && res.data.length > 0) {
    //         this.cardobj = res.data[0];
    //         // //发送请求拿评审的数据
    //         this.$axios
    //           .post("/yulan/infoState/getCustomerInfoCardState.do", {
    //             cid: newV.cid,
    //             year: this.cardobj.contractyear
    //           })
    //           .then(res2 => {
    //             this.recordTitle = res2.data.customerInfo;
    //             if (this.cardobj.state == "ONCREATE")
    //               this.recordTitle = "资料卡确认中";
    //             if (res2.data.memo) this.recordArr = res2.data.memo.reverse();
    //           })
    //           .catch(err => {
    //             console.log("拿评审记录数据错误?" + err);
    //           });
    //       }
    //     })
    //     .catch(function(err) {
    //       console.log("cards检查拿对象报错", err);
    //     });
    //   }
    // },
    cardobj(newV) {
      this.getWeiTuo();
      if (newV.preferedbrand) {
        this.preferedbrand = newV.preferedbrand;
        this.databool1 = this.preferedbrand.indexOf("墙纸") != -1;
        this.databool2 = this.preferedbrand.indexOf("软装") != -1;
      }
      this.invoiceType = this.cardobj.invoiceType || ""; //发票类型
      this.accountType = this.accountTypesList[newV.customerentitytypex - 1]; //账号类型
      // this.hasPublicAccount = this.cardobj.hasPublicAccount;//有无对公账号

      //经营方式
      if (newV.busientType == "公司") {
        if (newV.hasPublicAccount == "Y") this.pickWay = "has-has";
        else {
          this.pickWay = "has-no";
          // if(newV.privateAccountAuthed == "Y")this.isShow = true;
          // else this.isShow = false;
        }
      } else {
        this.pickWay = "no-no";
      }

      //4---图片赋值
      if (newV.file1Idcard)
        this.file1Idcard = remoteImageURL + newV.file1Idcard;
      if (newV.file2Businesslicense)
        this.file2Businesslicense = remoteImageURL + newV.file2Businesslicense;
      if (newV.file4Gtqc) this.file4Gtqc = remoteImageURL + newV.file4Gtqc;
      if (newV.file5IdcardBg)
        this.file5IdcardBg = remoteImageURL + newV.file5IdcardBg;
      loadingInstance.close();
    },
    //发票类型
    invoiceType() {
      if (
        this.invoiceType == "不开发票" ||
        this.invoiceType == "增值税普通发票"
      ) {
        this.taxPayerType = "not";
      }
      if (this.invoiceType == "电子普通发票") {
        this.isShow1 = true;
        this.taxPayerType = "not";
      } else {
        this.isShow1 = false;
      }
      if (this.invoiceType == "增值税专用发票") {
        this.isShow2 = true;
        this.taxPayerType = "yes";
      } else {
        this.isShow2 = false;
      }
    },
    //五下拉列表的那个
    accountType() {
      this.photoType = "1-身份证头像面";
      switch (this.accountType) {
        case "公司：三证五证合一":
          this.photoTypesList = this.allphotoTypesList.slice(0, 3);
          this.card3Show = true;
          this.card4Show = false;
          break;
        case "公司：三证五证未合一":
          this.photoTypesList = this.allphotoTypesList;
          this.card3Show = true;
          this.card4Show = true;
          break;
        case "个体户：已取得税务登记证":
          this.photoTypesList = this.allphotoTypesList;
          this.card3Show = true;
          this.card4Show = true;
          break;
        case "个体户：未取得税务登记证":
          this.photoTypesList = this.allphotoTypesList.slice(0, 3);
          this.card3Show = true;
          this.card4Show = false;
          break;
        case "个人":
          this.photoTypesList = this.allphotoTypesList.slice(0, 2);
          this.card3Show = false;
          this.card4Show = false;
          break;
      }
    },
    hide: function() {
      this.$nextTick(() => {
        this.$refs.tuihuiBtn.scrollIntoView(false);
      });
    }
  },
  computed: {
    images() {
      var images = [
        this.file1Idcard,
        this.file2Businesslicense,
        this.file4Gtqc,
        this.file5IdcardBg
      ];
      return images;
    },
    nowMonth() {
      let month = "0" + (new Date().getMonth() + 1);
      return month.substr(month.length - 2);
    },
    nowDate() {
      let date = "0" + new Date().getDate();
      return date.substr(date.length - 2);
    },
    nowHour() {
      let hour = "0" + new Date().getHours();
      return hour.substr(hour.length - 2);
    },
    nowMinute() {
      let minute = "0" + new Date().getMinutes();
      return minute.substr(minute.length - 2);
    },
    memo() {
      //评审记录
      let nowTime =
        new Date().getFullYear() +
        "-" +
        this.nowMonth +
        "-" +
        this.nowDate +
        " " +
        this.nowHour +
        ":" +
        this.nowMinute +
        " ";
      let memo =
        nowTime +
        "被" +
        ms[this.position] +
        this.$store.state.user.data.realName;
      return memo;
    },
    cidYear() {
      return {
        cid: this.cid,
        year: this.year
      };
    }
  },
  mounted() {
    if (this.cid) {
      //新进卡片图片先清空
      this.file1Idcard = "";
      this.file2Businesslicense = "";
      this.file4Gtqc = "";
      this.file5IdcardBg = "";
      this.accountType = ""; //账户类型也先清空
      loadingInstance = Loading.service(this.$refs.VerifysLoad); //开始加载
      GetCardByCustomer({ cid: this.cid, year: this.year })
        .then(res => {
          if (res.data != null && res.data.length > 0) {
            this.cardobj = res.data[0];
            // //发送请求拿评审的数据
            this.$axios
              .post("/yulan/infoState/getCustomerInfoCardState.do", {
                cid: this.cid,
                year: this.cardobj.contractyear
              })
              .then(res2 => {
                this.recordTitle = res2.data.customerInfo;
                if (this.cardobj.state == "ONCREATE")
                  this.recordTitle = "资料卡确认中";
                if (res2.data.memo) this.recordArr = res2.data.memo.reverse();
              })
              .catch(err => {
                console.log("拿评审记录数据错误?" + err);
              });
          }
        })
        .catch(function(err) {
          console.log("cards检查拿对象报错", err);
        });
    }
  }
};
</script>

<style scoped>
/*对那些地址比较长的不写input写成div了才够显示*/
.longAddress {
  width: 260px;
  line-height: 25px;
  border: solid 1px rgb(160, 160, 160) !important;
  padding: 0 10px;
  font-size: 14px;
  background-color: #e9eeeb;
}
.temp {
  width: 900px;
  margin: 0 auto;
  /* margin-left: 100px; */
}
.verifys-wrapper {
  border: 1px solid #86cb7e;
  width: 100%;
  height: 700px;
  overflow-y: scroll;
  overflow-x: hidden;
  background-color: white;
}
.el-icon-close {
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 30px;
  color: red;
  font-size: 25px;
}
h2 {
  margin: 0;
  color: rgb(142, 196, 137);
  margin-left: 60px;
  font-weight: normal;
  font-family: "微软雅黑";
}
h2::before {
  content: "";
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: rgb(142, 196, 137);
  border-radius: 50%;
  position: relative;
  top: -4px;
  margin-right: 15px;
}
/*-------------------------------1*/
.page {
  background-color: #ffffff;
  border-radius: 10px;
}
.content {
  padding: 20px 0 0 50px;
}
.content::after {
  content: "";
  display: block;
  clear: both;
}
.filesLeft {
  float: left;
  margin-left: 10px;
  margin-right: 100px;
  width: 330px;
}
.content div {
  margin-bottom: 10px;
}
p.title {
  font-family: "微软雅黑";
  font-size: 16px;
  margin-bottom: 10px;
}

/*以下是左边的样式*/
.person {
  height: 40px;
}
.person img {
  height: 40px;
  float: left;
}
.cliName {
  font-size: 16px;
  margin-left: 10px;
  vertical-align: -9px;
}
p {
  margin-bottom: 10px;
}

.receipt p {
  display: inline-block;
  margin-right: 25px;
}
.inteninput,
.recinput {
  display: inline-block;
}

.taxPayer p {
  display: inline-block;
  margin-right: 40px;
}
/* .address p,
.telephone p {
  display: inline-block;
  margin-right: 42px;
} */
.bank p,
.bankAccount p {
  display: inline-block;
  margin-right: 10px;
}
/*下面调各种按钮的样式*/
label {
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
/* input[type="checkbox"] + label::before, */
input[type="radio"]:checked + label::before {
  background-color: #a7d64b;
  background-clip: content-box;
}
/* input[type="checkbox"], */
input[type="radio"] {
  position: absolute;
  opacity: 0; /*完全透明*/
}

.intention p {
  display: inline-block;
  margin-right: 54px;
}

/* input[type="text"] {
  width: 250px;
  font-size: 12px;
  font-family: "宋体";
  height: 20px;
} */
input[type="text"] {
  width: 260px;
  height: 25px;
  border: solid 1px #a0a0a0;
  padding: 0 10px;
  font-size: 14px;
  outline: none;
}
.readOnly {
  border: solid 1px #e9eeeb;
  background-color: #e9eeeb;
  height: 25px;
}
button {
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
}

/*4------------*/
.gray-word {
  height: 24px;
  font-family: MicrosoftYaHeiUI;
  font-size: 20px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 18px;
  letter-spacing: 0px;
  color: #df4141;
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
div .add-account {
  margin-bottom: 0px;
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
.alert-block {
  color: #a6d64c;
  cursor: pointer;
}
/*第二块---------------------------------公司和个人-------------------*/
/*左边*/

.readonly {
  background-color: #e9eeeb;
}
/* i{
    font-style: normal;  
    font-size: 18px;
    display: inline-block;
    width: 280px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
} */
.bankwrapper::after {
  content: "";
  display: block;
  clear: both;
}
.company {
  width: 50%;
  display: block;
}
/*右边*/
.personal {
  width: 50%;
  margin-left: 50%;
}
/*小标题*/
.account-info {
  text-align: center;
  font-size: 16px;
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
  width: 280px;
  height: 200px;
  border: 1px solid rgb(192, 192, 192);
}
.photo-wrapper-right {
  margin-left: 350px;
  /* height: 300px; */
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

/*图片*/
.photo-block {
  height: 240px;
}
.photo-block:after {
  content: "";
  clear: both;
  display: block;
}

h1 {
  color: #4d4d4d;
  font-family: "MicrosoftYaHeiUI";
  line-height: 100px;
  font-weight: normal;
}
.number-wrapper {
  line-height: 50px;
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
}

.back {
  width: 100%;
}
.back textarea {
  width: 600px;
  margin: 10px 200px;
  resize: none;
}
.back p {
  font-size: 16px;
  text-align: center;
}
.photos-infos:after {
  content: "";
  display: block;
  clear: both;
}
.photos-infos .photos-info {
  float: left;
  font-size: 16px;
  width: 50%;
  height: 350px;
}
.photos-infos .photos-info * {
  font-size: 16px;
}
.photos-infos .photos-info .photo-show {
  display: block;
  margin: 0 auto;
  width: 280px;
  height: 200px;
  border: 1px solid rgb(192, 192, 192);
}
.photos-infos .photos-info .photo-title {
  font-size: 24px;
  text-align: center;
}
.photos-infos .photos-info .photo-message {
  font-size: 16px;
  text-align: center;
}
.photos-infos .photos-info .info-wrapper {
  margin-bottom: 10px;
  text-align: center;
}
</style>

<style>
.verifys-wrapper .el-popup-parent--hidden {
  overflow-x: hidden !important;
  overflow-y: scroll !important;
}
.verifys-wrapper .el-button--primary {
  border-color: rgb(160, 212, 86) !important;
  background-color: rgb(160, 212, 86) !important;
}
.verifys-wrapper .el-button:hover {
  border-color: rgb(160, 212, 86) !important;
  background-color: white !important;
  color: rgb(160, 212, 86) !important;
}
.verifys-wrapper .el-button--primary:hover {
  border-color: rgb(160, 212, 86) !important;
  background-color: rgb(160, 212, 86) !important;
  color: white !important;
}
</style>