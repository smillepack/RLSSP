import React from 'react'
import { Provider} from 'react-redux'
import Main from './main.jsx'

import { store } from './reduxThings/reducers.js'


class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Main />
            </Provider>
        )
    }
}

export default App