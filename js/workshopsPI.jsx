import React from 'react';
import ReactDOM from 'react-dom';
let sass = require ('../sass/style.scss');


let kitties = [
    {category: "male", age: "4", likesKids: true, name: "Fidel Catstro", icon: "Z"},
    {category: "male", age: "9", likesKids: true, name: "Hairy Potter", icon: "X"},
    {category: "male", age: "2", likesKids: false, name: "Grumpy", icon: "C"},
    {category: "female", age: "1", likesKids: true, name: "Jude Paw", icon: "V"},
    {category: "female", age: "2", likesKids: false, name: "Lucifurr", icon: "N"},
    {category: "female", age: "3", likesKids: true, name: "Meowly Cyrus", icon: "J"}
];



class SearchBar extends React.Component{

    handleCheck = (e) =>{
        this.props.changeLikes(e.target.checked);
    }

    handleText = (e) =>{
        this.props.changeText(e.target.value);
        console.log(e.target.value);
    }

    render(){
        return <form className="searchBar">
            <p>Find a cat:</p>
            <input className="searchBar_input" type="text" placeholder="Search..." value={this.props.text} onChange={this.handleText} />
            <input className="searchBar_input" type="checkbox" checked={this.props.likesKids} onChange={this.handleCheck} />
                <p>Kitties that like kids</p>
        </form>
    }
}

class CatTable extends React.Component{
    render(){
        let rows = [];
        let filters = this.props.filter;
        let checkBox=this.props.likesKids;
        let lastCategory = null; //zmienna przechowująca ostatnią kategorię (płeć)
        this.props.kitties.forEach((kitty)=> {
            //dla każdego obiekty z props.kitties
            if (kitty.category !== lastCategory) { //jeśli pojawia się nowa kategoria (płeć kociaka)
                //dodaj do tablicy rows komponent CatCategoryRow
                rows.push(<CatCategoryRow category= { kitty.category }  key= { kitty.category } />);
            }

            //dodaj do tablicy rows komponent CatRow

            if(((kitty.name.includes(filters) && filters.length > 0) || filters.length < 1) && (kitty.likesKids === true || checkBox === false)) {
                rows.push(<CatRow kitty = {kitty} key = {kitty.name} />);
            }

            lastCategory = kitty.category;
        });
        return <table className="catTable" >

            <thead className="catTable_head">
            <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Avatar</th>
            </tr>
            </thead>
            <tbody className="catTable_body">{rows}</tbody>
        </table>
    }
}


class CatCategoryRow extends React.Component {
        render() {
        return <tr ><th className="catCategory" colSpan="3">{this.props.category}</th></tr>
    }
    }

class CatRow extends React.Component {
        render() {
        let name = this.props.kitty.likesKids ?
        this.props.kitty.name : <span style={{color: '#FFC107'}}> {this.props.kitty.name} </span>;
        let age = this.props.kitty.likesKids ?
        this.props.kitty.age : <span style={{color: '#FFC107'}}> {this.props.kitty.age} </span>;
        let icon = this.props.kitty.likesKids ?
            this.props.kitty.icon : <span style={{color: '#FFC107'}}> {this.props.kitty.icon} </span>;
        return <tr>
            <td>{name}</td>
            <td>{age}</td>
            <td className="catFont">{icon}</td>
            </tr>
         }
    }

class App extends React.Component{
    constructor(props){
        super(props),
            this.state={
                filterText:'',
                likesKids:false,
                allCats:this.props.kitties,
                likesKidsCats:this.props.kitties,
            }
    }
    changeLikes = (e) =>{
        let likesKidsCats=this.props.kitties.filter((kitty)=>{
            if(kitty.likesKids===e){
                return kitty;
            }
        })
        if(e){
            this.setState({likesKidsCats:likesKidsCats,likesKids:e});
        }else{
            this.setState({likesKidsCats:this.props.kitties,likesKids:e});
        }
    }


    changeText = (e) =>{

        let searchCats = this.props.kitties.filter((kitty)=>{
            if(kitty.name.includes(e)){
             return kitty;
            }
        })
        this.setState({likesKidsCats:searchCats});
        this.setState({filterText:e});
        }
    changeFilterText = (text) => {
        this.setState({
            filterText: text
        });
    }

    render(){
        console.log(this.props.kitties);
        return <div className="catInfo">
            <SearchBar text={this.state.filterText} value={this.state.filterText} changeText= {this.changeFilterText} likesKids={this.state.likesKids} changeLikes={this.changeLikes}/>
            <CatTable kitties={this.state.likesKidsCats} likesKids={this.state.likesKids} filter = {this.state.filterText} />
        </div>
    }
}


document.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(
        <App kitties={kitties}/>,
        document.getElementById('app')
    );
});