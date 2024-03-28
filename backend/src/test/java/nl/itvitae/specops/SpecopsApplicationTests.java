package nl.itvitae.specops;

import com.jayway.jsonpath.DocumentContext;
import com.jayway.jsonpath.JsonPath;
import java.util.HashMap;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

@SpringBootTest(webEnvironment = WebEnvironment.MOCK, classes = SpecopsApplication.class)
@TestPropertySource(locations = "classpath:application-test.properties")
@AutoConfigureMockMvc
@Rollback
class SpecopsApplicationTests {
  @Autowired private MockMvc mvc;
  private String token;

  @BeforeEach
  public void login_as_admin() throws Exception {
    final String json =
        """
    {
      "username": "ThomasVrie",
      "password": "ThomasVrie123"
    }
      """;
    MockHttpServletResponse response =
        mvc.perform(
                MockMvcRequestBuilders.post("/users/login")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(json))
            .andReturn()
            .getResponse();

    // TO TEST
    String content = response.getContentAsString();
    DocumentContext data = JsonPath.parse(content);
    HashMap<String, Object> object = data.read("$");
    this.token = (String) object.get("token");
  }

  @Test
  public void should_be_able_to_login_as_admin() throws Exception {
    // PERFORM
    final String json =
        """
    {
      "username": "ThomasVrie",
      "password": "ThomasVrie123"
    }
      """;
    MockHttpServletResponse response =
        mvc.perform(
                MockMvcRequestBuilders.post("/users/login")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(json))
            .andReturn()
            .getResponse();

    // TO TEST
    int status = response.getStatus();
    String content = response.getContentAsString();
    DocumentContext data = JsonPath.parse(content);
    HashMap<String, Object> object = data.read("$");
    final String username = (String) object.get("username");
    final String token = (String) object.get("token");
    final String roles = (String) object.get("roles");
    this.token = token;

    // ASSERT
    Assertions.assertEquals(200, status);
    Assertions.assertEquals("ThomasVrie", username);
    Assertions.assertFalse(token.isEmpty());
    Assertions.assertEquals("ROLE_USER,ROLE_MANAGER,ROLE_ADMIN", roles);
  }

  @Test
  public void should_be_able_to_create_user_as_admin() throws Exception {
    // DATA
    final String json =
        """
    {
      "roles": "ROLE_USER",
      "employeeName": "Test Tester",
      "department": "general"
    }
      """;

    // PERFORM
    MockHttpServletResponse response =
        mvc.perform(
                MockMvcRequestBuilders.post("/users/create")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(json)
                    .header("Authorization", "Bearer " + token))
            .andReturn()
            .getResponse();

    // TO TEST
    int status = response.getStatus();
    String content = response.getContentAsString();
    DocumentContext data = JsonPath.parse(content);
    HashMap<String, Object> object = data.read("$");
    final String id = (String) object.get("id");
    final String role = (String) object.get("role");
    final String name = (String) object.get("name");
    final String department = (String) object.get("department");

    // ASSERT
    Assertions.assertEquals(200, status);
    Assertions.assertFalse(id.isEmpty());
    Assertions.assertEquals("analyst", role);
    Assertions.assertEquals("Test Tester", name);
    Assertions.assertEquals("general", department);
  }

  @Test
  public void should_be_able_to_create_department_as_admin() throws Exception {
    // DATA
    final String json = """
    {
      "name": "Custom Department"
    }
      """;

    // PERFORM
    MockHttpServletResponse response =
        mvc.perform(
                MockMvcRequestBuilders.post("/departments/create")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(json)
                    .header("Authorization", "Bearer " + token))
            .andReturn()
            .getResponse();

    // TO TEST
    int status = response.getStatus();
    String content = response.getContentAsString();
    DocumentContext data = JsonPath.parse(content);
    HashMap<String, Object> object = data.read("$");
    final String id = (String) object.get("id");
    final String name = (String) object.get("name");

    // ASSERT
    Assertions.assertEquals(200, status);
    Assertions.assertFalse(id.isEmpty());
    Assertions.assertEquals("Custom Department", name);
  }

  @Test
  public void should_be_able_to_create_task_as_admin() throws Exception {
    // DATA
    final String json = """
            {
              "name": "task test",
              "timeframe": 3,
              "interval": 7,
              "department": "general",
              "deadline": "28/03/2024"
            }
            """;

    // PERFORM
    MockHttpServletResponse response =
        mvc.perform(
            MockMvcRequestBuilders.post("/tasks")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json)
                .header("Authorization", "Bearer " + token))
            .andReturn()
            .getResponse();

    // TO TEST
    int status = response.getStatus();
    String content = response.getContentAsString();
    DocumentContext data = JsonPath.parse(content);
    HashMap<String, Object> object = data.read("$");
    final String id = (String) object.get("id");
    final String name = (String) object.get("name");
    final int timeframe = (int) object.get("timeframe");
    final int interval = (int) object.get("interval");
    final String department = (String) object.get("department");
    final String deadline = (String) object.get("deadline");


    // ASSERT
    Assertions.assertEquals(200, status);
    Assertions.assertFalse(id.isEmpty());
    Assertions.assertEquals("task test", name);
    Assertions.assertEquals(3, timeframe);
    Assertions.assertEquals(7, interval);
    Assertions.assertEquals("general", department);
    Assertions.assertEquals("28/03/2024", deadline);

  }

  @Test
  public void test_all_data_required_to_create_task() throws Exception {

    // MISSING NAME
    final String noNameJson =
        """
    {
      "name": ""
      "dept": "general",
      "timeframe": 2,
      "interval": 7,
      "deadline": "2024-01-01"
    }
      """;
    // MISSING DEADLINE
    final String noDeadlineJson =
        """
    {
      "name": "TestTask",
      "dept": "general",
      "timeframe": 2,
      "interval": 7,
      "deadline": ""
    }
      """;
    // ALL DATA PRESENT
    final String allPresentJson =
        """
    {
      "name": "TestTask",
      "dept": "general",
      "timeframe": 2,
      "interval": 7,
      "deadline": "2024-01-01"
    }
     """;

    MockHttpServletResponse responseNoName =
        mvc.perform(
                MockMvcRequestBuilders.post("/tasks")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(noNameJson)
                    .header("Authorization", "Bearer " + token))
            .andReturn()
            .getResponse();
    MockHttpServletResponse responseNoDeadline =
        mvc.perform(
                MockMvcRequestBuilders.post("/tasks")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(noDeadlineJson)
                    .header("Authorization", "Bearer " + token))
            .andReturn()
            .getResponse();
    MockHttpServletResponse responseAllPresent =
        mvc.perform(
                MockMvcRequestBuilders.post("/tasks")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(allPresentJson)
                    .header("Authorization", "Bearer " + token))
            .andReturn()
            .getResponse();

    Assertions.assertEquals(400, responseNoName.getStatus());
    Assertions.assertEquals(400, responseNoDeadline.getStatus());
    Assertions.assertEquals(201, responseAllPresent.getStatus());
  }

  @Test
  public void no_duplicate_task_should_be_created() throws Exception {
    // DUPLICATE NAME AND DEPT
    final String existingTaskJson =
        """
    {
      "name": "Clean toilets",
      "dept": "maintenance",
      "timeframe": 2,
      "interval": 7,
      "deadline": "2024-01-01"
    }
     """;
    // SAME NAME, DIFFERENT DEPT
    final String differentDeptJson =
        """
    {
      "name": "Clean toilets",
      "dept": "general",
      "timeframe": 2,
      "interval": 7,
      "deadline": "2024-01-01"
    }
     """;
    // SAME DEPT, DIFFERENT NAME
    final String differentNameJson =
        """
    {
      "name": "Clean lavatories",
      "dept": "maintenance",
      "timeframe": 2,
      "interval": 7,
      "deadline": "2024-01-01"
    }
     """;
    MockHttpServletResponse responseDuplicate =
        mvc.perform(
                MockMvcRequestBuilders.post("/tasks")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(existingTaskJson)
                    .header("Authorization", "Bearer " + token))
            .andReturn()
            .getResponse();

    MockHttpServletResponse responseDifferentDept =
        mvc.perform(
                MockMvcRequestBuilders.post("/tasks")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(differentDeptJson)
                    .header("Authorization", "Bearer " + token))
            .andReturn()
            .getResponse();

    MockHttpServletResponse responseDifferentName =
        mvc.perform(
                MockMvcRequestBuilders.post("/tasks")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(differentNameJson)
                    .header("Authorization", "Bearer " + token))
            .andReturn()
            .getResponse();

    Assertions.assertEquals(400, responseDuplicate.getStatus());
    Assertions.assertEquals(201, responseDifferentDept.getStatus());
    Assertions.assertEquals(201, responseDifferentName.getStatus());
  }

  @Test
  public void edit_task_should_replace_data() throws Exception {
    MockHttpServletResponse responseBefore =
        mvc.perform(
                MockMvcRequestBuilders.get("/tasks")
                    .contentType(MediaType.APPLICATION_JSON)
                    .header("Authorization", "Bearer " + token))
            .andReturn()
            .getResponse();

    String content = responseBefore.getContentAsString();
    DocumentContext data = JsonPath.parse(content);
    HashMap<String, Object> object = data.read("$[0]");
    String idBefore = (String) object.get("id");
    String nameBefore = (String) object.get("name");
    String deptBefore = (String) object.get("department");
    int timeframeBefore = (Integer) object.get("timeframe");
    int intervalBefore = (Integer) object.get("interval");
    String deadlineBefore = (String) object.get("deadline");

    final String edit =
        """
    {
      "name": "Do stuff",
      "dept": "chemistry",
      "timeframe": 3,
      "interval": 4,
      "deadline": "2024-01-01"
    }
     """;
    MockHttpServletResponse responseEdit =
        mvc.perform(
                MockMvcRequestBuilders.patch("/tasks/edit/" + idBefore)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(edit)
                    .header("Authorization", "Bearer " + token))
            .andReturn()
            .getResponse();

    MockHttpServletResponse responseAfter =
        mvc.perform(
                MockMvcRequestBuilders.get("/tasks")
                    .contentType(MediaType.APPLICATION_JSON)
                    .header("Authorization", "Bearer " + token))
            .andReturn()
            .getResponse();

    String contentAfter = responseAfter.getContentAsString();
    DocumentContext dataAfter = JsonPath.parse(contentAfter);
    HashMap<String, Object> objectAfter = dataAfter.read("$[0]");
    String idAfter = (String) objectAfter.get("id");
    String nameAfter = (String) objectAfter.get("name");
    String deptAfter = (String) objectAfter.get("department");
    int timeframeAfter = (Integer) objectAfter.get("timeframe");
    int intervalAfter = (Integer) objectAfter.get("interval");
    String deadlineAfter = (String) objectAfter.get("deadline");

    Assertions.assertEquals(idBefore, idAfter);
    Assertions.assertNotEquals(nameBefore, nameAfter);
    Assertions.assertNotEquals(deptBefore, deptAfter);
    Assertions.assertNotEquals(timeframeBefore, timeframeAfter);
    Assertions.assertNotEquals(intervalBefore, intervalAfter);
    Assertions.assertNotEquals(deadlineBefore, deadlineAfter);
  }
}
