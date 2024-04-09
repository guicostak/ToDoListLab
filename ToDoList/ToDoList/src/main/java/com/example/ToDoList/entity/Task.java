package com.example.ToDoList.entity;

import com.example.ToDoList.entity.enums.TaskPriorityEnum;
import com.example.ToDoList.entity.enums.TaskStatusEnum;
import com.example.ToDoList.entity.enums.TaskTypeEnum;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Entity
@Table(name = "Task")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;

    @Enumerated(EnumType.STRING)
    private TaskTypeEnum type;

    @Enumerated(EnumType.STRING)
    private TaskStatusEnum status;

    @Enumerated(EnumType.STRING)
    private TaskPriorityEnum priority;

    private LocalDate dueDate; // Para tarefas do tipo "Data"
    private Long daysToComplete; // Para tarefas do tipo "Prazo"

    public Task() {
    }

    public Task(String name, String description, TaskTypeEnum type, TaskPriorityEnum priority) {
        this.name = name;
        this.description = description;
        this.type = type;
        this.priority = priority;
    }

    // Getter e Setter para os atributos

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public TaskTypeEnum getType() {
        return type;
    }

    public void setType(TaskTypeEnum type) {
        this.type = type;
    }

    public TaskStatusEnum getStatus() {
        return status;
    }

    public void setStatus(TaskStatusEnum status) {
        this.status = status;
    }

    public TaskPriorityEnum getPriority() {
        return priority;
    }

    public void setPriority(TaskPriorityEnum priority) {
        this.priority = priority;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public Long getDaysToComplete() {
        return daysToComplete;
    }

    public void setDaysToComplete(Long daysToComplete) {
        this.daysToComplete = daysToComplete;
    }
}