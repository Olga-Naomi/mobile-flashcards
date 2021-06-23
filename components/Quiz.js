import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { setLocalNotification, clearLocalNotification } from '../utils/notifications'
import QuizDetails from './QuizDetails';
import { connect } from 'react-redux';

export class Quiz extends Component {
    static propTypes = {
        navigation: PropTypes.object.isRequired
    };
    static navigationOptions = () => {
        const { title } = this.props
        return {
            title: `${title} Quiz`
        };
    };
    componentDidMount() {
        clearLocalNotification().then(setLocalNotification);
    }
    render() {
        const { title } = this.props

        return <QuizDetails title={title}
        />;
    }
}

const mapStateToProps = (state, { route }) => {
    const { title } = route.params;
    return {
        title
    };
};

export default connect(mapStateToProps)(Quiz);