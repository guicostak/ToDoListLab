/*
package com.example.ToDoList.controller;

import com.example.ToDoList.entity.Task;
import com.example.ToDoList.service.task.TaskService;
import io.swagger.v3.oas.annotations.Operation;
import org.hibernate.sql.ast.tree.expression.Summarization;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
public class TodoListController {

    private final TaskService taskService;

    @Autowired
    public TodoListController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    @Operation(summary = "Pegar todas as Tasks")
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

    @PostMapping
    @Operation(summary = "Adicionar Task")
    public Task addTask(@RequestBody Task task) {
        return taskService.addTask(task);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Pegar Task por ID")
    public Task getTaskById(@PathVariable long id) {
        return taskService.getTaskById(id);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar Task por id")
    public Task updateTask(@PathVariable long id, @RequestBody Task updatedTask) {
        return taskService.updateTask(id, updatedTask);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar Task por ID")
    public Task deleteTask(@PathVariable long id) {
        return taskService.deleteTask(id);
    }
}*/
