// context/OrchestratorContext.jsx
import React, { createContext, useState } from 'react';
import axios from 'axios';

export const OrchestratorContext = createContext();

export const OrchestratorProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const orchestrateAction = async (action, payload) => {
    setLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:8000/orchestrate',
        { action, payload },
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log(response.data.data);
      
      return response.data.data; // axios auto-parses JSON
    } catch (error) {
      console.error('Orchestrator error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <OrchestratorContext.Provider value={{ orchestrateAction, loading }}>
      {children}
    </OrchestratorContext.Provider>
  );
};
