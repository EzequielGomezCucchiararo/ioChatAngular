angular.module('app')
  .controller('chatController', ['socketio', function (socketio) {
    let vm = this

    vm.messages = []
    vm.userCheck = false
    vm.addUser = function (user) {
      socketio.emit('new user', user, data => {

      })
      vm.userCheck = true
      vm.user = ''
    }

    socketio.on('get users', data => {
      vm.users = data
      console.log(vm.users)
    })

    vm.sendMessage = function (msg) {
      vm.message = ''
      socketio.emit('send message', msg)
    }

    socketio.on('new message', data => {
      vm.messages.push(data)
    })
  }])
