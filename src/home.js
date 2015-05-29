/** @jsx React.DOM */

var React = require('react'),
    Square = require('./square'),
    Head = require('./head'),
    _ = require('lodash'),
    data = require('../data');

var Home = React.createClass({
    getInitialState: function(){ return {current:0,mode:"free"}; },
    toggle: function(id,row,col,e){
        var s = this.state;
        if (s.table === row || s.table === col || id === s.current){
            this.setState({current:0,table:0});
        } else {
            this.setState({current:id,table:0});
        }
        e && e.preventDefault() && e.stopPropagation();
    },
    table: function(tbl,e){
        if (tbl===this.state.table){
            this.setState({current:0,table:0});
        } else {
            this.setState({current:0,table:tbl});
        }
        e && e.preventDefault() && e.stopPropagation();
    },
    setLow: function(low){
        if (low===this.state.low){
            this.setState({mode:"setlow",low:666,high:0});
        } else {
            this.setState({mode:"sethigh",low:low,high:0});
        }
    },
    setHigh: function(high){
        var s = this.state, list, range;
        if (high===s.high){
            this.setState({mode:"sethigh",high:0});
        } else {
            range = _.range(s.low,high+1);
            list = _.reduce(range,function(arr,r){
                return _.reduce(range,function(arr,c){
                    return arr.concat(r+"_"+c);
                },arr);
            },[]);
            this.setState({
                mode:"getready",
                high:high,
                done:{},
                remaining:_.shuffle(list)
            },function(){
                setTimeout(this.pickNext,3000);
            }.bind(this));
        }
    },
    pickNext: function(){
        this.refs.field.getDOMNode().focus();
        this.setState({
            mode: "playing",
            remaining: _.tail(this.state.remaining),
            active: this.state.remaining[0]
        });
    },
    game: function(){
        console.log("PLAY!");
        this.setState({mode:this.state.mode==="free"?"setlow":"free",low:666,high:0,current:0,table:0});
    },
    punish: function(){
        if (!this.erroring) {
            this.setState({mode:"didwrong",remaining:_.shuffle(this.state.remaining.concat(this.state.active))});
            this.erroring = true;
            setTimeout(function(){
                this.erroring = false;
                this.pickNext();
            }.bind(this),1000);
        }
    },
    giveAnswer: function(e){
        e.preventDefault();
        var s = this.state,
            f = this.refs.field.getDOMNode(),
            a = parseInt(f.value),
            c
        if (s.mode === "playing"){
            c = parseInt(s.active.split("_")[0])*parseInt(s.active.split("_")[1]);
            f.value="";
            f.focus();
            if (a===c){
                s.done[s.active] = true;
                if (s.remaining.length){
                    this.setState({done:s.done});
                    this.pickNext();
                } else {
                    this.setState({mode:"won",active:0});
                }
            } else {
                this.punish();
            }
        }
    },
    render: function() {
        var s = this.state, txt = {
            free: "Klicka längst upp till vänster för att spela!",
            setlow: "Välj undre gräns!",
            sethigh: "Välj övre gräns!",
            getready: "Är du beredd...?",
            playing: s.active && "Vad blir "+s.active.replace("_","⋅")+"?",
            didwrong: "Ack, fel!! :(",
            won: "Du kan allt mellan "+s.low+" och "+s.high+"! Grattis!"
        }[s.mode];
        var ingame = {playing:1,getready:1,won:1,didwrong:1,didright:1}[s.mode];
        var s=this.state, squares = _.reduce(_.range(0,data.total+1),function(arr,row){
            return _.reduce(_.range(0,data.total+1),function(arr,col){
                var ans = row*col,
                    id = ans || row || col,
                    name = row+"_"+col,
                    showing, needed, callback, active;
                if (ans){ // ritar knapp
                    showing = id===s.current||row===s.table||col===s.table||(ingame && s.done[name]);
                    needed = s.mode==="free"||(ingame && !(row < s.low || col < s.low || row > s.high || col > s.high));
                    callback = needed && s.mode==="free" ? this.toggle.bind(this,id,row,col) : (function(){});
                    active = needed && ingame && s.active === name;
                } else { // ritar kant
                    showing = s.mode==="free" ? id===s.table : row === s.low || (col && col === s.high);
                    needed = s.mode==="free" || (s.mode==="setlow"&&row&&12>row) || (s.mode==="sethigh"&&col&&col>s.low);
                    callback = needed ? (s.mode==="free" ? this.table.bind(this,id) : row ? this.setLow.bind(this,id) : this.setHigh.bind(this,id)) : function(){};
                }
                return arr.concat(
                    !row && !col ? <a style={data.squarestyles(0,0)} onClick={this.game} className={"head row0 col0"+(s.mode!=="free"?" all":"")}><div>G</div></a>
                    : !row || !col ? <Head row={row} col={col} callback={callback} needed={needed} showing={showing}/>
                    : <Square row={row} col={col} showing={showing} callback={callback} needed={needed} active={active}/>
                );
            },arr,this);
        },[],this);
        return (
            <div className={"wrapper "+s.mode} style={data.wrapperstyles}>
                <div className="boardface" style={data.boardstyles}>{squares}</div>
                <div className="boardbottom">
                    <span>{txt}</span>
                    <span className="input">
                        {s.mode==="playing"?<form onSubmit={this.giveAnswer}>
                            <input type="number" ref="field"></input>
                        </form>:''}
                    </span>
                </div>
            </div>
        );
    }
});

module.exports = Home;