import React from 'react';

import CaretUp from '@/public/icons/caret-up.svg';

import styles from './index.module.scss';

export type InputSelectChangeHandler<T> = (item: T) => void;
export type NormalizedTuple = [id:string, label:string];

interface Props {
  label: string;
  items?: any[];
  Icon?: typeof React.Component;
  selectedIndex?: number;
  normalizeItems: (item:any) => NormalizedTuple;
  onChange?: InputSelectChangeHandler<number>;
};

const InputSelect = (props:Props) => {
  const { label, items, Icon, normalizeItems, onChange = () => {}, selectedIndex } = props;
  
  const [isOpen, setIsOpen] = React.useState(false);
  const [options, setOptions] = React.useState<JSX.Element[]>();

  const handleOnFocus = () => setIsOpen(true);
  const handleOnBlur = () => setIsOpen(false);

  React.useEffect(() => {
    if(!items || items.length === 0) return;

    selectedIndex && onChange(0);
  }, []);

  React.useEffect(() => {
    if(!items || items.length === 0) return;
    
    const options = items.map((item, index) => {
      const [id, label] = normalizeItems(item);

      return (<option key={id} value={index}>{label}</option>);
    });

    setOptions(options);
  }, [items]);

  const handleOnChange = (event:React.ChangeEvent<any>) => {
    if(!items) return;

    onChange(event.currentTarget.value);
  };

  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <div className={`${styles.wrapper} ${isOpen ? styles.active : ''}`}>
        { Icon && (<Icon width={20} />) }
        <select
          className={`${styles.select} ${Icon && styles.ident}`}
          value={selectedIndex}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          onChange={handleOnChange}
        >
          {options}
        </select>
        <CaretUp width={20} />
      </div>
    </div>
  );
};

export default InputSelect;
