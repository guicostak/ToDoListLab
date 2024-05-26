package com.example.ToDoList.service.task;

import com.example.ToDoList.entity.Task;

import java.util.List;

public interface TaskService {
    List<Task> getAllTasks();

    Task getTaskById(long id);

    Task addTask(Task task);

    Task updateTask(long id, Task updatedTask);

    Task deleteTask(long id);
}
