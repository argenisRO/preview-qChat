import React, { Component } from 'react'
import PropTypes from 'prop-types'

import TopMenu from './TopMenu'
import FriendsBar from './BottomMenu'

class Root extends Component {
    static propTypes = {
        prop: PropTypes,
    }

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
