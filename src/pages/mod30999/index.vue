<template>
  <div class="mod">
    <div class="box">
      <div class="bd">
        <img
          class="banner"
          src="./images/img_30981_0_2.png"
        />
        <img
          class="play"
          src="./images/img_30981_0_0.png"
        />
      </div>
      <div class="block">
        <span class="text" :lines="undefined">众筹</span>
        <span class="txt" :lines="undefined">｜全网首发</span>
      </div>
      <span class="main" :lines="undefined">对饮茶酒 手工茶罐与小对杯</span>
      <span class="submain" :lines="undefined"
        >宽杯、小杯自在搭配，喝茶喝酒都很适合。手工制宽杯、小杯自在搭配，喝茶喝酒都很适合。手工制做…</span
      >
      <div class="ft">
        <div class="outer">
          <div class="bgWrap">
            <img
              class="bg"
              src="./images/img_30981_0_1.png"
            />
          </div>
          <span class="percent" :lines="undefined">83%</span>
        </div>
        <div class="block_3">
          <div class="block_2">
            <span class="num" :lines="undefined">5216</span>
            <span class="txt_2" :lines="undefined">人支持</span>
          </div>
          <div class="group">
            <span class="word" :lines="undefined">486.52万</span>
            <span class="text_2" :lines="undefined">已筹金额</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      constants: {},
    };
  },
  methods: {},
};
</script>
<style src="./style.less" lang="less" scoped />
