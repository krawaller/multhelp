/** @jsx React.DOM */

var React = require('react'),
    _ = require('lodash'),
    data = require('../data');

var Home = React.createClass({
    render: function() {
        var r = this.props.row,
            c = this.props.col,
            cls = "head row"+r+" col"+c+(this.props.showing?" all":"")+(!this.props.needed?" notneeded":" needed")
        return (
            <a onClick={this.props.callback} style={data.squarestyles(r,c)} className={cls}>
                <div>{r||c}</div>
            </a>
        );
    }
});

module.exports = Home;