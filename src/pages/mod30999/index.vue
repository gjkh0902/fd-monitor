<template>
	<div class="page">
		<div class="mod1">
			<div class="container">
				<div class="outer">
					<img class="mark" src="./images/img_33992_0_2.png" />
					<img class="icon" src="./images/img_33992_0_3.png" />
				</div>
				<span class="txt" :lines="1">9:41 AM</span>
				<div class="block">
					<img class="icon_2" src="./images/img_33992_0_1.png" />
					<span class="percent" :lines="1">100%</span>
					<div class="wrap">
						<div class="color" />
					</div>
					<img class="dot" src="./images/img_33992_0_0.png" />
				</div>
			</div>
			<div class="block_2">
				<img class="icon_3" src="./images/img_33992_0_4.png" />
				<span class="word" :lines="1">温馨提示</span>
			</div>
		</div>
		<div class="mod2">
			<img class="banner" src="./images/img_33992_0_5.png" />
			<div class="group">
				<img class="item" src="./images/img_33992_0_6.png" />
				<div class="titleWrap">
					<span class="title" :lines="1">该礼品卡已使用</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			constants: {}
		}
	},
	methods: {},
	created() {
		//性能监控
		new MonitorJS().monitorPerformance({
			pageId: '1', //页面唯一标示
			url: process.env.VUE_APP_APIURL + '/addPages' //信息采集上报地址
		})
	}
}
</script>
<style src="./style.less" lang="less" scoped />
