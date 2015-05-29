/** @jsx React.DOM */

var React = require('react'),
    _ = require('lodash'),
    data = require('../data');

var Square = React.createClass({
    render: function() {
        var r = this.props.row,
            c = this.props.col,
            s = this.props.showing,
            n = this.props.needed,
            a = this.props.active,
            cls = "tuple row"+r+" col"+c+(s?" showing":"")+(!n?" notneeded":" needed")+(a?" active":"")+
                (r===c?" same":"")+
                (r>5&&r<=9&&c>5&&c<10&&r!==c?" diff":"")+
                (r===1||c===1?" easy":"")+
                (r===10||c===10?" ten":"")+
                (r===5||c===5?" five":"")+
                (r>10||c>10?" high":"");
        return (
            <a onClick={this.props.callback} className={cls} style={data.squarestyles(r,c)}>
                <div className="question">{r}&nbsp;&sdot;&nbsp;{c} </div>
                <div className="answer">{r*c} </div>
            </a>
        );
    }
});

module.exports = Square;