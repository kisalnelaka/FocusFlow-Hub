import React, { useState } from 'react';
import { TextField, Button, List, ListItem, Checkbox, IconButton } from '@material-ui/core';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import DeleteIcon from '@material-ui/icons/Delete';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const addTask = () => {
    if (input.trim() !== '') {
      setTasks([...tasks, { id: uuidv4(), text: input, done: false, subtasks: [] }]);
      setInput('');
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, done: !task.done } : task));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = Array.from(tasks);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    setTasks(reordered);
  };

  return (
    <div>
      <h2>Task & Time Management</h2>
      <TextField
        label="New Task"
        variant="outlined"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button onClick={addTask} variant="contained" color="primary" style={{ marginLeft: '10px' }}>
        Add
      </Button>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <List ref={provided.innerRef} {...provided.droppableProps}>
              {tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <ListItem ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <Checkbox checked={task.done} onClick={() => toggleTask(task.id)} />
                      <span style={{ textDecoration: task.done ? 'line-through' : 'none' }}>
                        {task.text}
                      </span>
                      <IconButton onClick={() => deleteTask(task.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItem>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>
      {/* Additional features: Pomodoro Timer, Time Blocking, AI Scheduling, etc. */}
    </div>
  );
};

export default TaskManager;
