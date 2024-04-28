import { useState } from "react";
import { useTheme} from "../context/theme";

function TagsInput({ onChange, placeholder, value, name }) {
    const {theme} = useTheme();
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState(value || []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      handleAddTag();
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    const updatedTags = tags.filter(tag => tag !== tagToRemove);
    setTags(updatedTags);
    onChange(updatedTags); 
  };

  const handleAddTag = () => {
    if (inputValue.trim() !== "") {
      const updatedTags = [...tags, inputValue.trim()];
      setTags(updatedTags);
      onChange(updatedTags); 
      setInputValue("");
    }
  };

  return (
    <div className={`tags-box ${theme}`}>
      <div style={{display:'flex', gap: '10px' }}>
        {tags.map((tag, index) => (
          <div key={index} className={`tag ${theme}`}>
            <p>{tag}</p>
            <span onClick={() => handleRemoveTag(tag)}>x</span>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        placeholder={placeholder}
        name={name}
      />
    </div>
  );
}

export default TagsInput;
