<template>
  <div class="highlights">		
    <h1>
			A concise list of tech conferences in ZA
		</h1>

		<br />
    <h3 v-if="data.length > 0">
			This month
		</h3>

		<div class="wrapper-div" v-if="data.length > 0">
			<ConfCards :data="data" />
		</div>
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
h1, h3 {
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

.wrapper-div {
margin-left: 170px;
}
</style>