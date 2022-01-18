import React, { useState } from 'react'
import TypeIdeas from '../../utils/TypeIdeas';
import {
  InputGroup,
  Dropdown,
  Input,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { } from './SearchBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const SearchBar = (props) => {

  let typeIdeas = new TypeIdeas();
  let arrayIdeas = typeIdeas.getTypeArray();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const clickButton = (value) => {
    setSearchValue(value);
    props.onChange(value);
  }

  const changeValue = (e, value) => {
    console.log(e.target.value);
    setSearchValue(e.target.value);
    props.onChange(e.target.value);
  }

  let items = [];
  arrayIdeas.forEach(element => {
    items.push((
      <DropdownItem key={element.id} onClick={() => clickButton(element.name)}>
        <FontAwesomeIcon className="" icon={element.icon} /> {element.name}
      </DropdownItem>
    ))
  });


  const toggleDropDown = () => setDropdownOpen(!dropdownOpen);

  return (

    <InputGroup className="searchbar">
      <Input
        className="searchBarText"
        value={searchValue}
        onChange={(e, value) => changeValue(e, value)} />
      <Dropdown isOpen={dropdownOpen} toggle={toggleDropDown} color="info">
        <DropdownToggle caret className="searchBarButtonDropDown">
          <FontAwesomeIcon className="searchBarIcon" icon={faSearch} />
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem key={1} onClick={() => clickButton("")}>Texto</DropdownItem>
          <DropdownItem key={2} divider />
          <DropdownItem key={3} header>Tipos</DropdownItem>
          {items}
        </DropdownMenu>
      </Dropdown>
    </InputGroup>
  );
}

export default SearchBar
