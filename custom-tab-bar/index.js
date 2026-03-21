Component({
  data: {
    selected: 0
  },
  methods: {
    onTabTap(e) {
      const { index, path } = e.currentTarget.dataset
      if (index === this.data.selected) return
      this.setData({ selected: index })
      wx.switchTab({ url: `/${path}` })
    }
  }
})
