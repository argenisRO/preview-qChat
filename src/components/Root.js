import React, { Component } from 'react'

import TopMenu from './TopMenu'
import FriendsBar from './BottomMenu'

class Root extends Component {
    render() {
        return (
            <React.Fragment>
                <TopMenu />
                <FriendsBar />
            </React.Fragment>
        )
    }
}

export default Root
