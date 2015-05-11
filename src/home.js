/** @jsx React.DOM */

var React = require('react'),
    Square = require('./square'),
    _ = require('lodash');

var Home = React.createClass({
    getInitialState: function(){ return {current:0}; },
    toggle: function(id,row,col){
        var table = this.state.table, current = this.state.current;
        if (table === row || table === col || id === current){
            this.setState({current:0,table:0});
        } else {
            this.setState({current:id,table:0});
        }
    },
    table: function(tbl){
        if (tbl===this.state.table){
            this.setState({current:0,table:0});
        } else {
            this.setState({current:0,table:tbl});
        }
    },
    render: function() {
        var current = this.state.current, table = this.state.table, squares = _.reduce(_.range(0,13),function(arr,row){
            return _.reduce(_.range(0,13),function(arr,col){
                var ans = row*col,
                    id = ans, //[row,col].sort().join("-"),
                    callback = this.toggle.bind(this,id,row,col);
                return (
                    !row && !col ? arr 
                    : arr.concat(
                        !row ? <div onClick={this.table.bind(this,col)} className={"head row0 col"+col+(col===table?" all":"")}><div>{col}</div></div>
                        : !col ? <div onClick={this.table.bind(this,row)} className={"head col0 row"+row+(row===table?" all":"")}><div>{row}</div></div>
                        : <Square row={row} col={col} showing={id===current||row===table||col===table} toggle={callback} />
                    )
                );
            },arr,this);
        },[],this);
        return (
            <div className="wrapper">
                <div className="boardface">{squares}</div>
                <div className="boardbottom">
                    <span>Multiplikationstabellen</span>
                </div>
            </div>
        );
    }
});

module.exports = Home;