import React from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import './serachBar.css';

function SearchBar() {

    

  return (
    <Form className="search-bar" inline>
      <FormControl  type="text" placeholder="산 이름을 입력해주세요" className="mr-sm-2" />
      <Button variant="success">Search</Button>
    </Form>
  );
}

export default SearchBar;