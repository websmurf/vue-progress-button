'use strict'

import { shallow } from '@vue/test-utils'
import Button from 'src/Button'

// Use fake timers
jest.useFakeTimers()

describe('Button.vue', () => {
  it('should have some default data set when the component is constructed', () => {
    // Create component
    const wrapper = shallow(Button)

    // Validations
    expect(wrapper.vm.isActive).toBe(false)
    expect(wrapper.vm.timer).toBe(null)
    expect(wrapper.vm.percent).toBe(0)
    expect(wrapper.vm.steps).toBe(200)
  })

  it('should have a intervalDuration computed property that calculates the duration interval', () => {
    // Create component
    let wrapper = shallow(Button)

    // Validations
    expect(wrapper.vm.intervalDuration).toBe(10)

    // Change property and check again
    wrapper.setProps({duration: 10000})
    expect(wrapper.vm.intervalDuration).toBe(50)

    // Change property and check again
    wrapper.setProps({duration: 3333})
    expect(wrapper.vm.intervalDuration).toBe(16.665)
  })

  it('should have a isActivated computed property that returns the current value of the isActive data property', () => {
    // Create component
    let wrapper = shallow(Button)

    expect(wrapper.vm.isActivated).toBe(false)

    // Change data and check again
    wrapper.setData({isActive: true})
    expect(wrapper.vm.isActivated).toBe(true)
  })

  it('should have a styling computed property that returns styling based on the default prop values', () => {
    // Create component
    let wrapper = shallow(Button)

    // Validation
    expect(wrapper.vm.styling).toEqual({width: '0%', 'background-color': '#555', top: 0, bottom: 0})
  })

  it('should have a styling computed property that returns styling based when the position is top', () => {
    // Create component
    let wrapper = shallow(Button, {
      propsData: {
        fillColor: '#fff',
        position: 'top'
      }
    })

    // Validation
    expect(wrapper.vm.styling).toEqual({width: '0%', 'background-color': '#fff', height: '100px', top: 0})
  })

  it('should have a styling computed property that returns styling based when the position is bottom', () => {
    // Create component
    let wrapper = shallow(Button, {
      propsData: {
        fillColor: '#ccc',
        position: 'bottom'
      }
    })

    // Validation
    expect(wrapper.vm.styling).toEqual({width: '0%', 'background-color': '#ccc', height: '100px', bottom: 0})
  })

  it('should have a click method that calls the start method and emits a click event', () => {
    const $emit = jest.fn()

    // Create component with emit stub
    let wrapper = shallow(Button, {
      mocks: {
        $emit
      }
    })

    // stub out start method
    wrapper.vm.start = jest.fn()

    // Execute method
    wrapper.vm.click('test')

    // Validation
    expect($emit.mock.calls.length).toBe(1)
    expect($emit.mock.calls[0][0]).toBe('click')
    expect($emit.mock.calls[0][1]).toBe('test')
    expect(wrapper.vm.start.mock.calls.length).toBe(1)
  })

  it('should have a start method that sets the isActive data property to true and starts the timer', () => {
    // Create component
    let wrapper = shallow(Button)

    // Create stub methods
    wrapper.vm.increase = jest.fn()
    wrapper.vm.end = jest.fn()

    // Execute method
    wrapper.vm.start()

    // Validation
    expect(setInterval).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.isActive).toBe(true)
    expect(wrapper.vm.increase).toHaveBeenCalledTimes(0)
    expect(wrapper.vm.end).toHaveBeenCalledTimes(0)

    // Move time forward
    jest.advanceTimersByTime(10)

    // Validate again
    expect(wrapper.vm.increase).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.end).toHaveBeenCalledTimes(0)

    // Move time forward and set percentage to 100 to force the end call
    wrapper.setData({percent: 100})
    jest.advanceTimersByTime(10)

    // Validate again
    expect(wrapper.vm.end).toHaveBeenCalledTimes(1)
  })

  it('should have a set method that sets the percent by a provided value', () => {
    // Create component
    let wrapper = shallow(Button)

    // Validate start value
    expect(wrapper.vm.percent).toBe(0)

    // Set to 25 and validate result
    wrapper.vm.set(25)
    expect(wrapper.vm.percent).toBe(25)

    // Set to 55.5 and validate result
    wrapper.vm.set(55.5)
    expect(wrapper.vm.percent).toBe(56)
  })

  it('should have a increase method that increases the current percent with a provided value', () => {
    // Create component
    let wrapper = shallow(Button)

    // Validate start value
    expect(wrapper.vm.percent).toBe(0)

    // Set to 25 and validate result
    wrapper.vm.increase(25)

    // Validation
    expect(wrapper.vm.percent).toBe(25)
  })

  it('should have a decrease method that decreases the current percent with a provided value', () => {
    // Create component
    let wrapper = shallow(Button)

    // Set start value
    wrapper.setData({percent: 50})

    // Set to 25 and validate result
    wrapper.vm.decrease(5)

    // Validation
    expect(wrapper.vm.percent).toBe(45)
  })

  it('should have a end method that sets the percent to 100, puts isActive to false and calls a clearTimeOut method followed by setting the percentage to 0', () => {
    // Create component
    let wrapper = shallow(Button)

    // Set start values
    wrapper.setData({isActive: true, timer: 'timer'})

    // Set to 25 and validate result
    wrapper.vm.end()

    // At this point percentage should be set to 100 and isActive is still set to true
    expect(setTimeout).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.percent).toBe(100)
    expect(wrapper.vm.isActive).toBe(true)

    // Move time forward
    jest.advanceTimersByTime(250)

    // Now all should be reset
    expect(clearTimeout).toHaveBeenCalledTimes(1)
    expect(clearTimeout).toHaveBeenCalledWith('timer')
    expect(wrapper.vm.percent).toBe(0)
    expect(wrapper.vm.isActive).toBe(false)
  })

  it('renders correctly in default state', () => {
    // Create component
    const wrapper = shallow(Button)

    // Validations
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders correctly in active state', () => {
    // Create component
    const wrapper = shallow(Button)

    // Set active state
    wrapper.setData({isActive: true})

    // Validations
    expect(wrapper.html()).toMatchSnapshot()
  })
})
