$(function () {
  let socket = io.connect()
  let $messageForm = $('#messageForm')
  let $message = $('#message')
  let $chat = $('#chat')
  let $messageArea = $('#messageArea')
  let $userFormArea = $('#userFormArea')
  let $userForm = $('#userForm')
  let $users = $('#users')
  let $username = $('#username')

  $messageForm.submit(e => {
    e.preventDefault()
    socket.emit('send message', $message.val())
    $message.val('')
  })

  $userForm.submit(e => {
    e.preventDefault()
    socket.emit('new user', $username.val(), data => {
      if (data) {
        $userFormArea.hide()
        $messageArea.show()
      }
    })
    $username.val('')
  })

  socket.on('new message', data => {
    $chat.append(
      `<div class="well">
          <strong>${data.user}</strong>: ${data.msg}
       </div>`)
  })

  socket.on('get users', data => {
    $users.html('')
    for (let i = 0; i < data.length; i++) {
      $users.append(`<li class="list-group-item">
        ${data[i]}
      </li>`)
    }
    console.log(data)
  })
})
