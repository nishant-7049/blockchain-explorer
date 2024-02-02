import React from "react";

const Loader = () => {
  return (
    <div className="flex h-[90vh] w-full justify-center items-center">
      <div className="w-20 h-20 border-l-4 border-b-4 border-[#2c3e50] animate-spin rounded-full" />
    </div>
  );
};

export default Loader;
