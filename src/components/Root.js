import React, { Component } from 'react'

import TopMenu from './TopMenu'
import FriendsBar from './BottomMenu'
import LoadingScreen from './LoadingScreen'

class Root extends Component {
    state = {
        loading: false,
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ loading: !this.state.loading })
        }, 2600)
    }

    render() {
        return !this.state.loading ? (
            <LoadingScreen />
        ) : (
            <React.Fragment>
                <TopMenu />
                <FriendsBar />
            </React.Fragment>
        )
    }
}

export default Root
