<template>
	<div class="page">
		<div class="mod1">
			<div class="container">
				<div class="outer">
					<img class="shebeiliuliang" src="../assets/images/img_29666_0_4.png" />
					<span class="sketch" :lines="undefined">Sketch</span>
					<img class="zuanshi" src="../assets/images/img_29666_0_5.png" />
				</div>
				<span class="text" :lines="undefined">9:41 AM</span>
				<div class="block">
					<img class="pic" src="../assets/images/img_29666_0_3.png" />
					<span class="percent" :lines="undefined">100%</span>
					<div class="wrap">
						<div class="colorDiv" />
					</div>
					<img class="dot" src="../assets/images/img_29666_0_2.png" />
				</div>
			</div>
			<div class="block_2">
				<img class="fenxiang" src="../assets/images/img_29666_0_6.png" />
				<img class="guanbi" src="../assets/images/img_29666_0_1.png" />
				<span class="activityList" :lines="undefined">活动列表</span>
				<img class="largeIcon" src="../assets/images/img_29666_0_0.png" />
			</div>
		</div>
		<div class="mod2">
			<div class="group">
				<div class="tagWrap">
					<span class="tag" :lines="undefined">老师专享</span>
				</div>
			</div>
			<span class="title" :lines="undefined">KK全民挑战：第七届老师校园青歌赛</span>
			<span class="info" :lines="undefined">我凭本事跑调怎么了？</span>
			<div class="infoWrap">
				<img class="picture" src="../assets/images/img_29666_0_7.png" />
				<span class="info_2" :lines="undefined">2020年2月3日~2月26日</span>
			</div>
			<div class="block_3">
				<img class="pic_2" src="../assets/images/img_29666_0_8.png" />
				<span class="desc" :lines="undefined">上海市杨浦区宁国路百联滨江购物中心</span>
			</div>
			<div class="color" />
			<div class="group_2">
				<div class="container_2">
					<img class="chuangjian" src="../assets/images/img_29666_0_13.png" />
					<span class="info_3" :lines="undefined">限20000人报名参加</span>
				</div>
				<span class="enterActivity" :lines="undefined">进入活动</span>
				<img class="right" src="../assets/images/img_29666_0_9.png" />
			</div>
		</div>
		<div class="mod3">
			<div class="bannerWrap">
				<img class="banner" src="../assets/images/img_29666_0_10.png" />
				<!-- <img class="banner" src="{src1}" /> -->
				<div class="color_2" />
			</div>
			<span class="title_2" :lines="undefined">KK全民挑战：第七届老师校园青歌赛</span>
			<span class="info_4" :lines="undefined">我凭本事跑调怎么了？</span>
			<div class="infoWrap_2">
				<img class="picture_2" src="../assets/images/img_29666_0_11.png" />
				<span class="info_5" :lines="undefined">2020年2月3日~2月26日</span>
			</div>
			<div class="group_3">
				<img class="pic_3" src="../assets/images/img_29666_0_12.png" />
				<span class="desc_2" :lines="undefined">上海市杨浦区宁国路百联滨江购物中心</span>
			</div>
			<div class="colorDiv_2" />
			<div class="container_3">
				<div class="outer_2">
					<img class="chuangjian_2" src="../assets/images/img_29666_0_13.png" />
					<span class="info_6" :lines="undefined">限20000人报名参加</span>
				</div>
				<span class="enterActivity_2" :lines="undefined" @click="test()">进入活动</span>
				<img class="right_2" src="../assets/images/img_29666_0_14.png" />
			</div>
		</div>
		<div class="page">
			<span class="ft">- 更多福利 敬请期待 -</span>
		</div>
	</div>
</template>
<script>
/*eslint-disable */
import Tests from '../service/testModule'

export default {
	data() {
		return {
			constants: {}
			//src1: ''
		}
	},
	methods: {
		test() {
			alert(1)
			//this.$router.push('/404')
		}
	},
	created() {
		let params = {}
		Tests.testGet(params)
			.then(res => {
				console.log(res)
				//throw new Error('promise error 22222222222') //promise_error
			})
			.catch(error => {
				//console.log(error);
			})

		// let testobj = { a: 1, b: 3 }
		// Tests.testPost(testobj)
		// 	.then(res => {
		// 		console.log(res)
		// 		//throw new Error('promise error 22222222222') //promise_error
		// 	})
		// 	.catch(error => {
		// 		//console.log(error);
		// 	})
		//console.tError('123123')
		//console.log(uuu) //vue error

		//this.src1 = 'https://www.baidu.com/a.png' //resource error
	}
}
</script>
<style src="../assets/css/index.response.css" scoped />
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.hello {
	h1 {
		font-size: 1rem;
		color: #340932;
	}
}
</style>
