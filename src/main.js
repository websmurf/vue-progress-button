// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Button from './Button'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  template: '<div><h3>Default buttons:</h3>' +
  '<progress-button name="default" class="btn mr-1 mb-1">Regular</progress-button>' +
  '<progress-button name="fillColor" class="btn btn-primary mr-1 mb-1" fill-color="#fff">Other fill color</progress-button>' +
  '<progress-button name="duration" class="btn btn-info mr-1 mb-1" :duration="10000">10 second animation</progress-button>' +
  '<progress-button name="bottom" class="btn btn-success mr-1 mb-1" :height="5" position="bottom">Bottom fill</progress-button>' +
  '<progress-button name="bottom" class="btn btn-warning mr-1 mb-1" :height="5" position="top">Top fill</progress-button>' +
  '<progress-button name="bottom" class="btn btn-danger mr-1 mb-1" :height="5">Fill without position</progress-button>' +
  '<h3>Manual stop</h3>' +
  '<progress-button ref="manualStop" name="duration" class="btn btn-warning mr-1 mb-1" :duration="30000">30 second animation</progress-button>' +
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
