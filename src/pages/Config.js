import React, { Component } from 'react';
import Card from '../components/Card';
import getCategories from '../services/GetCategories';

export default class Config extends Component {
  state = {
    categories: null,
  }

  componentDidMount = async () => {
    const categories = await getCategories();
    console.log(categories);
    this.setState({ categories });
  }

  render() {
    const { categories } = this.state;
    console.log(categories);
    return (
      <div>
        <h1 data-testid="settings-title">Config</h1>
        <Card />
      </div>
    );
  }
}
