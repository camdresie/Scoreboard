import React, {Component} from 'react';
import { Provider } from './context'
import Header from './Header';
import Player from './Player';
import AddPlayerForm from './AddPlayerForm';

class App extends Component {
  state = {
    players: [
      {
        name: "Guil",
        score: 0,
        id: 1
      },
      {
        name: "Treasure",
        score: 0,
        id: 2
      },
      {
        name: "Ashley",
        score: 0,
        id: 3
      },
      {
        name: "James",
        score: 0,
        id: 4
      }
    ]
  };

  prevPlayerId = 4;

  handleScoreChange = (index, delta) => {
    this.setState( prevState => ({
      score: prevState.players[index].score += delta
    }));
  }

  handleAddPlayer = (name) => {
    this.setState({
      players: [
        ...this.state.players,
        {
        name,
        score: 0,
        id: this.prevPlayerId += 1
        }
      ]
    })
  }

  getHighScore = () => {
    const scores = this.state.players.map( p => p.score );
    const highScore = Math.max(...scores);
    if (highScore) {
      return highScore;
    }
    return null;
  }

  handleRemovePlayer = (id) => {
    this.setState( prevState => {
      return {
        players: prevState.players.filter(p => p.id !== id)
      };
    });
  }

  render() {
    const highScore = this.getHighScore();
    return (
      <Provider value={this.state.players}>
        <div className="scoreboard">
          <Header />
    
          {/* Players list */}
          {this.state.players.map( (player, index) =>
            <Player 
              name={player.name}
              id={player.id}
              key={player.id.toString()} 
              index={index}
              changeScore={this.handleScoreChange}
              removePlayer={this.handleRemovePlayer}  
              score={player.score}         
              isHighScore={highScore === player.score}
            />
          )}
          <AddPlayerForm addPlayer={this.handleAddPlayer} />
        </div>
      </Provider>
    ); 
  }
}

export default App;