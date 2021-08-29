let form = new UserForm()
form.loginFormCallback = (data) => {
  
  ApiConnector.login(data, (res) => {
    console.log(res)
    if(res.success) {
      location.reload()
    } else {
      form.setLoginErrorMessage(res.error)
    }
  })
}

form.registerFormCallback = (data) => {
  ApiConnector.register(data, res => {
    console.log(res)
    if(res.success) {
      location.reload()
    } else {
      form.setRegisterErrorMessage(res.error)
    }
  })
}

