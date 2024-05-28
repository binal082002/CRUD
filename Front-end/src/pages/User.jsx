import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const Users = () => {
  const { authToken } = useAuth();
  const [userList, setUserList] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });

  const getAllUsersData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/userList", {
        method: "GET",
        headers: {
          Authorization: authToken,
        },
      });

      const res_data = await response.json();
      setUserList(res_data.message);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/auth/user/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authToken,
        },
      });

      const res_data = await response.json();

      if (response.ok) {
        toast.success("User deleted!!");
        getAllUsersData();
      } else {
        toast.error("No deletion!!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateUser = async (id) => {
    try {
      const updatedData = { username: formData.username, email: formData.email };
      if (formData.password) {
        updatedData.password = formData.password;
      }
      
      const response = await fetch(`http://localhost:5000/api/auth/user/update/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
        body: JSON.stringify(updatedData),
      });

      const res_data = await response.json();

      if (response.ok) {
        toast.success("User updated!!");
        getAllUsersData();
        setShowEditModal(false);
      } else {
        // toast.error("Update failed!!");
        toast.error(res_data.extraDetails ?  res_data.extraDetails : res_data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addUser = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/auth/user/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
        body: JSON.stringify(formData),
      });

      const res_data = await response.json();

      if (response.ok) {
        toast.success("User added!!");
        getAllUsersData();
        setShowAddModal(false);
      } else {
        // toast.error("User already Exist!!");
        toast.error(res_data.extraDetails ?  res_data.extraDetails : res_data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser(id);
    }
  }

  const handleEdit = (user) => {
    setCurrentUser(user);
    setFormData({ username: user.username, email: user.email, password: "" });
    setShowEditModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentUser) {
      updateUser(currentUser._id);
    } else {
      addUser();
    }
  };

  useEffect(() => {
    getAllUsersData();
  }, []);

  return (
    <>
      <section className="users-section">
        <div className="container text-center">
          <h1 className="text-3xl px-5 font-bold mt-8 mb-4">Users Data</h1>
        </div>

        <div className="container mx-auto px-10 users mt-5">
          <button
            onClick={() => {
              setFormData({ username: "", email: "", password: "" });
              setCurrentUser(null);
              setShowAddModal(true);
            }}
            className="px-4 py-2 bg-green-600 text-white rounded mb-4"
          >
            Add New User
          </button>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="bg-gray-800 text-white py-3 border border-gray-300">Name</th>
                <th className="bg-gray-800 text-white py-3 border border-gray-300">Email</th>
                <th className="bg-gray-800 text-white py-3 border border-gray-300">Edit</th>
                <th className="bg-gray-800 text-white py-3 border border-gray-300">Delete</th>
              </tr>
            </thead>

            <tbody>
              {userList.map((curUser, index) => (
                <tr key={index}>
                  <td className="text-center py-3 border border-gray-300">{curUser.username}</td>
                  <td className="text-center py-3 border border-gray-300">{curUser.email}</td>
                  <td className="text-center py-3 border border-gray-300">
                    <button
                      onClick={() => handleEdit(curUser)}
                      className="px-3 py-2 bg-blue-600 text-white hover:bg-yellow-600 rounded"
                    >
                      Edit
                    </button>
                  </td>
                  <td className="text-center py-3 border border-gray-300">
                    <button
                      onClick={() => handleDelete(curUser._id)}
                      className="px-3 py-2 bg-blue-600 text-white hover:bg-red-600 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {(showEditModal || showAddModal) && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded">
            <h2 className="text-xl mb-4">{currentUser ? "Edit User" : "Add User"}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Username</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Password</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setShowAddModal(false);
                  }}
                  className="px-4 py-2 bg-gray-500 text-white rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Users;
