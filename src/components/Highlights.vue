<template>
  <div class="highlights">		
    <h1 class="hero-text">
			{{ text }}
		</h1>

    <div v-if="home">
      <div v-if="data.length > 0">
      <h3>This month</h3>
        <ConfCards :data="data" />
      </div>
      <div v-else>
        <h3>No conferences this month 🤷‍♂</h3>
      </div>
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
			required: false,
			default: ()=> []
    },
    text: {
      type: String,
      required: false,
    }
  },
  components: {
    ConfCards
  },
  computed: {
    ...mapGetters(['monthEventCount']),
  },
  data() {
    return {
      home: this.$route.name === "conferences" ? true : false,
    }
  }
};
</script>

<style lang="css" scoped>
h1, h3, h4 {
	color: #fff;
	text-align: center;
}

.hero-text {
  text-align: left;
  font-size: 35px;
  margin: 30px 0 60px 0;
  text-align: center;
}

.highlights {
  background: var(--ion-color-primary);
  padding: 50px;
  margin: -20px;
  top: -30px;
  position: relative;
}

.highlights::before {    
  content: "";
  /* background-image: url("../../public/assets/img/tech-conference-colored.svg"); */
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