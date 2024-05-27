package com.example.ToDoList.integration;

import com.example.ToDoList.ToDoListApplication;
import com.example.ToDoList.entity.Task;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;

@SpringBootTest(classes = ToDoListApplication.class, webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
@ActiveProfiles("test")
public class TodoListControllerIntegrationTest {

    @BeforeEach
    public void setup() {
        RestAssured.baseURI = "http://localhost";
        RestAssured.port = 8080;
    }

    @Test
    public void testCriarTask() {
        Task newTask = new Task();
        newTask.setName("Novo Título");
        newTask.setDescription("Nova Descrição");

        given()
                .contentType(ContentType.JSON)
                .body(newTask)
                .when()
                .post("/tasks")
                .then()
                .statusCode(200)
                .contentType(ContentType.JSON)
                .body("id", notNullValue())
                .body("titulo", equalTo("Novo Título"))
                .body("descricao", equalTo("Nova Descrição"));
    }

    @Test
    public void testGetAllTasks() {
        given()
                .when()
                .get("/tasks")
                .then()
                .statusCode(200)
                .contentType(ContentType.JSON)
                .body("size()", greaterThan(0));
    }

    @Test
    public void testGetTaskById() {
        long taskId = 1;

        given()
                .when()
                .get("/tasks/{id}", taskId)
                .then()
                .statusCode(200)
                .contentType(ContentType.JSON)
                .body("id", equalTo((int) taskId))
                .body("titulo", notNullValue())
                .body("descricao", notNullValue());
    }

    @Test
    public void testAtualizarTask() {
        long taskId = 1;
        Task updatedTask = new Task();
        updatedTask.setName("Título Atualizado");
        updatedTask.setDescription("Descrição Atualizada");

        given()
                .contentType(ContentType.JSON)
                .body(updatedTask)
                .when()
                .put("/tasks/{id}", taskId)
                .then()
                .statusCode(200)
                .contentType(ContentType.JSON)
                .body("id", equalTo((int) taskId))
                .body("titulo", equalTo("Título Atualizado"))
                .body("descricao", equalTo("Descrição Atualizada"));
    }

    @Test
    public void testDeletarTask() {
        long taskId = 1;
        given()
                .when()
                .delete("/tasks/{id}", taskId)
                .then()
                .statusCode(200)
                .body(equalTo("Tarefa deletada com sucesso"));

        given()
                .when()
                .get("/tasks/{id}", taskId)
                .then()
                .statusCode(404);
    }
}
