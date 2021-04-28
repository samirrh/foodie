import React, { useState } from "react";
import Axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Recipe from "./components/Recipe";
import { Container, Center, Button, Input, Text, SimpleGrid, useToast, Box } from "@chakra-ui/react"
import NavBar from "./components/NavBar";
require('dotenv').config()

function App() {
  const toast = useToast() // custom chakra ui hook
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);


  const APP_ID=process.env.REACT_APP_APP_ID
  const APP_KEY=process.env.REACT_APP_APP_KEY
  const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=12`;

  const getData = async () => {
    if (query !== "") {
      const result = await Axios.get(url);
      if (!result.data.more) {
        return toast({
          title: 'No Recipes Found',
          status: 'error',
          position: 'top-right',
          isClosable: true,
        })
      }
      if (result.data.more) {
        console.log(result);
        setRecipes(result.data.hits);
        setQuery("");
        return toast({
          title: `Showing ${result.data.to - result.data.from} Recipes`,
          status: 'success',
          position: 'top-right',
          isClosable: true,
        })
      }
      
    } else {
      return toast({
        title: 'Form Empty',
        status: 'error',
        position: 'top-right',
        isClosable: true,
      })
    }
  };

  const onChange = e => setQuery(e.target.value);

  const onSubmit = e => {
    e.preventDefault();
    getData();
  };

  return (
    <div className="App">
      <NavBar></NavBar>
      <Container my={10}>
      <Box bg={'gray.50'} rounded={'3xl'} px={6} py={4} borderWidth="2px" borderColor='orange'>
      <Center>
      <Text fontSize="6xl" color="green.400">Foodie</Text>
      </Center>
      
      <form onSubmit={onSubmit} className="search-form">
        <Input variant="filled" size='lg' focusBorderColor="lime" mt={3} type="text" name="query" onChange={onChange} value={query} autoComplete="off" placeholder="Search Food" />
        <Container centerContent my={6}>
        <Button bg='green.400' color={'white'} _hover={{ bgGradient: 'linear(to-r, green.400,green.400)', }} type="submit">Search</Button>
        </Container>
      </form>
      </Box> 
      </Container>
      <Box my="5" mx="5">
      <SimpleGrid minChildWidth="300px" spacing="20px">
        {recipes !== [] && recipes.map(recipe => <Recipe key={uuidv4()} recipe={recipe} />)}
      </SimpleGrid>
      </Box>
    </div>
  );
}
export default App;