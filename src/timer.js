/** @jsx React.DOM */

var React = require('react'),
    _ = require('lodash'),
    data = require('../data');

var Timer = React.createClass({
    getRemaining: function(){
        return Math.floor((parseInt(this.props.endat)-Date.now())/1000);
    },
    getInitialState: function(){
        return {left: this.getRemaining()};
    },
    ticktock: function(){
        if (this.isMounted()){
            this.setState({left: this.getRemaining()});
        }
    },
    render: function() {
        if (this.state.left<=0) {
            setTimeout(this.props.callback,500);
        } else {
            setTimeout(this.ticktock,1000);
        }
        return <span className='timer'>Tid: {this.state.left} sek</span>;
    }
});

module.exports = Timer;