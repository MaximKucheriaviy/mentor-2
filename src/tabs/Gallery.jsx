import { Component } from 'react';
import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';
import { fetchData } from 'service/api';

export class Gallery extends Component {
  state = {
    photos: [],
    keyWord: '',
    page: 1,
    isVisible: false,
    isEmpty: false,
  };

  componentDidUpdate(_, prevState) {
    const { keyWord, page } = this.state;

    if (prevState.keyWord !== keyWord || prevState.page !== page) {
      this.getPhotos(keyWord, page);
    }
  }

  getPhotos = async (keyWord, page) => {
    try {
      const { photos, total_results, per_page } = await fetchData(
        keyWord,
        page
      );

      if (photos.length === 0) {
        alert('Нічого не знайдено! Спробуй ще!');
        this.setState({ isEmpty: true });
        return;
      }

      this.setState(prevState => {
        return {
          photos: [...prevState.photos, ...photos],
          isVisible: this.state.page < Math.ceil(total_results / per_page),
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

  chageKeyword = word => {
    this.setState({ keyWord: word, page: 1, photos: [], isEmpty: false });
  };

  onLoadMore = () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      };
    });
  };

  render() {
    const { photos, isVisible, isEmpty } = this.state;
    const { onLoadMore } = this;
    return (
      <>
        <SearchForm onSubmit={this.chageKeyword} />
        {isEmpty && (
          <Text textAlign="center">Sorry. There are no images ... 😭</Text>
        )}
        {photos.length > 0 && (
          <Text textAlign="center">Sorry. There are no images ... 😭</Text>
        )}
        {isVisible && <Button onClick={onLoadMore}>Load More</Button>}
      </>
    );
  }
}
