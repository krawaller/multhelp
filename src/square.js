/** @jsx React.DOM */

var React = require('react'),
    _ = require('lodash');

var Square = React.createClass({
    render: function() {
        var r = this.props.row,
            c = this.props.col,
            s = this.props.showing,
            cls = "tuple row"+r+" col"+c+(s?" showing":"")+
                (r===c?" same":"")+
                (r>5&&r<=9&&c>5&&c<10&&r!==c?" diff":"")+
                (r===1||c===1?" easy":"")+
                (r===10||c===10?" ten":"")+
                (r===5||c===5?" five":"")+
                (r>10||c>10?" high":"");
        return (
            <div onClick={this.props.toggle} className={cls}>
                <div className="question">{r}&nbsp;&sdot;&nbsp;{c} </div>
                <div className="answer">{r*c} </div>
            </div>
        );
    }
});

module.exports = Square;