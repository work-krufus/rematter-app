import { useState, useEffect } from "react";
import { User } from "types/user";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getAllUsers } from "services/user";

export const Users = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        setUsers(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <Table striped bordered hover>
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>DL Expiry Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.address}</td>
              <td>{user.dlExpiryDate}</td>
              <td>
                <Button>
                  <Link
                    to={`/edit-user/${user.id}`}
                    className="btn btn-primary"
                  >
                    Edit
                  </Link>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
