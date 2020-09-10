import React, { useState } from "react";
import { InputGroup, InputGroupText, InputGroupAddon, Input } from "reactstrap";

const SearchField = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <div>
      <InputGroup className="py-2">
        <Input style={{borderRadius: '20px', padding: '23px 15px'}} placeholder="Sök varor" />
      </InputGroup>
    </div>
  );
};

export default SearchField;
