package com.example.ToDoList.service.task;

import com.example.ToDoList.entity.Task;
import com.example.ToDoList.entity.enums.TaskStatusEnum;
import com.example.ToDoList.entity.enums.TaskTypeEnum;
import com.example.ToDoList.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;

    @Autowired
    public TaskServiceImpl(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Override
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    @Override
    public Task getTaskById(long id) {
        Optional<Task> optionalTask = taskRepository.findById(id);
        return optionalTask.orElse(null);
    }

    @Override
    public Task addTask(Task task) {
        return taskRepository.save(task);
    }

    @Override
    public Task updateTask(long id, Task updatedTask) {
        if (taskRepository.existsById(id)) {
            updatedTask.setId(id);
            return taskRepository.save(updatedTask);
        }
        return null;
    }

    @Override
    public Task deleteTask(long id) {
        Optional<Task> optionalTask = taskRepository.findById(id);
        if (optionalTask.isPresent()) {
            Task task = optionalTask.get();
            taskRepository.deleteById(id);
            return task;
        }
        return null;
    }

    // Método para calcular o status com base no tipo de tarefa e sua data de conclusão
    private TaskStatusEnum calculateStatus(Task task) {
        LocalDate currentDate = LocalDate.now();
        if (task.getType() == TaskTypeEnum.DATA) {
            if (task.getDueDate().isBefore(currentDate)) {
                return TaskStatusEnum.ATRASADA;
            } else {
                return TaskStatusEnum.PREVISTA;
            }
        } else if (task.getType() == TaskTypeEnum.PRAZO) {
            LocalDate completionDate = currentDate.plusDays(task.getDaysToComplete());
            if (completionDate.isBefore(currentDate)) {
                return TaskStatusEnum.ATRASADA;
            } else {
                return TaskStatusEnum.PREVISTA;
            }
        } else { // Para tarefas do tipo "Livre"
            return TaskStatusEnum.PREVISTA;
        }
    }

    // Método para obter o status formatado
    private String getStatusFormatted(Task task) {
        TaskStatusEnum status = calculateStatus(task);
        if (task.getType() == TaskTypeEnum.DATA || task.getType() == TaskTypeEnum.PRAZO) {
            LocalDate currentDate = LocalDate.now();
            if (status == TaskStatusEnum.ATRASADA) {
                long daysOverdue;
                if (task.getType() == TaskTypeEnum.DATA) {
                    daysOverdue = ChronoUnit.DAYS.between(task.getDueDate(), currentDate);
                } else {
                    LocalDate completionDate = currentDate.plusDays(task.getDaysToComplete());
                    daysOverdue = ChronoUnit.DAYS.between(completionDate, currentDate);
                }
                return "Atrasada (" + daysOverdue + " dias)";
            } else {
                return "Prevista";
            }
        } else { // Para tarefas do tipo "Livre"
            return "Concluída";
        }
    }

    private boolean isDueDateValid(Task task) {
        if (task.getType() == TaskTypeEnum.DATA && task.getDueDate() != null) {
            LocalDate currentDate = LocalDate.now();
            return !task.getDueDate().isBefore(currentDate);
        }
        return true;
    }
}