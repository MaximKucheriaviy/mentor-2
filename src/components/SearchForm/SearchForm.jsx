import { Component } from 'react';

import { FiSearch } from 'react-icons/fi';
import { FormBtn, InputSearch, SearchFormStyled } from './SearchForm.styled';

export class SearchForm extends Component {
  state = {
    search: ""
  }

  chageHebdler = (event) => {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    })
  }
  submitHendler = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.search);
    this.setState({search: ""});
  }

  render() {
    return <SearchFormStyled onSubmit={this.submitHendler}>
            <FormBtn type="submit">
              <FiSearch size="16px" />
            </FormBtn>
            <InputSearch
              onChange={this.chageHebdler}
              placeholder="What do you want to write?"
              name="search"
              required
              autoFocus
              value={this.state.search}
            />
          </SearchFormStyled>
  }
}
