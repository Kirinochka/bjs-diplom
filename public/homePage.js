let logout = new LogoutButton();
logout.action = () => {
  ApiConnector.logout((res) => {
    if(res.success) {
      location.reload();
    }
  });
}

ApiConnector.current((res) => {
  if(res.success) {
    ProfileWidget.showProfile(res.data)
  }
})

const board = new RatesBoard() 

function requsetExchangeRates() {
  ApiConnector.getStocks((res) => {
    if(res.success) {
      board.clearTable()
      board.fillTable(res.data)
    }
  })
}
requsetExchangeRates()
setInterval(requsetExchangeRates, 60000);

const manager = new MoneyManager();

manager.addMoneyCallback = (data) => {
  ApiConnector.addMoney(data, (res) => {
    if(res.success) {
      ProfileWidget.showProfile(res.data)
    } 
    manager.setMessage(res.success, res.error || "Счёт пополнен")
  })
}

manager.conversionMoneyCallback = (data) => {
  ApiConnector.convertMoney(data, (res) => {
    if(res.success) {
      ProfileWidget.showProfile(res.data)
    } 
    manager.setMessage(res.success, res.error || "Конвертация прошла успешно")
  })
}

manager.sendMoneyCallback = (data) => {
  ApiConnector.transferMoney(data, (res) => {
    if(res.success) {
      ProfileWidget.showProfile(res.data)
    }
    manager.setMessage(res.success, res.error || "Деньги отправлены")
  })
}

const widget = new FavoritesWidget();

ApiConnector.getFavorites((res) => {
  if(res.success) {
    widget.clearTable()
    widget.fillTable(res.data)
    manager.updateUsersList(res.data)
  }
})

widget.addUserCallback = (data) => {
  ApiConnector.addUserToFavorites(data, (res) => {
    if(res.success) {
      widget.clearTable()
      widget.fillTable(res.data)
      manager.updateUsersList(res.data)
    }
    widget.setMessage(res.success, res.error || "Пользователь добавлен")
  })
}

widget.removeUserCallback = (data) => {
  ApiConnector.removeUserFromFavorites(data, (res) => {
    if(res.success) {
      widget.clearTable()
      widget.fillTable(res.data)
      manager.updateUsersList(res.data)
    }
    widget.setMessage(res.success, res.error || "Пользователь удалён")
  })
}