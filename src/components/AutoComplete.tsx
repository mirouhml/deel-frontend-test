import React, { useState, useEffect, useMemo, useRef } from 'react';
import './AutoComplete.css';

interface IAutoComplete {
  data: string[];
}

declare global {
  interface WindowEventMap {
    keydown: React.KeyboardEvent<HTMLInputElement>;
  }
}

const AutoComplete = ({ data }: IAutoComplete) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [selectedCountryIndex, setSelectedCountryIndex] =
    useState<number>(0);
  const dataList = useRef<HTMLUListElement>(null);
  const selectedCountry = useRef<HTMLLIElement>(null);

  // I used useMemo to avoid unnecessary re-renders when the inputValue changes.
  const autoCompleteSuggestions = useMemo(() => {
    const filtered = data.filter((country: any) => {
      return (
        country.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
      );
    });
    if (inputValue.length > 0) {
      if (filtered.length === 0) setIsVisible(false);
      else setIsVisible(true);
    } else {
      setIsVisible(false);
    }
    return filtered;
  }, [inputValue]);

  // This onchange event is for the input field to update the state of the inputValue variable
  // when the user types in the input field and the input field is focused on.

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCountryIndex(0);
    setInputValue(e.target.value);
  };

  // This is an onclick event handler for the input field.
  // It is used to set the value of the input field to the value of the selected country.

  const onClick = (event: React.MouseEvent<HTMLElement>) => {
    const country = event.currentTarget.innerText;
    setInputValue(country);
    setSelectedCountryIndex(autoCompleteSuggestions.indexOf(country));
  };

  // This useEffect is used to add and remove event listeners to the window object when the component is mounted and unmounted.

  useEffect(() => {
    window.addEventListener('keydown', arrowNavigation);

    return () => {
      window.removeEventListener('keydown', arrowNavigation);
    };
  });

  // This function is used to navigate through the list of suggestions using the arrow keys on the keyboard
  // and to select the suggestion when the enter key is pressed.
  // The function is called when the keydown event is triggered.

  const arrowNavigation = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'ArrowDown') {
      arrowDown();
    } else if (e.key === 'ArrowUp') {
      arrowUp();
    } else if (e.key === 'Enter') {
      setInputValue(autoCompleteSuggestions[selectedCountryIndex]);
    }
  };

  // I broke down the arrow navigation into the following two functions to make it easier to read.

  const arrowDown = () => {
    if (selectedCountryIndex < autoCompleteSuggestions.length - 1)
      setSelectedCountryIndex(selectedCountryIndex + 1);
    if (selectedCountryIndex > 3)
      if (selectedCountry.current && dataList.current) {
        dataList.current.scrollTop +=
          selectedCountry.current.offsetHeight;
      }
  };
  const arrowUp = () => {
    if (selectedCountryIndex - 1 >= 0)
      setSelectedCountryIndex(selectedCountryIndex - 1);
    if (selectedCountryIndex < autoCompleteSuggestions.length - 4)
      if (selectedCountry.current && dataList.current) {
        dataList.current.scrollTop =
          Math.floor(dataList.current.scrollTop) -
          selectedCountry.current.offsetHeight;
      }
  };

  return (
    <div className='autocomplete'>
      <div className='suggestions'>
        <input
          type='text'
          onChange={(event) => onChange(event)}
          value={inputValue}
        />
        <ul ref={dataList}>
          {isVisible &&
            autoCompleteSuggestions.map(
              (suggestion: string, index: number) => {
                return (
                  <li
                    key={index}
                    className={
                      index === selectedCountryIndex
                        ? 'country country-selected'
                        : 'country'
                    }
                    ref={
                      index === selectedCountryIndex
                        ? selectedCountry
                        : undefined
                    }
                    onClick={(event: React.MouseEvent<HTMLElement>) =>
                      onClick(event)
                    }
                  >
                    <Highlighter
                      country={suggestion}
                      inputValue={inputValue}
                    />
                  </li>
                );
              }
            )}
          {!isVisible && <li className='no-match'>No match</li>}
        </ul>
      </div>
    </div>
  );
};

// This is a subcomponent of AutoComplete that highlights the matching part of the country name in the suggestion list.

const Highlighter = ({ country, inputValue }: any) => {
  const matchingText = inputValue.toLowerCase();
  const matchingTextStartIndex = country
    .toLowerCase()
    .indexOf(matchingText.toLowerCase());
  const matchStart = country.slice(0, matchingTextStartIndex);
  const toBeHighlightedText = country.substring(
    matchingTextStartIndex,
    matchingTextStartIndex + matchingText.length
  );
  const matchEnd = country.substring(
    matchingTextStartIndex + matchingText.length
  );
  const highlightedText = [matchStart, toBeHighlightedText, matchEnd];
  return (
    <span>
      {highlightedText.map((text, index) => {
        if (index === 1) {
          return <span className='highlight'>{text}</span>;
        }
        return text;
      })}
    </span>
  );
};

export default AutoComplete;
