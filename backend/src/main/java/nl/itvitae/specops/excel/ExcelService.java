package nl.itvitae.specops.excel;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.List;
import lombok.RequiredArgsConstructor;
import nl.itvitae.specops.departments.Department;
import nl.itvitae.specops.departments.DepartmentRepository;
import nl.itvitae.specops.tasks.TaskResponse;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.hibernate.jdbc.Work;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ExcelService {
  private final DepartmentRepository departmentRepository;

  public Workbook test() throws IOException {
    // Create Workbook
    FileInputStream file = new FileInputStream(new File("file.xlsx"));
    Workbook workbook = new XSSFWorkbook(file);

    // Create Sheet
    Sheet sheet = workbook.createSheet("Departments");

    // Create Header
    Row headerRow = sheet.createRow(0);
    Cell headerCell = headerRow.createCell(0);
    headerCell.setCellValue("Department");

    // Create Data
    List<Department> departmentList = departmentRepository.findAll();
    int counter = 1;
    for (Department department : departmentList) {
      Row dataRow = sheet.createRow(counter++);
      Cell dataCell = dataRow.createCell(0);
      dataCell.setCellValue(department.getName());
    }

    file.close();

    return workbook;
  }
}
