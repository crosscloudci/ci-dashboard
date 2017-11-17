import Vue from 'vue'
import TopBanner from '@/components/TopBanner'

describe('TopBanner.vue', () => {
  it('displays items from the TopBanner', () => {
    const Constructor = Vue.extend(TopBanner)
    const TopBannerComponent = new Constructor().$mount()
    expect(TopBannerComponent.$el.textContent).to.contain('daddy likes tacos')
  })
})
