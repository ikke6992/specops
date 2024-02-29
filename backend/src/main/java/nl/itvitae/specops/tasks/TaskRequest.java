package nl.itvitae.specops.tasks;

import java.time.LocalDate;
import nl.itvitae.specops.departments.Department;

public record TaskRequest(
    String name, int timeframe, int interval, Department department, LocalDate date) {}
