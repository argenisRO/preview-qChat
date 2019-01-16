import React, { Component } from 'react'

import TopMenu from './TopMenu'
import FriendsBar from './BottomMenu'
import LoadingScreen from './LoadingScreen'
import CenterContent from './CenterContent'
import Registration from './Registration'

class Root extends Component {
    state = {
        loading: false,
        loggedIn: false,
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ loading: !this.state.loading })
        }, 100)
    }

    render() {
        return !this.state.loading ? (
            <LoadingScreen />
        ) : (
            <React.Fragment>
                {!this.state.loggedIn ? (
                    <React.Fragment>
                        <TopMenu />
                        <Registration />
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <TopMenu />
                        <CenterContent />
                        <FriendsBar />
                    </React.Fragment>
                )}
            </React.Fragment>
        )
    }
}

export default Root
