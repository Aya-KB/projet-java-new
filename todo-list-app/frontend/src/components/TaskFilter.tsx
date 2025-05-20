// src/components/TaskFilter.tsx

import React from 'react';

type TaskFilterProps = {
  filter: string;
  setFilter: (filter: string) => void;
};

const TaskFilter: React.FC<TaskFilterProps> = ({ filter, setFilter }) => {
  return (
    <div>
      <button onClick={() => setFilter('all')} disabled={filter === 'all'}>
        All
      </button>
      <button onClick={() => setFilter('completed')} disabled={filter === 'completed'}>
        Completed
      </button>
      <button onClick={() => setFilter('pending')} disabled={filter === 'pending'}>
        Pending
      </button>
    </div>
  );
};

export default TaskFilter;
