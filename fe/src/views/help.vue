<template>
  <div class='help'>
    <h1>{{title}}</h1><br>
    <button @click="test">test</button><br>
    <v-btn :color="btnColor" @click="test">test</v-btn><br>
    <v-chip v-for="chip in chips" v-bind:key="chip.id" :color="chip.cl">{{chip.name}}</v-chip>
  </div>
</template>
<script>
export default {
  name: 'help',
  data () {
    return {
      title: 'Vuetify test',
      btnColor: 'success',
      chips: [
        {
          cl: 'primary',
          name: 'primary'
        },
        {
          cl: 'secondary',
          name: 'secondary'
        },
        {
          cl: 'warning',
          name: 'warning'
        },
        {
          cl: 'info',
          name: 'info'
        }
      ]
    }
  },
  methods: {
    test () {
      this.title = 'nnnnn'
      this.btnColor = 'warning'
      // console.log('test done')
    }
  }
}
</script>
