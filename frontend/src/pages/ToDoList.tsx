import React from 'react';
import { Task } from '../components/Task';
import { TaskPriorityEnum } from '../common/enums/TaskPriorityEnum';
import { TaskStatusEnum } from '../common/enums/TaskStatusEnum';
import { useToDoList } from '../hooks/useToDoList';
import Modal from '../components/Modal';

export const ToDoList: React.FC = () => {
  const { tasks, isCreateTaskModalOpen, openCreateTaskModal, closeCreateTaskModal, handleCreateTask, createTaskFormData, handleCreateTaskFormChange } = useToDoList();
  const priorityOptions = Object.values(TaskPriorityEnum);

  return (
    <div className="w-full min-h-screen bg-background-main text-white flex flex-col items-center justify-center p-20">
      <h1 className='text-5xl mb-20 text-center font-extrabold text-main-color'>Minhas tarefas</h1>
      <div className="flex flex-wrap gap-4 justify-start items-start w-11/12 p-7">
        {tasks.map(task => (
          <Task 
            key={task.id}
            id={task.id}
            title={task.title}
            description={task.description}
            priority={task.priority as TaskPriorityEnum}
            date={task.date}
            status={task.status as TaskStatusEnum}
          />
        ))}
      <button onClick={openCreateTaskModal} className="w-96 p-10 border rounded-xl bg-background-task opacity-15 text-6xl
       text-black font-extrabold h-96 transform hover:scale-105 transition duration-300">+</button>
      </div>
      <Modal isOpen={isCreateTaskModalOpen} onClose={closeCreateTaskModal}>
        <h2 className="text-3xl font-bold mb-4 text-main-color text-center">Criar tarefa</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="title" className="block text-md text-main-color font-bold">Título</label>
            <input onChange={handleCreateTaskFormChange} value={createTaskFormData.title} type="text" id="title" name="title" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-md text-main-color font-bold">Descrição</label>
            <textarea onChange={handleCreateTaskFormChange} value={createTaskFormData.description}  id="description" name="description" className="h-36 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <div className="mb-4">
            <label htmlFor="priority" className="block text-md text-main-color font-bold">Prioridade</label>
            <select onChange={handleCreateTaskFormChange} value={createTaskFormData.priority} id="priority" name="priority" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              {priorityOptions.map((priority, index) => (
                <option key={index} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="date" className="block text-md text-main-color font-bold">Data de previsão </label>
            <input onChange={handleCreateTaskFormChange} value={createTaskFormData.date} type="date" id="date" name="date" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <button onClick={handleCreateTask} type="submit" className="px-4 inline-block w-full py-2 bg-main-color text-white rounded-lg hover:bg-main-color-hover">Cadastrar</button>
        </form>
      </Modal>
    </div>
  );
};
