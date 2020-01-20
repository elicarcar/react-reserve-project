import React, { useState } from "react";
import { Card } from "semantic-ui-react";

function ProductList({ products }) {
  const [inputValue, setInputValue] = useState(/(:?:)/);

  const handleInputChange = e => {
    setInputValue(e.target.value);
  };

  const filteredProducts = products.filter(product => {
    const productName = product.name.toLowerCase();
    const lowerCaseInput = inputValue.toLowerCase();
    return productName.includes(lowerCaseInput);
  });

  console.log(filteredProducts);

  console.log(inputValue);
  function mapProductsToItems(products) {
    return filteredProducts.map(product => ({
      header: product.name,
      image: product.mediaUrl,
      meta: `$${product.price}`,
      color: "teal",
      fluid: true,
      childKey: product._id,
      href: `/product?_id=${product._id}`
    }));
  }

  return (
    <>
      <div class="ui icon input">
        <input
          onChange={handleInputChange}
          value={inputValue}
          type="text"
          placeholder="Search..."
        />
        <i class="search icon"></i>
      </div>
      <Card.Group
        stackable
        itemsPerRow={3}
        centered
        items={mapProductsToItems(products)}
      />
    </>
  );
}

export default ProductList;
