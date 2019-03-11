import React, { Component } from 'react';
import { auth, initializeApp } from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import './App.scss';

initializeApp({
  apiKey: "AIzaSyAP8XUMPfELZ6CG0rWEfZ3FXUSNLQLX8aY",
  authDomain: "thinking-cart.firebaseapp.com",
  databaseURL: "https://thinking-cart.firebaseio.com",
  projectId: "thinking-cart",
  storageBucket: "thinking-cart.appspot.com",
  messagingSenderId: "746516151657"
});

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
  return (
    <div className="shelf-item" data-sku={product.sku}>
      <Thumb
        classes="shelf-item__thumb"
        src={require(`./static/data/products/${product.sku}_1.jpg`)}
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
  uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      auth.GoogleAuthProvider.PROVIDER_ID,
      auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: (result, url) => false
    }
  };

  constructor(props) {
    super(props);

    this.state = {
      isSignedIn: false,
      products: [],
    };
  }

  componentDidMount() {
    import('./static/data/products.json')
      .then((json) => { console.log(json); this.setState({ products: json.products }) })
      .catch((error) => { alert(error); });
    
    auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user })
    });
  }

  render() {
    const { products } = this.state;
    return (
      <div className="App">
      {
        this.state.isSignedIn ? (
        <div>
          <button onClick={() => auth().signOut()}>Sign out!</button>
          <p>Welcome, {auth().currentUser.displayName}</p>
        </div>
        ) : (
        <StyledFirebaseAuth
          uiConfig={this.uiConfig}
          firebaseAuth={auth()}
        />
      )}
      <Catalog products={products} />
      </div>
    );
  }
}

export default App;
