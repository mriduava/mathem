import React, { useState } from "react";
import { InputGroup, InputGroupText, InputGroupAddon, Input } from "reactstrap";

const SearchField = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <div>
      <InputGroup className="mt-5">
        <Input placeholder="Sök varor" />
      </InputGroup>
    </div>
  );
};

export default SearchField;
