// src/providers/InstructorProviderWrapper.jsx
import React from "react";
import { InstructorProvider } from "../context/InstructorContext";

const InstructorProviderWrapper = ({ children }) => {
  return <InstructorProvider>{children}</InstructorProvider>;
};

export default InstructorProviderWrapper;
