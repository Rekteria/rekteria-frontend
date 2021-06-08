import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ThemeProvider } from "@material-ui/core/styles";
import { Provider } from 'react-redux'
import store from './store'
import theme from './theme'
import TokenRefresher from './components/TokenRefresher'

ReactDOM.render(
	<Provider store={store}>
    <ThemeProvider theme={theme}>
		<TokenRefresher />
		<App />
    </ThemeProvider>
	</Provider>,
	document.getElementById('root')
)
