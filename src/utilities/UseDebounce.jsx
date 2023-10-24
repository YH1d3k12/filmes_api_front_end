import { useRef } from "react";


// fn is the function to be debounced.
const useDebounce = (fn, delay) => {
    // First timer is set to null.
    const timeoutRef = useRef(null);

    function debouncedFn(...args) {
        // Clear the previous timer that was set.
        window.clearTimeout(timeoutRef.current)

        // Set a new timer.
        timeoutRef.current = window.setTimeout(() => {
            // Call the passed in function after the specified delay.
            fn(...args);
        }, delay)
    }
    
    return debouncedFn
}


export default useDebounce;