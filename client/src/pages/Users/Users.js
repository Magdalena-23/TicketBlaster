import React, { useEffect, useState } from "react";
import LoggedInNav from "../../components/layout/LoggedInNav/LoggedInNav";
import axios from "../../api/axios";
import User from "./User";

const Users = () => {
  const [users, setUsers] = useState([]);

  console.log(users);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/users", {
          headers: { "auth-token": token },
        });
        const users = response.data;
        setUsers(users);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, []);
  return (
    <div>
      <LoggedInNav header="Users" />
      {users.map((user) => (
        <User
          fullName={user.fullName}
          email={user.email}
          isAdmin={user.isAdmin}
        />
      ))}
    </div>
  );
};

export default Users;
