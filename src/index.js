const axios = require('axios');

import React from 'react';
import ReactDOM from 'react-dom';

const fetchUsers = () => {
    return axios.get('api/users');
}

const fetchRecipes = (id) => {
    return axios.get(`api/users/${id}/recipes`);
}

const RecipeList = ({ recipes }) => {
    console.log(recipes)
    return (
        <ul id="recipe-list">
            <h2>User Recipes</h2>
            {
                recipes.map( recipe => {
                    return <li key={ recipe.id }>{ recipe.name } </li>
                })
            }
        </ul>
    )
}

class App extends React.Component{
    constructor() {
        super();
        this.state = {
            users: [],
            recipes: []
        };
    }
    async componentDidMount() {
        let response = await fetchUsers();
        this.setState({ users: response.data });
        let userId = window.location.hash.slice(1);
        if (userId) {
            response = await fetchRecipes(userId);
            this.setState({ recipes: response.data});
        }
        window.addEventListener('hashchange', async() => {
            userId = window.location.hash.slice(1);
            response = await fetchRecipes(userId);
            this.setState({ recipes: response.data});
        })
    }
    render() {
        const { users, recipes } = this.state;
        return (
            <div>
                <section>
                    <h1><a href='/'>Users ({ users.length }) </a></h1>
                    <ul id="user-div">
                        {
                            users.map( user => {
                                return <li key={ user.id }><a href={`#${user.id}`}>{ user.name }</a></li>
                            })
                        }
                    </ul>
                </section>
                <section class="box">
                    <RecipeList recipes={ recipes } />
                </section>
            </div>
        )
    }
}

const root = document.querySelector('#root')
ReactDOM.render(<App />,root);