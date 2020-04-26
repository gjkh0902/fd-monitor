<template>
	<div class="hello">
		<h1>hello world!</h1>
	</div>
</template>

<script>
import MkBridge from "mk-bridge"
import Tests from "../service/testModule"
export default {
	name: "index",
	props: {},
	methods: {
		testPost() {}
	},
	created() {
		this.$Toast("hello world!")

		//get
		let params = { a: 1 }
		Tests.testGet(params)
			.then(res => {
				console.log(res)
			})
			.catch(error => {
				console.log(error)
			})

		//post
		Tests.testPost(params)
			.then(res => {
				console.log(res)
			})
			.catch(error => {
				console.log(error)
			})

		console.log(MkBridge)
		console.log(process.env)
	}
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.hello {
	h1 {
		font-size: 1rem;
		color: #340932;
	}
}
</style>
