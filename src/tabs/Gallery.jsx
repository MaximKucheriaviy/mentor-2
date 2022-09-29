import { Component } from 'react';
import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    keyWord: ""
  }

  chageKeyword = word => {
    this.setState({keyWord: word});
  }
  render() {
    return (
      <>
        <SearchForm onSubmit={this.chageKeyword}/>
        <Text textAlign="center">Sorry. There are no images ... 😭</Text>
      </>
    );
  }
}
