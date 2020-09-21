import React from 'react';

class Recette extends React.Component {

    state = {
        recette : this.props.detail,
        isEdit : false,
        newIng : ''
    }

    handleEditButton = () => {
        this.setState({ isEdit : !this.state.isEdit});
    }

    handleNewIngChange = (e) =>{
        this.setState({newIng : e.currentTarget.value});
    }

    handleNewIngSubmit = (e) =>{
        e.preventDefault();
        if(this.state.newIng.length>0){
            const recette = this.state.recette;
            const id = new Date().getTime();
            const nom = this.state.newIng;
            recette.ings.push({id, nom});
            this.setState({newIng : ''});
            this.props.editRecette(recette);
        }
    }

    deleteIng = (ingid) =>{
        const recette = this.state.recette;
        const index = recette.ings.findIndex(function(ing){
            return ing.id === ingid
        })
        recette.ings.splice(index,1);
        this.props.editRecette(recette);
    }

    deleteRecette = () => {
        this.props.deleteRecette(this.state.recette.id);
    }

    render() {
        return (
            <div className="col mb-4">
              <div className="card" style={{width: "18rem"}}>
                <div className="card-body">
                    <h5 className="card-title">{this.state.recette.nom}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Ingrédients</h6>
                    <ul className="list-group list-group-flush">
                        {this.state.recette.ings.map(ing => (
                            <li className="list-group-item" key={ing.id}>{ing.nom} <button onClick={() => this.deleteIng(ing.id)}>X</button></li>
                        ))}
                    </ul>
                    { this.state.isEdit ? (<div><hr/><form onSubmit={this.handleNewIngSubmit}>
                                                <div className="form-group">
                                                    <input type="text" placeholder="Nom de l'ingrédient" className="form-control" value={this.state.newIng} onChange={this.handleNewIngChange} />
                                                </div>
                                                <button className="btn btn-success">Ajouter</button>
                                                </form><hr/></div>) 
                                            : (<div></div>) 
                    }
                    <div className="mt-3 d-flex flex-wrap justify-content-around">
                        { this.state.isEdit ? (<button onClick={this.handleEditButton} className="btn btn-success">Enregister</button>) : (<button onClick={this.handleEditButton} className="btn btn-warning">Modifier</button>) }
                        <button onClick={this.deleteRecette} className="btn btn-danger">Supprimer</button>
                    </div>
                </div>
              </div>
            </div>
        );
    }
}

export default Recette;