<template>
  <div class="highlights">		
    <h1 class="hero-text">
			A concise list of tech conferences in ZA
		</h1>

    <h3 v-if="data.length > 0">
			This month
		</h3>

		<div v-if="data.length > 0">
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

.hero-text {
  text-align: left;
  width: 340px;
  font-size: 40px;
  margin-top: 70px;
}

.highlights {
  background: var(--ion-color-primary);
  height: 45vh;
  padding: 50px;
  margin: -20px;
  top: -30px;
  position: relative;
}

.highlights::before {    
  content: "";
  background-image: url("../../public/assets/img/tech-conference-colored.svg");
  background-size: 700px;
  background-position: center;
  background-repeat: no-repeat;
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  opacity: 0.75;
}

a {
	color: #fff;
}
</style>