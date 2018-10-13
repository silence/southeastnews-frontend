import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import AdminWrapper from '../components/admin-wrapper'

class AdminWrapperPage extends Component {
    render() {
        return (
            <>
                {console.log(this.props)}
                <AdminWrapper />
            </>
        )
    }
}

function mapStateToProps(state) {
    return {
        //isAdmin: state.loginStore.isAdmin
    }
}

export default withRouter(
    connect(
        mapStateToProps,
        {}
    )(AdminWrapperPage)
)
