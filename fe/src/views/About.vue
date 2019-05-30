/* eslint-disable */
<template>
  <v-container grid-list-md text-xs-center>
    <v-textarea outline v-model="ta"></v-textarea>
    <v-layout row wrap>
      <v-flex xs12 sm6 md4 lg3 v-for="x in ($vuetify.breakpoint.xs ? 1 : 8)" :key="x.id">
        <v-card height=100%>
          <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="200px"></v-img>
          <v-card-title primary-title>
            <div>
              <v-chip v-if="x === 1">{{x}}</v-chip>
              <div class="headline">Top western road trips</div>
              <span class="grey--text">1,000 miles of wonder</span>
            </div>
          </v-card-title>

          <v-card-actions>
            <v-btn flat>Share</v-btn>
            <v-btn flat color="purple">Explore</v-btn>
            <v-spacer></v-spacer>
            <v-btn icon @click="show = !show">
              <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
            </v-btn>
          </v-card-actions>
          <v-slide-y-transition>
            <v-card-text v-show="show"> I'm a thing. But,
            </v-card-text>
          </v-slide-y-transition>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'about',
  data () {
    return {
      ta: 'debug',
      show: false
    }
  },
  mounted () {
    // const a = { a: 1, b: 2 }
    this.ta = JSON.stringify(this.$vuetify.breakpoint)
    // this.ta = 'lalala'
  }
}
</script>
