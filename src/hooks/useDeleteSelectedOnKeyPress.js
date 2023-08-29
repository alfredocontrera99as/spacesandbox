import { useEffect } from 'react';

const useDeleteSelectedOnKeyPress = (editor) => {
  const deleteElements = () => {
    editor.deleteSelected();
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Delete') {
      deleteElements();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [editor]); 
};

export default useDeleteSelectedOnKeyPress;
