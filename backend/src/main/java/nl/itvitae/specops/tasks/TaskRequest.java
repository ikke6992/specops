package nl.itvitae.specops.tasks;

import java.time.LocalDate;

public record TaskRequest(String name, int timeframe, int interval, LocalDate date) {}
