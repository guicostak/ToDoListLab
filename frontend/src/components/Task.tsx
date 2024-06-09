import React, { useState } from 'react';
import { RiPencilLine, RiDeleteBin6Line } from 'react-icons/ri';
import Modal from './Modal';
import { TaskPriorityEnum } from '../common/enums/TaskPriorityEnum';
import { TaskStatusEnum } from '../common/enums/TaskStatusEnum';
import { useToDoList } from '../hooks/useToDoList';

export interface TaskProps {
  id: number;
  title: string;
  description: string;
  priority: string;
  date: string;
  status: string;
}

export const Task: React.FC<TaskProps> = ({ id, title, description, priority, date, status }) => {
  const priorityOptions = Object.values(TaskPriorityEnum);
  const statusOptions = Object.values(TaskStatusEnum);

  const { loadTaskData, handleUpdateTask, isEditTaskModalOpen, closeEditTaskModal, handleEditTaskFormChange, editTaskFormData, 
    handleDeleteTask
   } = useToDoList();

  return (
    <div className="w-96 p-10 border rounded-xl bg-background-task h-96">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-main-color text-3xl font-bold">{title}</h1>
        <div className="flex space-x-4">
          <button onClick={() => loadTaskData({ id, title, description, priority, date, status })}>
            <RiPencilLine className="text-gray-500 hover:text-gray-700 cursor-pointer" size={24} />
          </button>
          <button onClick={() => handleDeleteTask(id)}>
            <RiDeleteBin6Line className="text-red-500 hover:text-red-700 cursor-pointer" size={24} />
          </button>
        </div>
      </div>
      <p className="mb-8 mt-8">{description}</p>
      <div className="mt-2">
        <strong className="text-main-color">Priority: </strong>
        <span>{priority}</span>
      </div>
      <div className="mt-2">
        <strong className="text-main-color">Date: </strong>
        <span>{date}</span>
      </div>
      <div className="mt-2">
        <strong className="text-main-color">Status: </strong>
        <span>{status}</span>
      </div>
      <Modal isOpen={isEditTaskModalOpen} onClose={closeEditTaskModal}>
        <h2 className="text-3xl font-bold mb-4 text-main-color text-center">Alterar tarefa</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="title" className="block text-md text-main-color font-bold">Título</label>
            <input value={editTaskFormData.title} onChange={handleEditTaskFormChange} type="text" id="title" name="title" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-md text-main-color font-bold">Descrição</label>
            <textarea value={editTaskFormData.description} onChange={handleEditTaskFormChange} id="description" name="description" className="h-36 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <div className="mb-4">
            <label htmlFor="priority" className="block text-md text-main-color font-bold">Prioridade</label>
            <select value={editTaskFormData.priority} onChange={handleEditTaskFormChange} id="priority" name="priority" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              {priorityOptions.map((priority, index) => (
                <option key={index} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="status" className="block text-md text-main-color font-bold">Status</label>
            <select value={editTaskFormData.status} onChange={handleEditTaskFormChange} id="status" name="status" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              {statusOptions.map((status, index) => (
                <option key={index} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="date" className="block text-md text-main-color font-bold">Data de previsão </label>
            <input value={editTaskFormData.date} onChange={handleEditTaskFormChange} type="date" id="date" name="date" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <button onClick={() => handleUpdateTask(id)} type="submit" className="px-4 inline-block w-full py-2 bg-main-color text-white rounded-lg hover:bg-main-color-hover">Cadastrar</button>
        </form>
      </Modal>
    </div>
  );
};

