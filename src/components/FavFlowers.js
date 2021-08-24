import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';



class FavFlowers extends React.Component {
  constructor(props){

    super(props);
    this.state={
      FavArr:[]
    }

  }
  componentDidMount(){
    const {user}=this.props.auth0;

    let url=`http://localhost:3001/flowergetter?email=${user.email}`;

    axios.get(url)
    .then(item=>{
      this.setState({
        FavArr:item.data[0].flowers,
      })
    })
  }
 
 
 handleDelete=(index)=>{
   const {user}=this.props.auth0;

   let Data={
     email:user.email,
   }
   axios.delete(`http://localhost:3001/flowergetter?email=${index}`)
 }
 
  render() {
    


    return(
      <>
        <h1>My Favorite Flowers</h1>
      </>
    )
  }
}

export default withAuth0(FavFlowers);
