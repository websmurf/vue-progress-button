<template>
  <button class="progress-button" :class="{active: isActivated}" data-progress-style="fill-back" @click="click">
    <div class="progress" :style="styling"></div>
    <div class="content"><slot /></div>
  </button>
</template>
<style lang="sass" scoped>
  .progress-button
    position: relative

  .progress-button:not(.active)
    cursor: pointer

  .progress-button .content
    position: relative
    z-index: 10
    opacity: 1

  .progress-button .progress
    width: 0
    z-index: 5
    opacity: 0
    transition: all 0.3s ease
    position: absolute
    left: 0
    right: 0

  .progress-button.active .progress
    opacity: 1
    transition-timing-function: ease

</style>
<script>
export default {
  name: 'app',
  data () {
    return {
      isActive: false,
      timer: null,
      percent: 0,
      steps: 200
    }
  },
  props: {
    fillColor: {
      type: String,
      default: '#555'
    },
    duration: {
      type: Number,
      default: 2000
    },
    height: {
      type: Number,
      default: 100
    },
    position: {
      type: String,
      default: 'fill'
    }
  },
  computed: {
    intervalDuration () {
      return this.duration / this.steps
    },
    isActivated: function () {
      return this.isActive
    },
    styling () {
      let styling = {
        width: this.percent + '%',
        'background-color': this.fillColor
      }

      switch (this.position) {
        case 'top':
          styling['height'] = this.height + 'px'
          styling['top'] = 0
          break
        case 'bottom':
          styling['height'] = this.height + 'px'
          styling['bottom'] = 0
          break
        default:
          styling['top'] = 0
          styling['bottom'] = 0
      }

      return styling
    }
  },
  methods: {
    click (event) {
      this.start()
      this.$emit('click', event)
    },
    start () {
      this.isActive = true
      this.timer = setInterval(() => {
        // increase by with random value
        this.increase(Math.random())

        if (this.percent >= 100) {
          this.end()
        }
      }, this.intervalDuration)
    },
    set (percent) {
      this.percent = Math.round(percent)
    },
    increase (amount) {
      this.set(this.percent + amount)
    },
    decrease (amount) {
      this.set(this.percent - amount)
    },
    end () {
      this.set(100)
      setTimeout(() => {
        this.isActive = false
        clearTimeout(this.timer)
        this.set(0)
      }, 250)
    }
  }
}
</script>


