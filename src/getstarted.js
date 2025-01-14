import React,{Component, useState, useEffect} from "react"
import Profile from './profile.js'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { Paginator } from 'primereact/paginator';
import { Button } from 'primereact/button';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter
} from "react-router-dom";
import { useHistory } from "react-router-dom";

  
function Started() { 
  const [call,setCall]=useState([])
  const [clicked,setClicked]=useState(false)
  const [count,setCount]=useState(1)
  const [friend,setFriend]=useState([])
  const history = useHistory();
  let data=[]
  let or=[]
  // let count=1;
  // state= {
  //   callofduty:[],
  //   started:false

  // }
    // constructor(props) {
    //     super(props);

        // const [products, setProducts] = useState([]);
      
        // this.getFoootball = this.getFoootball.bind(this)
      // }
      function callOfDuty()  {
        setClicked(true)
        let counts = 1
        setCount(count + 1)
        var axios = require("axios").default;
        const options = {
          method: 'GET',
          url: `https://call-of-duty-modern-warfare.p.rapidapi.com/leaderboard/${count}/battle`,
          headers: {
            'x-rapidapi-key': '2999e842eamshcede1a6258d4821p15ac5cjsnb3ab053a26fc',
            'x-rapidapi-host': 'call-of-duty-modern-warfare.p.rapidapi.com'
          }
        };
        var self = this;
        axios.request(options).then(function (response) {
          console.log(response.data.entries);
          response.data.entries.map(ele=>{
              data.push({
                        rank:ele.rank,
                        playerName:ele.username,
                        level:ele.values.level,
                        name:'AddFriend',
                        timeplayed:ele.values.timePlayed,
                        wins:ele.values.wins
    
                    })
                   
                })
                // let numbersCopy = data.slice();
                // console.log(numbersCopy)
                // setCall([...call, data])
                setCall(old => [...old, ...data]);
                // setCall(data);
                console.log(call)
                // console.log(data)
                // self.setState({
                //   callofduty: data 
                // })
                // console.log(this.state.callofduty)
        }).catch(function (error) {
          console.error(error);
        });
       
        
        // axios.request(options).then(function (response) {
        //     console.log(response.data.api.players);
        //     response.data.api.players.map(ele=>{
        //   data.push({
        //             age:ele.age,
        //             playerName:ele.player_name,
        //             position:ele.position

        //         })
        //     })
        //     console.log( data)
        // }).catch(function (error) {
        //     console.error(error);
        // });
      
      // console.log(this.state.callofduty)
      }
       function dateTemplate(rowData, column) {
        return <div>
            <a  onClick={(event) => rowColumnClick(rowData)} >{rowData.playerName}</a>
        </div>;
    }
    function addButton(rowData){
      // console.log(rowData)
      return <div>
        <button onClick={(event) => buttonClick(rowData)}>{rowData.name}</button>
        <button onClick={(event) => removeClick(rowData)}>Remove Friend</button>
      </div>
    }
   function buttonClick(rowdata){
// console.log(rowdata)
let array=[rowdata]
setFriend(old => [...old, ...array]);
console.log(friend)

   }
   function removeClick(rowdata){
     console.log(rowdata)
   }
  function rowColumnClick(rowData){
    console.log(rowData)

    history.push(
      {
          pathname:"/Profile",
          state:{detail:rowData}
  });
    // this.props.history.push('/Profile');
    //     console.log(rowData);
    //     this.setState({
    //       started:true
    //     })
   }
  
   function showmoredata(){

    callOfDuty();
   }
   const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" />;
    const paginatorRight = <Button type="button" icon="pi pi-cloud" className="p-button-text" />;
    return (
      <div>
     <Container>
       <Row style={{display: 'flex'}}>
         <Col lg={3} style={{minHeight:'100%'}}>
         <div style={{height:'100%',marginTop:'100px'}}>
        <button  value="Change value" onClick={callOfDuty} disabled={clicked}>Call of Duty </button>
        </div>
         </Col>
         <Col lg={9}>
         <div className="card">
          {/* {!this.state.started &&  */}
           <DataTable value={call} >
           
           <Column field="playerName" header="Name" body={dateTemplate} filter filterPlaceholder="Search by name"></Column>
               <Column field="rank" header="Rank"  filter filterPlaceholder="Search by rank"></Column>
              
               <Column field="level" header="level" filter filterPlaceholder="Search by level"></Column>
               <Column field="timeplayed" header="timePlayed" filter filterPlaceholder="Search by time"></Column>
               <Column field="wins" header="wins" filter filterPlaceholder="Search by wins"></Column>
               <Column field="name" header="Actions" body={addButton}></Column>
               
               {/* <Column field="quantity" header="Quantity"></Column> */}
           </DataTable>
           <div onClick={showmoredata}>showmore</div>
           {/* <Paginator first={1} rows={4} ></Paginator> */}
          {/* } */}
               
                
</div>
         </Col>
       </Row>
     </Container>
        {/* <Route exact path="/Profile">
              <Profile/>
            </Route> */}
       

   
        
    
            </div>
      
      
    ) 
  
} 
  
export default Started;