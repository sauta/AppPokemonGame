import React from 'react'
import ReactDOM from 'react-dom/client'
//import PokemonDetail from './Component/PokemonDetail'
import PokemonList from './Component/PokemonList'
//import PokemonForms from './Component/PokemonForms'
import PokemonFormDetails from './Component/PokemonFormDetails'
import PokemonLocations from './Component/PokemonLocations'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
        <PokemonFormDetails />
        <PokemonList />
        <PokemonLocations />
  </React.StrictMode>,
)
