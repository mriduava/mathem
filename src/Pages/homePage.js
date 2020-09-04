import React, {useState, useEffect} from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'


const HomePage = () => {

  const [products, setProducts] = useState([])
  const [search, setSearch] = useState([])

  //Get Data from Citygross API
  const fetchCitygrossProducts = async (search) => {    
    
    let res = await fetch('https://www.citygross.se/api/v1/esales/search/?Q=' + search)
    res = await res.json()
    setProducts(res.data.map(x=>x.name));
    //console.log(res.data.map(x=>x.name));
  }

  // useEffect(()=>{
  //   fetchCitygrossProducts(search);
  // }, [])

    return (
      <div className="container-fluid">
        Home page

        {/* <SearchField /> */}

        <Form 
        onSubmit={fetchCitygrossProducts(search)}
        className="row">
        <FormGroup className="col-sm-12 col-md-8 col-lg-6">
          <Input 
            required
            type="text" 
            id="recipe-title" 
            placeholder="Sök varor"
            // in Vue: v-model="title"
            onChange={
              e => setSearch(e.target.value)
            }
           />
           <h4>{products}</h4>
        </FormGroup> 
        </Form>
      </div>
    );
}

export default HomePage;