/** @jsx React.DOM */

function makeSafeForCSS(name) {
    return name.replace(/[^a-z0-9]/g, function(s) {
        var c = s.charCodeAt(0);
        if (c == 32) return '-';
        if (c >= 65 && c <= 90) return '_' + s.toLowerCase();
        return '__' + ('000' + c.toString(16)).slice(-4);
    });
}

var Scoreboard = React.createClass({

  getInitialState: function() {
    return {
      columns: [],
      entries: []
    };
  },

  loadScores: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
        this.setState(data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  componentDidMount: function() {
    this.loadScores();
    setInterval(this.loadScores, this.props.pollInterval);
  },

  render: function() {
    var entries = this.state.entries.map(function(entry, i) {
      return <Entry entry={entry} key={i} columns={this.state.columns}/>
    }.bind(this));
    return (
      <table className="scoreboard table table-striped table-bordered">
        <Header columns={this.state.columns}/>
        <tbody>
          {entries}
        </tbody>
      </table>
    );
  }
});

var Header = React.createClass({
  render: function() {
    var ths = this.props.columns.map(function(name, j) {
      if (name == "Rank" || name == "Seat No.")
        return <th key={j} width="14%">{name}</th>;
      else
        return <th key={j}>{name}</th>;
    });
    return <thead><tr className="header">{ths}</tr></thead>;
  }
});

var Entry = React.createClass({
  render: function() {
    var tds = this.props.entry.map(function(data, j) {
      var name = this.props.columns[j];
      if (name == "Rank")
        return <th className={makeSafeForCSS(this.props.columns[j])} key={j}>{data}</th>;
      else
        return <td className={makeSafeForCSS(this.props.columns[j])} key={j}>{data}</td>;
    }.bind(this));
    var classes = "entry rank" + this.props.entry[0];
    return <tr className={classes}>{tds}</tr>;
  }
});

React.renderComponent(
  <Scoreboard url='scores.json' pollInterval={1000} />,
  document.getElementById('scoreboard')
);

