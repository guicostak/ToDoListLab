import {axiosInstance} from '../common/axios/axios-instance';
import {AxiosResponse} from 'axios';
import {TaskProps} from '../components/Task';

export interface GetTasksResponseDTO {
  tasks: TaskProps[];
}

export interface CreateTasksRequestDTO {
  title: string, 
  description: string, 
  priority: string, 
  date: string, 
}

export interface UpdateTasksRequestDTO {
  title: string, 
  description: string, 
  priority: string, 
  date: string, 
  status: string,
}

export const toDoListService = () => {

    const getTasks = async (): Promise<TaskProps[] | undefined> => {
        try {
          const response: AxiosResponse<GetTasksResponseDTO> = await axiosInstance.get<GetTasksResponseDTO>('tasks');
          return response.data.tasks;
        } catch (error) {
          console.error(error);
        }
    }

    const createTask = async (newTask: CreateTasksRequestDTO): Promise<CreateTasksRequestDTO | undefined> => {
      try {
        const response: AxiosResponse<CreateTasksRequestDTO> = await axiosInstance.post<CreateTasksRequestDTO>('tasks', newTask);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    };

    const updateTask = async (updatedTask: UpdateTasksRequestDTO, id: number): Promise<TaskProps | undefined> => {
      try {
          const response: AxiosResponse<TaskProps> = await axiosInstance.put<TaskProps>(`tasks/${id}`, updatedTask);
          return response.data;
      } catch (error) {
          console.error(error);
      }
    };

    const deleteTask = async (id: number): Promise<TaskProps | undefined> => {
      try {
        const response: AxiosResponse<TaskProps> = await axiosInstance.delete<TaskProps>(`tasks/${id}`);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    };
  
    return {
        getTasks,
        createTask,
        updateTask,
        deleteTask
    };
};

