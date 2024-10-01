import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function SelectInput({ options = [], className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <select 
          {...props} 
          ref={input} 
          className={'border-gray-300 focus:border-gray-500 focus:ring-gray-500 rounded-full shadow-md ' + className} 
          >
            <option value="" disabled>Pilih...</option>
            {options.map((item, index) => {
              return <option key={index} value={item.value}>{item.label}</option>
            })}
        </select>
    );
});
