import Button from '../../src/Button.vue'
import {expect} from 'chai'
import sinon from 'sinon'

describe('button.vue', function () {
  it('should have a data function that returns some standard values', function () {
    // data should be a function
    expect(Button.data).to.be.a('function')
    const defaultData = Button.data()

    // Validate the default data
    expect(defaultData.isActive).to.equal(false)
    expect(defaultData.timer).to.equal(null)
    expect(defaultData.percent).to.equal(0)
    expect(defaultData.steps).to.equal(200)
  })

  it('should have a isActivated computed property that returns the current value of the isActive data property', function () {
    // Set isActive property
    Button.isActive = false

    // Call the isActivated computed property
    let result = Button.computed.isActivated.call(Button)

    // Validate the returned value
    expect(result).to.equal(false)

    // Give the isActive property another value
    Button.isActive = true

    let newResult = Button.computed.isActivated.call(Button)

    // Validate the new returned value
    expect(newResult).to.equal(true)
  })

  it('should have a styling computed property that returns styling based on the props of the Button without a given fill position', function () {
    // Set a button with white fill
    Button.fillColor = '#fff'
    Button.percent = 0
    Button.position = 'fill'

    // Set the expected result
    let expectedStyling = {width: '0%', 'background-color': '#fff', top: 0, bottom: 0}

    // Call the styling computed property
    let stylingResult = Button.computed.styling.call(Button)

    expect(stylingResult).to.deep.equal(expectedStyling)
  })

  it('should have a styling computed property that returns styling based on the props of the Button with a given top position', function () {
    // Set a button with white fill
    Button.fillColor = '#fff'
    Button.percent = 0
    Button.height = 5
    Button.position = 'top'

    // Set the expected result
    let expectedStyling = {width: '0%', 'background-color': '#fff', height: '5px', top: 0}

    // Call the styling computed property
    let stylingResult = Button.computed.styling.call(Button)

    expect(stylingResult).to.deep.equal(expectedStyling)
  })

  it('should have a styling computed property that returns styling based on the props of the Button with a given bottom position', function () {
    // Set a button with white fill
    Button.fillColor = '#fff'
    Button.percent = 0
    Button.height = 5
    Button.position = 'bottom'

    // Set the expected result
    let expectedStyling = {width: '0%', 'background-color': '#fff', height: '5px', bottom: 0}

    // Call the styling computed property
    let stylingResult = Button.computed.styling.call(Button)

    expect(stylingResult).to.deep.equal(expectedStyling)
  })

  it('should have a styling computed property that returns styling based on the props of the Button with a not supported given position', function () {
    // Set a button with white fill
    Button.fillColor = '#fff'
    Button.percent = 0
    Button.height = 5
    Button.position = 'hello'

    // Set the expected result
    let expectedStyling = {width: '0%', 'background-color': '#fff', top: 0, bottom: 0}

    // Call the styling computed property
    let stylingResult = Button.computed.styling.call(Button)

    expect(stylingResult).to.deep.equal(expectedStyling)
  })

  it('should have a intervalDuration computed property that calculates the interval for progress', function () {
    // Set the values for duration and steps
    Button.duration = 2000
    Button.steps = 200

    // Call the computed property
    let result = Button.computed.intervalDuration.call(Button)

    // Validate the calculation
    expect(result).to.equal(10)

    // Set the values for a longer duration
    Button.duration = 10000

    result = Button.computed.intervalDuration.call(Button)

    expect(result).to.equal(50)
  })

  it('should have a click method that calls the start method and emits a click event', function () {
    // Create a sinon stub
    Button.start = sinon.stub()
    Button.$emit = sinon.stub()

    // Call the start method
    Button.methods.click.call(Button)

    // Validate if the start method and the emit event are being called
    expect(Button.start.calledOnce).to.equal(true)
    expect(Button.$emit.calledOnce).to.equal(true)
    expect(Button.$emit.calledWith('click')).to.equal(true)
  })

  it('should have a start method that sets the isActive data property to true and starts the timer', function () {
    // Set the isActive data property initial to false
    Button.isActive = false

    // Set the percent to 100 to trigger the end method call
    Button.percent = 100

    // Create stubs
    Button.increase = sinon.stub()
    Button.end = sinon.stub()
    let clock = sinon.useFakeTimers()

    // Call the start method
    Button.methods.start.call(Button)

    // Validate if isActive is set to true
    expect(Button.isActive).to.equal(true)

    clock.tick(5000)
    expect(Button.increase.calledOnce).to.equal(true)
    expect(Button.end.calledOnce).to.equal(true)

    clock.restore()

    Button.percent = 0

    clock = sinon.useFakeTimers()

    Button.methods.start.call(Button)

    clock.tick(5000)
    expect(Button.end.calledOnce).to.equal(true)

    clock.restore()
  })

  it('should have a set method that sets the percent by a provided value', function () {
    // Set the percent at 0 for start
    Button.percent = 0

    // Call the set method with 25 as a value
    Button.methods.set.call(Button, 25)

    // Validate if the new value is 25
    expect(Button.percent).to.equal(25)

    // Set the new value to 100
    Button.methods.set.call(Button, 100)

    // Validate if the value is updated
    expect(Button.percent).to.equal(100)

    // Set the new value to a decimal 25,5
    Button.methods.set.call(Button, 25.5)

    // Validate if the new value is rounded correctly
    expect(Button.percent).to.equal(26)
  })

  it('should have a increase method that increases the current percent with a provided value', function () {
    // Set the percent at 0 for start
    Button.percent = 0

    // Create the stub for set
    Button.set = sinon.stub()

    // Call the increase method with 5 as value
    Button.methods.increase.call(Button, 5)

    // Validate if the set method is called with the correct value
    expect(Button.set.calledOnce).to.equal(true)
    expect(Button.set.calledWith(5)).to.equal(true)
  })

  it('should have a decrease method that decreases the curent percent with a provided value', function () {
    // Set the percent at 5 for start
    Button.percent = 5

    // Create the stub for set
    Button.set = sinon.stub()

    // Call the increase method with 5 as value
    Button.methods.decrease.call(Button, 5)

    // Validate if the set method is called with the correct value
    expect(Button.set.calledOnce).to.equal(true)
    expect(Button.set.calledWith(0)).to.equal(true)
  })

  it('should have a end method that sets the percent to 100, puts isActive to false and calls a clearTimeOut method followed by setting the percentage to 0', function () {
    let clock = sinon.useFakeTimers()

    // Set the initial value for isActive to true
    Button.isActive = true
    // Create the stubs
    Button.set = sinon.stub()
    let clearTimeoutStub = sinon.stub(window, 'clearTimeout')

    // Call the end method
    Button.methods.end.call(Button)
    clock.tick(500)

    // Validate the actions
    expect(Button.set.calledTwice).to.equal(true)
    expect(Button.set.calledWith(100)).to.equal(true)
    expect(Button.isActive).to.equal(false)
    expect(Button.set.calledWith(0)).to.equal(true)
    expect(clearTimeoutStub.calledOnce).to.equal(true)

    clock.restore()
  })
})
