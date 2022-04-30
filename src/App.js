import React, { useEffect, useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import axios from "axios";
import "./App.css";
import MiniLoading from "./Components/utils/MiniLoading";
import Users from "./Components/users";
import Posts from "./Components/posts";

function App() {
  const [key, setKey] = useState("users");
  //users state
  const [customers, setCustomers] = useState([]);
  const [customersLoading, setCustomersLoading] = useState(false);
  //posts state
  const [posts, setPosts] = useState([]);
  //posts with users state
  const [postsUsers, setPostsUsers] = useState([]);
  const [postsLoading, setPostsLoading] = useState(false);

  //Get Users
  const fetchUsers = async () => {
    setCustomersLoading(true);
    await axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setCustomers(response.data);
        setCustomersLoading(false);
      });
  };
  //Get Posts
  const fetchPosts = async () => {
    setPostsLoading(true);
    await axios
      .get("https://jsonplaceholder.typicode.com/posts/")
      .then((response) => {

        const results = Object.values(
          response.data.reduce((obj, item) => {
            obj[item.userId] = obj[item.userId] || {
              userId: item.userId,
              count: 0,
            };
            obj[item.userId].count++;
            return obj;
          }, {})
        );

        setPosts(results);

        setPostsLoading(false);
      });
  };

  //COMBINE REQUEST RESPONSE
  const combineRequest = ()=>{
    const countPostUsers = customers.map((a) => ({
      ...posts.find((p) => a.id === p.userId),
      ...a,
    }));

    //Save post count with users
    setPostsUsers(countPostUsers);
  }

  //UPDATING USER
  const updatingUser = (user)=>{
    console.error(['Aqui',user])
    let copyCustomer = [...customers]
    let item = copyCustomer.find(x => x.id == user.id);
    if (item) {
      item.name = user.name;
    }
    console.log(copyCustomer);
    setCustomers(copyCustomer);
  }


  //When Save Posts
  useEffect(()=>{
    if(posts.length >0){
      combineRequest();
    }
  },[posts,customers])

  //Initial
  useEffect(() => {
    fetchUsers();
    fetchPosts();
  }, []);

  return (
    <secton className="app-main">
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="tabs-main mb-3"
      >
        <Tab eventKey="users" title="Users">
          <div className="tabla-clientes">
            <div className="table-header b-bttm">
              <h4></h4>
              <h4>NAME</h4>
              <h4>EMAIL</h4>
              <h4>TELÉFONO</h4>
              <h4>WEBSITE</h4>
              <h4></h4>
            </div>
            <div className="table-body">
              {customersLoading ? (
                <MiniLoading />
              ) : (
                customers.map((user) => {
                  return <Users user={user} updatingUser={updatingUser}></Users>;
                })
              )}
            </div>
          </div>
        </Tab>
        <Tab eventKey="posts" title="Posts">
          <div className="tabla-post">
            <div className="table-header-posts b-bttm">
              <h4>USER</h4>
              <h4>NUMBER POSTS</h4>
            </div>
            <div className="table-body-posts">
              {postsLoading ? (
                <MiniLoading />
              ) : (
                postsUsers &&
                postsUsers.map((postUser) => {
                  return <Posts  postUser={postUser}></Posts>;
                })
                
              )}
            </div>
          </div>
        </Tab>
      </Tabs>
    </secton>
  );
}

export default App;
