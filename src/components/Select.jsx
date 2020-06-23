import React, { useState, useEffect, useRef } from 'react';
import { useOnClickOutside }  from '../hooks';
import ScreenReaderOnly from './ScreenReaderOnly'
import { VisibleSelect } from '.';
import {VisibleOption, VisibleSelect} from '../styledComponents';

const Select = ({ id, name, options, value, className, onChange }) => {
  const selectNode = useRef()
  const outerRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('');

  const handleVisibleSelectClick = () => {
    selectNode.current.focus();
    setIsOpen(true);
  }

  // Update the text of the selected option in the visible dropdown
  useEffect(() => {
    const tmp = options.find((option) => option.value === value);
    setSelected((tmp && (tmp.label || tmp.value)) || '')
  }, [options, value]);

  // Close visible dropdown when use clicks outside the component
  useOnClickOutside(outerRef, () => setIsOpen(false));

  const openDropdown = () => setIsOpen(true);
  const handleKeyDown = (e) => {
    // Toggle visible dropdown when space is clicked to mimic default select behavior
    if (e.key === ' ') {
      setIsOpen(!isOpen)
    }
    // Close dropdown is select loses focus
    // This cannot be done with onBlur because that will make the visible options unclickable
    if (e.key === 'Tab') {
      setIsOpen(false);
    }
  }

  return (
    <div ref={outerRef} className={className}>
      <ScreenReaderOnly>
        <select 
          id={id} 
          ref={selectNode}
          name={name} 
          value={value}
          onChange={onChange}
          onClick={openDropdown}
          onKeyDown={handleKeyDown}
          // This changes the behavior of the dropdown so it's no longer openable.
          // The list of options ignore styling that make them hidden when the select is open.
          // This fixes that.
          size="2"
        >
          {options.map((option) => (
            <option 
              key={option.key || option.value} 
              value={option.value}
            >
              {option.label || option.value}
            </option>
          ))}
        </select>
      </ScreenReaderOnly>
      <VisibleSelect aria-hidden="true" tabIndex="-1" open={isOpen} >
        <div onClick={handleVisibleSelectClick}>
          {selected}
          <span role="img" aria-label="dropdown icon">🔽</span>
        </div>
        {options.map((option) => {
          const handleOptionClick = () => {
            setIsOpen(false);
            onChange({ target: { value: option.value }});
          }
          return (
            <VisibleOption 
              key={option.key || option.value}
              active={option.value === value}
              onClick={handleOptionClick}
            >
              {option.label || option.value}
            </VisibleOption>
          )})}
      </VisibleSelect>
    </div>
  )
}


export default Select;