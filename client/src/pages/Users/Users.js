import React, { useEffect, useState } from "react";
import LoggedInNav from "../../components/layout/LoggedInNav/LoggedInNav";
import axios from "../../api/axios";
import User from "./User";
import { decodeJwt } from "../../helpers/jwtDecode";
import ConfirmModal from "../../components/common/Modal/ConfirmModal";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showMakeAdminModal, setShowMakeAdminModal] = useState(false);
  const [showMakeUserModal, setShowMakeUserModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [isAdmin, setIsAdmin] = useState("");

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
      setShowMakeAdminModal(false);
      setShowMakeUserModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {showDeleteModal && (
        <ConfirmModal
          title="Are you sure?"
          message="You are about to delete a user. Please proceed with caution."
          btnText="Delete user"
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={() => {
            handleDelete(selectedUserId);
            setShowDeleteModal(false);
          }}
        />
      )}
      {showMakeAdminModal && (
        <ConfirmModal
          title="Are you sure?"
          message="You are about to make a user administrator of the system. Please proceed with caution."
          btnText="Make user admin"
          onCancel={() => setShowMakeAdminModal(false)}
          onConfirm={() => {
            handleRoleChange(selectedUserId, isAdmin);
          }}
        />
      )}
      {showMakeUserModal && (
        <ConfirmModal
          title="Are you sure?"
          message="You are about to downgrade a user from administrator. Please proceed with caution."
          btnText="Downgrade user"
          onCancel={() => setShowMakeUserModal(false)}
          onConfirm={() => handleRoleChange(selectedUserId, isAdmin)}
        />
      )}

      <LoggedInNav header="Users" />
      {users.map((user) => (
        <User
          id={user._id}
          key={user._id}
          img={user.img}
          fullName={user.fullName}
          email={user.email}
          isAdmin={user.isAdmin}
          handleShowDeleteModal={() => {
            setShowDeleteModal(true);
            setSelectedUserId(user._id);
          }}
          handleShowAdminModal={() => {
            setShowMakeAdminModal(true);
            setSelectedUserId(user._id);
            setIsAdmin(user.isAdmin);
          }}
          handleShowUserModal={() => {
            setShowMakeUserModal(true);
            setSelectedUserId(user._id);
            setIsAdmin(user.isAdmin);
          }}
        />
      ))}
    </div>
  );
};

export default Users;
