import { useEffect } from "react";

export const useClickOutside = (ref, callback) => {
    const handleClick = e => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    };
    useEffect(() => {
      document.addEventListener('click', handleClick);
      return () => {
        document.removeEventListener('click', handleClick);
      };
    });
  };

export const useConfirmation = (initialState) => {
    const [dialog, setDialog] = useState(initialState || { message: "", onConfirm: "", show: false})

    const confirmAction = (cb, message, setter) => {
      if(!initialState) {
        setDialog({message, show: true,onConfirm: () => cb()})
      }
      else {
        setter()
      }
    }

    return [confirmAction, dialog, setDialog]
}
