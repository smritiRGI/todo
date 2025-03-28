import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card, Spin, Alert } from "antd";
import { FaDog } from "react-icons/fa";

const DogImageApp = () => {
  const [dogImage, setDogImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDogImage();
  }, []);

  const fetchDogImage = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://dog.ceo/api/breeds/image/random");
      setDogImage(response.data.message);
      setError("");
    } catch (err) {
      setError("Failed to fetch dog image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>
        <FaDog style={{ marginRight: 10, color: "#1890ff" }} /> Random Dog Generator
      </h1>

      {error && <Alert message={error} type="error" showIcon style={styles.alert} />}
      {loading && <Spin size="large" style={styles.spinner} />}
      {dogImage && (
        <Card hoverable style={styles.card}>
          <img src={dogImage} alt="Random Dog" style={styles.image} />
        </Card>
      )}

      <Button type="primary" onClick={fetchDogImage} style={styles.button}>
        Fetch New Dog 🐶
      </Button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f0f2f5",
    padding: 20,
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
  },
  alert: {
    marginBottom: "20px",
    width: "100%",
    maxWidth: "400px",
  },
  spinner: {
    marginBottom: "20px",
  },
  card: {
    width: 300,
    textAlign: "center",
    marginBottom: "20px",
  },
  image: {
    width: "100%",
    borderRadius: "8px",
  },
  button: {
    fontSize: "16px",
  },
};

export default DogImageApp;
