package com.example.ToDoList.unit;

import com.example.ToDoList.entity.Task;
import com.example.ToDoList.entity.enums.TaskPriorityEnum;
import com.example.ToDoList.entity.enums.TaskStatusEnum;
import com.example.ToDoList.entity.enums.TaskTypeEnum;
import com.example.ToDoList.repository.TaskRepository;
import com.example.ToDoList.service.task.TaskServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class TaskServiceImplTest {

    @Mock
    private TaskRepository taskRepository;

    @InjectMocks
    private TaskServiceImpl taskService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetAllTasks() {
        Task task1 = new Task("Task 1", "Description 1", TaskTypeEnum.LIVRE, TaskPriorityEnum.MEDIA);
        Task task2 = new Task("Task 2", "Description 2", TaskTypeEnum.DATA, TaskPriorityEnum.ALTA);

        when(taskRepository.findAll()).thenReturn(Arrays.asList(task1, task2));

        List<Task> tasks = taskService.getAllTasks();

        assertEquals(2, tasks.size());
        assertEquals("Task 1", tasks.get(0).getName());
        assertEquals("Task 2", tasks.get(1).getName());
    }

    @Test
    public void testGetTaskById() {
        long taskId = 1L;
        Task task = new Task();
        task.setId(taskId);
        task.setName("Test Task");

        when(taskRepository.findById(taskId)).thenReturn(Optional.of(task));

        Task foundTask = taskService.getTaskById(taskId);

        assertEquals(taskId, foundTask.getId());
        assertEquals("Test Task", foundTask.getName());
    }

    @Test
    public void testAddTask() {
        Task task = new Task("Test Task", "Test Description", TaskTypeEnum.LIVRE, TaskPriorityEnum.BAIXA);

        when(taskRepository.save(task)).thenReturn(task);

        Task savedTask = taskService.addTask(task);

        assertEquals("Test Task", savedTask.getName());
        assertEquals("Test Description", savedTask.getDescription());
    }

    @Test
    public void testUpdateTask() {
        long taskId = 1L;
        Task existingTask = new Task("Old Task", "Old Description", TaskTypeEnum.PRAZO, TaskPriorityEnum.ALTA);
        existingTask.setId(taskId);

        Task updatedTask = new Task("Updated Task", "Updated Description", TaskTypeEnum.PRAZO, TaskPriorityEnum.ALTA);

        when(taskRepository.existsById(taskId)).thenReturn(true);
        when(taskRepository.save(updatedTask)).thenReturn(updatedTask);

        Task result = taskService.updateTask(taskId, updatedTask);

        assertEquals(taskId, result.getId());
        assertEquals("Updated Task", result.getName());
        assertEquals("Updated Description", result.getDescription());
    }

    @Test
    public void testDeleteTask() {
        long taskId = 1L;
        Task task = new Task();
        task.setId(taskId);
        task.setName("Test Task");

        when(taskRepository.findById(taskId)).thenReturn(Optional.of(task));

        Task deletedTask = taskService.deleteTask(taskId);

        verify(taskRepository, times(1)).deleteById(taskId);
        assertEquals(taskId, deletedTask.getId());
        assertEquals("Test Task", deletedTask.getName());
    }

    @Test
    public void testCalculateStatusForDateTask() {
        Task task = new Task();
        task.setType(TaskTypeEnum.DATA);
        task.setDueDate(LocalDate.now().minusDays(1));

        TaskStatusEnum status = taskService.calculateStatus(task);

        assertEquals(TaskStatusEnum.ATRASADA, status);
    }

    @Test
    public void testCalculateStatusForPrazoTask() {
        Task task = new Task();
        task.setType(TaskTypeEnum.PRAZO);
        task.setDaysToComplete(1L);

        TaskStatusEnum status = taskService.calculateStatus(task);

        assertEquals(TaskStatusEnum.PREVISTA, status);
    }

    @Test
    public void testGetStatusFormattedForDateTask() {
        Task task = new Task();
        task.setType(TaskTypeEnum.DATA);
        task.setDueDate(LocalDate.now().minusDays(2));

        String statusFormatted = taskService.getStatusFormatted(task);

        assertEquals("Atrasada (2 dias)", statusFormatted);
    }

    @Test
    public void testGetStatusFormattedForPrazoTask() {
        Task task = new Task();
        task.setType(TaskTypeEnum.PRAZO);
        task.setDaysToComplete(3L);

        String statusFormatted = taskService.getStatusFormatted(task);

        assertEquals("Prevista", statusFormatted);
    }

    @Test
    public void testIsDueDateValid() {
        Task task = new Task();
        task.setType(TaskTypeEnum.DATA);
        task.setDueDate(LocalDate.now().plusDays(1));

        assertTrue(taskService.isDueDateValid(task));
    }

    @Test
    public void testIsDueDateInvalid() {
        Task task = new Task();
        task.setType(TaskTypeEnum.DATA);
        task.setDueDate(LocalDate.now().minusDays(1));

        assertFalse(taskService.isDueDateValid(task));
    }
}
