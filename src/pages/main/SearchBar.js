import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import './serachBar.css';
import { BACKEND_URL } from '../../config';
import axios from 'axios';

function SearchBar() {
  const [search, setSearch] = useState('');

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    axios.get(`http://api.forest.go.kr/openapi/service/trailInfoService/getforeststoryservice?mntnNm=${encodeURIComponent(search)}&serviceKey=3E2k3aiK8HollBOnpbkA9FqsHCMBUnCwv%2BlFO8jr5DrZp4xJhx6qunYG97L3rhI72qWjsJO8OENlZK6w6XFKxQ%3D%3D`)
    .then((response) => {
      console.log("산정보 가져옴", response.data);
    })
    .catch(() => {
      console.log("산정보 가져오기 실패");
    });
  };

  return (
    <Form className="search-bar" inline onSubmit={handleSubmit}>
      <FormControl type="text" placeholder="산 이름을 입력해주세요" className="mr-sm-2" value={search} onChange={handleChange} />
      <Button variant="success" type="submit">Search</Button>
    </Form>
  );
}

export default SearchBar;