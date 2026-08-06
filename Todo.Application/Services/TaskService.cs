using System;
using System.Collections.Generic;
using System.Text;
using Todo.Application.DTOs.Task;
using Todo.Application.Interfaces.Services;
using Todo.Application.Interfaces.Repositories;
using Todo.Domain.Entities;
using Todo.Domain.Enums;

namespace Todo.Application.Services
{
    public class TaskService : ITaskService
    {
        private readonly ITaskRepository _taskRepository;
        public TaskService(ITaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
        }
       
        public async Task<IEnumerable<TaskDto>> GetAllTasksAsync()
        {
            var tasks = await _taskRepository.GetAllAsync();

            return tasks.Select(task => new TaskDto
            {
                TaskId = task.TaskId,
                Title = task.Title,
                Description = task.Description,
                CategoryName = task.Category.CategoryName,
                Priority = task.Priority,
                Status = task.Status,
                DueDate = task.DueDate,
                CreatedAt = task.CreatedAt,
                CompletedAt = task.CompletedAt
            });
        }

        public async Task<TaskDto?> GetTaskByIdAsync(Guid id)
        {
            var task = await _taskRepository.GetByIdAsync(id);

            if (task == null)
                return null;

            return new TaskDto
            {
                TaskId = task.TaskId,
                Title = task.Title,
                Description = task.Description,
                CategoryName = task.Category.CategoryName,
                Priority = task.Priority,
                Status = task.Status,
                DueDate = task.DueDate,
                CreatedAt = task.CreatedAt,
                CompletedAt = task.CompletedAt
            };
        }

        public async Task CreateTaskAsync(CreateTaskDto createTaskDto, Guid userId)
        {
            var task = new TaskItem
            {
                TaskId = Guid.NewGuid(),
                UserId = userId,
                CategoryId = createTaskDto.CategoryId,

                Title = createTaskDto.Title,
                Description = createTaskDto.Description,

                Priority = createTaskDto.Priority,
                Status = TaskState.Pending,

                DueDate = null,

                CreatedAt = DateTime.UtcNow,
                UpdatedAt = null,
                CompletedAt = null
            };
            await _taskRepository.AddAsync(task);
        }

        public async Task UpdateTaskAsync(Guid id, UpdateTaskDto updateTaskDto)
        {
            var task = await _taskRepository.GetByIdAsync(id);

            if (task == null)
                throw new KeyNotFoundException("Task not found");

            task.Title = updateTaskDto.Title;
            task.Description = updateTaskDto.Description;
            task.CategoryId = updateTaskDto.CategoryId;
            task.Priority = updateTaskDto.Priority;
            task.Status = updateTaskDto.Status;
            task.DueDate = updateTaskDto.DueDate.HasValue
                ? DateTime.SpecifyKind(
                    updateTaskDto.DueDate.Value,
                    DateTimeKind.Utc)
                : null;

            task.UpdatedAt = DateTime.UtcNow;

           if (task.Status == TaskState.Completed)
           {
                task.CompletedAt = DateTime.UtcNow;
           }
           else
           {
                task.CompletedAt = null;
           }
         
           await _taskRepository.UpdateAsync(task);
        }

        public async Task DeleteTaskAsync(Guid id)
        {
            var task = await _taskRepository.GetByIdAsync(id);

            if (task == null)
                throw new KeyNotFoundException("Task not found");

            await _taskRepository.DeleteAsync(task);
        }
    }
}
