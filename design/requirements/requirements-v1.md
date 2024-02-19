# Requirements specification

Product owner: Katja Diepstraten
Date: 18/02/2024
Context: Maintenance planning system for chemistry lab

## Requirements

1. Manage and create maintance tasks within a lab enviromnent.
2. Maintenance tasks should be performed within a certain frequency, frequency differs per task.
3. After performing a maintenance tasks, an employee should be able to check off that task.
4. The lab consists of 4 departments: tasks are divided amongst departments, but can also be assigned to specific individuals.
5. One of the four departments is a general department: tasks for the entire company.
6. Each task has a deadline: a task should be performed within a given period, otherwise the performance is deemed too late.
7. After completion of a task, the frequency count down should start again.
8. Tasks have four status levels: planned, pending, too late, done.
9. There should be a dashboard per department presenting information about the progress of tasks (the status levels).
   - This should be filterable and searchable
10. Please use fictional departments & tasks, company privacy guidelines.

## Definitions

1. Deadline: last date that a task should be done.
2. Interval: time between execution of a task.
3. Frequency: how many times a task should be executed per interval.
