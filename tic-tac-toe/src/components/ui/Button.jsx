const Button = ({ children, onClick, className }) => {
    return (
      <button
        onClick={onClick}
        className={`px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 ${className}`}
      >
        {children}
      </button>
    );
  };
  
  export default Button;
  