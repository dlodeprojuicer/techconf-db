<template>
  <div class="highlights">		
    <h1>
			A concise list of tech conferences in ZA
		</h1>

		
    <h3 v-if="data.length > 0">
			This month
		</h3>

		<div class="wrapper-div" v-if="data.length > 0">
			<ConfCards :data="data" />
		</div>

		<br /><br /><br />
		<h4>
			<a href="/register">Register</a> to add a conference or to be enlisted as a speaker
		</h4>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import ConfCards from "./ConfCards";

export default {
  name: "confHighlights",
  props: {
    data: {
			type: Array,
			required: true,
			default: ()=> []
    }
  },
  components: {
    ConfCards
  },
  computed: {
    ...mapGetters(['monthEventCount']),
  },
  mounted() {
		console.log("YEP",this.data)
		console.log("KKKK",this.monthEventCount)
  },
  methods: {
    ionViewDidEnter() {
      console.log("YEP",this.monthEventCount)
    }
  }
};
</script>

<style lang="scss" scoped>
h1, h3, h4 {
	color: #fff;
	// width: 50%;
	// margin: 0 auto;
	text-align: center;
}
.highlights {
  background: var(--ion-color-primary);
  height: 45vh;
  padding: 50px;
  margin: -20px;
  top: -20px;
  position: relative;
}

a {
	color: #fff;
}

.wrapper-div {
// margin-left: 250px;
  // margin: auto;
  // width: 30%;
}
</style>