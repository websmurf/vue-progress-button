import { shallow } from '@vue/test-utils'
import Button from 'src/Button'

describe('Button.vue', () => {
  it('should have some default data set when the component is constructed', function () {
    // Create component
    const wrapper = shallow(Button)

    // Validations
    expect(wrapper.vm.isActive).toBe(false)
    expect(wrapper.vm.timer).toBe(null)
    expect(wrapper.vm.percent).toBe(0)
    expect(wrapper.vm.steps).toBe(200)
  })
})
