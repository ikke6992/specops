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
}
