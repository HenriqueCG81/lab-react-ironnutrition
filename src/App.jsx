import './App.css';
import FoodCard from './components/FoodCard';
import foodsData from './foods.json';
import { useState } from 'react';
import { Row, Divider, Button } from 'antd';
import AddFoodForm from './components/AddFoodForm';
import SearchBar from '../src/components/SearchBar';

function App() {
  const [food, setFoods] = useState(foodsData);
  const [showForm, setShowForm] = useState(false); // State to track the visibility of the form

  const addFoodHandler = (newFood) => {
    setFoods((previousFoodList) => [...previousFoodList, newFood]);
  };

  const searchHandler = (searchedValue) => {
    const foodsCopy = [...foodsData];
    const filteredFood = foodsCopy.filter((food) => {
      if (
        food.name
          .toLocaleLowerCase()
          .includes(searchedValue.toLocaleLowerCase())
      ) {
        return food;
      }
    });
    setFoods(filteredFood);
  };

  const toggleFormVisibility = () => {
    setShowForm((prevState) => !prevState);
  };

  const deleteFoodHandler = (foodToDelete) => {
    const updatedFoods = food.filter((food) => food !== foodToDelete);
    setFoods(updatedFoods);
  };

  return (
    <div className="App">
      {showForm ? (
        <>
          <Button onClick={toggleFormVisibility}>Hide Form</Button>
          <AddFoodForm addNewFood={addFoodHandler} />
        </>
      ) : (
        <Button onClick={toggleFormVisibility}>Add New Food</Button>
      )}

      <SearchBar filterFoods={searchHandler} />
      <Divider>Food List</Divider>

      <Row style={{ width: '100%', justifyContent: 'center' }}>
        {food.map((foodItem) => (
          <FoodCard
            key={foodItem.name + foodItem.image}
            food={foodItem}
            onDelete={deleteFoodHandler}
          />
        ))}
      </Row>
    </div>
  );
}

export default App;
