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
  useState<string[]>([]);
  const textInput = useRef<HTMLInputElement>(null);
  const dataList = useRef<HTMLUListElement>(null);
  const selectedCountry = useRef<HTMLLIElement>(null);
  const autoCompleteSuggestions = useMemo(() => {
    return data.filter((country: any) => {
      return (
        country.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
      );
    });
  }, [inputValue, data]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setSelectedCountryIndex(0);
    setInputValue(input);
    if (input.length > 0) {
      if (autoCompleteSuggestions.length === 0) setIsVisible(false);
      else setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const onClick = (event: React.MouseEvent<HTMLElement>) => {
    const country = event.currentTarget.innerText;
    setInputValue(country);
    setSelectedCountryIndex(autoCompleteSuggestions.indexOf(country));
    if (textInput.current) textInput.current.value = country;
  };

  useEffect(() => {
    window.addEventListener('keydown', arrowNavigation);

    return () => {
      window.removeEventListener('keydown', arrowNavigation);
    };
  });
  const arrowNavigation = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'ArrowDown') {
      if (selectedCountryIndex < autoCompleteSuggestions.length - 1)
        setSelectedCountryIndex(selectedCountryIndex + 1);
      if (selectedCountryIndex > 3)
        if (selectedCountry.current && dataList.current) {
          console.log(selectedCountry.current.offsetHeight);
          dataList.current.scrollTop +=
            selectedCountry.current.offsetHeight;
        }
    } else if (e.key === 'ArrowUp') {
      if (selectedCountryIndex - 1 >= 0)
        setSelectedCountryIndex(selectedCountryIndex - 1);
      if (selectedCountryIndex < autoCompleteSuggestions.length - 4)
        if (selectedCountry.current && dataList.current) {
          dataList.current.scrollTop -=
            selectedCountry.current.offsetHeight;
        }
    } else if (e.key === 'Enter') {
      if (textInput.current)
        textInput.current.value =
          autoCompleteSuggestions[selectedCountryIndex];
      setInputValue(autoCompleteSuggestions[selectedCountryIndex]);
    }
  };
  return (
    <div className='autocomplete'>
      <div className='suggestions'>
        <input
          type='text'
          onChange={(event) => onChange(event)}
          ref={textInput}
        />
        <ul ref={dataList}>
          {isVisible &&
            autoCompleteSuggestions.map(
              (suggestion: any, index: number) => {
                return (
                  <li
                    key={index}
                    className={
                      index === selectedCountryIndex
                        ? 'country country-selected'
                        : 'country'
                    }
                    onClick={(event: React.MouseEvent<HTMLElement>) =>
                      onClick(event)
                    }
                    ref={
                      index === selectedCountryIndex
                        ? selectedCountry
                        : undefined
                    }
                  >
                    <HighLighter
                      text={suggestion}
                      highlight={inputValue}
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

const HighLighter = ({ text, highlight }: any) => {
  const parts = text.split(new RegExp(`(${highlight})`, 'i'));

  return (
    <span>
      {' '}
      {parts.map((part: string, i: number) => {
        const highlightStyle =
          part.toLowerCase() === highlight.toLowerCase()
            ? 'highlight'
            : '';
        return (
          <span key={i} className={highlightStyle}>
            {part}
          </span>
        );
      })}{' '}
    </span>
  );
};

export default AutoComplete;
