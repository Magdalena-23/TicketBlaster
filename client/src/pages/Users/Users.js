import React, { useEffect, useState } from "react";
import LoggedInNav from "../../components/layout/LoggedInNav/LoggedInNav";
import axios from "../../api/axios";
import User from "./User";
import { decodeJwt } from "../../helpers/jwtDecode";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const userId = decodeJwt();
      const token = localStorage.getItem("token");
      const response = await axios.get("/api/users", {
        headers: { "auth-token": token },
      });

      const users = response.data;
      const filteredUsers = users.filter((user) => user._id !== userId);

      setUsers(filteredUsers);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `/api/users/soft-delete/${userId}`,
        { isDeleted: true },
        {
          headers: { "auth-token": token },
        }
      );
      fetchUsers();
    } catch (err) {
      console.log(err);
    }
  };

  const handleRoleChange = async (userId, isAdmin) => {
    try {
      const token = localStorage.getItem("token");
      const newRole = isAdmin ? false : true;
      await axios.patch(
        `/api/users/role/${userId}`,
        { isAdmin: newRole },
        {
          headers: { "auth-token": token },
        }
      );

      fetchUsers();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <LoggedInNav header="Users" />
      {users.map((user) => (
        <User
          id={user._id}
          key={user._id}
          fullName={user.fullName}
          email={user.email}
          isAdmin={user.isAdmin}
          handleDelete={handleDelete}
          handleRoleChange={handleRoleChange}
        />
      ))}
    </div>
  );
};

export default Users;
