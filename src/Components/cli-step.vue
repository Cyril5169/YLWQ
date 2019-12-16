<template>
  <div class="wrapper">
    <ul>
      <li>
        <div class="content">
          <div class="circle circle_finish">
            <span class="number_finish">1</span>
          </div>
          <p class="word word_finish">基本信息</p>
        </div>
      </li>
      <li>
        <div class="long">
          <div class="bar"></div>
        </div>
      </li>
      <li>
        <div class="content">
          <div class="circle">
            <span>2</span>
          </div>
          <p class="word">联系方式</p>
        </div>
      </li>
      <li>
        <div class="long">
          <div class="bar"></div>
        </div>
      </li>
      <li>
        <div class="centent">
          <div class="circle">
            <span>3</span>
          </div>
          <p class="word">收货信息</p>
        </div>
      </li>
      <li>
        <div class="long">
          <div class="bar"></div>
        </div>
      </li>
      <li>
        <div class="circle">
          <span>4</span>
        </div>
        <p class="word">银行账号</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "cli-step",
  props: {
    active: Number
  },
  methods: {
    back() {
      if (this.active != 0) {
        this.$nextTick(function() {
          var lastStep = document.getElementsByClassName("circle")[
            this.active + 1
          ];
          lastStep.firstChild.classList.remove("number_finish");
          lastStep.classList.remove("circle_finish");
          lastStep.nextElementSibling.classList.remove("word_finish");

          var lastbar = document.getElementsByClassName("bar")[this.active];
          var per = 100;
          var timer2 = setInterval(() => {
            lastbar.style.width = per + "%";
            per -= 1;
            if (per < 0) {
              clearInterval(timer2);
            }
          }, 0.1);
        });
      }
    },
    next() {
      var bar = document.getElementsByClassName("bar")[this.active];
      var per = 0;
      var timer = setInterval(() => {
        bar.style.width = per + "%";
        per += 1;
        if (per > 100) {
          var nowStep = document.getElementsByClassName("circle")[this.active];
          nowStep.firstChild.classList.add("number_finish");
          nowStep.classList.add("circle_finish");
          nowStep.nextElementSibling.classList.add("word_finish");
          clearInterval(timer);
          this.$emit("flag", true);
        }
      }, 0.1);
    }
  },
  mounted() {
    this.$on("bridge", function() {
      this.back();
    });
    this.$on("bridge2", function() {
      this.next();
    });
  }
};
</script>

<style scoped>
.wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
}
ul {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  border-radius: 10px;
  background-image: linear-gradient(74deg, #a7d64b 1%, #82c985 100%),
    linear-gradient(#a5d050, #a5d050);
}
ul,
li {
  padding: 0;
  margin: 0;
  list-style: none;
}
ul {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  position: relative;
}
li {
  padding: 10px 0;
}
.circle {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5); /**这里动态*/
  text-align: center;
  line-height: 30px;
  font-size: 18px;
  transform: translateX(10px);
}
.circle span {
  color: rgb(255, 255, 255); /**这里动态*/
}
.word {
  font-size: 16px;
  color: #fff; /**这里动态*/
  opacity: 0.5;
  padding-top: 8px;
}
.long {
  position: relative;
  top: -13px;
  width: 80px;
  height: 4px;
  background-color: rgba(255, 255, 255, 0.5); /**这里动态*/
  overflow: hidden;
}
.bar {
  height: 100%;
  width: 0%;
  background-color: rgba(255, 255, 255, 1);
}
/***这是分割线，下面写状态类*/
.number_finish {
  color: #a2d452 !important;
}
.circle_finish {
  background-color: rgba(255, 255, 255, 1);
}
.word_finish {
  opacity: 1;
}
/* .line_finish{
   background-color: rgba(255, 255, 255,1)
} */
</style>
