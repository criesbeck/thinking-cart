import React, { Component } from 'react';
import './App.css';


class ControlBar extends Component {
  render() {
    return (
      <div className="control-bar"></div>
    );
  };
}

const Thumb = props => {
  return (
    <div className={props.classes}>
      <img src={props.src} alt={props.alt} title={props.title} />
    </div>
  );
};

const Product = props => {
  const { product } = props;
  const src = `${process.env.PUBLIC_URL}/data/products/${product.sku}_1.jpg`;
  return (
    <div className="shelf-item" data-sku={product.sku}>
      <Thumb
        classes="shelf-item__thumb"
        src={src}
        alt={product.title}
      />

      <p className="shelf-item__title">{product.title}</p>
      <p className="shelf-item__price">{product.price}</p>
    </div>
  );
}

class Catalog extends Component {

  render() {
    const { products } = this.props;
  
    const components = products.map(product => (
      <Product
        product={product}
        key={product.id}
        />
      )
    );
    return (
      <div className="shelf-container">
        {components}
      </div>
    );
  };
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    fetch(`${process.env.PUBLIC_URL}/data/products.json`)
      .then(response => response.json())
      .then((json) => { console.log(json); this.setState({ products: json.products }) })
      .catch((error) => { alert(error); });
  }

  render() {
    const { products } = this.state;
    return (
      <div className="App">
        <ControlBar />
        <Catalog products={products} />
      </div>
    );
  }
}

export default App;
