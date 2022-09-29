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
    isEmpty: true,
    isLoading: false,
  };

  componentDidUpdate(_, prevState) {
    const { keyWord, page } = this.state;

    if (prevState.keyWord !== keyWord || prevState.page !== page) {
      this.getPhotos(keyWord, page);
    }
  }

  getPhotos = async (keyWord, page) => {
    if (!keyWord) {
      return;
    }
    this.setState({
      isLoading: true
    })
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
    } finally {
       this.setState({
      isLoading: false,
    })
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
    const { photos, isVisible, isEmpty, isLoading } = this.state;
    const { onLoadMore } = this;
    return (
      <>
        <SearchForm onSubmit={this.chageKeyword} />
        {isEmpty && (
          <Text textAlign="center">Sorry. There are no images ... 😭</Text>
        )}
        {photos.length === 0 && (
          <Text textAlign="center">Sorry. There are no images ... 😭</Text>
        )}
        {photos.length > 0 && <Grid>{
          photos.map(({ id, alt, src:{large}, avg_color }) => (
            <GridItem key={id}>
              <CardItem color={avg_color}>
                <img src={large} alt={alt} />
              </CardItem>
            </GridItem>
          ))}
                              </Grid>}
        {isVisible && <Button onClick={onLoadMore}>{isLoading ? "Loading..." : "Load more"}</Button>}


      </>
    );
  }
}
