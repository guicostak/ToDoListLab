import { useState, useEffect } from 'react';
import { toDoListService } from '../services/toDoListService';
import { TaskProps } from '../components/Task';
import TaskMockData from '../common/mock/mockDataTask.json';
import { CreateTasksRequestDTO, UpdateTasksRequestDTO } from '../services/toDoListService';

export const useToDoList = () => {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [createTaskFormData, setCreateTaskFormData] = useState<CreateTasksRequestDTO>({
    title: '', 
    description: '', 
    priority: '', 
    date: '', 
  });
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
  const [editTaskFormData, setEditTaskFormData] = useState<UpdateTasksRequestDTO>({
    title: '',
    description: '',
    priority: '',
    date: '',
    status: '',
  });

  
  const { deleteTask, updateTask, getTasks, createTask } = toDoListService();
  
  const openCreateTaskModal = () => setIsCreateTaskModalOpen(true);
  const closeCreateTaskModal = () => setIsCreateTaskModalOpen(false);
  const openEditTaskModal = () => setIsEditTaskModalOpen(true);
  const closeEditTaskModal = () => setIsEditTaskModalOpen(false);


  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = TaskMockData;
      if (tasks) {
        setTasks(tasks);
      }
    };
    
    fetchTasks();
  }, []);

  const handleCreateTask = async () => {
    try {
      const response = await createTask(createTaskFormData);
      if(response) {
        alert(`Tarefa criada com sucesso!`);
        setIsCreateTaskModalOpen(false);
        setTimeout(() => {
          window.location.reload();
        }, 300)
      }
    } catch (error) {
      alert(`Erro ao criar tarefa: ${error}`);
    }
  };

  const handleCreateTaskFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCreateTaskFormData({
      ...createTaskFormData,
      [name]: value,
    });
    console.log(createTaskFormData)
  };

  const handleEditTaskFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditTaskFormData({
      ...editTaskFormData,
      [name]: value,
    });
  };

  const handleUpdateTask = async (id: number) => {
    try {
      const response = await updateTask(editTaskFormData, id);
      if (response) {
        alert(`Tarefa atualizada com sucesso!`);
        closeEditTaskModal();
        setTimeout(() => {
          window.location.reload();
        }, 300);
      }
    } catch (error) {
      alert(`Erro ao atualizar tarefa: ${error}`);
    }
  };
  
  const loadTaskData = (task: TaskProps) => {
    setEditTaskFormData({
      title: task.title,
      description: task.description,
      priority: task.priority,
      date: task.date,
      status: task.status,
    });
    openEditTaskModal();
  };

  const handleDeleteTask = async (id: number) => {
    try {
      const response = await deleteTask(id);
      if (response) {
        alert(`Tarefa deletada com sucesso!`);
        setTimeout(() => {
          window.location.reload();
        }, 300);
      }
    } catch (error) {
      alert(`Erro ao atualizar tarefa: ${error}`);
    }
  }

  return { tasks, isCreateTaskModalOpen, openCreateTaskModal, closeCreateTaskModal, handleCreateTask,
     createTaskFormData, handleCreateTaskFormChange, loadTaskData, handleUpdateTask, isEditTaskModalOpen, 
     closeEditTaskModal, handleEditTaskFormChange, editTaskFormData, handleDeleteTask
    };
};
