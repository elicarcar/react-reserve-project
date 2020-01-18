import AddProductToCart from "./AddProductToCart";
import { Item, Label } from "semantic-ui-react";

function ProductSummary({ name, mediaUrl, sku, price, _id, user }) {
  return (
    <Item.Group>
      <Item>
        <Item.Image size="medium" src={mediaUrl} />
        <Item.Content>
          <Item.Header>{name}</Item.Header>
          <Item.Description>
            <p>${price}</p>
            <Label>SKU: {sku}</Label>
          </Item.Description>
          <Item.Extra>
            <AddProductToCart user={user} productId={_id} />
          </Item.Extra>
        </Item.Content>
      </Item>
    </Item.Group>
  );
}

export default ProductSummary;
