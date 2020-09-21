import React from 'react';
import './App.css';
import Recette from './Components/Recette.js';
import 'bootstrap/dist/css/bootstrap.css';

class App extends React.Component {
  state = {
    recettes : [],
    newRecette : ''
  }

  handleNewRecetteSubmit = (e) =>{
    e.preventDefault();
    if(this.state.newRecette.length>0){
      const recettes = [...this.state.recettes];
      const id = new Date().getTime();
      const nom = this.state.newRecette;
      const ings = [];
      recettes.unshift({ id, nom , ings })
      this.setState({recettes , newRecette : ''});
    }
  }

  handleNewRecetteChange = (e) =>{
    this.setState({newRecette : e.currentTarget.value});
  }

  editRecette = (recetteEdited) => {
    const recettes = [...this.state.recettes];
    const index = recettes.findIndex(function(recette){
      return recette.id == recetteEdited.id
    });
    recettes[index]= recetteEdited;
    this.setState({recettes});
  }

  deleteRecette = (id) => {
    const recettes = [...this.state.recettes];
    const index = recettes.findIndex(function(recette){
      return recette.id == id
    });
    recettes.splice(index,1);
    this.setState({recettes});
  }

  render(){
    return (
      <div className="App container">
        <br/>
        <h1 className="display-4">Ajouter une Recette</h1>
        <br/>
        <form onSubmit={this.handleNewRecetteSubmit}>
          <div className="form-group">
            <input type="text" placeholder="Nom de la Recette" className="form-control" value={this.state.newRecette} onChange={this.handleNewRecetteChange} />
          </div>
          <button className="btn btn-success">Ajouter</button>
        </form>
        <hr/>
        <h1 className="display-4">Recettes</h1>
        <div className="row row-cols-1 row-cols-md-3">
          {this.state.recettes.map(recette => (
            <Recette detail={recette} editRecette={this.editRecette} deleteRecette={this.deleteRecette} key={recette.id} />
          ))}
        </div>
      </div>
    );
  }
}

export default App;