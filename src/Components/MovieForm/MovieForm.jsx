import React, { useState } from 'react';
import "./MovieForm.css";
import { Input, AutoComplete } from 'antd';
const { Search } = Input;
class Form extends React.Component {
  render() {
    const { onSubmit } = this.props;
    function getRandomInt(max, min = 0) {
      return Math.floor(Math.random() * (max - min + 1)) + min; // eslint-disable-line no-mixed-operators
    }
    
    const searchResult = query =>
      new Array(getRandomInt(5))
        .join('.')
        .split('.')
        .map((item, idx) => {
          const category = `${query}${idx}`;
          return {
            value: category,
            label: (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <span>
                  Found {query} on{' '}
                  <a
                    href={`https://api.themoviedb.org/3/movie/76341?api_key="0f8d529ca28503395a1f7dc2532ad517"{query}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {category}
                  </a>
                </span>
                <span>{getRandomInt(200, 100)} results</span>
              </div>
            ),
          };
        });
    
    const Complete = () => {
      const [options, setOptions] = useState([]);
    
      // const handleSearch = value => {
      //   setOptions(value ? searchResult(value) : []);
      // };
    
      const onSelect = value => {
        console.log('onSelect', value);
      };
    
    return (
      <AutoComplete
      dropdownMatchSelectWidth={252}
      style={{
        width: 300,
      }}
      options={options}
      onSelect={onSelect}
      onSearch={onSubmit}
    >
      <Input.Search size="large" placeholder="input here" enterButton />
    </AutoComplete>
    //   <Search
    //   placeholder="input search text"
    //   onSearch={onSubmit}
    //   style={{ width: 200 }}
    // />
    );
  }
}

export default Form;
