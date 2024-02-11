import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { User } from "types/user";
import { Button, Form, Spinner } from "react-bootstrap";
import { deleteAuser, getAUser, updateAUser } from "services/user";

export const EditUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [dlExpiryDate, setDlExpiryDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getAUser(Number(id));
        setUser(response);
        setName(response.name);
        setAddress(response.address);
        setDlExpiryDate(response.dlExpiryDate);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [id]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await updateAUser(Number(id), {
        name,
        address,
        dlExpiryDate,
      });

      if (response) {
        navigate("/users");
      }
      // Optionally, handle success
      console.log("User updated successfully");
    } catch (error) {
      // Handle error
      console.log(error);
    }
  };

  const handleDelete = async () => {
    await deleteAuser(Number(id));
    navigate("/users");
  };

  if (!user) {
    return <Spinner />;
  }

  return (
    <div>
      <h1>Edit User</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            id="name"
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            value={address}
            id="Address"
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>DL Expiry Date</Form.Label>
          <Form.Control
            type="text"
            value={dlExpiryDate}
            id="dlExpiryDate"
            onChange={(e) => setDlExpiryDate(e.target.value)}
          />
        </Form.Group>
        <Button
          type="submit"
          className="btn btn-primary m-3"
          disabled={!(name && address && dlExpiryDate)}
        >
          Save
        </Button>
        <Button onClick={handleDelete} variant="danger">
          Delete
        </Button>
      </Form>
    </div>
  );
};
