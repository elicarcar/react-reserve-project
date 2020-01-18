import React, { useState, useEffect } from "react";
import {
  TextArea,
  Button,
  Input,
  Form,
  Image,
  Message,
  Header,
  Icon
} from "semantic-ui-react";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import catchErrors from "../utils/catchErrors";

const INITIAL_PRODUCT = {
  name: "",
  price: "",
  media: "",
  description: ""
};

function CreateProduct() {
  const [product, setProduct] = useState(INITIAL_PRODUCT);
  const [mediaPreview, setMediaPreview] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const isProduct = Object.values(product).every(el => Boolean(el));
    isProduct ? setDisabled(false) : setDisabled(true);
  }, [product]);

  function handleChange(event) {
    const { name, value, files } = event.target;
    if (name === "media") {
      setProduct(prevState => ({ ...prevState, media: files[0] }));
      setMediaPreview(window.URL.createObjectURL(files[0]));
    } else {
      setProduct(prevState => ({ ...prevState, [name]: value }));
    }
    // console.log(product);
  }

  async function handleImageUpload() {
    const data = new FormData();
    data.append("file", product.media);
    data.append("upload_preset", "reactreserve");
    data.append("cloud_name", "nerval");
    const response = await axios.post(process.env.CLOUDINARY_URL, data);
    const mediaURL = response.data.url;
    return mediaURL;
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      setLoading(true);
      const mediaUrl = await handleImageUpload();
      // console.log({ mediaUrl });
      const url = `${baseUrl}/api/product`;
      const payload = { ...product, mediaUrl };
      const response = await axios.post(url, payload);
      // console.log(response);
      setProduct(INITIAL_PRODUCT);
      setSuccess(true);
    } catch (error) {
      catchErrors(error, setError(error));
      console.error("ERROR!", error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <Header as="h2" block>
        <Icon name="add" color="orange" />
        Create new Product
      </Header>
      <Form
        loading={loading}
        error={Boolean(error)}
        success={success}
        onSubmit={handleSubmit}
      >
        <Message error header="Ooops!" content={error} />

        <Message
          success
          icon="check"
          header="Success"
          content="Your product has been posted"
        />
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            name="name"
            placeholder="Name"
            label="Name"
            value={product.name}
            onChange={handleChange}
          />
          <Form.Field
            control={Input}
            name="price"
            placeholder="Price"
            label="Price"
            min="0.00"
            step="0.01"
            type="number"
            value={product.price}
            onChange={handleChange}
          />
          <Form.Field
            control={Input}
            name="media"
            content="Select image"
            label="Media"
            type="file"
            accept="image/*"
            onChange={handleChange}
          />
        </Form.Group>
        <Image src={mediaPreview} rounded centered size="small" />
        <Form.Field
          control={TextArea}
          name="description"
          label="Description"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
        />
        <Form.Field
          control={Button}
          disabled={disabled || loading}
          color="blue"
          content="Submit"
          icon="pencil alternate"
          type="submit"
        />
      </Form>
    </>
  );
}

export default CreateProduct;
