import Vue from 'vue'
import Button from '../src/Button.vue'

/* eslint-disable no-new */
new Vue({
  template: '<div><h3>Default buttons:</h3>' +
  '<progress-button name="default" class="btn mr-1 mb-1">Regular</progress-button>' +
  '<progress-button name="fillColor" class="btn btn-primary mr-1 mb-1" fill-color="#01315a">Other fill color</progress-button>' +
  '<progress-button name="duration" class="btn btn-info mr-1 mb-1" :duration="10000" fill-color="#175c70">10 second animation</progress-button>' +
  '<progress-button name="bottom" class="btn btn-success mr-1 mb-1" :height="5" position="bottom" fill-color="#2d672d">Bottom fill</progress-button>' +
  '<progress-button name="bottom" class="btn btn-warning mr-1 mb-1" :height="5" position="top" fill-color="#b06d0f">Top fill</progress-button>' +
  '<progress-button name="bottom" class="btn btn-danger mr-1 mb-1" :height="5" fill-color="#8b211e">Fill without position</progress-button>' +
  '<h3>Manual stop</h3>' +
  '<progress-button ref="manualStop" name="duration" class="btn btn-warning mr-1 mb-1" :duration="30000" fill-color="#b06d0f">30 second animation</progress-button>' +
  '<button @click="manualStop()">Stop animation</button>' +
  '</div>',
  components: {
    'progress-button': Button
  },
  methods: {
    manualStop () {
      this.$refs['manualStop'].end()
    }
  }
}).$mount('#app')
