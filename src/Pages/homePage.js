import React, {useState, useEffect} from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'


const HomePage = () => {

    const [search, setSearch] = useState('')

    const searchProduct = async (input) => {
      let res;
      if(!input.trim()) {
        res = await fetch('api/harvestMathem')
      } else {
        res = await fetch('/rest/recipes/search/' + input)
      }

      res = await res.json()
    }

    return (
      <div className="container-fluid">
        Home page
        {/* <SearchField /> */}

        <FormGroup className="col-10">
        <Input 
          onChange={e => searchProduct(e.target.value)}
          type="text" 
          id="searching" 
          autoComplete="off"
          placeholder="search recipe ..." />
      </FormGroup>
      <Button onClick={searchProduct}>Search</Button>
      </div>
    );
}

export default HomePage;