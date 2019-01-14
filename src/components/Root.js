import React, { Component } from 'react'

import TopMenu from './TopMenu'
import FriendsBar from './BottomMenu'
import LoadingScreen from './LoadingScreen'
import CenterContent from './CenterContent'

class Root extends Component {
    state = {
        loading: false
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ loading: !this.state.loading })
        }, 1300)
    }

    render() {
        return !this.state.loading ? (
            <LoadingScreen />
        ) : (
            <React.Fragment>
                <TopMenu />
                <CenterContent />
                <FriendsBar />
            </React.Fragment>
        )
    }
}

export default Root
