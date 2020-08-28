import React, { useState } from "react";
import { InputGroup, InputGroupText, InputGroupAddon, Input } from "reactstrap";

const SearchField = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <div>
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>Sök mat priser</InputGroupText>
        </InputGroupAddon>
        <Input />
      </InputGroup>
    </div>
  );
};

export default SearchField;
