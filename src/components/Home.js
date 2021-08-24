import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Card,Button} from 'react-bootstrap';
import FavFlowers from 'FavFlowers';


class Home extends React.Component {


  constructor(props){
    super(props);
    this.state={
      flowerArr:[],
      newArr:[]
    }

  }
  componentDidMount(){

    let url='http://localhost:3001/flowers';


    axios.get(url)
    .then(item=>{
      this.setState({
        flowerArr:item.data,
      })

    })
  }

  favFlower=(event)=>{
    const url='http://localhost:3001/flowerFav';

    const name=event.target.image.alt;
    const photo=event.target.image.src;
    const {user}=this.props.auth0;

    const flowerData={
      email:user.email,
      name:name,
      photo:photo
    }

    axios
    .post(url,flowerData)
    .then(item=>{
      try{
        this.setState({
        newArr:item.data
      })
    }
    catch(err){
      console.log('hello from another  ');
    }
    })
    .catch((err)=>{
      console.log(err);
    })
  }





  render() {
    return (
      <>
        <h1>API Flowers</h1>
        {

        this.state.flowerArr.map(item=>{

          return(
        <Card style={{ width: '18rem' }}>
  <Card.Img variant="top" src={item.photo} alt={item.name} />
  <Card.Body>
    <Card.Title>{item.name}</Card.Title>
    <Card.Text>
    {item.instructions}
    </Card.Text>
    <Button variant="primary">Add-To-Fav</Button>
  </Card.Body>
</Card>
          )
  }
      
    )
  }
  </>
    )
}
}
export default Home;
