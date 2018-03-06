<template>
  <button :class="{active: isActivated}" :disabled="isActive" class="__progress-button" data-progress-style="fill-back" @click="click">
    <div :style="styling" class="__progress" />
    <div class="__progress-button-content"><slot /></div>
  </button>
</template>
<style lang="sass" scoped>
  .__progress-button
    position: relative

  .__progress-button:not(.active)
    cursor: pointer

  .__progress-button .__progress-button-content
    position: relative
    z-index: 10
    opacity: 1

  .__progress-button .__progress
    width: 0
    z-index: 5
    opacity: 0
    transition: all 0s ease
    position: absolute
    left: 0
    right: 0

  .__progress-button.active .__progress
    opacity: 1
    transition-timing-function: ease

</style>
<script>
export default {
  name: 'VueProgressButton',
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
  data () {
    return {
      isActive: false,
      timer: null,
      percent: 0,
      steps: 200
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
