module.exports = {
  getDashboard: function () {
    setTimeout(function () {
      return {
        ok: true,
        data: require('../../fixtures/dashboard.json')
      }
    }, 100)
  }
}